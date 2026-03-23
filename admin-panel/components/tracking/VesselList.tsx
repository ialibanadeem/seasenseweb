'use client';

import { useState } from 'react';
import { useVesselStore } from '../../store/useVesselStore';
import { Search, Filter, Ship } from 'lucide-react';

export const VesselList = () => {
    const { vessels, selectVessel, selectedVesselId } = useVesselStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVessels = Object.values(vessels).filter(vessel =>
        vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vessel.imo.includes(searchTerm) ||
        vessel.mmsi.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-full bg-white/30 backdrop-blur-3xl border-r border-white/40 w-80 z-20 overflow-hidden font-montserrat shadow-xl">
            {/* Search Header */}
            <div className="p-8 bg-white/40 border-b border-white/40 space-y-5">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] group-focus-within:text-[var(--primary)] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search fleet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/60 border border-white/60 rounded-2xl py-3.5 pl-12 pr-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white transition-all placeholder:text-[#94a3b8] text-[#0f172a] shadow-sm"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/60 border border-white/60 hover:border-[var(--primary)]/50 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] transition-all text-[#64748b] hover:text-[#0f172a] shadow-sm">
                        <Filter className="w-3 h-3 text-[var(--primary)]" /> Filter
                    </button>
                    <button className="flex items-center justify-center py-3 px-4 bg-white/60 border border-white/60 hover:border-[var(--primary)]/50 rounded-2xl transition-all text-[var(--primary)] shadow-sm">
                        <Ship className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* List Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredVessels.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">Zero Assets Found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/20">
                        {filteredVessels.map((vessel) => (
                            <div
                                key={vessel.id}
                                onClick={() => selectVessel(vessel.id)}
                                className={`p-8 cursor-pointer transition-all duration-300 group relative border-l-4 ${selectedVesselId === vessel.id ? 'bg-[var(--primary)]/5 border-[var(--primary)]' : 'hover:bg-white/40 border-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2.5">
                                    <h4 className={`font-black text-[14px] transition-colors uppercase tracking-tight truncate max-w-[140px] ${selectedVesselId === vessel.id ? 'text-[var(--primary)]' : 'text-[#0f172a] group-hover:text-[var(--primary)]'}`}>
                                        {vessel.name}
                                    </h4>
                                    <span className={`text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border ${vessel.status === 'ACTIVE' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bcf0da]' : 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0]'
                                        }`}>
                                        {vessel.status}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-[10px] font-bold text-[#64748b] uppercase tracking-[0.1em]">
                                        <span>IMO • {vessel.imo}</span>
                                        <span>MMSI • {vessel.mmsi}</span>
                                    </div>
                                    <div className="text-[10px] text-[var(--primary)]/80 font-bold uppercase tracking-[0.25em] mt-1 group-hover:text-[var(--primary)] transition-colors">
                                        {vessel.type}
                                    </div>
                                </div>

                                {selectedVesselId === vessel.id && (
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_12px_var(--primary)]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
