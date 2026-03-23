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

    useEffect(() => {
        if (map.current || !mapContainer.current) return; // Initialize map only once

        maptilersdk.config.apiKey = MAPTILER_KEY;

        map.current = new maptilersdk.Map({
            container: mapContainer.current as HTMLDivElement,
            // Using the standard Base map style per user request
            style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
            center: [66.9806, 24.8143], // Centered exactly at Kemari, Karachi for the 3D boat demo
            zoom: 11,
            navigationControl: false,
            geolocateControl: false
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

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
                
                // Update dynamic status glow 
                const imgNode = el.querySelector('img') as HTMLElement;
                if (imgNode) {
                    imgNode.style.filter = `drop-shadow(0px 10px 12px ${color}80)`;
                }
            } else {
                const el = document.createElement('div');
                
                // Photorealistic 3D Wooden Rowboat Asset with wave bouncing
                el.className = 'vessel-marker-3d z-50';
                el.style.width = '72px';
                el.style.height = '72px';
                el.style.position = 'relative';

                // We apply a -45deg offset because the raw PNG boat points diagonally Northwest by default
                el.innerHTML = `
                    <div class="boat-wrapper w-full h-full transition-transform duration-[1000ms] ease-linear" style="transform: rotate(${vesselData.heading}deg)">
                        <div class="relative w-full h-full animate-[bounce_3s_ease-in-out_infinite]" style="transform: rotate(-45deg)">
                            <img src="/boat-marker.png" alt="3D Boat" class="w-full h-full object-contain opacity-95 hover:opacity-100 transition-opacity" style="filter: drop-shadow(0px 10px 12px ${color}80);" />
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
