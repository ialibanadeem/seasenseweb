'use client';

import React, { useEffect, useState } from 'react';
import { CalendarDays, TrendingUp, TrendingDown, Filter, Check, Box, Ship, Activity, Clock, WifiOff, Route, Zap, BarChart4, AlertTriangle, Map } from 'lucide-react';
import { useVesselStore } from '../store/useVesselStore';
import { useTrackingSocket } from '../hooks/useTrackingSocket';
import dynamic from 'next/dynamic';

const DashboardMap = dynamic(() => import('../components/dashboard/DashboardMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">Loading Live Map...</div>
});

export default function DashboardHome() {
    // Initialize Socket Connection
    const { isConnected } = useTrackingSocket();
    
    // Global Vessel State
    const vessels = useVesselStore((state) => state.vessels);
    const livePositions = useVesselStore((state) => state.livePositions);
    const setVessels = useVesselStore((state) => state.setVessels);
    const activeEmergency = useVesselStore((state) => state.activeEmergency);
    const clearEmergency = useVesselStore((state) => state.clearEmergency);

    // Fetch Initial Vessels
    useEffect(() => {
        const fetchVessels = async () => {
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                const res = await fetch(`${apiURL}/vessels`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setVessels(data);
                }
            } catch (err) {
                console.error("Failed to fetch initial vessels:", err);
            }
        };
        fetchVessels();
    }, [setVessels]);

    // Derived Metrics
    const totalVesselsCount = Object.keys(vessels).length;
    
    // Calculate active vs idle based on live positions (speed > 2kn = active)
    let activeCount = 0;
    let idleCount = 0;
    let offlineCount = 0;

    const currentPositions = Object.values(livePositions);
    
    currentPositions.forEach(pos => {
        if (pos.status === 'OFFLINE') {
            offlineCount++;
        } else if (pos.speed > 2 || pos.status === 'MOVING' || pos.status === 'ACTIVE') {
            activeCount++;
        } else {
            idleCount++;
        }
    });

    // Metrics are derived directly from the livePositions store


    return (
        <div className="relative w-full h-full bg-slate-100 overflow-hidden">
            {/* Full Bleed Map Background */}
            <div className="absolute inset-0 z-0">
                <DashboardMap />
            </div>

            {/* Overlay Content Layer */}
            <div className="absolute inset-0 z-10 p-6 pointer-events-none flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="flex justify-between items-start gap-6 w-full pointer-events-auto">
                    
                    {/* Top Left: Header & Metrics Strip */}
                    <div className="flex flex-col gap-4 max-w-[800px] w-full">
                        
                        {/* Header Glass Card iOS Style */}
                        <div className="bg-slate-900/40 backdrop-blur-2xl saturate-150 rounded-3xl border border-white/10 shadow-2xl p-5 flex justify-between items-center transition-all">
                            <div>
                                <h1 className="text-[22px] font-medium text-white flex items-center gap-2 tracking-wide">
                                    Live Fleet Overview
                                </h1>
                                <p className={`text-[13px] font-light text-slate-300 mt-1 flex items-center gap-2`}>
                                    Real-time tracking and metrics.
                                    <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full border ${isConnected ? 'bg-emerald-900/30 border-emerald-500/20 text-emerald-400' : 'bg-rose-900/30 border-rose-500/20 text-rose-400'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400'}`}></span>
                                        {isConnected ? 'Socket Connected' : 'Socket Disconnected'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Simplified KPI Vertical Stack - Matching Live Activity Style */}
                        <div className="w-[280px] flex flex-col bg-slate-900/40 backdrop-blur-2xl saturate-150 rounded-3xl border border-white/10 shadow-2xl overflow-hidden shrink-0 pointer-events-auto">
                            <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/5">
                                <BarChart4 size={16} className="text-emerald-400" />
                                <h2 className="text-[14px] font-medium text-white tracking-wide">Fleet Status</h2>
                            </div>
                            
                            <div className="p-5 flex flex-col gap-5">
                                <KPIItem label="Total Vessels" value={totalVesselsCount} icon={<Ship size={14} />} color="text-sky-400" />
                                <KPIItem label="Active (Moving)" value={activeCount} icon={<Activity size={14} />} color="text-emerald-400" />
                                <KPIItem label="Idle / Anchored" value={idleCount} icon={<Clock size={14} />} color="text-amber-400" />
                                <KPIItem label="Offline" value={offlineCount} icon={<WifiOff size={14} />} color="text-rose-400" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Emergency SOS Overlay */}
            {activeEmergency && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-rose-950/20 pointer-events-auto">
                    <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl rounded-[32px] border border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.3)] p-8 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-rose-500/20 flex items-center justify-center animate-pulse">
                            <AlertTriangle size={40} className="text-rose-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">EMERGENCY SOS</h2>
                            <p className="text-rose-200/80 font-medium tracking-tight">
                                Distress signal received from {vessels[activeEmergency.vesselId]?.name || `Vessel ${activeEmergency.vesselId.slice(0, 8)}`}
                            </p>
                        </div>
                        <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Location</span>
                                <span className="text-[10px] text-slate-400 font-mono">{new Date(activeEmergency.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-white font-mono text-sm">
                                {activeEmergency.latitude.toFixed(6)}°N, {activeEmergency.longitude.toFixed(6)}°E
                            </div>
                        </div>
                        <div className="flex gap-3 w-full mt-2">
                            <button 
                                onClick={clearEmergency}
                                className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-900/20"
                            >
                                DISMISS ALERT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Subcomponents

function KPIItem({ label, value, icon, color }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color} bg-white/5 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110`}>
                    {icon}
                </div>
                <span className="text-[13px] font-light text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-[20px] font-medium text-white tracking-tight">{value}</span>
        </div>
    );
}

