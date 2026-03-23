'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Ship,
    Map,
    Route,
    BarChart3,
    AlertTriangle,
    FileText,
    ChevronDown,
    PanelLeftClose,
    PanelRightClose
} from 'lucide-react';

export const NavigationSidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        map: false,
        trips: false,
        analytics: false,
        alerts: false,
        reports: false
    });

    const toggleMenu = (menu: string) => {
        setOpenMenus(prev => {
            const newState = {
                map: false,
                trips: false,
                analytics: false,
                alerts: false,
                reports: false
            };
            
            // If the clicked menu is already open, we're just closing it (so keep everything false)
            if (prev[menu]) {
                return newState;
            }
            
            // Otherwise, open the clicked menu and close all others
            return { ...newState, [menu]: true };
        });
    };

    return (
        <aside className={`relative z-50 h-[calc(100vh)] bg-white border-r border-slate-100 flex flex-col overflow-hidden shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[84px]' : 'w-[260px]'}`}>
            {/* Logo Area */}
            <div className={`flex items-center h-[72px] border-b border-slate-100 shrink-0 ${isCollapsed ? 'justify-center px-4' : 'justify-between px-6'}`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'opacity-100 transition-opacity delay-150'}`}>
                    <img src="/logo.png" alt="SeaSense AI Logo" className="w-[124px] h-auto object-contain cursor-pointer" />
                </div>
                {isCollapsed && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-md tracking-tighter transition-all">
                        SAI
                    </div>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`text-slate-400 hover:text-blue-600 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                    title="Collapse Sidebar"
                >
                    <PanelLeftClose size={20} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className={`flex-1 overflow-y-auto py-6 no-scrollbar flex flex-col gap-6 ${isCollapsed ? 'px-3' : 'px-4'}`}>
                
                {/* Main Navigation Bar Menu */}
                <div className="flex flex-col gap-1">
                    {!isCollapsed && <p className="px-3 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-opacity">Main Navigation</p>}
                    
                    {isCollapsed && (
                        <button 
                            onClick={() => setIsCollapsed(false)}
                            className="w-full flex justify-center py-3 text-slate-400 hover:text-blue-600 transition-colors mb-4"
                            title="Expand Sidebar"
                        >
                            <PanelRightClose size={20} />
                        </button>
                    )}
                    
                    {/* 1. Dashboard */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname === '/' ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Dashboard">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <LayoutDashboard size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname === '/' ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Dashboard</span>}
                            </div>
                        </Link>
                    </div>

                    {/* 2. Vessel List */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/fleet" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname.startsWith('/fleet') ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Vessel List">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <Ship size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname.startsWith('/fleet') ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Vessel List</span>}
                            </div>
                        </Link>
                    </div>

                    {/* 3. Live Map */}
                    <div className="flex flex-col mt-0.5">
                        <div onClick={() => {
                                if (isCollapsed) {
                                    setIsCollapsed(false);
                                    setOpenMenus(prev => ({ ...prev, map: true }));
                                } else {
                                    toggleMenu('map');
                                }
                            }} 
                            className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] cursor-pointer ${openMenus.map && !isCollapsed ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Live Map">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <Map size={18} className={`transition-transform duration-300 group-hover:scale-110 ${openMenus.map && !isCollapsed ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Live Map</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${openMenus.map ? 'rotate-180' : ''}`} />}
                        </div>
                        
                        {openMenus.map && !isCollapsed && (
                            <div className="flex flex-col ml-5 pl-4 border-l border-slate-200 mt-1 gap-1 py-1 transition-opacity">
                                <Link href="/map/realtime" className="relative text-[13px] text-slate-500 hover:text-slate-800 py-1.5 font-medium flex items-center group">
                                    <span className="absolute -left-[17px] w-2 h-[1px] bg-slate-200 group-hover:bg-blue-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 group-hover:bg-blue-500" />
                                    Real-time tracking
                                </Link>
                                <Link href="/map/clusters" className="relative text-[13px] text-slate-500 hover:text-slate-800 py-1.5 font-medium flex items-center group">
                                    <span className="absolute -left-[17px] w-2 h-[1px] bg-slate-200 group-hover:bg-blue-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 group-hover:bg-blue-500" />
                                    Vessel clusters
                                </Link>
                                <Link href="/map/routes" className="relative text-[13px] text-slate-500 hover:text-slate-800 py-1.5 font-medium flex items-center group">
                                    <span className="absolute -left-[17px] w-2 h-[1px] bg-slate-200 group-hover:bg-blue-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 group-hover:bg-blue-500" />
                                    Route visualization
                                </Link>
                                <Link href="/map/geofences" className="relative text-[13px] text-slate-500 hover:text-slate-800 py-1.5 font-medium flex items-center group">
                                    <span className="absolute -left-[17px] w-2 h-[1px] bg-slate-200 group-hover:bg-blue-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 group-hover:bg-blue-500" />
                                    Geofences
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 4. Trip History */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/trips" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname.startsWith('/trips') ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Trip History">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <Route size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname.startsWith('/trips') ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Trip History</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 5. Analytics */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/analytics" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname.startsWith('/analytics') ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Analytics">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <BarChart3 size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname.startsWith('/analytics') ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Analytics</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 6. Alerts */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/alerts" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname.startsWith('/alerts') ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Alerts Overview">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <AlertTriangle size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname.startsWith('/alerts') ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Alerts Overview</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 7. Reports */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/reports" className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] ${pathname.startsWith('/reports') ? 'text-blue-600 bg-blue-50/50 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-between'}`} title="Reports">
                            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                                <FileText size={18} className={`transition-transform duration-300 group-hover:scale-110 ${pathname.startsWith('/reports') ? "text-blue-600" : "text-slate-400"}`} />
                                {!isCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">Reports</span>}
                            </div>
                        </Link>
                    </div>
                    

                </div>

            </div>
            
        </aside>
    );
};
