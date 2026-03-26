import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useVesselStore } from '../../store/useVesselStore';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '1ewpYZtt28SC1GBtFVuV';

export default function DashboardMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const markersRef = useRef<{ [id: string]: maptilersdk.Marker }>({});

    // Read live positions from the store
    const livePositions = useVesselStore((state) => state.livePositions);
    const liveTrails = useVesselStore((state) => state.liveTrails);

    useEffect(() => {
        if (map.current || !mapContainer.current) return; // Initialize map only once

        maptilersdk.config.apiKey = MAPTILER_KEY;

        map.current = new maptilersdk.Map({
            container: mapContainer.current as HTMLDivElement,
            // Using the ultra-clean Data Visualization Dark style to reduce visual clutter and enhance the neon UI
            style: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`,
            center: [66.9806, 24.8143], // Centered exactly at Kemari, Karachi for the 3D boat demo
            zoom: 11,
            navigationControl: false,
            geolocateControl: false
        });

        map.current.on('load', () => {
            if (map.current) {
                map.current.addSource('vessel-trails', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: [] }
                });

                map.current.addLayer({
                    id: 'vessel-trails-line',
                    type: 'line',
                    source: 'vessel-trails',
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: {
                        'line-color': '#06b6d4', // Vivid neon cyan
                        'line-width': 8,         // Heavy prominent path stroke
                        'line-opacity': 0.9,
                    }
                });
            }
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Effect to structurally update GeoJSON historical path wake trails on map
    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return;
        const source = map.current.getSource('vessel-trails') as maptilersdk.GeoJSONSource;
        if (!source) return;

        const features = Object.entries(liveTrails).map(([vesselId, trail]) => ({
            type: 'Feature' as const,
            properties: { vesselId },
            geometry: {
                type: 'LineString' as const,
                coordinates: trail.map(p => [
                    p.location?.lng ?? p.longitude ?? 0,
                    p.location?.lat ?? p.latitude ?? 0
                ])
            }
        }));

        source.setData({ type: 'FeatureCollection', features });
    }, [liveTrails]);

    // Effect to update makers when livePositions change
    useEffect(() => {
        if (!map.current) return;

        Object.values(livePositions).forEach((vesselData) => {
            const { vesselId, location, status } = vesselData;
            
            const lat = location?.lat ?? vesselData.latitude;
            const lng = location?.lng ?? vesselData.longitude;
            
            if (lat === undefined || lng === undefined) return;
            
            let color = '#27272a'; // Slate-800 default
            if (status === 'ACTIVE' || status === 'MOVING' || vesselData.speed > 2) {
                color = '#10b981'; // Emerald-500
            } else if (status === 'IDLE' || status === 'MAINTENANCE') {
                color = '#f59e0b'; // Amber-500
            }

            if (markersRef.current[vesselId]) {
                const marker = markersRef.current[vesselId];
                marker.setLngLat([lng, lat]);
                
                // Update rotation smoothly for all 3D boats
                const el = marker.getElement();
                const svgWrapper = el.querySelector('.boat-wrapper') as HTMLElement;
                if (svgWrapper) {
                    svgWrapper.style.transform = `rotate(${vesselData.heading}deg)`;
                }
            } else {
                const el = document.createElement('div');
                
                // Photorealistic 3D Wooden Rowboat Asset with wave bouncing
                el.className = 'vessel-marker-3d z-50';
                el.style.width = '72px';
                el.style.height = '72px';
                el.style.position = 'relative';

                // The new 3D icon naturally points true-north
                el.innerHTML = `
                    <div class="boat-wrapper w-full h-full transition-transform duration-[1000ms] ease-linear" style="transform: rotate(${vesselData.heading}deg)">
                        <div class="relative w-full h-full animate-[bounce_3s_ease-in-out_infinite]">
                            <img src="/boat-marker.png" alt="3D Boat" class="w-full h-full object-contain opacity-95 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                `;

                const newMarker = new maptilersdk.Marker({ element: el })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new maptilersdk.Popup({ offset: 25 }).setHTML(
                            `<strong>Vessel ${vesselId}</strong><br/>Status: ${status}<br/>Speed: ${vesselData.speed_kmh || vesselData.speed} kn`
                        )
                    )
                    .addTo(map.current!);
                
                markersRef.current[vesselId] = newMarker;
            }

            // Auto-follow logic: If this is the main vessel, center the map around it
            // Only auto-follow if the vessel has successfully moved or is the primary tracker
            if (map.current && (vesselId === Object.keys(livePositions)[0])) {
                map.current.easeTo({
                    center: [lng, lat],
                    duration: 1000,
                    easing: (t) => t
                });
            }
        });

        // Clean up stale markers
        Object.keys(markersRef.current).forEach((vesselId) => {
            if (!livePositions[vesselId]) {
                markersRef.current[vesselId].remove();
                delete markersRef.current[vesselId];
            }
        });

    }, [livePositions]);

    return (
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    );
}
