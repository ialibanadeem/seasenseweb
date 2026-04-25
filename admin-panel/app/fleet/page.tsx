'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useVesselStore } from '@/store/useVesselStore';
import { Ship, Activity, Navigation, Droplets, MapPin, Gauge, Plus } from 'lucide-react';
import AddVesselModal from '@/components/fleet/AddVesselModal';

export default function FleetMasterPage() {
    const { vessels, livePositions, setVessels } = useVesselStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const vesselList = Object.values(vessels);

    const fetchVessels = async () => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const res = await fetch(`${apiURL}/vessels`);
            if (res.ok) {
                const data = await res.json();
                setVessels(data);
            }
        } catch (err) {
            console.error("Failed to fetch updated vessels:", err);
        }
    };

    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase();
        if (s === 'active' || s === 'moving') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (s === 'idle') return 'bg-amber-100 text-amber-700 border-amber-200';
        if (s === 'maintenance') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        if (s === 'offline') return 'bg-rose-100 text-rose-700 border-rose-200';
        return 'bg-slate-100 text-slate-700 border-slate-200';
    };

    return (
        <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Vessel List</h1>
                        <p className="text-slate-500 mt-1 font-medium">Real-time overview of your entire fleet.</p>
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
                    >
                        <Plus size={18} /> Add New Vessel
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                    {vesselList.map(vessel => {
                        const liveInfo = livePositions[vessel.id];
                        
                        let displayStatus = (vessel.status || 'OFFLINE').toUpperCase();
                        if (liveInfo) {
                            const lastUpdated = new Date(liveInfo.timestamp || liveInfo.lastSeen || Date.now());
                            const timeDiff = (Date.now() - lastUpdated.getTime()) / 1000 / 60;
                            const isOffline = timeDiff > 5 || liveInfo.status?.toUpperCase() === 'OFFLINE';
                            
                            if (isOffline) {
                                displayStatus = 'OFFLINE';
                            } else if (liveInfo.speed === 0 || liveInfo.speed <= 2) {
                                displayStatus = 'IDLE';
                            } else if (liveInfo.speed > 2) {
                                displayStatus = 'MOVING';
                            } else {
                                displayStatus = (liveInfo.status || 'MOVING').toUpperCase();
                            }
                        }
                        
                        return (
                            <Link href={`/fleet/${vessel.id}`} key={vessel.id} className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col gap-6 ${displayStatus === 'OFFLINE' ? 'opacity-75 grayscale' : ''}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <Ship size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-[16px] group-hover:text-blue-600 transition-colors">{vessel.name}</h3>
                                            <p className="text-[13px] font-medium text-slate-500">{vessel.type}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${getStatusColor(displayStatus)}`}>
                                        {displayStatus}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-bold uppercase tracking-wide">
                                            <Gauge size={14} /> Speed
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-700">
                                            {liveInfo ? `${liveInfo.speed.toFixed(1)} kts` : '--'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-bold uppercase tracking-wide">
                                            <Droplets size={14} /> Fuel
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-700">
                                            {liveInfo ? `${liveInfo.fuelLevel}%` : '--'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-bold uppercase tracking-wide">
                                            <Navigation size={14} /> Heading
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-700">
                                            {liveInfo ? `${liveInfo.heading}°` : '--'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-bold uppercase tracking-wide">
                                            <Activity size={14} /> Engine
                                        </div>
                                        <span className={`text-[15px] font-bold capitalize ${liveInfo?.engineStatus === 'running' ? 'text-emerald-600' : 'text-slate-500'}`}>
                                            {liveInfo ? liveInfo.engineStatus : '--'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            
            <AddVesselModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    fetchVessels();
                }} 
            />
        </div>
    );
}
