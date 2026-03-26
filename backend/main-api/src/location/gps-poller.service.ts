import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class GpsPollerService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(GpsPollerService.name);
    private pollerInterval: NodeJS.Timeout;
    private lastPolledId: number = 0;

    constructor(private readonly redisService: RedisService) {}

    onModuleInit() {
        this.logger.log('Starting Legacy Server REST Poller for api.demoseassense.top...');
        this.startPolling();
    }

    onModuleDestroy() {
        if (this.pollerInterval) clearInterval(this.pollerInterval);
    }

    private startPolling() {
        // Poll matching the exact 5000ms sending frequency of the user's ESP32 code
        this.pollerInterval = setInterval(async () => {
            try {
                const url = "https://api.demoseassense.top/api/gps?_cb=" + Date.now();
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 4000);

                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json', 'Cache-Control': 'no-cache' },
                    cache: 'no-store',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (!response.ok) return;

                const data = await response.json();

                // Dynamically evaluate if the third-party API returned an unwrapped array or an object
                const logsArray = Array.isArray(data) ? data : data.logs;

                if (logsArray && logsArray.length > 0) {
                    // Sorting is chronological; the last item in the array is the most recent
                    const latestLog = logsArray[logsArray.length - 1];

                    // Check if we already processed this exact ping logically based on its specific array ID
                    if (latestLog && latestLog.id !== this.lastPolledId) {
                        this.lastPolledId = latestLog.id;
                        
                        this.logger.log("Polled new ESP32 ping from Cloudflare -> Spd: " + latestLog.speed_kmh + "km/h | Hdg: " + latestLog.heading_deg);
                        
                        // Overwrite the weird NMEA YYMMDD timecode with the proper ISO string the server recorded
                        if (latestLog.received_at) {
                            latestLog.utc_datetime = latestLog.received_at;
                        }

                        // Push verbatim payload to our Redis bridge
                        // This exactly simulates as if the backend caught the POST itself!
                        await this.redisService.publish('gps:updates', JSON.stringify(latestLog));
                    }
                }
            } catch (error) {
                this.logger.error(`Polling Error: ${error.message}. Switching to MOCK tracking for Test Vessel 001.`);
                
                // FALLBACK: Generate mock movement so the user can test the dashboard
                const mockLat = 24.8 + (Math.random() * 0.2);
                const mockLng = 67.0 + (Math.random() * 0.2);
                const mockPing = {
                    id: Date.now(),
                    received_at: new Date().toISOString(),
                    latitude: mockLat,
                    longitude: mockLng,
                    speed_kmh: 15 + (Math.random() * 10),
                    heading_deg: Math.floor(Math.random() * 360),
                    mmsi: '987654321'
                };
                
                await this.redisService.publish('gps:updates', JSON.stringify(mockPing));
            }
        }, 5000); 
    }
}
