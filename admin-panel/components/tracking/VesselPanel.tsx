'use client';

import { useVesselStore } from '../../store/useVesselStore';
import { X, Anchor, Navigation, Activity, Clock } from 'lucide-react';

export const VesselPanel = () => {
    const { selectedVesselId, vessels, livePositions, selectVessel } = useVesselStore();

    if (!selectedVesselId) return null;

    const vessel = vessels[selectedVesselId];
    const position = livePositions[selectedVesselId];

    if (!vessel) return null;

    return (
        <div className="h-full bg-white/40 backdrop-blur-3xl flex flex-col font-montserrat shadow-[0_0_40px_rgba(0,0,0,0.05)] border-l border-white/40">
            {/* Header */}
            <div className="p-10 border-b border-white/40 flex justify-between items-center bg-white/40 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1.5">
                        <Anchor className="w-4 h-4 text-[var(--primary)]" />
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.4em]">Asset Details</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter">
                        {vessel.name}
                    </h3>
                </div>
                <button
                    onClick={() => selectVessel(null)}
                    className="w-12 h-12 rounded-2xl border border-white/60 flex items-center justify-center hover:bg-white transition-all text-[#94a3b8] hover:text-[#0f172a] shadow-sm"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="p-10 flex-1 space-y-10 overflow-y-auto custom-scrollbar">
                {/* Status Section */}
                <div>
                    <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.4em] mb-5">Operational Status</p>
                    <div className="neo-card p-8 flex items-center justify-between bg-white/60 border-white/60 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className={`w-3.5 h-3.5 rounded-full ${vessel.status === 'ACTIVE' ? 'bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-[#94a3b8]'}`} />
                            <span className="text-sm font-bold text-[#0f172a] uppercase tracking-widest">{vessel.status}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest bg-[#f1f5f9] px-3 py-1.5 rounded-full border border-[#e2e8f0]">Signal Secured</span>
                    </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="neo-card p-8 hover:bg-white transition-all shadow-md group">
                        <div className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-[.25em] flex items-center gap-2 mb-5">
                            <Navigation className="w-4 h-4 text-[var(--primary)]" /> Velocity
                        </div>
                        <div className="text-4xl font-black text-[#0f172a] group-hover:text-[var(--primary)] transition-colors">
                            {position?.speed ? position.speed.toFixed(1) : '0.0'} <span className="text-[11px] text-[#94a3b8] ml-1 font-bold">KN</span>
                        </div>
                    </div>
                    <div className="neo-card p-8 hover:bg-white transition-all shadow-md group">
                        <div className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-[.25em] flex items-center gap-2 mb-5">
                            <Activity className="w-4 h-4 text-[var(--primary)]" /> Orientation
                        </div>
                        <div className="text-4xl font-black text-[#0f172a] group-hover:text-[var(--primary)] transition-colors">
                            {position?.heading ? position.heading.toFixed(0) : '0'}°
                        </div>
                    </div>
                </div>

                {/* Registry info */}
                <div className="space-y-8 pt-6">
                    <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.4em]">Registry Profile</p>
                    <div className="space-y-2">
                        <DetailRow label="IMO Reference" value={vessel.imo} />
                        <DetailRow label="MMSI ID" value={vessel.mmsi} />
                        <DetailRow
                            label="Last Satellite Sync"
                            value={position?.timestamp ? new Date(position.timestamp).toLocaleTimeString() : 'N/A'}
                            icon={<Clock size={13} className="text-[#94a3b8]" />}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-10 border-t border-white/40 bg-white/40 shadow-inner">
                <button className="w-full py-5 bg-[var(--primary)] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:shadow-[0_8px_24px_rgba(2,132,199,0.3)] hover:-translate-y-1 active:scale-95 shadow-md">
                    Tactical Commander Access
                </button>
            </div>
        </div>
    );
};

function DetailRow({ label, value, icon }: any) {
    return (
        <div className="flex justify-between items-center py-5 border-b border-[#f1f5f9] hover:bg-[#f8fafc] px-4 -mx-4 rounded-2xl transition-all group">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest">{label}</span>
            <div className="flex items-center gap-2.5">
                {icon}
                <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-wider group-hover:text-[var(--primary)] transition-colors">{value}</span>
            </div>
        </div>
    );
}
