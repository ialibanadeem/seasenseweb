'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend } from 'recharts';
import { BarChart3, Activity, PieChart as PieChartIcon, Gauge, Navigation, Zap, Route } from 'lucide-react';

export default function AnalyticsHubPage() {
    // Mock Data
    const speedData = [
        { day: 'Mon', avgSpeed: 14.2, maxSpeed: 18.5 },
        { day: 'Tue', avgSpeed: 12.0, maxSpeed: 19.3 },
        { day: 'Wed', avgSpeed: 15.6, maxSpeed: 21.0 },
        { day: 'Thu', avgSpeed: 13.8, maxSpeed: 17.8 },
        { day: 'Fri', avgSpeed: 16.4, maxSpeed: 22.1 },
        { day: 'Sat', avgSpeed: 11.2, maxSpeed: 16.5 },
        { day: 'Sun', avgSpeed: 14.8, maxSpeed: 19.0 },
    ];

    const utilizationData = [
        { name: 'Active', value: 75, color: '#3b82f6' },
        { name: 'Idle', value: 15, color: '#94a3b8' },
        { name: 'Maintenance', value: 10, color: '#f43f5e' },
    ];

    const performanceData = [
        { vessel: 'Al-Mehran', distance: 1240, efficiency: 92 },
        { vessel: 'Gwadar Pearl', distance: 980, efficiency: 88 },
        { vessel: 'Sindhbad Exp', distance: 850, efficiency: 85 },
        { vessel: 'Bolan Trans', distance: 720, efficiency: 79 },
        { vessel: 'Shahbaz Trk', distance: 680, efficiency: 75 },
    ];

    const movementData = [
        { day: 'Mon', trips: 12, alerts: 2 },
        { day: 'Tue', trips: 15, alerts: 1 },
        { day: 'Wed', trips: 19, alerts: 4 },
        { day: 'Thu', trips: 14, alerts: 0 },
        { day: 'Fri', trips: 22, alerts: 5 },
        { day: 'Sat', trips: 10, alerts: 1 },
        { day: 'Sun', trips: 8, alerts: 0 },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-8 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <BarChart3 size={20} />
                        </div>
                        Fleet Analytics Hub
                    </h1>
                    <p className="text-[14px] font-medium text-slate-500 mt-2">Comprehensive visual breakdown of your entire maritime operation.</p>
                </div>
            </div>

            <div className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
                
                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Gauge size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fleet Avg Speed</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">14.0<span className="text-[14px] font-bold text-slate-400 ml-1">kts</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><PieChartIcon size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Vessels</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">75<span className="text-[14px] font-bold text-slate-400 ml-1">%</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Route size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Distance (7d)</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">4,470<span className="text-[14px] font-bold text-slate-400 ml-1">nm</span></p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={22} /></div>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Trips</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">100</p>
                    </div>
                </div>

                {/* Main Charts Array */}
                <div className="grid grid-cols-12 gap-8">
                    
                    {/* 1. Speed Analytics */}
                    <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Gauge size={20} className="text-indigo-500"/> Speed Analytics</h2>
                            <p className="text-[13px] font-medium text-slate-500 mb-8">7-Day fleet average cruising speed versus maximum observed speeds.</p>
                            
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={speedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                                        <Area type="monotone" name="Max Speed (kts)" dataKey="maxSpeed" stroke="#94a3b8" strokeDasharray="5 5" fillOpacity={0} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* 2. Fleet Utilization */}
                    <div className="col-span-12 xl:col-span-4 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><PieChartIcon size={20} className="text-blue-400"/> Fleet Utilization</h2>
                            <p className="text-[13px] font-medium text-slate-400 mb-4">Current operating status distribution.</p>
                            
                            <div className="h-[220px] flex items-center justify-center -mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={utilizationData} innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                                            {utilizationData.map((entry, index) => (
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

                            <div className="flex flex-col gap-3 mt-2">
                                {utilizationData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}80`}}></div>
                                            <span className="text-[13px] font-bold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-[14px] font-black text-white">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Movement Statistics */}
                    <div className="col-span-12 xl:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                        <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Navigation size={20} className="text-emerald-500"/> Movement Statistics</h2>
                        <p className="text-[13px] font-medium text-slate-500 mb-8">Daily completed trips compared to route deviation alerts.</p>
                        
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={movementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                    <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
                                    <Line type="monotone" name="Trips Completed" dataKey="trips" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6, strokeWidth: 0}} />
                                    <Line type="monotone" name="Nav Alerts" dataKey="alerts" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" dot={{r: 3}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 4. Vessel Performance */}
                    <div className="col-span-12 xl:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                        <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Zap size={20} className="text-amber-500"/> Vessel Performance</h2>
                        <p className="text-[13px] font-medium text-slate-500 mb-8">Top 5 vessels by nautical miles covered this week.</p>
                        
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="vessel" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 'bold'}} dx={-10} />
                                    <RTTooltip 
                                        cursor={{fill: '#f8fafc', opacity: 0.5}} 
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                                    />
                                    <Bar dataKey="distance" name="Distance (nm)" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24}>
                                        {performanceData.map((entry, index) => (
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
