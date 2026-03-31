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
        <div className="relative w-full h-full bg-slate-50 overflow-hidden">
            {/* Full Bleed Map Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <DashboardMap />
            </div>

            {/* Overlay Content Layer */}
            <div className="absolute inset-0 z-10 p-6 pointer-events-none flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="flex justify-between items-start gap-6 w-full pointer-events-none">
                    
                    {/* Top Left: Header & Metrics Strip */}
                    <div className="flex flex-col gap-4 max-w-[800px] w-full pointer-events-none">
                        
                        {/* Header Glass Card iOS Style */}
                        <div className="bg-white/80 backdrop-blur-2xl px-8 py-6 rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex justify-between items-center transition-all pointer-events-auto">
                            <div>
                                <h1 className="text-[26px] font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                                    Live Fleet Overview
                                </h1>
                                <p className={`text-[14px] font-medium text-slate-500 mt-1 flex items-center gap-3`}>
                                    Real-time tracking and metrics.
                                    <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${isConnected ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                                        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                        {isConnected ? 'Server Sync Active' : 'Disconnected'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Simplified KPI Vertical Stack - Matching Live Activity Style */}
                        <div className="w-[300px] flex flex-col bg-white/70 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden shrink-0 pointer-events-auto">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                                <Activity size={18} className="text-blue-500" />
                                <h2 className="text-[15px] font-bold text-slate-800 tracking-tight">Fleet Status</h2>
                            </div>
                            
                            <div className="p-6 flex flex-col gap-6">
                                <KPIItem label="Total Vessels" value={totalVesselsCount} icon={<Ship size={14} />} color="text-blue-600" bgColor="bg-blue-50" />
                                <KPIItem label="Active (Moving)" value={activeCount} icon={<Zap size={14} />} color="text-emerald-600" bgColor="bg-emerald-50" />
                                <KPIItem label="Idle / Anchored" value={idleCount} icon={<Clock size={14} />} color="text-amber-600" bgColor="bg-amber-50" />
                                <KPIItem label="Offline" value={offlineCount} icon={<WifiOff size={14} />} color="text-rose-600" bgColor="bg-rose-50" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Emergency SOS Overlay */}
            {activeEmergency && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-white/40 pointer-events-auto">
                    <div className="max-w-md w-full bg-white/95 backdrop-blur-3xl rounded-[40px] border-4 border-rose-500 shadow-[0_40px_100px_rgba(225,29,72,0.3)] p-10 flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center animate-bounce shadow-inner">
                            <AlertTriangle size={48} className="text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">EMERGENCY ALERT</h2>
                            <p className="text-rose-600 font-bold tracking-tight uppercase text-sm">
                                Distress signal from {vessels[activeEmergency.vesselId]?.name || `Vessel ${activeEmergency.vesselId.slice(0, 8)}`}
                            </p>
                        </div>
                        <div className="w-full bg-slate-50 rounded-3xl p-6 border border-slate-100 text-left shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black">Position Lock</span>
                                <span className="text-[11px] text-rose-500 font-mono font-bold">{new Date(activeEmergency.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-slate-900 font-mono text-lg font-bold">
                                {activeEmergency.latitude.toFixed(6)}°N, {activeEmergency.longitude.toFixed(6)}°E
                            </div>
                        </div>
                        <div className="flex gap-4 w-full mt-2">
                            <button 
                                onClick={clearEmergency}
                                className="flex-1 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[24px] font-black transition-all shadow-xl shadow-rose-200 active:scale-95"
                            >
                                ACKNOWLEDGE & DISMISS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Subcomponents

function KPIItem({ label, value, icon, color, bgColor }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color} ${bgColor} border border-transparent transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    {icon}
                </div>
                <span className="text-[13px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[24px] font-black text-slate-900 tracking-tighter">{value}</span>
        </div>
    );
}

