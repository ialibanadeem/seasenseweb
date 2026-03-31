import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TrackingGateway } from './tracking/tracking.gateway';
import { TrackingEvents, VesselLiveUpdate } from './interfaces/tracking.interface';
import Redis from 'ioredis';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class GpsSyncService implements OnModuleInit, OnModuleDestroy {
    private subscriber: Redis;
    private readonly logger = new Logger(GpsSyncService.name);

    constructor(
        private configService: ConfigService,
        private trackingGateway: TrackingGateway,
        private prisma: PrismaService,
        private redisService: RedisService,
    ) { }

    onModuleInit() {
        // HMR Fix: Check if a subscriber already exists in global scope (Development only)
        const globalSubscriber = (global as any).gps_subscriber;
        if (process.env.NODE_ENV !== 'production' && globalSubscriber) {
            this.logger.log('♻️  HMR: Reusing existing Redis GPS subscriber');
            this.subscriber = globalSubscriber;
            this.setupSubscriberHandlers();
            return;
        }

        this.subscriber = new Redis({
            host: this.configService.get<string>('REDIS_HOST') || 'localhost',
            port: this.configService.get<number>('REDIS_PORT') || 6379,
            enableReadyCheck: false,
        });

        if (process.env.NODE_ENV !== 'production') {
            (global as any).gps_subscriber = this.subscriber;
        }

        this.setupSubscriberHandlers();
    }

    private setupSubscriberHandlers() {
        // Clear existing listeners if any (important for HMR stability)
        this.subscriber.removeAllListeners('message');
        this.subscriber.removeAllListeners('connect');

        this.subscriber.on('connect', () => {
            this.logger.log('GPS Sync Bridge: Connected to Redis');
            this.subscriber.subscribe('gps:updates', (err) => {
                if (err) {
                    this.logger.error('Failed to subscribe to gps:updates', err.stack);
                } else {
                    this.logger.log('📡 GPS Sync Bridge: Subscribed and Operational');
                }
            });
        });

        this.subscriber.on('message', (channel, message) => {
            if (channel === 'gps:updates') {
                this.handleGpsUpdate(message);
            }
        });

        this.subscriber.on('error', (err) => {
            this.logger.error(`📡 GPS Sync Bridge Error: ${err.message}`);
        });
    }

    private async handleGpsUpdate(message: string) {
        try {
            const log = JSON.parse(message);
            this.logger.log(`📥 Redis Bridge: Received raw GPS message for processing...`);
            const mmsi = log.mmsi || '987654321'; // Default to Shaheen MMSI if not provided

            // 1. Resolve Vessel UUID
            const vessel = await this.prisma.vessel.findUnique({
                where: { mmsi: String(mmsi) }
            });

            if (!vessel) {
                this.logger.warn(`Received GPS for unknown vessel MMSI: ${mmsi}`);
                return;
            }

            // 2. Check for Active Trip
            const activeTrip = await this.prisma.trip.findFirst({
                where: { vesselId: vessel.id, status: 'ACTIVE' }
            });

            const lat = Number(log.latitude);
            const lng = Number(log.longitude);
            // Hardware sends speed in KM/H. Conversion to KNOTS (multiply by 0.539957)
            const speedKmh = Number(log.speed_kmh || 0);
            const speedKnots = speedKmh * 0.539957;
            const heading = Number(log.heading_deg || 0);

            let currentTrip = activeTrip;

            // 4. EMERGENCY SIGNALING (Edge cases)
            // Logic: If speed drops > 70% abruptly while at high speed (Potential impact/emergency)
            const prevSpeedKey = `vessel:last_speed:${vessel.id}`;
            const prevSpeed = await this.redisService.get<number>(prevSpeedKey);
            let isEmergency = false;
            
            if (prevSpeed && prevSpeed > 10 && speedKnots < (prevSpeed * 0.3)) {
                isEmergency = true;
                this.logger.warn(`🚨 EMERGENCY: Abrupt speed drop detected for Vessel ${vessel.id} (${prevSpeed.toFixed(1)} -> ${speedKnots.toFixed(1)} kn)`);
                this.trackingGateway.server.to('admin:fleet').emit('vessel_emergency', {
                    vesselId: vessel.id,
                    type: 'ABRUPT_SPEED_DROP',
                    message: `Vessel speed dropped from ${prevSpeed.toFixed(1)} to ${speedKnots.toFixed(1)} knots abruptly!`,
                    location: { lat, lng }
                });
            }
            await this.redisService.set(prevSpeedKey, speedKnots, 3600);

            // 5. Global Persistance (Black Box)
            const altitude = Number(log.altitude_m || 0);
            const satellites = Number(log.satellites || 0);

            try {
                await this.prisma.gpsLog.create({
                    data: {
                        vesselId: vessel.id,
                        mmsi: String(mmsi),
                        latitude: lat,
                        longitude: lng,
                        speed_kmh: speedKmh,
                        heading_deg: heading,
                        altitude_m: altitude,
                        satellites: satellites,
                        utc_datetime: new Date(log.utc_datetime || new Date()),
                    }
                });
                this.logger.log(`💾 GpsLog: Recorded raw ping for vessel ${vessel.id}`);
            } catch (err) {
                this.logger.error(`Failed to save GpsLog: ${err.message}`);
            }

            // 6. Persist Trip Point if active
            if (currentTrip) {
                await this.prisma.locationPoint.create({
                    data: {
                        tripId: currentTrip.id,
                        latitude: lat,
                        longitude: lng,
                        speed: speedKnots,
                        heading,
                        altitude,
                        satellites,
                        timestamp: new Date(log.utc_datetime || new Date()),
                    }
                });
                this.logger.log(`✅ Telemetry: Logged point for trip ${currentTrip.id}`);
            }

            // 6. Map to Platform Live Update format
            this.logger.log(`📡 WebSocket: Emitting live update for vessel ${vessel.id} to admin:fleet`);
            const update: VesselLiveUpdate = {
                vesselId: vessel.id,
                tripId: currentTrip?.id || 'live-telemetry',
                location: { lat, lng },
                speed: speedKnots,
                heading,
                altitude,
                satellites,
                status: isEmergency ? 'EMERGENCY' : (currentTrip ? 'ACTIVE' : 'IDLE'),
                lastSeen: new Date(log.utc_datetime || new Date()),
            };

            // Push to connected Clients (Dashboard/Mobile)
            this.trackingGateway.server.to('admin:fleet').emit(
                TrackingEvents.VESSEL_LIVE_UPDATE,
                update
            );
        } catch (e) {
            this.logger.error(`Failed to bridge GPS update: ${e.message}`);
        }
    }

    onModuleDestroy() {
        if (this.subscriber) {
            this.subscriber.disconnect();
        }
    }
}
