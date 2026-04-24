'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend } from 'recharts';
import { BarChart3, Activity, PieChart as PieChartIcon, Gauge, Navigation, Zap, Route, Loader2, Info } from 'lucide-react';

const InfoTooltip = ({ text }: { text: string }) => (
    <div className="relative group flex items-center">
        <Info size={14} className="text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-[220px] p-2.5 bg-slate-800 text-white text-[11px] font-medium leading-relaxed rounded-xl shadow-xl z-50 text-center pointer-events-none normal-case tracking-normal">
            {text}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
        </div>
    </div>
);

export default function AnalyticsHubPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                const res = await fetch(`${apiURL}/vessels/analytics/fleet-overview`);
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch fleet analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-slate-500 font-medium tracking-tight">Syncing Real-time Analytics...</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { kpis, speedAnalytics, utilization, movementStats, performance } = data;

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 py-5 md:py-8 flex flex-col gap-4 md:gap-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <BarChart3 size={20} />
                        </div>
                        Fleet Analytics Hub
                    </h1>
                    <p className="text-[14px] font-medium text-slate-500 mt-2">Comprehensive visual breakdown of your entire maritime operation.</p>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-4 md:gap-8">
                
                {/* Metrics Row */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Gauge size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                            Fleet Avg Speed
                            <InfoTooltip text="The average cruising speed of all active vessels over the last 7 days." />
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{kpis.avgSpeed}<span className="text-[14px] font-bold text-slate-400 ml-1">kts</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><PieChartIcon size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                            Active Vessels
                            <InfoTooltip text="The percentage of the total fleet that is currently operational and moving." />
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{kpis.activePercent}<span className="text-[14px] font-bold text-slate-400 ml-1">%</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Route size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                            Total Distance (7d)
                            <InfoTooltip text="The total nautical miles covered by the entire fleet over the past 7 days." />
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{kpis.totalDistance}<span className="text-[14px] font-bold text-slate-400 ml-1">nm</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                            7D Total Trips
                            <InfoTooltip text="The total number of completed trips across all vessels in the past 7 days." />
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{kpis.totalTrips}</p>
                    </div>
                </div>

                {/* Main Charts Array */}
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                    
                    {/* 1. Speed Analytics */}
                    <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500 relative">
                        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 z-0"></div>
                        </div>
                        <div className="relative z-10 flex flex-col h-full w-full">
                            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Gauge size={20} className="text-indigo-500"/> Speed Analytics
                                <InfoTooltip text="A 7-day historical trend of the fleet's average speed." />
                            </h2>
                            <p className="text-[13px] font-medium text-slate-500 mb-8">7-Day fleet average cruising speed from real-time tracker pings.</p>
                            
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={speedAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAvgSpeed" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                        <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                        <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
                                        <Area type="monotone" name="Avg Speed (kts)" dataKey="avgSpeed" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAvgSpeed)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* 2. Fleet Utilization */}
                    <div className="col-span-12 xl:col-span-4 bg-slate-900 rounded-3xl p-4 md:p-8 border border-slate-800 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between">
                        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative z-10 flex flex-col justify-between h-full w-full">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <PieChartIcon size={20} className="text-blue-400"/> Fleet Utilization
                                    <InfoTooltip text="A breakdown of vessels currently active, idle, or offline." />
                                </h2>
                                <p className="text-[13px] font-medium text-slate-400 mb-4">Current operating status distribution.</p>
                                
                                <div className="h-[220px] flex items-center justify-center -mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={utilization} innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                                                {utilization.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" style={{outline: 'none'}} />
                                                ))}
                                            </Pie>
                                            <RTTooltip 
                                                contentStyle={{borderRadius: '12px', border: 'border: 1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)'}}
                                                itemStyle={{color: '#fff', fontWeight: 'bold'}}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-2">
                                {utilization.map((item: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}80`}}></div>
                                            <span className="text-[13px] font-bold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-[14px] font-black text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Movement Statistics */}
                    <div className="col-span-12 xl:col-span-6 bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                        <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Navigation size={20} className="text-emerald-500"/> Movement Statistics
                            <InfoTooltip text="Daily completed trip counts over the past week." />
                        </h2>
                        <p className="text-[13px] font-medium text-slate-500 mb-8">Daily completed trips compared to fleet activity.</p>
                        
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={movementStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                    <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
                                    <Line type="monotone" name="Trips Completed" dataKey="trips" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6, strokeWidth: 0}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 4. Vessel Performance */}
                    <div className="col-span-12 xl:col-span-6 bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                        <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Zap size={20} className="text-amber-500"/> Vessel Performance
                            <InfoTooltip text="Top performing vessels measured by total nautical miles covered." />
                        </h2>
                        <p className="text-[13px] font-medium text-slate-500 mb-8">Top performing vessels by nautical miles covered this week.</p>
                        
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performance} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="vessel" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 'bold'}} dx={-10} />
                                    <RTTooltip 
                                        cursor={{fill: '#f8fafc', opacity: 0.5}} 
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                                    />
                                    <Bar dataKey="distance" name="Distance (nm)" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24}>
                                        {performance.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#94a3b8'} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" style={{outline: 'none'}} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
