import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';
import { CoastlineService } from '../common/coastline.service';
import { AlertSeverity } from '@prisma/client';

@Injectable()
export class AlertsDetectorService {
    private readonly logger = new Logger(AlertsDetectorService.name);
    
    // In-memory state for deviation detection
    private vesselState: Map<string, { lastHeading: number, lastTime: number }> = new Map();

    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => TrackingGateway))
        private gateway: TrackingGateway,
        private coastlineService: CoastlineService
    ) {}

    /**
     * Core processing for every location update (REAL-TIME)
     */
    async processLocationUpdate(vesselId: string, payload: { lat: number, lon: number, speed: number, heading?: number, tripId?: string }) {
        const timestamp = Date.now();
        const { lat, lon, speed, heading, tripId } = payload;

        // 1. Update Vessel State in DB
        const distanceToCoast = this.coastlineService.getDistanceToCoast(lat, lon);
        const region = this.getRegionLabel(distanceToCoast);

        const vessel = await this.prisma.vessel.update({
            where: { id: vesselId },
            data: {
                lastSeen: new Date(timestamp),
                lastLatLng: { lat, lon },
                lastRegion: region
            }
        });

        // 2. Check Boundary Transition
        if (vessel.lastRegion && vessel.lastRegion !== region) {
            await this.createAlert(vesselId, 'Boundary Transition', 'INFO', 
                `Vessel "${vessel.name}" entered ${region} (${distanceToCoast.toFixed(1)} NM from coast)`, tripId);
        }

        // 3. Check for Sudden Deviation
        if (heading !== undefined) {
            const prevState = this.vesselState.get(vesselId);
            if (prevState) {
                const timeDiff = (timestamp - prevState.lastTime) / 1000; // seconds
                if (timeDiff <= 30) {
                    const headingDiff = Math.abs(heading - prevState.lastHeading);
                    const normalizedDiff = headingDiff > 180 ? 360 - headingDiff : headingDiff;
                    
                    if (normalizedDiff >= 45 && speed > 3) { // Only check deviation if moving significantly
                        await this.createAlert(vesselId, 'Route Deviation', 'MEDIUM', 
                            `Vessel "${vessel.name}": Sudden heading change of ${normalizedDiff.toFixed(1)}° detected`, tripId);
                    }
                }
            }
            this.vesselState.set(vesselId, { lastHeading: heading, lastTime: timestamp });
        }

        // 4. Check Distance from Trip Origin
        if (tripId) {
            const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
            if (trip && trip.startLatLng) {
                const start = trip.startLatLng as { lat: number, lon: number };
                const distFromStart = this.coastlineService.getDistanceBetween(lat, lon, start.lat, start.lon) * 0.539957; // to NM

                // Optional: Update trip distance (logic already exists in some systems, but good to have)
                // We'll leave the trip update to the dedicated trip service to avoid bloat
            } else if (trip && !trip.startLatLng) {
                // First point of the trip - Set Origin
                await this.prisma.trip.update({
                    where: { id: tripId },
                    data: { startLatLng: { lat, lon } }
                });
            }
        }
    }

    private getRegionLabel(distanceNM: number): string {
        if (distanceNM <= 2.7) return 'Internal Waters'; // ~5km
        if (distanceNM <= 12) return 'Territorial Sea';
        if (distanceNM <= 200) return 'Exclusive Economic Zone (EEZ)';
        return 'High Seas';
    }

    private async createAlert(vesselId: string, type: string, severity: AlertSeverity, message: string, tripId?: string) {
        const alert = await this.prisma.alert.create({
            data: {
                vesselId,
                tripId,
                type,
                severity,
                message,
                status: 'ACTIVE'
            },
            include: { vessel: true }
        });

        // Broadcast to UI
        this.gateway.server?.to('admin:fleet').emit('ALERT_CREATED', {
            id: alert.id.substring(0, 8).toUpperCase(),
            type: alert.type,
            vessel: alert.vessel.name,
            severity: alert.severity,
            message: alert.message,
            timestamp: alert.timestamp.toISOString()
        });

        this.logger.log(`[Alert] ${type} for ${vesselId}: ${message}`);
    }
}
