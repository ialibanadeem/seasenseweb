'use client';

import React from 'react';
import { format } from 'date-fns';
import { Route, Navigation, Compass, Calendar, AlertCircle } from 'lucide-react';

interface TripSummary {
    id: string;
    vessel: { name: string; mmsi: string };
    status: string;
    startTime: string;
    endTime: string;
    distance: number;
    avgSpeed: number;
    startPoint?: { latitude: number; longitude: number };
    endPoint?: { latitude: number; longitude: number };
}

interface Props {
    trips: TripSummary[];
    selectedTripId: string | null;
    onSelectTrip: (id: string) => void;
    isLoading: boolean;
}

export default function TripHistorySidebar({ trips, selectedTripId, onSelectTrip, isLoading }: Props) {
    if (isLoading) {
        return (
            <div className="w-80 h-full flex items-center justify-center border-r border-slate-200 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="w-96 flex-shrink-0 h-full bg-white border-r border-slate-200 shadow-[2px_0_10px_rgba(0,0,0,0.02)] flex flex-col z-10">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 mix-blend-multiply">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Route className="w-5 h-5 text-indigo-600" />
                    Trip Archives
                </h2>
                <p className="text-xs font-medium text-slate-500 mt-1">
                    Select a logged journey to playback coordinates from database.
                </p>
            </div>
            
            <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
                {trips.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
                        <AlertCircle className="w-6 h-6 opacity-50" />
                        <p className="text-sm font-medium">No data available for chosen filters.</p>
                    </div>
                ) : (
                    trips.map((trip) => {
                        const isSelected = selectedTripId === trip.id;
                        return (
                            <div 
                                key={trip.id}
                                onClick={() => onSelectTrip(trip.id)}
                                className={`w-full p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
                                    isSelected 
                                    ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                                    : 'bg-white border-slate-200 hover:border-indigo-100 hover:bg-slate-50'
                                }`}
                            >
                                {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500" />}

                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className={`font-bold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                            {trip.vessel.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-500 font-medium font-mono">
                                            <Navigation className="w-3 h-3" />
                                            {trip.vessel.mmsi}
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                        trip.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 
                                        trip.status === 'ACTIVE' ? 'bg-blue-100 text-blue-700' : 
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                        {trip.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 text-xs">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Distance</span>
                                        <span className="font-bold text-slate-700">{(trip.distance || 0).toFixed(2)} NM</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Avg Speed</span>
                                        <span className="font-bold text-slate-700">{(trip.avgSpeed || 0).toFixed(1)} kn</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-1 col-span-2 pt-2 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            <span>
                                                {trip.startTime ? format(new Date(trip.startTime), "MMM d, yyyy • HH:mm") : "Unknown"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
