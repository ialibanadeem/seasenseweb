'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, MapPin, Activity, Clock, ShieldAlert, Cpu, Filter, Download, CheckCircle, Search, Loader2 } from 'lucide-react';

export default function AlertsDashboardPage() {

    // Live state tracking for read statuses
    const [alerts, setAlerts] = useState<any[]>([]);
    const [trendData, setTrendData] = useState<any[]>([]);
    const [kpis, setKpis] = useState({
        system: 9, geofence: 7, signal: 4, idle: 18,
        trends: { system: '↑ 12%', geofence: '↓ 4%', signal: 'Stable', idle: '↓ 8%' }
    });
    
    const [filterQuery, setFilterQuery] = useState('');
    const [actionStates, setActionStates] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(`${API_BASE}/alerts`);
                if (res.ok) setAlerts(await res.json());

                const kpiRes = await fetch(`${API_BASE}/alerts/kpis`);
                if (kpiRes.ok) setKpis(await kpiRes.json());

                const trendsRes = await fetch(`${API_BASE}/alerts/trends`);
                if (trendsRes.ok) setTrendData(await trendsRes.json());
            } catch (err) {
                console.error("Failed to load live alerts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, [API_BASE]);

    const filteredAlerts = (Array.isArray(alerts) ? alerts : []).filter(alt => 
        alt?.vessel?.toLowerCase().includes(filterQuery.toLowerCase()) || 
        alt?.type?.toLowerCase().includes(filterQuery.toLowerCase()) ||
        alt?.message?.toLowerCase().includes(filterQuery.toLowerCase()) ||
        alt?.id?.toLowerCase().includes(filterQuery.toLowerCase())
    );

    const markAllRead = async () => {
        setAlerts(alerts.map(a => ({ ...a, isRead: true })));
        try { await fetch(`${API_BASE}/alerts/mark-all-read`, { method: 'POST' }); } catch(e) {}
    };

    const toggleReadStatus = async (id: string, dbId: string) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: !a.isRead } : a));
        try { await fetch(`${API_BASE}/alerts/${dbId}/toggle-read`, { method: 'PATCH' }); } catch(e) {}
    };

    const handleActionClick = async (e: React.MouseEvent, id: string, dbId: string) => {
        e.stopPropagation(); // Prevent row click
        
        if (actionStates[id]) return; // Block double clicks

        setActionStates(prev => ({ ...prev, [id]: 'processing' }));
        
        try {
            await fetch(`${API_BASE}/alerts/${dbId}/action`, { method: 'POST' });
            setActionStates(prev => ({ ...prev, [id]: 'done' }));
        } catch(err) {
            console.error(err);
        }

        // Revert back after 2.5s
        setTimeout(() => {
            setActionStates(prev => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            });
        }, 2500);
    };

    const getSeverityIcon = (type: string) => {
        switch(type) {
            case 'System': return <Cpu size={16} />;
            case 'Geofence': return <MapPin size={16} />;
            case 'Signal Loss': return <Activity size={16} />;
            case 'Idle': return <Clock size={16} />;
            default: return <AlertTriangle size={16} />;
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch(severity) {
            case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'High': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Medium': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Low': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 md:px-8 py-5 md:py-8 flex flex-col gap-4 md:gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:scale-105 transition-transform cursor-default">
                                <ShieldAlert size={20} />
                            </div>
                            System Alerts Dashboard
                        </h1>
                        <p className="text-[14px] font-medium text-slate-500 mt-2">Monitor critical infrastructure, navigational boundries, device uptime, and vessel downtime efficiently.</p>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-4 md:gap-8">
                
                {/* 4 Interactive KPI Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    {/* System Alerts */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Cpu size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">{kpis?.trends?.system ?? '↑ 12%'}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">System Failures</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{kpis?.system ?? 9}</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">active</p>
                            </div>
                        </div>
                    </div>

                    {/* Geofence Alerts */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform"><MapPin size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">{kpis?.trends?.geofence ?? '↓ 4%'}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Geofence Breaches</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{kpis?.geofence ?? 7}</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">this week</p>
                            </div>
                        </div>
                    </div>

                    {/* Signal Loss */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Activity size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{kpis?.trends?.signal ?? 'Stable'}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signal Drops</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{kpis?.signal ?? 4}</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">incidents</p>
                            </div>
                        </div>
                    </div>

                    {/* Idle Alerts */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Clock size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{kpis?.trends?.idle ?? '↓ 8%'}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Excessive Idle</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{kpis?.idle ?? 18}</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">occurrences</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Trends Chart */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">7-Day Alert Activity Trends</h2>
                            <p className="text-[13px] font-medium text-slate-500">Historical breakdown of alert frequency by diagnostic type.</p>
                        </div>
                    </div>
                    
                    <div className="h-[320px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSystem" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorGeofence" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorIdle" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 'bold'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 'bold'}} />
                                <RTTooltip 
                                    contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#0f172a', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                                    itemStyle={{fontWeight: 'bold'}}
                                />
                                <Legend wrapperStyle={{paddingTop: '20px', color: '#64748b'}} iconType="circle" />
                                
                                <Area type="natural" name="System" dataKey="System" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSystem)" activeDot={{r: 6, strokeWidth: 0, fill: '#3b82f6', filter: 'drop-shadow(0px 0px 4px rgba(59,130,246,0.5))'}} />
                                <Area type="natural" name="Idle" dataKey="Idle" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorIdle)" activeDot={{r: 6, strokeWidth: 0, fill: '#0ea5e9', filter: 'drop-shadow(0px 0px 4px rgba(14,165,233,0.5))'}} />
                                <Area type="natural" name="Geofence" dataKey="Geofence" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorGeofence)" activeDot={{r: 6, strokeWidth: 0, fill: '#4f46e5', filter: 'drop-shadow(0px 0px 4px rgba(79,70,229,0.5))'}} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts Data Table */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Live Alerts List</h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search alerts by vessel or ID..." 
                                    value={filterQuery}
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all w-64 text-slate-700" 
                                />
                            </div>
                            <button 
                                onClick={markAllRead}
                                className="px-3 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 text-[13px] shadow-sm hover:scale-105 active:scale-95"
                            >
                                <CheckCircle size={16} /> Mark All Read
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left border-collapse">
                            <thead>
                                <tr className="bg-white">
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 w-12"></th>
                                    <th className="py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Alert ID</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Type & Context</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Vessel</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Severity</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <Loader2 className="animate-spin text-blue-500" size={24} />
                                                Loading live fleet alerts...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
                                    <tr 
                                        key={alert.id} 
                                        onClick={() => toggleReadStatus(alert.id, alert.dbId)}
                                        className={`transition-all duration-300 border-b border-slate-50 group cursor-pointer hover:shadow-md hover:z-10 relative 
                                            ${alert.isRead ? 'bg-white hover:bg-slate-50/80' : 'bg-blue-50/30 hover:bg-blue-50'}`}
                                        style={{ transform: 'scale(1)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.002)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <td className="px-6 py-5 text-center">
                                            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${alert.isRead ? 'bg-transparent' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`} />
                                        </td>
                                        <td className={`py-5 text-[14px] font-bold ${alert.isRead ? 'text-slate-500' : 'text-slate-900'}`}>{alert.id}</td>
                                        <td className="px-6 py-5 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${alert.isRead ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {getSeverityIcon(alert.type)}
                                                </div>
                                                <div className="flex flex-col transform group-hover:translate-x-1 transition-transform">
                                                    <span className={`text-[15px] font-bold leading-tight mb-0.5 ${alert.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{alert.message}</span>
                                                    <span className={`text-[12px] font-medium ${alert.isRead ? 'text-slate-400' : 'text-blue-500'}`}>{alert.type} issue • {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`text-[14px] font-bold ${alert.isRead ? 'text-slate-600' : 'text-slate-900'}`}>{alert.vessel}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest border ${getSeverityBadge(alert.severity)} ${alert.isRead ? 'opacity-70' : 'opacity-100'}`}>
                                                {alert.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button 
                                                onClick={(e) => handleActionClick(e, alert.id, alert.dbId)}
                                                disabled={actionStates[alert.id] === 'processing'}
                                                className={`text-[13px] font-bold px-3 py-1.5 rounded-lg transition-transform border min-w-[100px] text-center
                                                    ${!actionStates[alert.id] && 'hover:scale-105 active:scale-95'} 
                                                    ${alert.isRead ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50' : 'bg-blue-50 border-blue-100 text-blue-600 hover:text-blue-700 hover:bg-blue-100'}
                                                    ${actionStates[alert.id] === 'processing' ? '!opacity-70 cursor-wait' : ''}
                                                    ${actionStates[alert.id] === 'done' ? '!bg-emerald-50 !border-emerald-200 !text-emerald-700' : ''}`}
                                            >
                                                {actionStates[alert.id] === 'processing' ? 'Working...' : actionStates[alert.id] === 'done' ? 'Completed ✓' : alert.action}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">No alerts mapping this criteria. All is well!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
