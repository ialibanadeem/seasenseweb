import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TrackingGateway } from './tracking/tracking.gateway';
import { TrackingEvents, VesselLiveUpdate } from './interfaces/tracking.interface';
import Redis from 'ioredis';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class GpsSyncService implements OnModuleInit, OnModuleDestroy {
    private subscriber: Redis;
    private readonly logger = new Logger(GpsSyncService.name);

    constructor(
        private configService: ConfigService,
        private trackingGateway: TrackingGateway,
        private prisma: PrismaService,
    ) { }

    onModuleInit() {
        this.subscriber = new Redis({
            host: this.configService.get<string>('REDIS_HOST') || 'localhost',
            port: this.configService.get<number>('REDIS_PORT') || 6379,
            enableReadyCheck: false, // Required for subscriber mode to prevent INFO command errors
        });

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
            if (err.stack) this.logger.error(err.stack);
        });
    }

    private async handleGpsUpdate(message: string) {
        try {
            const log = JSON.parse(message);
            this.logger.log(`📥 Redis Bridge: Received raw GPS message for processing...`);
            const mmsi = log.mmsi || '987654321'; // Fallback to our test vessel MMSI

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
            const speed = Number(log.speed_kmh || 0);
            const heading = Number(log.heading_deg || 0);

            // 3. Persist Trip Point if active
            if (activeTrip) {
                await this.prisma.locationPoint.create({
                    data: {
                        tripId: activeTrip.id,
                        latitude: lat,
                        longitude: lng,
                        speed,
                        heading,
                        timestamp: new Date(log.utc_datetime || new Date()),
                    }
                });
                this.logger.log(`✅ Telemetry: Logged point for trip ${activeTrip.id}`);
            }

            // 4. Map to Platform Live Update format
            this.logger.log(`📡 WebSocket: Emitting live update for vessel ${vessel.id} to admin:fleet`);
            const update: VesselLiveUpdate = {
                vesselId: vessel.id,
                tripId: activeTrip?.id || 'live-telemetry',
                location: { lat, lng },
                speed,
                heading,
                status: 'ACTIVE',
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
