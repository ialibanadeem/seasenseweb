import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Trip, Prisma } from '@prisma/client';

import { TripFilterDto } from './dto/trip-filter.dto';

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

    async findAll(query?: TripFilterDto) {
        const where: Prisma.TripWhereInput = {
            deletedAt: null,
        };

        if (query) {
            const { startDate, endDate, month, year, vesselId } = query;

            if (vesselId) {
                where.vesselId = vesselId;
            }

            if (startDate || endDate) {
                where.startTime = {
                    ...(startDate && { gte: new Date(startDate) }),
                    ...(endDate && { lte: (() => {
                        const d = new Date(endDate);
                        d.setUTCHours(23, 59, 59, 999);
                        return d;
                    })() }),
                };
            } else if (month) {
                const filterYear = year || new Date().getFullYear();
                where.startTime = {
                    gte: new Date(Date.UTC(filterYear, month - 1, 1, 0, 0, 0, 0)),
                    lte: new Date(Date.UTC(filterYear, month, 0, 23, 59, 59, 999)),
                };
            } else if (year) {
                where.startTime = {
                    gte: new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0)),
                    lte: new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)),
                };
            }
        }

        const trips = await this.prisma.trip.findMany({
            where,
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
