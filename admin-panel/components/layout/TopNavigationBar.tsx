'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Settings, LogOut, CheckCheck, Trash2, Menu } from 'lucide-react';
import { useTrackingSocket } from '../../hooks/useTrackingSocket';
import { useAuthStore } from '../../store/auth.store';
import WeatherCard from '../dashboard/WeatherCard';

interface Notification {
    id: string; // Changed to string for DB IDs
    message: string;
    timestamp: string;
    isRead: boolean;
    type: 'alert' | 'info' | 'success';
}

interface TopNavigationBarProps {
    onMenuClick?: () => void;
}

export const TopNavigationBar = ({ onMenuClick }: TopNavigationBarProps) => {
    const pathname = usePathname();
    const { isConnected, socket } = useTrackingSocket();
    
    // Auth Store Integration
    const { user, initialize, logout } = useAuthStore();
    
    // UI State
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Initialize Auth Store
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Fetch Alerts from API
    const fetchAlerts = async () => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const res = await fetch(`${apiURL}/alerts`);
            const data = await res.json();
            
            if (Array.isArray(data)) {
                const formatted = data.map((a: any) => ({
                    id: a.dbId || a.id,
                    message: a.message,
                    timestamp: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isRead: a.isRead,
                    type: (a.severity.toLowerCase() === 'critical' ? 'alert' : 'info') as 'alert' | 'info' | 'success'
                }));
                setNotifications(formatted);
            }
        } catch (err) {
            console.error("Failed to fetch alerts:", err);
        }
    };

    // Load Initial State
    useEffect(() => {
        fetchAlerts();
    }, []);

    // Socket Event Listening (REAL-TIME UPDATES)
    useEffect(() => {
        if (!socket) return;

        const handleNewAlert = (data: any) => {
            setNotifications(prev => [
                {
                    id: data.dbId || data.id,
                    message: data.message,
                    timestamp: 'Just now',
                    isRead: false,
                    type: data.severity?.toLowerCase() === 'critical' ? 'alert' : 'info'
                },
                ...prev
            ]);
        };

        socket.on('ALERT_CREATED', handleNewAlert);
        socket.on('SOS_TRIGGERED', handleNewAlert); // SOS also creates an alert on backend

        return () => {
            socket.off('ALERT_CREATED', handleNewAlert);
            socket.off('SOS_TRIGGERED', handleNewAlert);
        };
    }, [socket]);

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
    
    const markAsRead = async (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        
        // Sync with backend
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            await fetch(`${apiURL}/alerts/${id}/toggle`, { method: 'POST' });
        } catch (err) {
            console.error("Failed to sync read status:", err);
        }
    };

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            await fetch(`${apiURL}/alerts/read-all`, { method: 'POST' });
        } catch (err) {
            console.error("Failed to mark all as read:", err);
        }
    };
    const clearNotifications = () => {
        setNotifications([]);
    };

    const firstName = user?.firstName || 'Admin';
    const lastName = user?.lastName || 'User';
    const initials = (firstName[0] || '') + (lastName[0] || '');

    const handleLogout = () => {
        setIsProfileOpen(false);
        logout();
    };

    return (
        <div className="flex flex-col border-b border-slate-200/60 bg-white sticky top-0 z-40">
            {/* Header */}
            <div className="flex justify-between items-center gap-3 px-3 sm:px-4 md:px-8 py-3 md:py-4 md:h-[72px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm font-medium min-w-0">
                    <button
                        onClick={onMenuClick}
                        className="inline-flex md:hidden w-9 h-9 rounded-lg border border-slate-200 text-slate-600 items-center justify-center"
                        aria-label="Open menu"
                    >
                        <Menu size={18} />
                    </button>
                    <span className="text-slate-400 hidden sm:inline">Main Menu</span>
                    <span className="text-slate-300 hidden sm:inline">/</span>
                    <div className="flex items-center gap-2 text-slate-800 font-bold transition-all animate-in fade-in slide-in-from-left-2 min-w-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        </svg>
                        <span className="truncate">{breadcrumbLabel}</span>
                    </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Weather Card - Restored (Non-expandable) */}
                    <div className="hidden md:block">
                        <WeatherCard />
                    </div>

                    {/* Status Bars */}
                    <div className="hidden sm:flex items-center gap-3">

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
                    <div className="flex items-center gap-1.5 sm:border-l border-slate-200 sm:pl-4 h-8">
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
                                    className="absolute top-12 right-0 w-80 max-w-[calc(100vw-1rem)] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
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
                            className="flex items-center gap-2 md:gap-3 pl-2 group outline-none h-11 sm:border-l border-slate-200"
                        >
                            <div className="hidden md:flex flex-col items-end text-right">
                                <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{firstName} {lastName[0] ? lastName[0] + '.' : ''}</span>
                                <span className="text-[11px] font-semibold text-slate-400 transition-colors uppercase tracking-wider">{user?.role || 'User'}</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase group-hover:bg-blue-600 transition-all">
                                {initials}
                            </div>
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div 
                                className="absolute top-14 right-0 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 p-1.5 z-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link 
                                    href="/settings" 
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all group border-b border-slate-50 mb-1"
                                >
                                    <Settings size={18} className="text-slate-400 group-hover:text-blue-500" />
                                    System Settings
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all group"
                                >
                                    <LogOut size={18} className="text-rose-400 group-hover:text-rose-500" />
                                    Sign Out
                                </button>
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
