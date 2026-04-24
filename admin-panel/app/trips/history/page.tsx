'use client';

import React, { useEffect, useState, Suspense, useCallback } from 'react';
import TripHistorySidebar from '@/components/trips/TripHistorySidebar';
import TripPlaybackMap from '@/components/trips/TripPlaybackMap';
import TripHistoryFilterBar from '@/components/trips/TripHistoryFilterBar';
import { useSearchParams } from 'next/navigation';

function PlaybackContent() {
    const searchParams = useSearchParams();
    const queryTripId = searchParams.get('tripId');
    
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(queryTripId);

    // Filter State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchTrips = useCallback(async () => {
        setIsLoading(true);
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (selectedMonth) params.append('month', selectedMonth);
            if (selectedYear) params.append('year', selectedYear);

            const queryString = params.toString();
            const res = await fetch(`${apiURL}/trips${queryString ? `?${queryString}` : ''}`);
            const data = await res.json();
            
            const validTrips = data.filter((t: any) => t.startPoint !== null);
            setTrips(validTrips);

            // Auto-select first trip if none selected or if selected one disappeared from list
            if (validTrips.length > 0) {
                const stillExists = validTrips.find((t: any) => t.id === selectedTripId);
                if (!selectedTripId || !stillExists) {
                    setSelectedTripId(validTrips[0].id);
                }
            } else {
                setSelectedTripId(null);
            }
        } catch (err) {
            console.error("Failed to fetch fleet trips:", err);
            setTrips([]);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate, selectedMonth, selectedYear, selectedTripId]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

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
        <div className="w-full h-[calc(100vh-80px)] flex flex-col bg-slate-50 overflow-hidden">
            <TripHistoryFilterBar 
                startDate={startDate}
                endDate={endDate}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Selection Area */}
                <TripHistorySidebar 
                    isLoading={isLoading}
                    trips={trips}
                    selectedTripId={selectedTripId}
                    onSelectTrip={setSelectedTripId}
                />

                {/* Right Map Canvas Area */}
                <div className="flex-1 relative">
                    <TripPlaybackMap tripId={selectedTripId} />
                </div>
            </div>
        </div>
    );
}

export default function TripsHistoryPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-slate-50 overflow-hidden" />}>
            <PlaybackContent />
        </Suspense>
    );
}
