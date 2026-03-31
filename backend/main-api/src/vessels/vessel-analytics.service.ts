import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class VesselAnalyticsService {
    constructor(private prisma: PrismaService) {}

    async getAnalytics(vesselId: string) {
        // 1. Get real data for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const trips = await this.prisma.trip.findMany({
            where: {
                vesselId,
                startTime: { gte: sevenDaysAgo },
                status: 'COMPLETED'
            },
            select: {
                startTime: true,
                distance: true,
                endTime: true,
            }
        });

        // 2. Aggregate distance by day
        const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const distanceData = dayMap.map(day => ({ name: day, distance: 0 }));
        const durationData = dayMap.map(day => ({ name: day, duration: 0 }));

        trips.forEach(trip => {
            if (trip.startTime) {
                const dayIndex = trip.startTime.getDay();
                distanceData[dayIndex].distance += Number(trip.distance || 0);
                
                if (trip.endTime) {
                    const durationHrs = (trip.endTime.getTime() - trip.startTime.getTime()) / (1000 * 60 * 60);
                    durationData[dayIndex].duration += Number(durationHrs.toFixed(1));
                }
            }
        });

        // 3. Status Distribution
        const movingCount = await this.prisma.trip.count({ where: { vesselId, status: 'ACTIVE' } });
        const idleCount = await this.prisma.trip.count({ where: { vesselId, status: 'PLANNED' } });

        return {
            distanceOverTime: distanceData,
            durationOverTime: durationData,
            idleVsMoving: [
                { name: 'Moving', value: movingCount || 10 }, // Fallback to avoid empty charts for demo if no data yet
                { name: 'Idle', value: idleCount || 90 }
            ],
            efficiency: {
                avgDistancePerTrip: trips.length > 0 ? (trips.reduce((acc, t) => acc + (t.distance || 0), 0) / trips.length).toFixed(1) : 0,
                totalTimeAtSea: durationData.reduce((acc, d) => acc + d.duration, 0).toFixed(1) + 'h',
                idleTimeStr: 'N/A'
            }
        };
    }

    async getTrips(vesselId: string) {
        return this.prisma.trip.findMany({
            where: { vesselId },
            orderBy: { startTime: 'desc' },
            take: 15
        });
    }

    async getHeatmap(vesselId: string) {
        const points = await this.prisma.locationPoint.findMany({
            where: { 
                trip: { vesselId } 
            },
            select: { latitude: true, longitude: true },
            take: 500
        });

        return points.map(p => [p.latitude, p.longitude, 0.5]);
    }

    async getAlerts(vesselId: string) {
        return this.prisma.alert.findMany({
            where: { vesselId },
            orderBy: { timestamp: 'desc' },
            take: 10
        });
    }

    async getTimeline(vesselId: string) {
        return this.prisma.activityTimeline.findMany({
            where: { vesselId },
            orderBy: { timestamp: 'desc' },
            take: 15
        });
    }

    async getFleetOverview() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // 1. Fleet Stats - Aggregating all vessels and trips
        const tripCount = await this.prisma.trip.count({
            where: { startTime: { gte: sevenDaysAgo } }
        });

        const completedTrips = await this.prisma.trip.findMany({
            where: { startTime: { gte: sevenDaysAgo }, status: 'COMPLETED' },
            select: { distance: true, startTime: true, endTime: true, vesselId: true, vessel: { select: { name: true } } }
        });

        const totalDistance = completedTrips.reduce((acc, t) => acc + (t.distance || 0), 0);
        
        // 2. Active Count
        const totalVessels = await this.prisma.vessel.count({ where: { deletedAt: null } });
        const activeVessels = await this.prisma.trip.count({ where: { status: 'ACTIVE' } });

        // 3. Daily Aggregates (Fleet wide)
        const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const speedData = dayMap.map(day => ({ day, avgSpeed: 0, maxSpeed: 0 }));
        const movementData = dayMap.map(day => ({ day, trips: 0, alerts: 0 }));

        completedTrips.forEach(trip => {
            if (!trip.startTime) return;
            const dayIndex = trip.startTime.getDay();
            movementData[dayIndex].trips += 1;
            // For now, simulate avg speed from distance/duration roughly if not stored per point
            if (trip.endTime && trip.startTime) {
                const hrs = (trip.endTime.getTime() - trip.startTime.getTime()) / (1000 * 60 * 60);
                const avg = hrs > 0 ? (trip.distance || 0) / hrs : 0;
                speedData[dayIndex].avgSpeed = Number(((speedData[dayIndex].avgSpeed + avg) / 2).toFixed(1));
            }
        });

        // 4. Top Vessel Performance
        const vesselMap = new Map<string, { vessel: string, distance: number }>();
        completedTrips.forEach(t => {
            const current = vesselMap.get(t.vesselId) || { vessel: t.vessel.name, distance: 0 };
            current.distance += (t.distance || 0);
            vesselMap.set(t.vesselId, current);
        });

        const performanceData = Array.from(vesselMap.values())
            .sort((a, b) => b.distance - a.distance)
            .slice(0, 5);

        return {
            kpis: {
                avgSpeed: 14.2, // Placeholder for real average speed calculation
                activePercent: totalVessels > 0 ? Math.round((activeVessels / totalVessels) * 100) : 0,
                totalDistance: totalDistance.toFixed(0),
                totalTrips: tripCount
            },
            speedAnalytics: speedData,
            utilization: [
                { name: 'Active', value: activeVessels, color: '#10b981' },
                { name: 'Idle', value: totalVessels - activeVessels, color: '#64748b' }
            ],
            movementStats: movementData,
            performance: performanceData.length > 0 ? performanceData : [{ vessel: 'No Data', distance: 0 }]
        };
    }
}
