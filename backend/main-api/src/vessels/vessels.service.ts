import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Vessel } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';

@Injectable()
export class VesselsService {
    constructor(
        private prisma: PrismaService,
        private gateway: TrackingGateway
    ) { }

    async create(data: Prisma.VesselCreateInput): Promise<Vessel> {
        const vessel = await this.prisma.vessel.create({ data });
        
        // Notification for new boat
        const alert = await this.prisma.alert.create({
            data: {
                vesselId: vessel.id,
                type: 'Fleet Update',
                severity: 'INFO',
                message: `New vessel "${vessel.name}" has been added to the fleet and is awaiting activation.`,
                status: 'ACTIVE'
            }
        });

        // Broadcast to UI
        if (this.gateway?.server) {
            this.gateway.server.to('admin:fleet').emit('ALERT_CREATED', {
                id: alert.id.substring(0, 8).toUpperCase(),
                type: alert.type,
                vessel: vessel.name,
                severity: alert.severity,
                message: alert.message,
                timestamp: alert.timestamp.toISOString()
            });
        }

        return vessel;
    }

    async findAll(): Promise<Vessel[]> {
        return this.prisma.vessel.findMany({
            where: { deletedAt: null },
        });
    }

    async findOne(id: string): Promise<Vessel> {
        const vessel = await this.prisma.vessel.findUnique({
            where: { id },
            include: { trips: { where: { status: 'ACTIVE' } } }
        });
        if (!vessel) throw new NotFoundException(`Vessel with ID ${id} not found`);
        return vessel;
    }

    async update(id: string, data: Prisma.VesselUpdateInput): Promise<Vessel> {
        return this.prisma.vessel.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Vessel> {
        return this.prisma.vessel.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
