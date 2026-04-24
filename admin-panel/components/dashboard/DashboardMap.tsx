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
            // Using the ultra-clean Data Visualization Light style for a premium light-themed dashboard
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
            center: [67.0011, 24.8607], // Centered at Karachi
            zoom: 11,
            dragPan: true,
            scrollZoom: true,
            boxZoom: true,
            doubleClickZoom: true,
            touchZoomRotate: true,
            navigationControl: true,
            geolocateControl: true
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
                markersRef.current = {};
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
            
            const lastUpdated = new Date(vesselData.timestamp || vesselData.lastSeen || Date.now());
            const timeDiff = (Date.now() - lastUpdated.getTime()) / 1000 / 60; // in minutes
            const isOffline = timeDiff > 5 || status?.toUpperCase() === 'OFFLINE';
            let displayStatus = status || 'UNKNOWN';
            
            if (isOffline) {
                displayStatus = 'OFFLINE';
            } else if (vesselData.speed === 0 || vesselData.speed <= 2) {
                displayStatus = 'IDLE';
            } else if (vesselData.speed > 2) {
                displayStatus = 'MOVING';
            }

            const imgFilterClass = isOffline ? 'grayscale opacity-60' : 'opacity-95 hover:opacity-100 transition-opacity';

            if (markersRef.current[vesselId]) {
                const marker = markersRef.current[vesselId];
                marker.setLngLat([lng, lat]);
                
                // Update rotation smoothly for all 3D boats
                const el = marker.getElement();
                const svgWrapper = el.querySelector('.boat-wrapper') as HTMLElement;
                if (svgWrapper) {
                    svgWrapper.style.transform = `rotate(${vesselData.heading}deg)`;
                }

                // Update grayscale
                const imgEl = el.querySelector('img');
                if (imgEl) {
                    imgEl.className = `w-full h-full object-contain ${imgFilterClass}`;
                }

                // Update popup
                const popup = marker.getPopup();
                if (popup) {
                    popup.setHTML(`<strong>Vessel ${vesselId}</strong><br/>Status: ${displayStatus}<br/>Speed: ${vesselData.speed_kmh || vesselData.speed || 0} kn`);
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
                        <div class="relative w-full h-full">
                            <img src="/boat-marker.png" alt="3D Boat" class="w-full h-full object-contain ${imgFilterClass}" />
                        </div>
                    </div>
                `;

                // Add 5s linear transition for the coordinates (matching polling interval)
                el.style.transition = 'all 5s linear';

                const newMarker = new maptilersdk.Marker({ element: el })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new maptilersdk.Popup({ offset: 25 }).setHTML(
                            `<strong>Vessel ${vesselId}</strong><br/>Status: ${displayStatus}<br/>Speed: ${vesselData.speed_kmh || vesselData.speed || 0} kn`
                        )
                    )
                    .addTo(map.current!);
                
                markersRef.current[vesselId] = newMarker;
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
