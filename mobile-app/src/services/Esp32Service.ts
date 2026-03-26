import axios from 'axios';
import { ESP32_URL } from './config';

export interface Esp32Telemetry {
    latitude: number;
    longitude: number;
    altitude: number;
    sog: number;
    cog: number;
    verticalSpeed?: number;
    utcTime: string;
    date: string;
    vesselId: string;
    tripId: string;
    timestamp: string;
}

export class Esp32Service {
    private static interval: NodeJS.Timeout | null = null;

    /**
     * Starts polling the ESP32 ngrok endpoint.
     * @param onData Callback for when new data is received
     */
    static startPolling(
        vesselId: string,
        tripId: string,
        onData: (data: Esp32Telemetry) => void
    ) {
        if (this.interval) return;

        this.interval = setInterval(async () => {
            try {
                // The ngrok-free.app domain requires a custom header to bypass the warning page
                const response = await axios.get(ESP32_URL, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    },
                    timeout: 4000
                });

                const data = response.data;

                // DATA TRANSFORMATION SPACE
                // -------------------------
                // Mapped to the specific hardware fields provided
                const telemetry: Esp32Telemetry = {
                    latitude: data.Latitude ?? data.lat,
                    longitude: data.Longitude ?? data.lng,
                    altitude: data.Altitude ?? 0,
                    sog: data["Speed Over Ground (SOG)"] ?? data.sog ?? 0,
                    cog: data["Course Over Ground (COG)"] ?? data.cog ?? 0,
                    verticalSpeed: data["Vertical Speed"] ?? data.vSpeed,
                    utcTime: data["UTC Time"] ?? data.time,
                    date: data.Date ?? data.date,
                    vesselId,
                    tripId,
                    timestamp: new Date().toISOString()
                };

                onData(telemetry);
            } catch (error: any) {
                console.warn("ESP32 Fetch Error:", error.message);
            }
        }, 5000);
    }

    static stopPolling() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
