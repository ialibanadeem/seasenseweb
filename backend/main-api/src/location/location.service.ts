import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../redis/redis.service';
import { LocationUpdatePayload } from '../realtime/interfaces/tracking.interface';

@Injectable()
export class LocationService {
    private readonly logger = new Logger(LocationService.name);

    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    async recordLocation(data: LocationUpdatePayload) {
        // 1. Get current trip to find previous point for distance calculation
        const trip = await this.prisma.trip.findUnique({
            where: { id: data.tripId },
            include: { points: { orderBy: { timestamp: 'desc' }, take: 1 } }
        });

        if (!trip) throw new Error(`Trip ${data.tripId} not found`);

        let distanceIncrement = 0;
        if (trip.points && trip.points.length > 0) {
            const lastPoint = trip.points[0];
            distanceIncrement = this.calculateHaversine(
                lastPoint.latitude, lastPoint.longitude,
                data.latitude, data.longitude
            );
        }

        // 2. Persist to DB
        const point = await this.prisma.locationPoint.create({
            data: {
                tripId: data.tripId,
                latitude: data.latitude,
                longitude: data.longitude,
                speed: data.speed,
                heading: data.heading,
                timestamp: data.timestamp,
            },
        });

        // 3. Update Trip Metrics (Cumulative Distance and Avg Speed)
        const updatedDistance = (trip.distance || 0) + distanceIncrement;
        const totalPoints = await this.prisma.locationPoint.count({ where: { tripId: data.tripId } });
        
        // Simple average speed calculation: (current speed + avg speed * (n-1)) / n
        const currentSpeed = data.speed || 0;
        const updatedAvgSpeed = totalPoints === 1 
            ? currentSpeed 
            : ((trip.avgSpeed || 0) * (totalPoints - 1) + currentSpeed) / totalPoints;

        await this.prisma.trip.update({
            where: { id: data.tripId },
            data: {
                distance: updatedDistance,
                avgSpeed: updatedAvgSpeed
            }
        });

        // 4. Cache latest in Redis
        await this.redis.set(`trip:${data.tripId}:latest`, {
            ...data,
            recordedAt: new Date(),
        });

        return point;
    }

    async getLatestForTrip(tripId: string) {
        return this.redis.get(`trip:${tripId}:latest`);
    }

    private calculateHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 3440.065; // Earth radius in nautical miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}
