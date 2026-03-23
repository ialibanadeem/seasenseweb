export interface Vessel {
    id: string;
    name: string;
    imo: string;
    mmsi: string;
    type: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export interface LocationPoint {
    lat: number;
    lng: number;
}

export interface VesselLiveUpdate {
    vesselId: string;
    mmsi?: string;
    tripId: string;
    location: LocationPoint;
    speed: number;
    speed_kmh?: number;
    heading: number;
    heading_deg?: number;
    status: string;
    lastSeen: string | Date;
    latitude?: number; // Legacy/Fallback
    longitude?: number; // Legacy/Fallback
    timestamp?: string | Date;
    fuelLevel?: number;
    engineStatus?: string;
    coordinates?: [number, number];
}

export enum TrackingEvents {
    LOCATION_UPDATE = 'location_update',
    SOS_TRIGGERED = 'sos_triggered',
    VESSEL_LIVE_UPDATE = 'vessel_live_update',
    SUBSCRIPTION_SUCCESS = 'subscription_success',
}

export interface SosTriggerPayload {
    vesselId: string;
    tripId: string;
    latitude: number;
    longitude: number;
    message?: string;
    timestamp: string;
}
