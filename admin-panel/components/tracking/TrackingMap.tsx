'use client';

import { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useVesselStore } from '../../store/useVesselStore';
import { useThemeStore } from '../../store/useThemeStore';

interface TrackingMapProps {
    className?: string;
}

export const TrackingMap = ({ className }: TrackingMapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const markers = useRef<Record<string, maptilersdk.Marker>>({});

    const livePositions = useVesselStore((state) => state.livePositions);
    const liveTrails = useVesselStore((state) => state.liveTrails);
    const selectVessel = useVesselStore((state) => state.selectVessel);
    const activeEmergency = useVesselStore((state) => state.activeEmergency);
    const { theme } = useThemeStore();

    useEffect(() => {
        if (!mapContainer.current) return;
        if (map.current) return;

        const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '1ewpYZtt28SC1GBtFVuV';
        if (!apiKey) {
            console.error("MapTiler API Key is missing!");
            return;
        }

        maptilersdk.config.apiKey = apiKey;

        console.log("📍 TrackingMap: Initializing with API Key:", apiKey.substring(0, 5) + "...");

        try {
            // Using the ultra-clean Data Visualization Dark style to make the Neon trails pop
            const style = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`;

            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: style,
                center: [55.296249, 25.176987],
                zoom: 11,
                navigationControl: false,
                terrainControl: false,
                geolocateControl: false,
                attributionControl: { compact: true }
            });

            map.current.on('load', () => {
                console.log("✅ TrackingMap: Map loaded successfully");

                // Force a resize after a short delay to ensure canvas fits container
                setTimeout(() => {
                    if (map.current) map.current.resize();
                }, 100);

                if (map.current) {
                    map.current.addSource('vessel-trails', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: []
                        }
                    });

                    map.current.addLayer({
                        id: 'vessel-trails-line',
                        type: 'line',
                        source: 'vessel-trails',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                        'line-color': '#06b6d4', // Bright neon cyan
                        'line-width': 8,         // Doubled thickness for hyper-visibility
                        'line-opacity': 0.9,
                        }
                    });
                }
            });

            map.current.on('error', (e) => {
                console.error("❌ TrackingMap: Engine Error:", e.error);
            });

        } catch (err) {
            console.error("❌ TrackingMap: Constructor Exception:", err);
        }

        return () => {
            if (map.current) {
                console.log("🧹 TrackingMap: Cleaning up");
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Update map style when theme changes
    useEffect(() => {
        if (map.current && map.current.isStyleLoaded()) {
            // map.current.setStyle(maptilersdk.MapStyle.BASIC);
        }
    }, [theme]);

    // Update trails on map
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

        source.setData({
            type: 'FeatureCollection',
            features
        });
    }, [liveTrails]);

    // Auto-center on emergency
    useEffect(() => {
        if (activeEmergency && map.current) {
            map.current.flyTo({
                center: [activeEmergency.longitude, activeEmergency.latitude],
                zoom: 14,
                essential: true,
                speed: 1.5,
            });
        }
    }, [activeEmergency]);

    useEffect(() => {
        if (!map.current) return;

        Object.entries(livePositions).forEach(([vesselId, position]: [string, any]) => {
            let marker = markers.current[vesselId];
            const isEmergency = activeEmergency?.vesselId === vesselId;
            
            // Dynamic hue tinting per vessel status
            let color = '#27272a'; // Default slate
            if (position.status === 'ACTIVE' || position.status === 'MOVING' || position.speed > 2) color = '#10b981'; // Emerald
            else if (position.status === 'IDLE' || position.status === 'MAINTENANCE') color = '#f59e0b'; // Amber
            if (isEmergency) color = '#ef4444'; // Red

            if (!marker) {
                const el = document.createElement('div');
                
                // Photorealistic 3D Wooden Rowboat Asset with wave bouncing for ALL vessels
                el.className = 'vessel-marker-3d z-50 cursor-pointer group';
                el.style.width = '72px';
                el.style.height = '72px';
                el.style.position = 'relative';

                // Removed the -45deg offset because the new 3D boat naturally points True-North
                el.innerHTML = `
                    <div class="boat-wrapper w-full h-full transition-transform duration-[1000ms] ease-linear group-hover:scale-110" style="transform: rotate(${position.heading}deg)">
                        <div class="relative w-full h-full animate-[bounce_3s_ease-in-out_infinite]">
                            <img src="/boat-marker.png" alt="3D Boat" class="w-full h-full object-contain opacity-95 hover:opacity-100 transition-opacity" />
                            ${isEmergency ? '<div class="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-50 scale-150 pointer-events-none"></div>' : ''}
                        </div>
                    </div>
                `;

                marker = new maptilersdk.Marker({ element: el })
                    .setLngLat([
                        position.location?.lng ?? position.longitude ?? 0,
                        position.location?.lat ?? position.latitude ?? 0
                    ])
                    .addTo(map.current!);

                el.addEventListener('click', () => selectVessel(vesselId));
                markers.current[vesselId] = marker;
            } else {
                marker.setLngLat([
                    position.location?.lng ?? position.longitude ?? 0,
                    position.location?.lat ?? position.latitude ?? 0
                ]);
                
                const el = marker.getElement();
                
                // Re-zero Universal Rotation wrapper dynamically
                const svgWrapper = el.querySelector('.boat-wrapper') as HTMLElement;
                if (svgWrapper) svgWrapper.style.transform = `rotate(${position.heading}deg)`;

                const pulse = el.querySelector('.animate-ping');
                if (isEmergency && !pulse) {
                    const pulseDiv = document.createElement('div');
                    pulseDiv.className = 'absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-50 scale-150 pointer-events-none';
                    el.querySelector('.relative')?.appendChild(pulseDiv);
                } else if (!isEmergency && pulse) {
                    pulse.remove();
                }
            }
        });
    }, [livePositions, selectVessel, activeEmergency]);

    return (
        <div className={`relative w-full h-full ${className} overflow-hidden`}>
            <div
                ref={mapContainer}
                className="absolute inset-0 z-0"
            />
            {/* Subtle Gradient Overlay for UI clarity */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-white/5 z-10" />
        </div>
    );
};
