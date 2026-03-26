import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import axios from 'axios';

@Injectable()
export class HardwarePollerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HardwarePollerService.name);
  private pollerInterval: NodeJS.Timeout;
  private readonly HARDWARE_API = 'https://api.demoseassense.top/api/gps';

  constructor(private readonly redisService: RedisService) {}

  onModuleInit() {
    this.logger.log('🛰️ Hardware Poller Service: Initialized');
    // Start polling immediately, then every 5 seconds
    this.poll();
    this.pollerInterval = setInterval(() => this.poll(), 5000);
  }

  private async poll() {
    try {
      const response = await axios.get(`${this.HARDWARE_API}?_cb=${Date.now()}`, {
        timeout: 4000,
      });

      const data = response.data;
      const logsArray = Array.isArray(data) ? data : data.logs;

      if (logsArray && logsArray.length > 0) {
        // We only care about the absolute latest point for live tracking
        const latestPoint = logsArray[logsArray.length - 1];
        
        // Log to console for debugging
        this.logger.debug(`Ingested Latest Hardware Point: [Lat: ${latestPoint.latitude}, Lng: ${latestPoint.longitude}]`);
        
        // Push into the Redis bridge
        // The GpsSyncService daemon will pick this up and broadcast to the dashboard
        await this.redisService.publish('gps:updates', JSON.stringify(latestPoint));
      }
    } catch (error) {
      this.logger.error(`Hardware Polling Error: ${error.message}`);
    }
  }

  onModuleDestroy() {
    if (this.pollerInterval) {
      clearInterval(this.pollerInterval);
    }
  }
}
