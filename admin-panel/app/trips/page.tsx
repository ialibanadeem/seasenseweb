'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Route, Search, Filter, Download, ArrowRight, MapPin, Clock, Ship } from 'lucide-react';

export default function TripHistoryPage() {
    const mockTrips = [
        { id: 'TRP-8091', vessel: 'Al-Mehran', distance: '12.5 nm', duration: '2h 20m', start: 'Karachi Port', end: 'Port Qasim', date: 'Oct 24, 2023', status: 'Completed' },
        { id: 'TRP-8092', vessel: 'Sindhbad Explorer', distance: '5.0 nm', duration: '1h 15m', start: 'Kemari', end: 'Manora Island', date: 'Oct 23, 2023', status: 'Completed' },
        { id: 'TRP-8093', vessel: 'Gwadar Pearl', distance: '22.5 nm', duration: '3h 45m', start: 'Gadani', end: 'Churna Island', date: 'Oct 22, 2023', status: 'Completed' },
        { id: 'TRP-8094', vessel: 'Shahbaz Tracker', distance: '145.8 nm', duration: '15h 10m', start: 'Karachi Port', end: 'Ormara Base', date: 'Oct 21, 2023', status: 'Completed' },
        { id: 'TRP-8095', vessel: 'Bolan Transporter', distance: '280.0 nm', duration: '30h 00m', start: 'Port Qasim', end: 'Gwadar Port', date: 'Oct 20, 2023', status: 'Completed' },
        { id: 'TRP-8096', vessel: 'Al-Mehran', distance: '12.4 nm', duration: '2h 30m', start: 'Port Qasim', end: 'Karachi Port', date: 'Oct 19, 2023', status: 'Completed' },
        { id: 'TRP-8097', vessel: 'Sindhbad Explorer', distance: '5.2 nm', duration: '1h 45m', start: 'Manora Island', end: 'Kemari', date: 'Oct 18, 2023', status: 'Completed' },
        { id: 'TRP-8098', vessel: 'Gwadar Pearl', distance: '280.9 nm', duration: '28h 20m', start: 'Gwadar Port', end: 'Karachi Port', date: 'Oct 17, 2023', status: 'Completed' },
    ];

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Real-time filtering logic
    const filteredTrips = useMemo(() => {
        let trips = mockTrips;
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            trips = trips.filter(trip => 
                trip.vessel.toLowerCase().includes(lowerQuery) ||
                trip.id.toLowerCase().includes(lowerQuery) ||
                trip.start.toLowerCase().includes(lowerQuery) ||
                trip.end.toLowerCase().includes(lowerQuery)
            );
        }
        return trips;
    }, [searchQuery]);

    const handleExport = () => {
        const headers = ["Trip ID", "Vessel", "Start Location", "End Location", "Distance", "Duration", "Date", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredTrips.map(trip => `"${trip.id}","${trip.vessel}","${trip.start}","${trip.end}","${trip.distance}","${trip.duration}","${trip.date}","${trip.status}"`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Trip_History_Export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Route size={20} />
                            </div>
                            Trip History
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">Complete log of all historical vessel voyages and routes.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleExport} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <Download size={18} /> Export Log (.CSV)
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by Vessel, Trip ID, or Location..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[14px] font-medium transition-all" 
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 max-w-[1600px] mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden pb-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Trip ID</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Vessel</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Route</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Metrics</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                                <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.length > 0 ? filteredTrips.map((trip) => (
                                <tr key={trip.id} onClick={() => router.push(`/trips/${trip.id}`)} className="hover:bg-slate-50 transition-colors border-b border-slate-50 group cursor-pointer">
                                    <td className="px-6 py-5 text-[14px] font-bold text-blue-600">{trip.id}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><Ship size={14} /></div>
                                            <span className="text-[14px] font-bold text-slate-900">{trip.vessel}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3 text-[14px] font-semibold text-slate-700">
                                            <span>{trip.start}</span>
                                            <ArrowRight size={14} className="text-slate-400" />
                                            <span>{trip.end}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5"><MapPin size={12} className="text-slate-400"/> {trip.distance}</span>
                                            <span className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5"><Clock size={12} className="text-slate-400"/> {trip.duration}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[14px] font-medium text-slate-600">{trip.date}</td>
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">{trip.status}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">No trips matched your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
