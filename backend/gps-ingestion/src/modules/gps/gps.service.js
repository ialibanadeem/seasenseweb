const prisma = require('../../config/database');
const redis = require('../../config/redis');

class GpsService {
    /**
     * Store incoming GPS log
     */
    async storeGpsLog(data) {
        // Default MMSI if missing (common in hardware trackers)
        const mmsi = data.mmsi || 'ESP32-HARDWARE';

        // Parse ESP32 Date Format: YYMMDD.HHMMSS -> JS Date
        let utcDate;
        if (data.utc_datetime && typeof data.utc_datetime === 'string' && data.utc_datetime.includes('.')) {
            try {
                const [datePart, timePart] = data.utc_datetime.split('.');
                const year = 2000 + parseInt(datePart.substring(0, 2));
                const month = parseInt(datePart.substring(2, 4)) - 1;
                const day = parseInt(datePart.substring(4, 6));
                const hours = parseInt(timePart.substring(0, 2));
                const minutes = parseInt(timePart.substring(2, 4));
                const seconds = parseInt(timePart.substring(4, 6));
                utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
            } catch (e) {
                console.warn('Failed to parse ESP32 date, falling back to system time');
                utcDate = new Date();
            }
        } else {
            utcDate = data.utc_datetime ? new Date(data.utc_datetime) : new Date();
        }

        // 1. Persist to PostgreSQL
        const log = await prisma.gpsLog.create({
            data: {
                mmsi: mmsi,
                utc_datetime: utcDate,
                latitude: Number(data.latitude || data.lat),
                longitude: Number(data.longitude || data.lng),
                altitude_m: Number(data.altitude_m || data.altitude || 0),
                speed_kmh: Number(data.speed_kmh || data.sog || 0),
                heading_deg: Number(data.heading_deg || data.cog || 0),
                satellites: Number(data.satellites || 0),
                hdop: Number(data.hdop || 0),
                fix_status: Number(data.fix_status || 0),
                prns: Array.isArray(data.prns) ? data.prns : [],
                snrs: Array.isArray(data.snrs) ? data.snrs : []
            }
        });

        // 2. Cache latest position in Redis (Last known state)
        const cacheKey = `vessel:${mmsi}:latest`;
        await redis.set(cacheKey, JSON.stringify(log), 'EX', 86400); // Cache for 24h

        // 3. Broadcast update to Platform (Pub/Sub Bridge)
        await redis.publish('gps:updates', JSON.stringify(log));

        return log;
    }

    /**
     * Get latest cached position
     */
    async getLatestPosition(mmsi) {
        const cache = await redis.get(`vessel:${mmsi}:latest`);
        if (cache) return JSON.parse(cache);

        return prisma.gpsLog.findFirst({
            where: { mmsi },
            orderBy: { utc_datetime: 'desc' }
        });
    }

    /**
     * Get historical logs
     */
    async getHistory(mmsi, limit = 50) {
        return prisma.gpsLog.findMany({
            where: { mmsi },
            orderBy: { utc_datetime: 'desc' },
            take: Number(limit)
        });
    }

    /**
     * Stats
     */
    async getStats() {
        const count = await prisma.gpsLog.count();
        const vessels = await prisma.gpsLog.groupBy({
            by: ['mmsi'],
            _count: true
        });

        return {
            total_logs: count,
            active_vessels: vessels.length,
            vessel_breakdown: vessels
        };
    }

    /**
     * Cleanup
     */
    async clearAllLogs() {
        return prisma.gpsLog.deleteMany({});
    }
}

module.exports = new GpsService();
