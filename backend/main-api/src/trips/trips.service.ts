import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripsService {
    constructor(private prisma: PrismaService) { }

    async startTrip(vesselId: string, startTime: Date): Promise<Trip> {
        const activeTrip = await this.prisma.trip.findFirst({
            where: { vesselId, status: 'ACTIVE' },
        });

        if (activeTrip) {
            throw new BadRequestException('Vessel already has an active trip');
        }

        return this.prisma.trip.create({
            data: {
                vesselId,
                status: 'ACTIVE',
                startTime,
            },
        });
    }

    async endTrip(tripId: string, endTime: Date): Promise<Trip> {
        const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip) throw new NotFoundException('Trip not found');

        return this.prisma.trip.update({
            where: { id: tripId },
            data: {
                status: 'COMPLETED',
                endTime,
            },
        });
    }

    async getTripHistory(vesselId: string) {
        return this.prisma.trip.findMany({
            where: { vesselId },
            include: { points: { orderBy: { timestamp: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAll() {
        const trips = await this.prisma.trip.findMany({
            include: { vessel: true },
            orderBy: { createdAt: 'desc' },
        });

        return Promise.all(trips.map(async (trip) => {
            const [firstPoint, lastPoint] = await Promise.all([
                this.prisma.locationPoint.findFirst({
                    where: { tripId: trip.id },
                    orderBy: { timestamp: 'asc' },
                }),
                this.prisma.locationPoint.findFirst({
                    where: { tripId: trip.id },
                    orderBy: { timestamp: 'desc' },
                }),
            ]);
            
            return {
                ...(trip as any), // Use as any to avoid type issues and ensure all Prisma fields are included
                startPoint: firstPoint || null,
                endPoint: lastPoint || null
            };
        }));
    }

    async findOne(id: string) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
            include: {
                vessel: true,
                points: { orderBy: { timestamp: 'asc' } },
            },
        });
        if (!trip) throw new NotFoundException('Trip not found');
        return trip;
    }
}
