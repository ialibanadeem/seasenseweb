'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Play, Pause, Download, Loader2, FastForward, Navigation, Map as MapIcon } from 'lucide-react';
import { format } from 'date-fns';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '1ewpYZtt28SC1GBtFVuV';

interface LocationPoint {
    latitude: number;
    longitude: number;
    speed?: number | null;
    timestamp: string;
    heading: number;
}

interface Props {
    tripId: string | null;
}

export default function TripPlaybackMap({ tripId }: Props) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const markerRef = useRef<maptilersdk.Marker | null>(null);
    const animationRef = useRef<number | null>(null);

    // Data State
    const [points, setPoints] = useState<LocationPoint[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Playback State
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackIndex, setPlaybackIndex] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    
    // Export State
    const [isExporting, setIsExporting] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;
        maptilersdk.config.apiKey = MAPTILER_KEY;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
            center: [67.0011, 24.8607],
            zoom: 11,
            preserveDrawingBuffer: true, // Critical for MediaRecorder Canvas export
        } as any);

        map.current.on('load', () => {
            if (!map.current) return;
            
            map.current.addSource('route-trace', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] }
            });
            map.current.addLayer({
                id: 'route-trace-line',
                type: 'line',
                source: 'route-trace',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#4f46e5', 'line-width': 6, 'line-opacity': 0.8 }
            });

            map.current.addSource('route-history', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] }
            });
            map.current.addLayer({
                id: 'route-history-line',
                type: 'line',
                source: 'route-history',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#e2e8f0', 'line-width': 4, 'line-opacity': 0.6 }
            });
            
            // Create the custom 3D ship element
            const el = document.createElement('div');
            el.className = 'w-16 h-16 pointer-events-none z-50';
            el.innerHTML = `
                <div id="vessel-marker-wrapper" class="w-full h-full transition-transform duration-100 ease-linear" style="transform: rotate(0deg)">
                    <img src="/boat-marker.png" alt="Boat" class="w-full h-full object-contain drop-shadow-lg" />
                </div>
            `;
            markerRef.current = new maptilersdk.Marker({ element: el })
                .setLngLat([67.0011, 24.8607])
                .addTo(map.current);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Load Data
    useEffect(() => {
        if (!tripId) {
            setPoints([]);
            setPlaybackIndex(0);
            setIsPlaying(false);
            if (map.current && map.current.isStyleLoaded()) {
                (map.current.getSource('route-trace') as any)?.setData({ type: 'FeatureCollection', features: [] });
                (map.current.getSource('route-history') as any)?.setData({ type: 'FeatureCollection', features: [] });
            }
            return;
        }

        const loadTripData = async () => {
            setIsLoading(true);
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                const res = await fetch(`${apiURL}/trips/${tripId}`);
                const data = await res.json();
                
                if (data.points && data.points.length > 0) {
                    setPoints(data.points);
                    setPlaybackIndex(0);
                    setIsPlaying(false);
                    
                    if (map.current && map.current.isStyleLoaded()) {
                        // Plot complete faint history line
                        const coords = data.points.map((p: any) => [p.longitude, p.latitude]);
                        (map.current.getSource('route-history') as any).setData({
                            type: 'Feature',
                            geometry: { type: 'LineString', coordinates: coords }
                        });
                        
                        // Fit Bounds
                        const bounds = new maptilersdk.LngLatBounds(coords[0], coords[0]);
                        coords.forEach((c: any) => bounds.extend(c));
                        map.current.fitBounds(bounds, { padding: 80, animate: false });

                        // Set Marker to start
                        markerRef.current?.setLngLat(coords[0]);
                    }
                } else {
                    setPoints([]);
                }
            } catch (err) {
                console.error("Failed to load trip points:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTripData();
    }, [tripId]);

    // Playback Engine
    const updateFrame = useCallback(() => {
        if (!map.current || points.length === 0 || !markerRef.current) return;

        setPlaybackIndex((prev) => {
            if (prev >= points.length - 1) {
                setIsPlaying(false);
                if (isExporting) stopRecording();
                return prev;
            }

            const nextIndex = prev + 1;
            const pt = points[nextIndex];
            
            // Advance map visuals
            markerRef.current!.setLngLat([pt.longitude, pt.latitude]);
            
            // Apply Rotation
            const el = document.getElementById('vessel-marker-wrapper');
            if (el && pt.heading !== undefined) {
                 el.style.transform = `rotate(${pt.heading}deg)`;
            }

            // Draw Trace Line
            const traceCoords = points.slice(0, nextIndex + 1).map(p => [p.longitude, p.latitude]);
            (map.current!.getSource('route-trace') as any)?.setData({
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: traceCoords }
            });

            // Smoothly pan camera forward occasionally
            if (nextIndex % 10 === 0) {
                 map.current!.easeTo({ center: [pt.longitude, pt.latitude], duration: 800 });
            }

            return nextIndex;
        });
    }, [points, isExporting]);

    useEffect(() => {
        if (isPlaying) {
            // Speed factor adjusts the interval speed
            const intervalMs = Math.max(20, 200 / playbackSpeed); 
            animationRef.current = window.setInterval(updateFrame, intervalMs);
        } else if (animationRef.current) {
            clearInterval(animationRef.current);
        }
        return () => { if (animationRef.current) clearInterval(animationRef.current); };
    }, [isPlaying, updateFrame, playbackSpeed]);

    const handlePlayPause = () => {
        if (playbackIndex >= points.length - 1) {
            // Reset if at end
            setPlaybackIndex(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    // Native Exporter
    const startExport = () => {
        if (!mapContainer.current) return;
        const canvas = mapContainer.current.querySelector('canvas');
        if (!canvas) return;

        try {
            // Start recording at 30 FPS
            const stream = canvas.captureStream(30);
            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            mediaRecorderRef.current = recorder;
            recordedChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `trip_playback_${tripId}_${Date.now()}.webm`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setIsExporting(false);
            };

            recorder.start();
            setIsExporting(true);
            
            // Automatically rewind and play
            setPlaybackIndex(0);
            setPlaybackSpeed(5); // Export at 5x to save time
            setIsPlaying(true);

        } catch (err) {
            console.error("Export failed:", err);
            setIsExporting(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
    };

    if (!tripId) {
        return (
            <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                 <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-3xl flex items-center justify-center mb-4">
                      <MapIcon className="w-8 h-8 text-slate-300" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-600">Select a Trip</h3>
                 <p className="text-sm">Choose a journey from the sidebar to initialize playback.</p>
            </div>
        );
    }

    const currentPoint = points[playbackIndex];
    const progress = points.length > 0 ? (playbackIndex / (points.length - 1)) * 100 : 0;

    return (
        <div className="flex-1 flex flex-col relative bg-white">
            <div ref={mapContainer} className="flex-1 w-full relative z-0" />

            {/* Overlays */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            )}
            
            {isExporting && (
                <div className="absolute top-6 right-6 z-20 bg-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-rose-500/30 flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    RECORDING EXPORT...
                </div>
            )}

            {/* Floating Live Telemetry HUD */}
            {currentPoint && !isLoading && (
                <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md border border-slate-200/50 p-5 rounded-3xl shadow-xl min-w-[240px]">
                    <div className="flex items-center gap-2 mb-4">
                        <Navigation className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-bold text-slate-800 tracking-wide text-sm">LIVE TELEMETRY</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                             <span className="text-slate-500 font-medium">SPEED</span>
                             <span className="font-bold text-slate-900 font-mono text-sm">{(currentPoint.speed || 0).toFixed(1)} KN</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                             <span className="text-slate-500 font-medium">HEADING</span>
                             <span className="font-bold text-slate-900 font-mono text-sm">{(currentPoint.heading || 0).toFixed(0)}°</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1">
                             <span className="text-slate-500 font-medium">TIME</span>
                             <span className="font-bold text-slate-900 font-mono text-xs">
                                 {format(new Date(currentPoint.timestamp), "MMM dd, HH:mm:ss")}
                             </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Playback Controls Footer */}
            <div className="bg-white border-t border-slate-200 p-6 flex flex-col gap-4 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                {/* Progress Bar */}
                <div className="w-full relative group cursor-pointer" onClick={(e) => {
                    if (points.length === 0) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    setPlaybackIndex(Math.min(points.length - 1, Math.max(0, Math.floor(percent * points.length))));
                }}>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                    {/* Scrubber Knob */}
                    <div className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `calc(${progress}% - 10px)` }} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handlePlayPause}
                            disabled={points.length === 0 || isExporting}
                            className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                        </button>

                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 ml-2">
                            {[1, 5, 10].map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => setPlaybackSpeed(speed)}
                                    disabled={points.length === 0 || isExporting}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${playbackSpeed === speed ? 'bg-white shadow border border-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-200/50'}`}
                                >
                                    {speed}x
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm font-medium text-slate-500 font-mono">
                        {points.length > 0 ? `${playbackIndex + 1} / ${points.length} PINGS` : 'NO DATA'}
                    </div>

                    <button 
                        onClick={startExport}
                        disabled={points.length === 0 || isExporting}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-rose-500" /> : <Download className="w-4 h-4 text-indigo-600" />}
                        {isExporting ? 'Exporting WebM...' : 'Export Video'}
                    </button>
                </div>
            </div>
        </div>
    );
}
