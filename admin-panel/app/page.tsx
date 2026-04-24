'use client';

import React, { useEffect, useState } from 'react';
import { CalendarDays, TrendingUp, TrendingDown, Filter, Check, Box, Ship, Activity, Clock, WifiOff, Route, Zap, BarChart4, AlertTriangle, Map, Info } from 'lucide-react';
import { useVesselStore } from '../store/useVesselStore';
import { useTrackingSocket } from '../hooks/useTrackingSocket';
import dynamic from 'next/dynamic';

const DashboardMap = dynamic(() => import('../components/dashboard/DashboardMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">Loading Live Map...</div>
});

const InfoTooltip = ({ text }: { text: string }) => (
    <div className="relative group flex items-center">
        <Info size={14} className="text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-[220px] p-2.5 bg-slate-800 text-white text-[11px] font-medium leading-relaxed rounded-xl shadow-xl z-50 text-center pointer-events-none normal-case tracking-normal">
            {text}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
        </div>
    </div>
);

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
        const lastUpdated = new Date(pos.timestamp || pos.lastSeen || Date.now());
        const timeDiff = (Date.now() - lastUpdated.getTime()) / 1000 / 60; // in minutes
        
        const isOffline = timeDiff > 5 || pos.status === 'OFFLINE';
        
        if (isOffline) {
            offlineCount++;
        } else if (pos.speed === 0 || pos.speed <= 2) {
            idleCount++;
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
                        
                        {/* Minimalistic Header - Premium & Compact */}
                        <div className="bg-white/70 backdrop-blur-xl px-6 py-4 rounded-[24px] border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-between transition-all pointer-events-auto max-w-fit">
                            <div className="flex items-center gap-5">
                                <div className="w-1.5 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-[20px] font-black text-slate-900 tracking-tighter uppercase">
                                            Fleet Overview
                                        </h1>
                                        <div className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.1em] font-black px-2 py-0.5 rounded-lg border ${isConnected ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'} transition-all`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                            {isConnected ? 'Synced' : 'Offline'}
                                        </div>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-400 tracking-tight leading-none mt-1">
                                        Active Maritime Telemetry
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Simplified KPI Vertical Stack - Matching Live Activity Style */}
                        <div className="w-[300px] flex flex-col bg-white/70 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] shrink-0 pointer-events-auto">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50 rounded-t-[32px]">
                                <Activity size={18} className="text-blue-500" />
                                <h2 className="text-[15px] font-bold text-slate-800 tracking-tight">Fleet Status</h2>
                            </div>
                            
                            <div className="p-6 flex flex-col gap-6">
                                <KPIItem label="Total Vessels" value={totalVesselsCount} icon={<Ship size={14} />} color="text-blue-600" bgColor="bg-blue-50" tooltip="The total number of vessels currently registered in the system." />
                                <KPIItem label="Active (Moving)" value={activeCount} icon={<Zap size={14} />} color="text-emerald-600" bgColor="bg-emerald-50" tooltip="Vessels currently moving at a speed greater than 2 knots." />
                                <KPIItem label="Idle / Anchored" value={idleCount} icon={<Clock size={14} />} color="text-amber-600" bgColor="bg-amber-50" tooltip="Vessels that are stationary or moving very slowly (under 2 knots)." />
                                <KPIItem label="Offline" value={offlineCount} icon={<WifiOff size={14} />} color="text-rose-600" bgColor="bg-rose-50" tooltip="Vessels that have not sent a GPS signal in over 5 minutes." />
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

function KPIItem({ label, value, icon, color, bgColor, tooltip }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color} ${bgColor} border border-transparent transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    {icon}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">{label}</span>
                    {tooltip && <InfoTooltip text={tooltip} />}
                </div>
            </div>
            <span className="text-[24px] font-black text-slate-900 tracking-tighter">{value}</span>
        </div>
    );
}

