'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useVesselStore } from '@/store/useVesselStore';
import { ArrowLeft, Ship, MapPin, Gauge, Droplets, Activity, Thermometer, Battery, AlertTriangle, Clock, Route, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid } from 'recharts';

export default function VesselAnalyticsDashboard() {
    const params = useParams();
    const id = params.id as string;
    
    const { vessels, livePositions } = useVesselStore();
    const vessel = vessels[id];
    const liveInfo = livePositions[id];

    // Analytics State Placeholder - Set to empty for now
    const [analytics, setAnalytics] = useState<any>(null);
    const [trips, setTrips] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVesselData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                
                // Fetch trips for this specific vessel
                const tripsRes = await fetch(`${apiURL}/trips/history/${id}`);
                const tripsData = await tripsRes.json();
                setTrips(Array.isArray(tripsData) ? tripsData : []);

                // Placeholder for analytics and timeline - these would come from dedicated endpoints
                setAnalytics({
                    distanceOverTime: [],
                    durationOverTime: [],
                    idleVsMoving: [],
                    efficiency: {
                        avgDistancePerTrip: 0,
                        totalTimeAtSea: '--',
                        idleTimeStr: '--'
                    }
                });
                
                setAlerts([]);
                setTimeline([]);
            } catch (err) {
                console.error("Failed to fetch vessel analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVesselData();
    }, [id]);

    if (!vessel) {
        return (
            <div className="flex-1 p-8 bg-slate-50 flex items-center justify-center flex-col gap-4">
                <p className="text-slate-500 font-medium text-lg">Vessel not found or still syncing.</p>
                <Link href="/fleet" className="px-5 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">Return to Vessel List</Link>
            </div>
        );
    }

    const COLORS = ['#3b82f6', '#94a3b8'];

    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            {/* Context Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-5">
                    <Link href="/fleet" className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
                            {vessel.name}
                            <span 
                                className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold ${
                                    vessel.status === 'ACTIVE' 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : vessel.status === 'MAINTENANCE' 
                                        ? 'bg-yellow-100 text-yellow-700' 
                                        : 'bg-slate-100 text-slate-600'
                                }`}
                            >
                                {vessel.status}
                            </span>
                        </h1>
                        <p className="text-[13px] font-medium text-slate-500">{vessel.type} • ID: {vessel.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Live Engine</span>
                        <span className={`text-[14px] font-bold ${liveInfo?.engineStatus === 'running' ? 'text-emerald-600' : 'text-slate-500 uppercase'}`}>{liveInfo ? liveInfo.engineStatus : 'OFFLINE'}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex flex-col items-end">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Location</span>
                        <span className="text-[12px] md:text-[14px] font-bold text-slate-800 text-right">{liveInfo && liveInfo.coordinates && liveInfo.coordinates.length >= 2 ? `${liveInfo.coordinates[1].toFixed(4)}, ${liveInfo.coordinates[0].toFixed(4)}` : '--'}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-[1600px] mx-auto flex flex-col gap-4 md:gap-8">
                
                {/* Core Live Telemetry row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 z-10"><Gauge size={24} /></div>
                        <div className="z-10 min-w-0">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Instant Speed</p>
                            <p className="text-[24px] md:text-[28px] font-black text-slate-900 tracking-tight">{liveInfo ? `${liveInfo.speed.toFixed(1)}` : '--'}<span className="text-[14px] font-bold text-slate-400 ml-1">kts</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 z-10"><Droplets size={24} /></div>
                        <div className="z-10 min-w-0">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fuel Level</p>
                            <p className="text-[24px] md:text-[28px] font-black text-slate-900 tracking-tight">{liveInfo ? `${liveInfo.fuelLevel}` : '--'}<span className="text-[14px] font-bold text-slate-400 ml-1">%</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 z-10"><Thermometer size={24} /></div>
                        <div className="z-10 min-w-0">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engine Temp</p>
                            <p className="text-[24px] md:text-[28px] font-black text-slate-900 tracking-tight">{liveInfo ? `85` : '--'}<span className="text-[14px] font-bold text-slate-400 ml-1">°C</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 z-10"><Battery size={24} /></div>
                        <div className="z-10 min-w-0">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Battery</p>
                            <p className="text-[24px] md:text-[28px] font-black text-slate-900 tracking-tight">{liveInfo ? `98` : '--'}<span className="text-[14px] font-bold text-slate-400 ml-1">%</span></p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center text-slate-400 font-medium">Gathering Intelligence...</div>
                ) : (
                    <div className="grid grid-cols-12 gap-4 md:gap-8">
                        {/* Area 1: High Level Charts */}
                        <div className="col-span-8 flex flex-col gap-4 md:gap-8">
                            <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Route size={18} className="text-blue-500" /> Distance Over Time (Current Week)</h3>
                                <div className="h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={analytics?.distanceOverTime || []}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                            <RTTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                            <Bar dataKey="distance" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                                <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock size={18} className="text-indigo-500" /> Trip Duration Patterns</h3>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analytics?.durationOverTime || []}>
                                                <defs>
                                                    <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" hide />
                                                <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                                <Area type="monotone" dataKey="duration" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDuration)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2"><Activity size={18} className="text-cyan-500" /> Engine State (Idle vs Moving)</h3>
                                    <div className="h-[180px] flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={analytics?.idleVsMoving || []} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                                    {(analytics?.idleVsMoving || []).map((entry: any, index: number) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-6 mt-2">
                                        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Moving (75%)</div>
                                        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600"><span className="w-3 h-3 rounded-full bg-slate-400"></span> Idle (25%)</div>
                                    </div>
                                </div>
                            </div>

                            {/* Trip Intelligence Table */}
                            <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Route size={18} className="text-emerald-500" /> Trip Intelligence</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px] text-left border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Trip ID</th>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Start Time</th>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">End Time</th>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Distance</th>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Avg Speed</th>
                                                <th className="pb-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(Array.isArray(trips) ? trips : []).map(trip => (
                                                <tr key={trip?.id || Math.random()} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                                                    <td className="py-4 text-[14px] font-bold text-slate-900">{trip.id}</td>
                                                    <td className="py-4 text-[14px] font-medium text-slate-600">{new Date(trip.startTime).toLocaleString()}</td>
                                                    <td className="py-4 text-[14px] font-medium text-slate-600">{new Date(trip.endTime).toLocaleString()}</td>
                                                    <td className="py-4 text-[14px] font-bold text-slate-800">{trip.distance} nm</td>
                                                    <td className="py-4 text-[14px] font-bold text-slate-800">{trip.avgSpeed} kts</td>
                                                    <td className="py-4">
                                                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600">{trip.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Area 2: Side Panels (Alerts, Timeline, Heatmap) */}
                        <div className="col-span-4 flex flex-col gap-4 md:gap-8">
                            
                            {/* Alert Feed */}
                            <div className="bg-white border border-rose-100 rounded-3xl p-4 md:p-6 shadow-sm flex flex-col">
                                <h3 className="font-bold text-rose-900 mb-6 flex items-center gap-2"><AlertTriangle size={18} className="text-rose-500" /> Active Vessel Alerts</h3>
                                <div className="flex flex-col gap-4">
                                    {(Array.isArray(alerts) ? alerts : []).map(alert => (
                                        <div key={alert?.id || Math.random()} className="flex gap-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5"><AlertTriangle size={14} /></div>
                                            <div>
                                                <p className="text-[13px] font-bold text-slate-900">{alert.type.replace('_', ' ')}</p>
                                                <p className="text-[13px] font-medium text-slate-600 mt-0.5 leading-snug">{alert.message}</p>
                                                <p className="text-[11px] font-bold text-slate-400 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!Array.isArray(alerts) || alerts.length === 0) && <p className="text-[13px] font-medium text-slate-400">No active alerts.</p>}
                                </div>
                            </div>

                            {/* Efficiency Metrics Micro Card */}
                            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-4 md:p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                                <h3 className="font-bold text-slate-100 mb-6 flex items-center gap-2"><CheckCircle size={18} className="text-emerald-400" /> Lifetime Efficiency</h3>
                                <div className="flex flex-col gap-5 relative z-10">
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                        <span className="text-[14px] font-medium text-slate-400 tracking-wide">Avg Distance / Trip</span>
                                        <span className="text-[18px] font-bold text-white">{analytics?.efficiency?.avgDistancePerTrip} nm</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                        <span className="text-[14px] font-medium text-slate-400 tracking-wide">Total Time at Sea</span>
                                        <span className="text-[18px] font-bold text-emerald-400">{analytics?.efficiency?.totalTimeAtSea}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[14px] font-medium text-slate-400 tracking-wide">Total Idle Time</span>
                                        <span className="text-[18px] font-bold text-rose-400">{analytics?.efficiency?.idleTimeStr}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Timeline */}
                            <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm flex flex-col">
                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><MapPin size={18} className="text-purple-500" /> Activity Timeline</h3>
                                <div className="flex flex-col gap-0 relative">
                                    <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200"></div>
                                    {(Array.isArray(timeline) ? timeline : []).map((event, index) => (
                                        <div key={event?.id || Math.random()} className="flex gap-4 relative py-3">
                                            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 z-10">
                                                <div className={`w-3 h-3 rounded-full ${event?.event?.includes('MOVING') ? 'bg-emerald-500' : event?.event?.includes('IDLE') ? 'bg-slate-400' : 'bg-amber-500'}`}></div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="text-[11px] font-bold text-blue-500 mb-0.5">{event?.timestamp ? new Date(event.timestamp).toLocaleTimeString() : '--'}</p>
                                                <p className="text-[13px] font-bold text-slate-900">{event?.event ? event.event.replace('_', ' ') : 'Unknown'}</p>
                                                <p className="text-[12px] font-medium text-slate-500 mt-0.5">{event?.details || ''}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
