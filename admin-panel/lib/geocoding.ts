
const CACHE_KEY = 'geocoding_cache';

interface GeocodeCache {
    [key: string]: string;
}

const getCache = (): GeocodeCache => {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(CACHE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const setCache = (cache: GeocodeCache) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        console.warn("Failed to update geocoding cache", e);
    }
};

let isProcessing = false;
const queue: (() => Promise<void>)[] = [];

const processQueue = async () => {
    if (isProcessing || queue.length === 0) return;
    isProcessing = true;
    while (queue.length > 0) {
        const task = queue.shift();
        if (task) {
            await task();
            // OSM Nominatim permits 1 request per second
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    isProcessing = false;
};

export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
    const cache = getCache();

    if (cache[key]) return cache[key];

    return new Promise((resolve) => {
        queue.push(async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, {
                    headers: {
                        'Accept-Language': 'en',
                        'User-Agent': 'SeaSenseDashboard/1.0'
                    }
                });
                const data = await response.json();
                const name = data.display_name?.split(',').slice(0, 3).join(',') || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
                
                const updatedCache = getCache();
                updatedCache[key] = name;
                setCache(updatedCache);
                resolve(name);
            } catch (err) {
                console.error("Geocoding failed:", err);
                resolve(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
            }
        });
        processQueue();
    });
};

export const calculateDistance = (points: { latitude: number, longitude: number }[]): number => {
    if (points.length < 2) return 0;
    
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
        total += getHaversineDistance(
            points[i].latitude, points[i].longitude,
            points[i+1].latitude, points[i+1].longitude
        );
    }
    return total;
};

const getHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3440.065; // Earth radius in nautical miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

export const formatDuration = (start: string | Date, end: string | Date | null): string => {
    if (!start) return '-- h -- m';
    const startTime = new Date(start).getTime();
    const endTime = end ? new Date(end).getTime() : Date.now();
    
    const diffMs = endTime - startTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
};
