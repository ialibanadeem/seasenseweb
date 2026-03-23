'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Route, MapPin, Clock, Ship, Navigation, Activity, Download, Gauge, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function TripDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    // Rich mock data explicitly tied to the selected trip ID
    const tripDetails = {
        id: id,
        vessel: 'Al-Mehran',
        status: 'Completed',
        startTime: 'Oct 24, 2023, 10:00 AM',
        endTime: 'Oct 24, 2023, 12:20 PM',
        startPort: 'Karachi Port',
        endPort: 'Port Qasim',
        metrics: {
            distance: '12.5 nm',
            duration: '2h 20m',
            avgSpeed: '12.4 kts',
            maxSpeed: '18.5 kts',
            fuelUsed: '145 L',
            efficiency: '92%'
        }
    };

    const speedData = [
        { time: '10:00', speed: 0 },
        { time: '10:15', speed: 8.5 },
        { time: '10:30', speed: 12.0 },
        { time: '10:45', speed: 14.2 },
        { time: '11:00', speed: 18.5 },
        { time: '11:15', speed: 16.0 },
        { time: '11:30', speed: 12.4 },
        { time: '11:45', speed: 10.1 },
        { time: '12:00', speed: 5.5 },
        { time: '12:15', speed: 2.0 },
        { time: '12:20', speed: 0 },
    ];

    const timeline = [
        { time: '10:00 AM', event: 'Departed Karachi Port', type: 'departure' },
        { time: '10:45 AM', event: 'Entering open waters', type: 'navigation' },
        { time: '11:00 AM', event: 'Reached maximum speed (18.5 kts)', type: 'speed' },
        { time: '12:00 PM', event: 'Approaching Port Qasim channel', type: 'navigation' },
        { time: '12:20 PM', event: 'Arrived at destination', type: 'arrival' },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Link href="/trips" className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            Trip {tripDetails.id}
                            <span className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold bg-emerald-100 text-emerald-700">
                                {tripDetails.status}
                            </span>
                        </h1>
                        <p className="text-[14px] font-medium text-slate-500 flex items-center gap-2 mt-1">
                            <Ship size={14} className="text-blue-500" /> {tripDetails.vessel} 
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 text-[14px]">
                        <Download size={18} /> Export JSON
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
                
                {/* Route Overview Card */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><MapPin size={20} className="text-blue-500"/> Route Overview</h2>
                            <p className="text-[14px] font-bold text-slate-400">{tripDetails.startTime} - {tripDetails.endTime}</p>
                        </div>
                        
                        <div className="flex items-center justify-between px-10 relative">
                            <div className="absolute left-[80px] right-[80px] top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-100 rounded-full"></div>
                            <div className="absolute left-[80px] right-[100px] top-1/2 -translate-y-1/2 flex justify-center">
                                <Ship size={24} className="text-blue-500 bg-white px-1 -translate-y-1/2" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center gap-3 bg-white px-4">
                                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-500 shadow-md flex items-center justify-center text-white">
                                    <Route size={20} />
                                </div>
                                <div className="text-center">
                                    <p className="text-[16px] font-bold text-slate-900">{tripDetails.startPort}</p>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Departure</p>
                                </div>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-3 bg-white px-4">
                                <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-500 shadow-md flex items-center justify-center text-white">
                                    <MapPin size={20} />
                                </div>
                                <div className="text-center">
                                    <p className="text-[16px] font-bold text-slate-900">{tripDetails.endPort}</p>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Arrival</p>
                                </div>
                            </div>
                        </div>

                        {/* Core Metrics Grid */}
                        <div className="grid grid-cols-4 gap-6 mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Navigation size={12}/> Distance</span>
                                <span className="text-2xl font-black text-slate-900 tracking-tight">{tripDetails.metrics.distance}</span>
                            </div>
                            <div className="flex flex-col border-l border-slate-200 pl-6">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Clock size={12}/> Duration</span>
                                <span className="text-2xl font-black text-slate-900 tracking-tight">{tripDetails.metrics.duration}</span>
                            </div>
                            <div className="flex flex-col border-l border-slate-200 pl-6">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Activity size={12}/> Avg Speed</span>
                                <span className="text-2xl font-black text-blue-600 tracking-tight">{tripDetails.metrics.avgSpeed}</span>
                            </div>
                            <div className="flex flex-col border-l border-slate-200 pl-6">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Zap size={12}/> Max Speed</span>
                                <span className="text-2xl font-black text-slate-900 tracking-tight">{tripDetails.metrics.maxSpeed}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden text-white flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">Efficiency Rating</h2>
                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-5xl font-black text-white tracking-tighter">{tripDetails.metrics.efficiency}</span>
                                <span className="text-emerald-400 font-bold mb-1 w-16 leading-tight">Optimal Burn</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 relative z-10 border-t border-slate-800 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-[14px] font-medium text-slate-400">Total Fuel Consumed</span>
                                <span className="text-[16px] font-bold text-white">{tripDetails.metrics.fuelUsed}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[14px] font-medium text-slate-400">Idle Time penalty</span>
                                <span className="text-[16px] font-bold text-emerald-400">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row: Speed Chart and Timeline */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Gauge size={20} className="text-indigo-500"/> Speed Profile across Voyage</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={speedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    <Area type="monotone" dataKey="speed" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSpeed)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">Event Log</h2>
                        <div className="flex flex-col relative h-[300px] overflow-y-auto no-scrollbar pr-2 pl-2">
                            <div className="absolute left-[20px] top-4 bottom-4 w-px bg-slate-200"></div>
                            {timeline.map((event, i) => (
                                <div key={i} className="flex gap-5 relative py-4">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center shrink-0 z-10">
                                        <div className={`w-3 h-3 rounded-full ${
                                            event.type === 'departure' ? 'bg-blue-500' : 
                                            event.type === 'arrival' ? 'bg-emerald-500' : 
                                            event.type === 'speed' ? 'bg-indigo-500' : 'bg-slate-400'
                                        }`} />
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[12px] font-bold text-slate-400 mb-0.5">{event.time}</p>
                                        <p className="text-[14px] font-bold text-slate-900 leading-snug">{event.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
