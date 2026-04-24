'use client';

import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Check, Box, MapPin, Navigation } from 'lucide-react';

const TRACKING_DATA = [
    { id: 'TRK-9901', ref: 'ORD-2342', item: 'Wooden Planks', driver: 'Marco R.', location: 'Highway 61', eta: '2 Hours' },
    { id: 'TRK-9902', ref: 'ORD-2348', item: 'Pipes', driver: 'Sarah T.', location: 'Distribution Center A', eta: '3.5 Hours' },
    { id: 'TRK-9903', ref: 'ORD-2349', item: 'Gravel (1 Ton)', driver: 'John M.', location: 'Route 42 Exit 3', eta: '45 Mins' },
];

export default function TrackProgressPage() {
    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[1200px] w-full mx-auto px-4 md:px-0">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Active Deliveries</h1>
                        <p className="text-[15px] font-medium text-slate-500 mt-2">Monitor shipments currently marked as "On Progress".</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-2">
                        <Navigation size={16} /> Live Map View
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {TRACKING_DATA.map(trk => (
                        <div key={trk.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                    <Box size={20} />
                                </div>
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">In Transit</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{trk.item}</h3>
                            <p className="text-[13px] font-semibold text-slate-400 mt-1 mb-4">Order {trk.ref}</p>
                            
                            <div className="w-full h-px bg-slate-100 mb-4" />
                            
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-slate-400" />
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase">Current Location</p>
                                        <p className="text-[13px] font-bold text-slate-800">{trk.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4" />
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase">Driver / ETA</p>
                                        <p className="text-[13px] font-bold text-slate-800">{trk.driver} • <span className="text-emerald-600">{trk.eta}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
