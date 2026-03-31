'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DashboardMap = dynamic(() => import('../../../components/dashboard/DashboardMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-medium animate-pulse">Establishing Maritime Bridge...</div>
});

export default function Page() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-white flex flex-col">
            {/* Full-screen Map Container uses the proven Dashboard component logic */}
            <div className="w-full h-[calc(100vh-64px)] relative min-h-0 bg-slate-50">
                <DashboardMap />
            </div>
            
            {/* Overlay Header */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 p-5 rounded-2xl shadow-xl shadow-slate-900/10 max-w-xs animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <h1 className="text-[14px] font-bold text-slate-800 tracking-tight uppercase">Live Fleet Status</h1>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500 leading-relaxed uppercase tracking-wider opacity-80">
                        Real-time telemetry and positional data for all active maritime assets.
                    </p>
                </div>
            </div>
        </div>
    );
}
