import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';
import { AlertSeverity } from '@prisma/client';

@Injectable()
export class AlertsCronService {
    private readonly logger = new Logger(AlertsCronService.name);

    constructor(
        private prisma: PrismaService,
        private gateway: TrackingGateway
    ) {}

    /**
     * Check for offline vessels every 5 minutes
     */
    @Cron(CronExpression.EVERY_5_MINUTES)
    async checkOfflineVessels() {
        const threshold = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
        
        const offlineVessels = await this.prisma.vessel.findMany({
            where: {
                lastSeen: { lt: threshold },
                // Only alert once per offline session
                alerts: {
                    none: {
                        type: 'Signal Status',
                        status: 'ACTIVE',
                        timestamp: { gte: threshold }
                    }
                }
            },
            include: {
                gpsLogs: {
                    orderBy: { utc_datetime: 'desc' },
                    take: 1
                }
            }
        });

        for (const vessel of offlineVessels) {
            const lastLog = vessel.gpsLogs[0];
            const wasMoving = lastLog && (lastLog.speed_kmh || 0) > 1.5; // > 0.8 NM approx
            
            const message = wasMoving 
                ? `Vessel "${vessel.name}" is Offline (> 10m). Status: Signal Lost (Prev Speed: ${lastLog.speed_kmh?.toFixed(1)} km/h)`
                : `Vessel "${vessel.name}" is Offline (> 10m). Status: Resting / Connection Idle`;

            await this.createAlert(vessel.id, 'Signal Status', 'HIGH', message);
        }
    }

    /**
     * Check for prolonged inactivity (15m, < 0.8kn)
     */
    @Cron(CronExpression.EVERY_5_MINUTES)
    async checkInactivity() {
        // Find boats whose last few points show no movement for 15 mins
        // Note: For high precision, we'd check displacement, 
        // but checking the last reported speed and lastSeen is a good start.
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

        const vessels = await this.prisma.vessel.findMany({
            where: {
                lastSeen: { gte: fifteenMinsAgo }, // Must be online to be "inactive" (otherwise it's offline)
            },
            include: {
                gpsLogs: {
                    where: { utc_datetime: { gte: fifteenMinsAgo } },
                    orderBy: { utc_datetime: 'desc' }
                }
            }
        });

        for (const vessel of vessels) {
            if (vessel.gpsLogs.length === 0) continue;

            const allSlow = vessel.gpsLogs.every(log => (log.speed_kmh || 0) < 1.5); // < 0.8 knots
            
            if (allSlow && vessel.gpsLogs.length > 5) { // Ensure we have enough data points over the 15m
                const alreadyAlerted = await this.prisma.alert.findFirst({
                    where: {
                        vesselId: vessel.id,
                        type: 'Prolonged Inactivity',
                        status: 'ACTIVE',
                        timestamp: { gte: fifteenMinsAgo }
                    }
                });

                if (!alreadyAlerted) {
                    await this.createAlert(vessel.id, 'Prolonged Inactivity', 'MEDIUM', 
                        `Vessel "${vessel.name}" has been stationary for over 15 minutes. Possible issue at sea.`);
                }
            }
        }
    }

    private async createAlert(vesselId: string, type: string, severity: AlertSeverity, message: string) {
        const alert = await this.prisma.alert.create({
            data: {
                vesselId,
                type,
                severity,
                message,
                status: 'ACTIVE'
            },
            include: { vessel: true }
        });

        this.gateway.server?.to('admin:fleet').emit('ALERT_CREATED', {
            id: alert.id.substring(0, 8).toUpperCase(),
            type: alert.type,
            vessel: alert.vessel.name,
            severity: alert.severity,
            message: alert.message,
            timestamp: alert.timestamp.toISOString()
        });

        this.logger.log(`[Cron Alert] ${type} for ${vesselId}: ${message}`);
    }
}
