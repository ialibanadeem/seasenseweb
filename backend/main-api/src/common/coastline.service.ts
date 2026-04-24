import { Injectable } from '@nestjs/common';

@Injectable()
export class CoastlineService {
    // Karachi Coastline Polyline (Approximate high-precision segments)
    private readonly coastline = [
        { lat: 24.782, lng: 67.330 }, // Port Qasim / Creeks Start
        { lat: 24.795, lng: 67.120 }, // Near Clifton
        { lat: 24.790, lng: 66.970 }, // Manora Point
        { lat: 24.840, lng: 66.910 }, // Sandspit
        { lat: 24.855, lng: 66.780 }, // Hawksbay / Paradise Point
        { lat: 24.850, lng: 66.580 }, // Mubarak Village
        { lat: 25.020, lng: 66.550 }, // Near Gadani
    ];

    /**
     * Calculates the shortest distance from a point to the Karachi coastline polyline.
     * @returns Distance in Nautical Miles (NM)
     */
    getDistanceToCoast(lat: number, lng: number): number {
        let minDistanceInKm = Infinity;

        for (let i = 0; i < this.coastline.length - 1; i++) {
            const d = this.distToSegment(
                { lat, lng },
                this.coastline[i],
                this.coastline[i + 1]
            );
            if (d < minDistanceInKm) minDistanceInKm = d;
        }

        return minDistanceInKm * 0.539957; // Convert KM to NM
    }

    /**
     * Haversine distance between two points in KM
     */
    getDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private distToSegment(p: { lat: number; lng: number }, v: { lat: number; lng: number }, w: { lat: number; lng: number }) {
        const l2 = this.dist2(v, w);
        if (l2 === 0) return this.getDistanceBetween(p.lat, p.lng, v.lat, v.lng);
        let t = ((p.lat - v.lat) * (w.lat - v.lat) + (p.lng - v.lng) * (w.lng - v.lng)) / l2;
        t = Math.max(0, Math.min(1, t));
        return this.getDistanceBetween(
            p.lat,
            p.lng,
            v.lat + t * (w.lat - v.lat),
            v.lng + t * (w.lng - v.lng)
        );
    }

    private dist2(v: { lat: number; lng: number }, w: { lat: number; lng: number }) {
        return Math.pow(v.lat - w.lat, 2) + Math.pow(v.lng - w.lng, 2);
    }

    private toRad(deg: number) {
        return deg * (Math.PI / 180);
    }
}
