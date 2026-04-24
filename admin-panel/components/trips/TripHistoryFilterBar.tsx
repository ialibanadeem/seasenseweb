'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Filter, X, ChevronDown, Check } from 'lucide-react';

interface Props {
    startDate: string;
    endDate: string;
    selectedMonth: string;
    selectedYear: string;
    onFilterChange: (filters: { startDate: string; endDate: string; month: string; year: string }) => void;
    onClearFilters: () => void;
}

const MONTHS = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const YEARS = ['2024', '2025', '2026'];

export default function TripHistoryFilterBar({ 
    startDate: externalStartDate, 
    endDate: externalEndDate, 
    selectedMonth: externalMonth, 
    selectedYear: externalYear, 
    onFilterChange, 
    onClearFilters 
}: Props) {
    // Local state to manage inputs before "Apply" is clicked
    const [localStartDate, setLocalStartDate] = useState(externalStartDate);
    const [localEndDate, setLocalEndDate] = useState(externalEndDate);
    const [localMonth, setLocalMonth] = useState(externalMonth);
    const [localYear, setLocalYear] = useState(externalYear);

    // Keep local state in sync if external state is cleared (Reset)
    useEffect(() => {
        setLocalStartDate(externalStartDate);
        setLocalEndDate(externalEndDate);
        setLocalMonth(externalMonth);
        setLocalYear(externalYear);
    }, [externalStartDate, externalEndDate, externalMonth, externalYear]);

    const handleClear = () => {
        setLocalStartDate('');
        setLocalEndDate('');
        setLocalMonth('');
        setLocalYear('');
        onClearFilters();
    };

    const handleApply = () => {
        onFilterChange({
            startDate: localStartDate,
            endDate: localEndDate,
            month: localMonth,
            year: localYear
        });
    };

    const hasChanges = localStartDate !== externalStartDate || 
                      localEndDate !== externalEndDate || 
                      localMonth !== externalMonth || 
                      localYear !== externalYear;

    return (
        <div className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 relative z-10">
            <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                {/* Visual Label */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Filter size={18} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Parameters</p>
                        <p className="text-[14px] font-bold text-slate-900">Filter Journeys</p>
                    </div>
                </div>

                <div className="h-10 w-px bg-slate-200 hidden md:block mx-1" />

                {/* Date Selection Area */}
                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
                    <div className="relative w-full sm:w-auto flex items-center px-4 py-2 gap-3 bg-white rounded-xl shadow-sm border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
                        <Calendar size={16} className="text-blue-500 z-10 pointer-events-none" />
                        <div className="flex flex-col relative z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Start Date</span>
                            <span className="text-[13px] font-bold text-slate-800">
                                {localStartDate ? new Date(localStartDate).toLocaleDateString() : 'Select Date'}
                            </span>
                        </div>
                        <input 
                            type="date" 
                            value={localStartDate}
                            onChange={(e) => {
                                setLocalStartDate(e.target.value);
                                setLocalMonth('');
                                setLocalYear('');
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>
                    <div className="hidden sm:flex items-center text-slate-300 font-bold px-1">-</div>
                    <div className="relative w-full sm:w-auto flex items-center px-4 py-2 gap-3 bg-white rounded-xl shadow-sm border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
                        <Calendar size={16} className="text-blue-500 z-10 pointer-events-none" />
                        <div className="flex flex-col relative z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">End Date</span>
                            <span className="text-[13px] font-bold text-slate-800">
                                {localEndDate ? new Date(localEndDate).toLocaleDateString() : 'Select Date'}
                            </span>
                        </div>
                        <input 
                            type="date" 
                            value={localEndDate}
                            onChange={(e) => {
                                setLocalEndDate(e.target.value);
                                setLocalMonth('');
                                setLocalYear('');
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full xl:w-auto xl:ml-auto">
                <button 
                    onClick={handleClear}
                    className="flex-1 xl:flex-none px-6 py-3.5 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-slate-200"
                >
                    <X size={16} />
                    Clear Filters
                </button>
                <button 
                    onClick={handleApply}
                    disabled={!hasChanges}
                    className={`flex-1 xl:flex-none px-8 py-3.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 shadow-lg border ${
                        hasChanges 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-blue-500/20 border-blue-500 cursor-pointer scale-100 hover:scale-[1.02]' 
                        : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed scale-100 shadow-none'
                    }`}
                >
                    <Check size={16} />
                    Apply Changes
                </button>
            </div>
        </div>
    );
}
