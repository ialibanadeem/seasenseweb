'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Settings, User, LogOut, CheckCheck, Trash2 } from 'lucide-react';
import { useTrackingSocket } from '../../hooks/useTrackingSocket';
import { useUserStore } from '../../store/useUserStore';
import { useVesselStore } from '../../store/useVesselStore';

interface Notification {
    id: number;
    message: string;
    timestamp: string;
    isRead: boolean;
    type: 'alert' | 'info' | 'success';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, message: 'Vessel "Ocean Star" entered Port of Karachi', timestamp: '2 mins ago', isRead: false, type: 'info' },
    { id: 2, message: 'Abnormal speed detected on Vessel "Sea Pearl"', timestamp: '15 mins ago', isRead: false, type: 'alert' },
    { id: 3, message: 'Trip #14 completed successfully', timestamp: '1 hour ago', isRead: true, type: 'success' },
    { id: 4, message: 'Maintenance schedule: Vessel "Gladiator"', timestamp: '3 hours ago', isRead: true, type: 'info' },
];

export const TopNavigationBar = () => {
    const pathname = usePathname();
    const { isConnected } = useTrackingSocket();
    const { profile, fetchProfile } = useUserStore();
    const [isHardwareActive, setIsHardwareActive] = useState(false);
    
    // UI State
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load/Save Notifications from LocalStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('sea_sense_notifications');
            if (stored) {
                setNotifications(JSON.parse(stored));
            } else {
                setNotifications(MOCK_NOTIFICATIONS);
            }
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('sea_sense_notifications', JSON.stringify(notifications));
        }
    }, [notifications, isLoaded]);

    // Dynamic Breadcrumbs Mapping
    const breadcrumbLabel = useMemo(() => {
        if (pathname === '/') return 'Dashboard';
        if (pathname.startsWith('/fleet/')) return 'Vessel Details';
        if (pathname.startsWith('/fleet')) return 'Vessel List';
        if (pathname.startsWith('/trips/')) return 'Trip Details';
        if (pathname.startsWith('/trips')) return 'Trip History';
        if (pathname.startsWith('/analytics')) return 'Analytics';
        if (pathname.startsWith('/alerts')) return 'Alerts Overview';
        if (pathname.startsWith('/reports')) return 'Reports';
        if (pathname.startsWith('/settings')) return 'User Settings';
        return pathname.split('/').slice(-1)[0] || 'Dashboard';
    }, [pathname]);

    // Notification Logic
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };
    const clearNotifications = () => {
        setNotifications([]);
    };

    // Fetch the user session on initial dashboard load
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Hardware active ping threshold
    useEffect(() => {
        const pingCheck = setInterval(() => {
            const hardware = useVesselStore.getState().livePositions['ESP32-HARDWARE'];
            if (hardware && hardware.lastSeen) {
                const ageMs = Date.now() - new Date(hardware.lastSeen).getTime();
                setIsHardwareActive(ageMs <= 300000); 
            } else {
                setIsHardwareActive(false);
            }
        }, 2000);
        return () => clearInterval(pingCheck);
    }, []);

    const firstName = profile?.firstName || 'Admin';
    const lastName = profile?.lastName || 'User';
    const initials = (firstName[0] || '') + (lastName[0] || '');

    return (
        <div className="flex flex-col border-b border-slate-200/60 bg-white sticky top-0 z-40">
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-4 h-[72px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-slate-400">Main Menu</span>
                    <span className="text-slate-300">/</span>
                    <div className="flex items-center gap-2 text-slate-800 font-bold transition-all animate-in fade-in slide-in-from-left-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        </svg>
                        {breadcrumbLabel}
                    </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-4">
                    {/* Status Bars */}
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 h-9 rounded-lg border transition-all ${isHardwareActive ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-slate-50 border-slate-200'}`} title="Hardware GPS Fix Status">
                            <div className="relative flex h-2 w-2">
                                {isHardwareActive ? (
                                    <>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </>
                                ) : (
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                                )}
                            </div>
                            <span className={`text-[12px] font-bold ${isHardwareActive ? 'text-amber-600' : 'text-slate-500'}`}>
                                {isHardwareActive ? 'Hardware Live' : 'Hardware Idle'}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-50 border border-slate-100" title="Server Status">
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
                                {isConnected ? 'Server Sync' : 'Server Offline'}
                            </span>
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 h-8">
                        <div className="relative">
                            <button 
                                onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
                                className={`relative w-9 h-9 flex items-center justify-center rounded-lg transition-all ${isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                            >
                                <Bell size={18} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-500 border-2 border-white text-[10px] text-white font-bold flex items-center justify-center animate-bounce">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div 
                                    className="absolute top-12 right-0 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                                        <h3 className="font-bold text-slate-900 text-[14px]">Notifications</h3>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); markAllAsRead(); }} 
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition-all" 
                                                title="Mark all as read"
                                            >
                                                <CheckCheck size={16} />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); clearNotifications(); }} 
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all" 
                                                title="Clear all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-[360px] overflow-y-auto no-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification) => (
                                                <div 
                                                    key={notification.id} 
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={`px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors relative ${!notification.isRead ? 'bg-blue-50/20' : ''}`}
                                                >
                                                    {!notification.isRead && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                                    <p className={`text-[13px] leading-snug ${notification.isRead ? 'text-slate-600' : 'text-slate-900 font-bold'}`}>
                                                        {notification.message}
                                                    </p>
                                                    <span className="text-[11px] font-medium text-slate-400 mt-1 block">{notification.timestamp}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-5 py-12 text-center text-slate-400 flex flex-col items-center gap-2">
                                                <Bell size={24} className="opacity-20" />
                                                <p className="text-[14px] font-medium">Looking good! No new notifications.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        <button 
                            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
                            className="flex items-center gap-3 pl-2 group outline-none h-11 border-l border-slate-200"
                        >
                            <div className="flex flex-col items-end text-right">
                                <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{firstName} {lastName[0] ? lastName[0] + '.' : ''}</span>
                                <span className="text-[11px] font-semibold text-slate-400 transition-colors uppercase tracking-wider">Admin</span>
                            </div>
                            {profile?.avatar ? (
                                <img src={profile.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover shadow-sm bg-slate-100 border border-slate-200 group-hover:border-blue-200 transition-all" />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase group-hover:bg-blue-600 transition-all">
                                    {initials}
                                </div>
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div 
                                className="absolute top-14 right-0 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 p-1.5 z-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link 
                                    href="/profile" 
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
                                >
                                    <User size={18} className="text-slate-400 group-hover:text-blue-500" />
                                    Account Profile
                                </Link>
                                <Link 
                                    href="/settings" 
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all group border-b border-slate-50 mb-1"
                                >
                                    <Settings size={18} className="text-slate-400 group-hover:text-blue-500" />
                                    System Settings
                                </Link>
                                <Link 
                                    href="/auth/logout" 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all group"
                                >
                                    <LogOut size={18} className="text-rose-400 group-hover:text-rose-500" />
                                    Sign Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Click outside detection for dropdowns */}
            {(isNotificationsOpen || isProfileOpen) && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => { setIsNotificationsOpen(false); setIsProfileOpen(false); }} 
                />
            )}
        </div>
    );
};
