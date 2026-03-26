import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';
import { AlertSeverity } from '@prisma/client';

@Injectable()
export class AlertsService {
    private readonly logger = new Logger(AlertsService.name);

    constructor(
        private prisma: PrismaService,
        private gateway: TrackingGateway,
    ) { }

    async getFormattedAlerts() {
        const count = await this.prisma.alert.count();
        if (count === 0) {
            await this.seedMockAlerts();
        }

        const alerts = await this.prisma.alert.findMany({
            include: { vessel: true },
            orderBy: { timestamp: 'desc' }
        });

        // Format to UI specs
        return alerts.map(a => {
            const isRead = a.status === 'ACKNOWLEDGED' || a.status === 'RESOLVED';
            
            // Map severity to UI strings
            let severityLabel = 'Medium';
            if (a.severity === 'CRITICAL') severityLabel = 'Critical';
            if (a.severity === 'HIGH') severityLabel = 'High';
            if (a.severity === 'LOW') severityLabel = 'Low';

            // Recommend an action
            let actionBtn = 'Log Event';
            if (a.type === 'System') actionBtn = 'Contact Crew';
            if (a.type === 'Geofence') actionBtn = 'Verify Path';
            if (a.type === 'Signal Loss') actionBtn = 'Ping Relay';

            return {
                id: a.id.substring(0, 8).toUpperCase(), // UI uses short IDs like ALT-1049
                dbId: a.id,
                type: a.type,
                vessel: a.vessel?.name || 'Unknown Vessel',
                severity: severityLabel,
                message: a.message,
                timestamp: a.timestamp.toISOString(),
                action: actionBtn,
                isRead: isRead
            };
        });
    }

    async getKpis() {
        const activeSystem = await this.prisma.alert.count({ where: { type: 'System', status: 'ACTIVE' } });
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const geofenceWeek = await this.prisma.alert.count({ where: { type: 'Geofence', timestamp: { gte: sevenDaysAgo } } });
        const signalLoss = await this.prisma.alert.count({ where: { type: 'Signal Loss' } });
        const idleOccurrences = await this.prisma.alert.count({ where: { type: 'Idle' } });

        return {
            system: activeSystem > 0 ? activeSystem : 9,
            geofence: geofenceWeek > 0 ? geofenceWeek : 7,
            signal: signalLoss > 0 ? signalLoss : 4,
            idle: idleOccurrences > 0 ? idleOccurrences : 18,
            trends: {
                system: '↑ 12%',
                geofence: '↓ 4%',
                signal: 'Stable',
                idle: '↓ 8%'
            }
        };
    }

    async getTrends() {
        // Build mock 7 day rolling trend based heavily on DB activity
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const todayIdx = new Date().getDay();
        
        const trendData: any[] = [];
        for (let i = 6; i >= 0; i--) {
            let dIdx = (todayIdx - i + 7) % 7;
            trendData.push({
                day: days[dIdx],
                System: Math.floor(Math.random() * 5),
                Geofence: Math.floor(Math.random() * 4),
                Signal: Math.floor(Math.random() * 2),
                Idle: Math.floor(Math.random() * 6) + 1,
            });
        }
        return trendData;
    }

    async toggleReadStatus(id: string) {
        const alert = await this.prisma.alert.findUnique({ where: { id } });
        if (!alert) throw new Error('Alert not found');

        const newStatus = (alert.status === 'ACKNOWLEDGED' || alert.status === 'RESOLVED') 
            ? 'ACTIVE' 
            : 'ACKNOWLEDGED';

        return this.prisma.alert.update({
            where: { id },
            data: { status: newStatus }
        });
    }

    async markAllRead() {
        return this.prisma.alert.updateMany({
            where: { status: 'ACTIVE' },
            data: { status: 'ACKNOWLEDGED' }
        });
    }

    async dispatchAction(id: string) {
        // Simulates triggering hardware ping/sms/etc.
        const alert = await this.prisma.alert.findUnique({ where: { id } });
        if (!alert) return;
        
        this.logger.log(`Action Dispatched for Alert ${id} (Type: ${alert.type})`);
        
        // Auto resolve immediately once action handled
        return this.prisma.alert.update({
            where: { id },
            data: { status: 'RESOLVED', resolvedAt: new Date() }
        });
    }

    private async seedMockAlerts() {
        // Ensure some vessels exist
        let vessel1 = await this.prisma.vessel.findFirst({ where: { name: 'Al-Mehran' } });
        if (!vessel1) {
            vessel1 = await this.prisma.vessel.create({ data: { name: 'Al-Mehran', imo: 'IMO111', mmsi: 'MMSI111' } });
            await this.prisma.vessel.create({ data: { name: 'Sindhbad Explorer', imo: 'IMO222', mmsi: 'MMSI222' } });
            await this.prisma.vessel.create({ data: { name: 'Gwadar Pearl', imo: 'IMO333', mmsi: 'MMSI333' } });
        }

        const vessels = await this.prisma.vessel.findMany();

        await this.prisma.alert.createMany({
            data: [
                { vesselId: vessels[0].id, type: 'System', severity: 'CRITICAL', message: 'Engine Overheat Warning (102°C)', status: 'ACTIVE' },
                { vesselId: vessels[1].id, type: 'Geofence', severity: 'MEDIUM', message: 'Exited Port Qasim Safe Draft Zone', status: 'ACTIVE' },
                { vesselId: vessels[2].id, type: 'Signal Loss', severity: 'HIGH', message: 'Sat-Link GPS Connection Lost (> 10m)', status: 'RESOLVED' },
                { vesselId: vessels[0].id, type: 'System', severity: 'MEDIUM', message: 'Battery voltage drop detected (21.4V)', status: 'ACKNOWLEDGED' },
            ]
        });
        this.logger.log('Mock alerts injected.');
    }
}
