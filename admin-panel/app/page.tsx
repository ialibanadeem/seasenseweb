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

    // Real event log populated exclusively by live tracking socket updates
    const [liveUpdates, setLiveUpdates] = useState<any[]>([]);

    // Listen to new live position updates to create a live event log
    useEffect(() => {
        if (currentPositions.length > 0) {
            const latest = currentPositions[currentPositions.length - 1]; 
            // Only log if something interesting happens, e.g. speed > 15
            if (latest && latest.speed > 15 && latest.vesselId) {
                const randomTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                setLiveUpdates(prev => {
                    // Prevent duplicate consecutive logs for the same vessel speed burst
                    if (prev.length > 0 && prev[0].vessel.includes(latest.vesselId.substring(0, 4))) {
                        return prev;
                    }
                    return [
                        { 
                            id: Date.now(), 
                            vessel: `Vessel ${latest.vesselId.substring(0, 4)}`, 
                            action: `Speed increased to ${Math.round(latest.speed)} kn`, 
                            time: randomTime, 
                            statusClass: "text-cyan-500 bg-cyan-50" 
                        },
                        ...prev.slice(0, 9) // keep top 10
                    ];
                });
            }
        }
    }, [livePositions]);


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
                        
                        {/* Header Glass Card */}
                        <div className="bg-white/90 backdrop-blur-md rounded-[16px] border border-white/60 shadow-lg p-5 flex justify-between items-center transition-all">
                            <div>
                                <h1 className="text-[24px] font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                                    Live Fleet Overview
                                </h1>
                                <p className="text-[14px] font-medium text-slate-500 mt-1 flex items-center gap-2">
                                    Real-time tracking and metrics.
                                    <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${isConnected ? 'bg-emerald-100/80 text-emerald-700' : 'bg-red-100/80 text-red-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                                        {isConnected ? 'Socket Connected' : 'Socket Disconnected'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Top Statistics Cards - Glassmorphism */}
                        <div className="bg-white/90 backdrop-blur-md rounded-[16px] border border-white/60 shadow-lg p-1 flex">
                            <div className="grid grid-cols-4 w-full divide-x divide-y md:divide-y-0 divide-slate-100/60">
                                {/* Total Vessels */}
                                <MetricCard title="Total Vessels" value={totalVesselsCount} icon={<Ship size={14} />} trend="+3" trendUp={true} color="text-blue-600" />
                                {/* Active Vessels */}
                                <MetricCard title="Active (Moving)" value={activeCount} icon={<Activity size={14} />} trend={Math.round((activeCount/Math.max(1, totalVesselsCount))*100) + "%"} trendUp={true} color="text-emerald-600" />
                                {/* Idle Vessels */}
                                <MetricCard title="Idle Vessels" value={idleCount} icon={<Clock size={14} />} trend="2.5h avg" trendUp={false} color="text-amber-600" />
                                {/* Offline Vessels */}
                                <MetricCard title="Offline / Signal Loss" value={offlineCount} icon={<WifiOff size={14} />} trend="-2" trendUp={true} color="text-rose-600" />
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Latest Updates Feed */}
                    <div className="w-[340px] max-h-[calc(100vh-100px)] flex flex-col bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-xl overflow-hidden shrink-0">
                        <div className="p-5 pb-4 border-b border-slate-100/60 flex justify-between items-center bg-white/50">
                            <h2 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                                <Activity size={16} className="text-blue-500" /> 
                                Live Activity
                            </h2>
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live Feed
                            </span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col pt-5">
                            {liveUpdates.map((update) => (
                                <VesselUpdateItem 
                                    key={update.id}
                                    vessel={update.vessel} 
                                    action={update.action} 
                                    time={update.time} 
                                    statusClass={update.statusClass} 
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Subcomponents

function MetricCard({ title, value, unit = "", icon, trend, trendUp, color }: any) {
    return (
        <div className="flex flex-col p-4 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:bg-slate-50/80 first:rounded-l-[12px] last:rounded-r-[12px]">
            {/* Subtle highlight effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors">{title}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color} bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out`}>
                    {icon}
                </div>
            </div>
            
            <div className="flex items-end justify-between mt-auto relative z-10 box-border">
                <div className="flex items-baseline gap-1">
                    <span className="text-[26px] font-black text-slate-800 leading-none tracking-tight group-hover:text-black transition-colors">{value}</span>
                    {unit && <span className="text-[13px] font-semibold text-slate-400">{unit}</span>}
                </div>
                
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-all duration-300 ${trendUp ? 'text-emerald-700 bg-emerald-100/80 group-hover:bg-emerald-100 group-hover:-translate-y-0.5' : 'text-slate-600 bg-slate-100/80 group-hover:bg-slate-200 group-hover:-translate-y-0.5'}`}>
                    {trendUp ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                    {trend}
                </span>
            </div>
        </div>
    );
}

function VesselUpdateItem({ vessel, action, time, statusClass }: any) {
    return (
        <div className="flex gap-3.5 relative pb-6 last:pb-0 group cursor-pointer">
            {/* Timeline connecting line */}
            <div className="absolute left-[9px] top-6 bottom-[-4px] w-[2px] bg-gradient-to-b from-slate-200 to-transparent group-last:hidden"></div>
            
            {/* Dot Indicator */}
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-[2px] border-white shadow-sm z-10 ${statusClass} group-hover:scale-125 transition-transform duration-300 ease-out`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-out">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[12.5px] font-bold text-slate-900 truncate pr-2 group-hover:text-blue-600 transition-colors">{vessel}</span>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">{time}</span>
                </div>
                <p className="text-[11.5px] font-medium text-slate-500 leading-snug line-clamp-2">{action}</p>
            </div>
        </div>
    );
}
