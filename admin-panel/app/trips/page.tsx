'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Route, Search, Filter, Download, ArrowRight, MapPin, Clock, Ship } from 'lucide-react';
import { reverseGeocode, calculateDistance, formatDuration } from '@/lib/geocoding';
import TripHistoryFilterBar from '@/components/trips/TripHistoryFilterBar';

const TripRow = ({ trip, sequenceId, onClick }: { trip: any, sequenceId: string, onClick: () => void }) => {
    const [startLocation, setStartLocation] = useState<string>('Loading...');
    const [endLocation, setEndLocation] = useState<string>('Loading...');

    useEffect(() => {
        const resolveLocations = async () => {
            if (trip.startPoint && trip.endPoint) {
                const [start, end] = await Promise.all([
                    reverseGeocode(trip.startPoint.latitude, trip.startPoint.longitude),
                    reverseGeocode(trip.endPoint.latitude, trip.endPoint.longitude)
                ]);
                
                setStartLocation(start);
                setEndLocation(trip.status === 'ACTIVE' ? 'Ongoing' : end);
            } else {
                setStartLocation('Untracked');
                setEndLocation('Untracked');
            }
        };
        resolveLocations();
    }, [trip]);

    const distance = trip.distance || 0;
    const duration = useMemo(() => formatDuration(trip.startTime, trip.endTime), [trip.startTime, trip.endTime]);

    return (
        <tr onClick={onClick} className="hover:bg-slate-50 transition-colors border-b border-slate-50 group cursor-pointer">
            <td className="px-4 md:px-6 py-4 md:py-5 text-[13px] md:text-[14px] font-bold text-blue-600">Trip #{sequenceId}</td>
            <td className="px-4 md:px-6 py-4 md:py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><Ship size={14} /></div>
                    <span className="text-[13px] md:text-[14px] font-bold text-slate-900 whitespace-nowrap">{trip.vessel?.name || 'Unknown Vessel'}</span>
                </div>
            </td>
            <td className="px-4 md:px-6 py-4 md:py-5">
                <div className="flex items-center gap-3 text-[14px] font-semibold text-slate-700">
                    <span className="truncate max-w-[150px]" title={startLocation}>{startLocation}</span>
                    <ArrowRight size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate max-w-[150px]" title={endLocation}>{endLocation}</span>
                </div>
            </td>
            <td className="px-4 md:px-6 py-4 md:py-5">
                <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5"><MapPin size={12} className="text-slate-400"/> {distance.toFixed(1)} nm</span>
                    <span className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5"><Clock size={12} className="text-slate-400"/> {duration}</span>
                </div>
            </td>
            <td className="px-4 md:px-6 py-4 md:py-5 text-[13px] md:text-[14px] font-medium text-slate-600 whitespace-nowrap">
                {new Date(trip.startTime).toLocaleDateString()}
            </td>
            <td className="px-4 md:px-6 py-4 md:py-5">
                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest border ${
                    trip.status?.toLowerCase() === 'active' || trip.status?.toLowerCase() === 'moving'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                    {trip.status}
                </span>
            </td>
        </tr>
    );
};

export default function TripHistoryPage() {
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchTrips = useCallback(async () => {
        setLoading(true);
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (selectedMonth) params.append('month', selectedMonth);
            if (selectedYear) params.append('year', selectedYear);

            const queryString = params.toString();
            const response = await fetch(`${apiURL}/trips${queryString ? `?${queryString}` : ''}`);
            const data = await response.json();
            setTrips(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch trips:", err);
            setTrips([]);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate, selectedMonth, selectedYear]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    const filteredTrips = useMemo(() => {
        if (!trips) return [];
        let items = trips;
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            items = items.filter(trip => 
                trip.vessel?.name?.toLowerCase().includes(lowerQuery) ||
                trip.sequenceId?.toString().includes(lowerQuery) ||
                trip.id.toLowerCase().includes(lowerQuery)
            );
        }
        return items;
    }, [searchQuery, trips]);

    const handleExport = () => {
        const headers = ["Trip ID", "Vessel", "Date", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredTrips.map(trip => `"#${trip.sequenceId?.toString().padStart(2, '0')}","${trip.vessel?.name}","${new Date(trip.startTime).toLocaleDateString()}","${trip.status}"`)
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

    const handleFilterChange = (filters: { startDate: string; endDate: string; month: string; year: string }) => {
        setStartDate(filters.startDate);
        setEndDate(filters.endDate);
        setSelectedMonth(filters.month);
        setSelectedYear(filters.year);
    };

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setSelectedMonth('');
        setSelectedYear('');
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col gap-5 md:gap-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Route size={20} />
                            </div>
                            Trip History
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm md:text-base font-medium flex items-center gap-2">Complete log of all historical vessel voyages and routes.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={handleExport} className="w-full md:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <Download size={18} /> Export Log (.CSV)
                        </button>
                    </div>
                </div>

                {/* Filters Row 1: Search */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 w-full md:max-w-md">
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

            {/* Filters Row 2: Advanced Filter Bar */}
            <div className="bg-white border-b border-slate-200">
                <TripHistoryFilterBar 
                    startDate={startDate}
                    endDate={endDate}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden pb-4">
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-[840px] text-left border-collapse">
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
                                {filteredTrips.length > 0 ? filteredTrips.map((trip) => {
                                    const displayId = trip.sequenceId 
                                        ? trip.sequenceId.toString().padStart(2, '0') 
                                        : trip.id.substring(0, 6).toUpperCase();
                                    
                                    return (
                                        <TripRow 
                                            key={trip.id} 
                                            trip={trip} 
                                            sequenceId={displayId} 
                                            onClick={() => router.push(`/trips/${trip.id}`)} 
                                        />
                                    );
                                }) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        {loading ? "Loading Trips..." : "No trips matched your search."}
                                    </td>
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
