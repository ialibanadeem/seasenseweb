'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Settings, User, Activity } from 'lucide-react';
import { useTrackingSocket } from '../../hooks/useTrackingSocket';
import { useUserStore } from '../../store/useUserStore';

export const TopNavigationBar = () => {
    const { isConnected } = useTrackingSocket();
    const { profile, fetchProfile } = useUserStore();

    // Fetch the user session on initial dashboard load
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const firstName = profile?.firstName || 'Admin';
    const lastName = profile?.lastName || 'User';
    const initials = (firstName[0] || '') + (lastName[0] || '');

    return (
        <div className="flex flex-col border-b border-slate-200/60 bg-white">
            {/* Actual App Header */}
            <div className="flex justify-between items-center px-8 py-4 h-[72px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-slate-400">Main Menu</span>
                    <span className="text-slate-300">/</span>
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        </svg>
                        Dashboard
                    </div>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-5">


                    {/* System Status */}
                    <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-50 border border-slate-100" title="System Status">
                        <div className="relative flex h-2 w-2">
                            {isConnected ? (
                                <>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </>
                            ) : (
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            )}
                        </div>
                        <span className={`text-[12px] font-bold ${isConnected ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isConnected ? 'Online' : 'Offline'}
                        </span>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1.5">
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white"></span>
                        </button>
                        
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                            <Settings size={18} />
                        </button>
                    </div>

                    {/* User Profile */}
                    <Link href="/settings" className="flex items-center gap-3 pl-2 group outline-none">
                        <div className="flex flex-col items-end text-right">
                            <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{firstName} {lastName[0] ? lastName[0] + '.' : ''}</span>
                            <span className="text-[11px] font-semibold text-slate-400">Admin</span>
                        </div>
                        {profile?.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover shadow-sm bg-slate-100 border border-slate-200" />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase">
                                {initials}
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};
