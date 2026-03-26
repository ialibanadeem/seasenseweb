import { Controller, Post, Body, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Controller('api/gps')
export class GpsController {
    private readonly logger = new Logger(GpsController.name);

    constructor(private readonly redisService: RedisService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async receiveHardwareTelemetry(@Body() payload: any) {
        this.logger.log(`🛰️ Hardware Telemetry Ingested [Sats: ${payload.satellites} | Spd: ${payload.speed_kmh}km/h | Fix: ${payload.fix_status}]`);
        
        // Pass the raw JSON struct into the Redis PubSub bridge. 
        // The existing \`GpsSyncService\` daemon will structurally parse this 
        // and instantly broadcast \`TrackingEvents.VESSEL_LIVE_UPDATE\` to the frontend dashboard map.
        await this.redisService.publish('gps:updates', JSON.stringify(payload));
        
        return { success: true, receivedAt: new Date().toISOString(), status: 'BRIDGED' };
    }
}
