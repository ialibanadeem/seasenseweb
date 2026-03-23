'use client';

import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Ship, Map, AlertTriangle, Filter, Search, Calendar, FileSpreadsheet, Loader2 } from 'lucide-react';

// Mock Data
const fleetReports = [
    { id: 'FR-2026-001', period: 'Mar 15 - Mar 21', generatedBy: 'Auto-Scheduler', type: 'Weekly Summary', size: '2.4 MB', status: 'Ready' },
    { id: 'FR-2026-002', period: 'Mar 01 - Mar 14', generatedBy: 'Admin (You)', type: 'Bi-Weekly Analysis', size: '4.1 MB', status: 'Ready' },
    { id: 'FR-2026-003', period: 'Feb 01 - Feb 28', generatedBy: 'System', type: 'Monthly Audit', size: '12.8 MB', status: 'Archived' },
    { id: 'FR-2026-004', period: 'Jan 01 - Jan 31', generatedBy: 'System', type: 'Monthly Audit', size: '11.2 MB', status: 'Archived' },
    { id: 'FR-2026-005', period: 'Q4 2025', generatedBy: 'System', type: 'Quarterly Review', size: '34.5 MB', status: 'Archived' },
];

export default function FleetReportsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [downloading, setDownloading] = useState<Record<string, string>>({});

    const handleDownload = (id: string, format: string) => {
        const key = `${id}_${format}`;
        if (downloading[key]) return;
        
        setDownloading(prev => ({ ...prev, [key]: `exporting_${format}` }));
        
        // Simulate generation delay
        setTimeout(() => {
            // Trigger actual browser file download
            const content = format === 'csv' 
                ? `Report ID,Period,Status\n${id},Example Range,Ready` 
                : `%PDF-1.4\n%Mock PDF Payload for ${id}\nEOF`;
            
            const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fleet_Report_${id}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setDownloading(prev => ({ ...prev, [key]: 'done' }));
            
            // Cleanup state
            setTimeout(() => {
                setDownloading(prev => {
                    const newState = { ...prev };
                    delete newState[key];
                    return newState;
                });
            }, 3000);
        }, 1500);
    };

    const filtered = fleetReports.filter(r => 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:scale-105 transition-transform cursor-default">
                                <FileText size={20} />
                            </div>
                            System Reports
                        </h1>
                        <p className="text-[14px] font-medium text-slate-500 mt-2">Aggregate analytics, compliance scores, and overarching platform performance documents.</p>
                    </div>

                </div>
            </div>

            <div className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
                {/* 3 Interactive KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Map size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">↑ 8.4%</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Fleet Mileage</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">42,890</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">nmi</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Target Hit</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fleet Uptime</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">96.2</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform"><AlertTriangle size={22} /></div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">Needs Review</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compliance Flags</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">14</p>
                                <p className="text-[13px] font-bold text-slate-500 mb-1">this month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Archived Fleet Reports</h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search reports..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all w-64 text-slate-700" 
                                />
                            </div>
                            <button className="p-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm bg-white">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white">
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Report ID</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Period</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Type & Initiator</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? filtered.map(report => (
                                    <tr 
                                        key={report.id} 
                                        className="transition-all duration-300 border-b border-slate-50 hover:bg-slate-50/80 group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                                                    <FileText size={18} />
                                                </div>
                                                <span className="text-[14px] font-bold text-slate-900">{report.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[14px] font-semibold text-slate-600">{report.period}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-bold text-slate-800">{report.type}</span>
                                                <span className="text-[12px] font-medium text-slate-500">by {report.generatedBy} • {report.size}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest border ${report.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleDownload(report.id, 'pdf')}
                                                    disabled={!!downloading[`${report.id}_pdf`]}
                                                    className={`px-3 py-1.5 min-w-[110px] justify-center rounded-lg font-bold text-[13px] border transition-all flex items-center gap-2
                                                        ${downloading[`${report.id}_pdf`] === 'exporting_pdf' ? 'bg-blue-50 border-blue-200 text-blue-600 opacity-70 cursor-wait' : ''}
                                                        ${downloading[`${report.id}_pdf`] === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : ''}
                                                        ${!downloading[`${report.id}_pdf`] ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-105 active:scale-95' : ''}
                                                    `}
                                                >
                                                    {downloading[`${report.id}_pdf`] === 'exporting_pdf' ? <Loader2 size={16} className="animate-spin"/> : downloading[`${report.id}_pdf`] === 'done' ? <CheckCircle size={16}/> :  <Download size={16} />}
                                                    {downloading[`${report.id}_pdf`] === 'exporting_pdf' ? 'Building' : downloading[`${report.id}_pdf`] === 'done' ? 'Saved ✓' : 'PDF'}
                                                </button>
                                                
                                                <button 
                                                    onClick={() => handleDownload(report.id, 'csv')}
                                                    disabled={!!downloading[`${report.id}_csv`]}
                                                    className={`px-3 py-1.5 min-w-[110px] justify-center rounded-lg font-bold text-[13px] border transition-all flex items-center gap-2
                                                        ${downloading[`${report.id}_csv`] === 'exporting_csv' ? 'bg-amber-50 border-amber-200 text-amber-600 opacity-70 cursor-wait' : ''}
                                                        ${downloading[`${report.id}_csv`] === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : ''}
                                                        ${!downloading[`${report.id}_csv`] ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-105 active:scale-95' : ''}
                                                    `}
                                                >
                                                    {downloading[`${report.id}_csv`] === 'exporting_csv' ? <Loader2 size={16} className="animate-spin"/> : downloading[`${report.id}_csv`] === 'done' ? <CheckCircle size={16}/> :  <FileSpreadsheet size={16} />}
                                                    {downloading[`${report.id}_csv`] === 'exporting_csv' ? 'Building' : downloading[`${report.id}_csv`] === 'done' ? 'Saved ✓' : 'CSV'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">No repors matching filters.</td>
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
