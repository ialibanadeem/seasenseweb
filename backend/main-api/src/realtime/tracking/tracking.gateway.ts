import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { TrackingEvents, LocationUpdatePayload, SosTriggerPayload } from '../interfaces/tracking.interface';
import { JwtService } from '@nestjs/jwt';
import { AlertsDetectorService } from '../../alerts/alerts-detector.service';
import { forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@WebSocketGateway({
  namespace: 'tracking',
  cors: { origin: '*' },
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(TrackingGateway.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    @Inject(forwardRef(() => AlertsDetectorService))
    private alertsDetector: AlertsDetectorService,
  ) { }

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Client connecting: ${client.id}`);

      // Auto-assign guest fisherman role
      client.data.user = {
        id: 'guest-fisherman',
        email: 'fisherman@seasense.com',
        role: 'FISHERMAN'
      };

      // Join all clients to admin:fleet for visibility
      client.join('admin:fleet');
      this.logger.log(`Client ${client.id} joined as Guest Fisherman`);
    } catch (e) {
      this.logger.error(`Connection error for client ${client.id}: ${e.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(TrackingEvents.LOCATION_UPDATE)
  async handleLocationUpdate(
    @MessageBody() data: LocationUpdatePayload,
    @ConnectedSocket() client: Socket,
  ) {
    const vesselId = client.data.user?.vesselId || data.vesselId || 'default-vessel';
    this.logger.log(`Received location update for vessel: ${vesselId} (Trip: ${data.tripId})`);

    // Real-time Detection Logic
    await this.alertsDetector.processLocationUpdate(vesselId, {
      lat: data.latitude,
      lon: data.longitude,
      speed: data.speed,
      heading: data.heading,
      tripId: data.tripId
    });

    // Broadcast to dashboard
    this.server.to('admin:fleet').emit(TrackingEvents.VESSEL_LIVE_UPDATE, {
      ...data,
      vesselId,
    });

    return { status: 'ok' };
  }

  @SubscribeMessage(TrackingEvents.SOS_TRIGGERED)
  async handleSos(@MessageBody() data: SosTriggerPayload) {
    this.logger.warn(`SOS Triggered for vessel ${data.vesselId}`);

    // Persist SOS as Critical Alert
    const vessel = await this.prisma.vessel.findUnique({ where: { id: data.vesselId } });
    if (vessel) {
        await this.prisma.alert.create({
            data: {
                vesselId: data.vesselId,
                type: 'SOS / Distress Signal',
                severity: 'CRITICAL',
                message: `URGENT: SOS Signal received from ${vessel.name}. Immediate assistance required.`,
                status: 'ACTIVE'
            }
        });
    }

    this.server.to('admin:fleet').emit(TrackingEvents.SOS_TRIGGERED, data);
  }
}
