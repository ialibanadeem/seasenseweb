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

            // Recommend an action based on NEW types
            let actionBtn = 'Log Event';
            if (a.type.includes('SOS')) actionBtn = 'Dispatch Rescue';
            if (a.type === 'Signal Status' && a.message.includes('Signal Lost')) actionBtn = 'Emergency Contact';
            if (a.type === 'Route Deviation') actionBtn = 'Verify Path';
            if (a.type === 'Boundary Transition') actionBtn = 'Check Permit';
            if (a.type === 'Prolonged Inactivity') actionBtn = 'Ping Vessel';
            if (a.type === 'Fleet Update') actionBtn = 'View Vessel';

            return {
                id: a.id.substring(0, 8).toUpperCase(),
                dbId: a.id,
                type: a.type,
                vessel: a.vessel?.name || 'System',
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
            system: activeSystem,
            geofence: geofenceWeek,
            signal: signalLoss,
            idle: idleOccurrences,
            trends: {
                system: 'Calculated',
                geofence: 'Calculated',
                signal: 'Calculated',
                idle: 'Calculated'
            }
        };
    }

    async getTrends() {
        // Build actual trend data based on real alerts in the last 7 days
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const todayIdx = new Date().getDay();
        
        const trendData: any[] = [];
        for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const counts = await Promise.all([
                this.prisma.alert.count({ where: { type: 'Boundary Transition', timestamp: { gte: date, lt: nextDate } } }),
                this.prisma.alert.count({ where: { type: 'Signal Status', timestamp: { gte: date, lt: nextDate } } }),
                this.prisma.alert.count({ where: { type: 'Route Deviation', timestamp: { gte: date, lt: nextDate } } }),
                this.prisma.alert.count({ where: { type: 'Prolonged Inactivity', timestamp: { gte: date, lt: nextDate } } }),
            ]);

            trendData.push({
                day: days[date.getDay()],
                Boundary: counts[0],
                Signal: counts[1],
                Deviation: counts[2],
                Inactivity: counts[3],
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
}
