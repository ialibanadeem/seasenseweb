'use client';

import React, { useState, useEffect } from 'react';
import { 
    Download, FileText, CheckCircle, Ship, Map, AlertTriangle, Filter, Search, 
    Calendar, FileSpreadsheet, Loader2, Plus, X, BarChart, Activity, Gauge, 
    Trash2, Clock, Navigation, Zap, ArrowRight, TrendingUp, Info, Eye
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, 
    ResponsiveContainer, BarChart as ReBarChart, Bar, Cell, LineChart, Line, PieChart, Pie 
} from 'recharts';
import { useVesselStore } from '../../store/useVesselStore';

// Initial Mock Reports
const initialReports = [
    { id: 'AU-2026-801', period: 'Mar 25 - Mar 31', generatedBy: 'System', type: 'Speed Behavior Audit', size: '2.8 MB', status: 'Ready' },
    { id: 'AU-2026-802', period: 'Mar 20 - Mar 24', generatedBy: 'Admin', type: 'Route Deviation Report', size: '1.4 MB', status: 'Ready' },
    { id: 'AU-2026-803', period: 'Mar 15 - Mar 19', generatedBy: 'Auto-Scheduler', type: 'Trip Timeline Analysis', size: '3.1 MB', status: 'Ready' }
];

export default function FleetReportsPage() {
    const vessels = useVesselStore((state) => state.vessels);
    const setVessels = useVesselStore((state) => state.setVessels);
    const [reports, setReports] = useState(initialReports);
    const [searchQuery, setSearchQuery] = useState('');
    const [downloading, setDownloading] = useState<Record<string, string>>({});
    
    // Modal & Generation State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [genProgress, setGenProgress] = useState(0);
    const [genType, setGenType] = useState('Speed Behavior Audit');
    const [genVessel, setGenVessel] = useState('All Collective Vessels');

    // Fetch Initial Vessels if not already loaded
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
                console.error("Failed to fetch initial vessels for reports:", err);
            }
        };
        fetchVessels();
    }, [setVessels]);

    // Viewer State
    const [viewingReport, setViewingReport] = useState<any | null>(null);

    // Advanced Data Engine (Mock Data for Reports)
    const getReportData = (type: string, targetVessel: string) => {
        const isCollective = targetVessel === 'All Collective Vessels';
        
        // Base metrics for single vessel
        const baseMetrics = [
            { label: 'Avg Cruising Speed', value: '14.2 kn', status: 'Optimal' },
            { label: 'Max Speed Recorded', value: '22.8 kn', status: 'Notice' },
            { label: 'Throttle Efficiency', value: '94.2%', status: 'Excellent' }
        ];

        // Collective metrics (Aggregated)
        const collectiveMetrics = [
            { label: 'Fleet Avg Speed', value: '15.1 kn', status: 'Optimal' },
            { label: 'Total Fleet Distance', value: '842.4 nm', status: 'Above Target' },
            { label: 'Overall Compliance', value: '96.8%', status: 'Excellent' }
        ];

        // Vessel breakdown for table
        const vesselBreakdownData = [
            { name: 'Shaheen', trips: 12, distance: '412.0 nm', speed: '14.8 kn', score: '98%' },
            { name: 'Sea-Sense Alpha', trips: 8, distance: '220.4 nm', speed: '16.2 kn', score: '94%' },
            { name: 'Maritime-X', trips: 4, distance: '210.0 nm', speed: '13.5 kn', score: '99%' }
        ];

        switch (type) {
            case 'Speed Behavior Audit':
                return {
                    isCollective,
                    metrics: isCollective ? collectiveMetrics : baseMetrics,
                    chartData: [
                        { range: '0-5 kn', value: 12, label: 'Idle/Low' },
                        { range: '5-12 kn', value: 25, label: 'Maneuvering' },
                        { range: '12-18 kn', value: 48, label: 'Cruising' },
                        { range: '18-25 kn', value: 15, label: 'High Speed' }
                    ],
                    distribution: [
                        { name: 'Efficient', value: 82, color: '#2563eb' },
                        { name: 'Over-Throttle', value: 18, color: '#f43f5e' }
                    ],
                    vesselRankings: [
                        { name: 'Sea-Sense Alpha', value: 96 },
                        { name: 'Shaheen', value: 92 },
                        { name: 'Maritime-X', value: 88 }
                    ],
                    vesselBreakdown: vesselBreakdownData
                };
            case 'Trip Timeline Analysis':
                return {
                    isCollective,
                    metrics: isCollective ? [
                        { label: 'Fleet Active Time', value: '412h 10m', status: 'High' },
                        { label: 'Collective Trips', value: '52', status: 'Good' },
                        { label: 'Fleet IDLE Avg', value: '4.2%', status: 'Minimal' }
                    ] : [
                        { label: 'Total Active Time', value: '142h 20m', status: 'Normal' },
                        { label: 'Idle Duration', value: '12h 05m', status: 'Good' },
                        { label: 'Trips Completed', value: '24', status: 'Target Hit' }
                    ],
                    timeline: [
                        { time: '08:00 AM', event: 'Fleet Departure', location: 'Multiple Ports', detail: 'Group A & B synchronized launch.' },
                        { time: '12:45 PM', event: 'Peak Activity', location: 'Regional Sector', detail: 'Maximum fleet deployment reached.' },
                        { time: '04:30 PM', event: 'Stationary Update', location: 'Central Anchor', detail: 'Consolidated idle reporting sequence.' }
                    ],
                    vesselBreakdown: vesselBreakdownData
                };
            case 'Route Deviation Report':
                return {
                    isCollective,
                    metrics: isCollective ? [
                        { label: 'Fleet Cross-Track Avg', value: '3.8m', status: 'Precision' },
                        { label: 'Fleet Path Reliability', value: '97.2%', status: 'High' },
                        { label: 'Incident Variance', value: 'Negligible', status: 'Safe' }
                    ] : [
                        { label: 'Avg Cross-Track Error', value: '4.2m', status: 'Precision' },
                        { label: 'Max Deviation Event', value: '15.8m', status: 'Audit' },
                        { label: 'Nav Reliability', value: '99.1%', status: 'Excellent' }
                    ],
                    deviationStats: [
                        { day: 'Mon', error: 2.1 }, { day: 'Tue', error: 4.5 }, { day: 'Wed', error: 1.2 },
                        { day: 'Thu', error: 8.4 }, { day: 'Fri', error: 3.6 }, { day: 'Sat', error: 2.8 }, { day: 'Sun', error: 1.5 }
                    ],
                    vesselRankings: [
                        { name: 'Maritime-X', value: 99 },
                        { name: 'Shaheen', value: 97 },
                        { name: 'Sea-Sense Alpha', value: 92 }
                    ],
                    vesselBreakdown: vesselBreakdownData
                };
            default:
                return null;
        }
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setGenProgress(0);
        
        const interval = setInterval(() => {
            setGenProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    finalizeGeneration();
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const finalizeGeneration = () => {
        const newReport = {
            id: `AU-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            period: 'Mar 2026',
            generatedBy: 'Admin',
            type: genType,
            size: '1.5 MB',
            status: 'Ready'
        };
        setReports([newReport, ...reports]);
        setIsGenerating(false);
        setIsModalOpen(false);
    };

    const handleDownload = (id: string, format: string, type: string) => {
        const key = `${id}_${format}`;
        if (downloading[key]) return;
        setDownloading(prev => ({ ...prev, [key]: `exporting_${format}` }));
        
        setTimeout(() => {
            const content = format === 'csv' 
                ? `Timestamp,ID,Type,Target\n${new Date().toISOString()},${id},${type},${genVessel}`
                : `SeaSense AI Professional Audit\n--------------------------\nID: ${id}\nType: ${type}\nGenerated: ${new Date().toLocaleString()}`;
            
            const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${type.replace(/ /g, '_')}_${id}.${format === 'csv' ? 'csv' : 'txt'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            setDownloading(prev => ({ ...prev, [key]: 'done' }));
            setTimeout(() => {
                setDownloading(prev => {
                    const next = { ...prev };
                    delete next[key];
                    return next;
                });
            }, 3000);
        }, 1500);
    };

    const filtered = reports.filter(r => 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col font-sans">
            {/* Nav Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-8 flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <BarChart size={20} />
                        </div>
                        Audit & Reporting Centre
                    </h1>
                    <p className="text-[14px] font-medium text-slate-500 mt-2">Enterprise-grade fleet intelligence and movement auditing suite.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find specific audit..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-[13px] font-bold transition-all w-72" 
                        />
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold text-[14px] shadow-lg shadow-blue-600/10 flex items-center gap-2 active:scale-95 transition-all"
                    >
                        <Plus size={18} />
                        Build New Audit
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
                {/* Visual KPI Cards */}
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { icon: Activity, label: 'Data Quality', value: '99.1%', color: 'blue', detail: 'High Sync' },
                        { icon: Gauge, label: 'Fleet Efficiency', value: '88.4%', color: 'emerald', detail: 'v/s Last Month' },
                        { icon: Navigation, label: 'Deviations', value: '2.4%', color: 'rose', detail: 'Operational Flags' },
                        { icon: Ship, label: 'Active Reports', value: reports.length, color: 'sky', detail: 'Ready for Export' }
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}><kpi.icon size={22} /></div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest text-${kpi.color}-600 bg-${kpi.color}-50 px-2.5 py-1 rounded-lg`}>{kpi.detail}</span>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Audit Registry */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white text-slate-900">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                             Full Audit Registry
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Real-time DB Sync</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Document Details</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Analysis Period</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Operational Type</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Inspection Hub</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(report => (
                                    <tr key={report.id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-slate-900">{report.id}</p>
                                                    <p className="text-[12px] font-medium text-slate-400">Generated by {report.generatedBy}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[13px] font-bold text-slate-600 flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-300" />
                                                {report.period}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[14px] font-bold text-slate-800">{report.type}</p>
                                            <p className="text-[12px] font-medium text-slate-500 uppercase tracking-wider">{report.size}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${report.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => {
                                                        const target = report.id === 'AU-2026-801' ? 'All Collective Vessels' : 'Shaheen';
                                                        setViewingReport({ ...report, data: getReportData(report.type, target) });
                                                    }}
                                                    className="w-10 h-10 rounded-xl border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-90"
                                                    title="Visual Audit"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDownload(report.id, 'pdf', report.type)}
                                                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-[12px] font-bold hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95"
                                                >
                                                    <Download size={14} /> PDF
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Build New Audit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
                        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Configurator</h3>
                                <p className="text-[14px] font-medium text-slate-500 mt-1">Define scope for enterprise movement intelligence.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 flex flex-col gap-8">
                            {isGenerating ? (
                                <div className="py-20 flex flex-col items-center gap-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full border-4 border-blue-50 border-t-blue-500 animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center font-black text-blue-600 text-sm">{genProgress}%</div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-black text-slate-900 tracking-tight">Constructing High-Fidelity Audit...</p>
                                        <p className="text-[13px] font-medium text-slate-500 mt-2">Syncing cross-referenced telemetry nodes for {genVessel}.</p>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${genProgress}%` }} />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Analysis Target</label>
                                        <select 
                                            value={genVessel}
                                            onChange={(e) => setGenVessel(e.target.value)}
                                            className="w-full px-5 py-4 rounded-3xl border border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all appearance-none outline-none"
                                        >
                                            <option>All Collective Vessels</option>
                                            {Object.values(vessels).map(v => <option key={v.id}>{v.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Intelligent Audit Type</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { type: 'Speed Behavior Audit', icon: Gauge, desc: 'Advanced cruising & fuel efficiency analysis.' },
                                                { type: 'Trip Timeline Analysis', icon: Clock, desc: 'Detailed stop-by-stop activity auditing.' },
                                                { type: 'Route Deviation Report', icon: Map, desc: 'Navigational precision and safety scoring.' }
                                            ].map(opt => (
                                                <button 
                                                    key={opt.type}
                                                    onClick={() => setGenType(opt.type)}
                                                    className={`p-5 rounded-[28px] border-2 flex items-start gap-4 transition-all text-left group
                                                        ${genType === opt.type ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 bg-slate-50/30 hover:border-slate-200 hover:bg-white'}
                                                    `}
                                                >
                                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${genType === opt.type ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50'}`}>
                                                        <opt.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-[14px] font-black ${genType === opt.type ? 'text-blue-900' : 'text-slate-700'}`}>{opt.type}</p>
                                                        <p className="text-[12px] font-medium text-slate-500 mt-0.5">{opt.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <button onClick={() => setIsModalOpen(false)} className="w-full py-4.5 rounded-[24px] border border-slate-200 text-[14px] font-bold text-slate-400 hover:bg-slate-50 transition-all active:scale-95 text-center">Discard</button>
                                        <button onClick={handleGenerate} className="w-full py-4.5 rounded-[24px] bg-blue-600 text-white text-[14px] font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-center">Initialize Audit</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Visual Audit Viewer (Digital Report) */}
            {viewingReport && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out border-l border-white/20">
                        {/* Viewer Header */}
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-blue-600 to-sky-500 text-white shrink-0">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 rounded-lg bg-white/20 text-[10px] font-black uppercase tracking-widest">Document ID: {viewingReport.id}</span>
                                    <span className="px-3 py-1 rounded-lg bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-widest">{viewingReport.status}</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight">{viewingReport.type}</h3>
                                <p className="text-blue-100 font-medium text-[14px] mt-1 flex items-center gap-2">
                                    <Ship size={14} /> Comprehensive Audit for SeaSense Collective Fleet
                                </p>
                            </div>
                            <button onClick={() => setViewingReport(null)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Viewer Body */}
                        <div className="flex-1 overflow-y-auto p-12 bg-[#fdfdfd]">
                            <div className="max-w-[700px] mx-auto flex flex-col gap-12">
                                
                                {/* 1. Visual Scorecards */}
                                <div className="grid grid-cols-3 gap-6">
                                    {viewingReport.data?.metrics.map((m: any, i: number) => (
                                        <div key={i} className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm flex flex-col gap-2">
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                                            <p className="text-2xl font-black text-slate-900">{m.value}</p>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">✓ {m.status}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* 2. Deep Intelligence (Conditional View) */}
                                {viewingReport.data?.isCollective && (
                                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-blue-50/50 p-8 rounded-[40px] border border-blue-100/50 mb-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2"><TrendingUp size={20} className="text-blue-600" /> Comparative Fleet Rankings</h4>
                                            <span className="text-[11px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">Efficiency Index</span>
                                        </div>
                                        <div className="h-[220px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <ReBarChart data={viewingReport.data.vesselRankings} layout="vertical" margin={{ left: 40 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#1e293b'}} />
                                                    <Bar dataKey="value" fill="#2563eb" radius={[0, 10, 10, 0]} barSize={24}>
                                                        {viewingReport.data.vesselRankings.map((entry: any, index: number) => (
                                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#94a3b8'} />
                                                        ))}
                                                    </Bar>
                                                </ReBarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed text-center px-6">
                                            Vessel <span className="text-blue-700 font-bold">"{viewingReport.data.vesselRankings[0].name}"</span> currently leads the fleet in navigational precision and throttle optimization for this audit cycle.
                                        </p>
                                    </div>
                                )}

                                {viewingReport.type === 'Speed Behavior Audit' && (
                                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2"><Zap size={20} className="text-blue-500" /> {viewingReport.data?.isCollective ? 'Fleet Velocity' : 'Velocity'} Distribution Map</h4>
                                            <TrendingUp size={20} className="text-slate-300" />
                                        </div>
                                        <div className="h-[300px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={[
                                                    { t: '0h', v: 4 }, { t: '2h', v: 12 }, { t: '4h', v: 18 }, 
                                                    { t: '6h', v: 15 }, { t: '8h', v: 22 }, { t: '10h', v: 14 }
                                                ]}>
                                                    <defs>
                                                        <linearGradient id="colorVel" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                                    <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorVel)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-[13px] font-bold text-slate-600 leading-relaxed">
                                                Analysis reveals that the {viewingReport.data?.isCollective ? 'fleet' : 'vessel'} maintains an <span className="text-blue-600 font-black">82% Efficiency Rating</span> by staying within the cruise velocity range for the majority of the voyage. Minor over-throttle events detected during high-tide windows.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {viewingReport.type === 'Trip Timeline Analysis' && (
                                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2"><Clock size={20} className="text-blue-500" /> {viewingReport.data?.isCollective ? 'Fleet Log Feed' : 'Operational Log Feed'}</h4>
                                            <CheckCircle size={20} className="text-emerald-500" />
                                        </div>
                                        <div className="flex flex-col gap-0 border-l-2 border-blue-100 ml-4">
                                            {viewingReport.data?.timeline.map((t: any, i: number) => (
                                                <div key={i} className="relative pl-10 pb-10">
                                                    <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-blue-600 shadow-md"></div>
                                                    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[11px] font-black text-blue-600 tracking-tighter">{t.time}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{t.location}</span>
                                                        </div>
                                                        <p className="text-[15px] font-black text-slate-900">{t.event}</p>
                                                        <p className="text-[13px] font-medium text-slate-500 mt-1">{t.detail}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {viewingReport.type === 'Route Deviation Report' && (
                                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2"><Map size={20} className="text-blue-500" /> {viewingReport.data?.isCollective ? 'Fleet Reliability' : 'Cross-Track Reliability'} Index</h4>
                                            <Info size={20} className="text-blue-400" />
                                        </div>
                                        <div className="h-[250px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <ReBarChart data={viewingReport.data?.deviationStats}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                                    <Bar dataKey="error" fill="#2563eb" radius={[6, 6, 0, 0]} />
                                                </ReBarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                                    <CheckCircle size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-emerald-950">Navigational Drift</p>
                                                    <p className="text-[12px] font-medium text-emerald-800">Within acceptable margins.</p>
                                                </div>
                                            </div>
                                            <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                                                    <TrendingUp size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-blue-950">Reliability Index</p>
                                                    <p className="text-[12px] font-medium text-blue-800">Top 5% of global fleet.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 4. Vessel-by-Vessel Performance Table (New for Collective Reports) */}
                                {viewingReport.data?.isCollective && (
                                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2"><Ship size={20} className="text-blue-500" /> Vessel Contribution Breakdown</h4>
                                            <FileSpreadsheet size={20} className="text-slate-300" />
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                                            <table className="w-full text-left">
                                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                                    <tr>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vessel Name</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Trips</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Dist. (nm)</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Efficiency</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {viewingReport.data.vesselBreakdown.map((vb: any, idx: number) => (
                                                        <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-blue-50/20 transition-colors">
                                                            <td className="px-6 py-4 text-[13px] font-bold text-slate-800">{vb.name}</td>
                                                            <td className="px-6 py-4 text-[13px] font-medium text-slate-600 text-center">{vb.trips}</td>
                                                            <td className="px-6 py-4 text-[13px] font-medium text-slate-600 text-center">{vb.distance.replace(' nm', '')}</td>
                                                            <td className="px-6 py-4 text-[13px] font-black text-blue-600 text-right">{vb.score}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Viewer Footer */}
                        <div className="p-10 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div className="flex items-center gap-4">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest uppercase">Verified by SeaSense AI Engine</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => handleDownload(viewingReport.id, 'csv', viewingReport.type)}
                                    className="px-6 py-3 rounded-2xl border border-slate-200 bg-white font-bold text-[14px] text-slate-600 hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <FileSpreadsheet size={16} /> Raw CSV
                                </button>
                                <button 
                                    onClick={() => handleDownload(viewingReport.id, 'pdf', viewingReport.type)}
                                    className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-[14px] shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Download size={16} /> Save PDF Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
