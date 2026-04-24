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
    PanelLeftClose,
    PanelRightClose,
    X,
    Compass
} from 'lucide-react';

interface NavigationSidebarProps {
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
}

export const NavigationSidebar = ({ mobileOpen = false, onCloseMobile }: NavigationSidebarProps) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const showCollapsed = isCollapsed && !mobileOpen;

    const closeMobileIfNeeded = () => {
        onCloseMobile?.();
    };

    return (
        <>
        {mobileOpen && (
            <button
                className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
                onClick={onCloseMobile}
                aria-label="Close sidebar"
            />
        )}
        <aside className={`fixed md:relative inset-y-0 left-0 z-50 h-screen bg-white border-r border-slate-100 flex flex-col overflow-hidden shrink-0 transition-all duration-300 ease-in-out ${showCollapsed ? 'md:w-[84px]' : 'md:w-[260px]'} w-[260px] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            {/* Logo Area */}
            <div className={`flex items-center h-[72px] border-b border-slate-100 shrink-0 ${showCollapsed ? 'md:justify-center md:px-4' : 'justify-between px-6'}`}>
                <div className={`flex items-center gap-3 ${showCollapsed ? 'md:hidden' : 'opacity-100 transition-opacity delay-150'}`}>
                    <img src="/logo.png" alt="SeaSense AI Logo" className="w-[124px] h-auto object-contain cursor-pointer" />
                </div>
                {showCollapsed && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-md tracking-tighter transition-all">
                        SAI
                    </div>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`hidden md:block text-slate-400 hover:text-blue-600 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                    title="Collapse Sidebar"
                >
                    <PanelLeftClose size={20} />
                </button>
                <button
                    onClick={onCloseMobile}
                    className="text-slate-400 hover:text-blue-600 transition-colors md:hidden"
                    title="Close Sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className={`flex-1 overflow-y-auto py-6 no-scrollbar flex flex-col gap-6 ${showCollapsed ? 'md:px-3' : 'px-4'}`}>
                
                {/* Main Navigation Bar Menu */}
                <div className="flex flex-col gap-1">
                    {!showCollapsed && <p className="px-3 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-opacity">Main Navigation</p>}
                    
                    {showCollapsed && (
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
                        <Link href="/" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname === '/' ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Dashboard">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <LayoutDashboard size={18} className={`transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${pathname === '/' ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Dashboard</span>}
                            </div>
                        </Link>
                    </div>

                    {/* 2. Vessel List */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/fleet" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/fleet') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Vessel List">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <Ship size={18} className={`transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${pathname.startsWith('/fleet') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Vessel List</span>}
                            </div>
                        </Link>
                    </div>

                    {/* 3. Live Map */}
                    <div className="flex flex-col mt-0.5">
                        <Link href="/map/realtime" 
                            onClick={closeMobileIfNeeded}
                            className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/map') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Live Map">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <Map size={18} className={`transition-all duration-300 group-hover:scale-110 ${pathname.startsWith('/map') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Live Map</span>}
                            </div>
                        </Link>
                    </div>

                    {/* 4. Trip History */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/trips" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/trips') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Trip History">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <Route size={18} className={`transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${pathname.startsWith('/trips') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Trip History</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 5. Analytics */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/analytics" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/analytics') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Analytics">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <BarChart3 size={18} className={`transition-all duration-300 group-hover:scale-110 ${pathname.startsWith('/analytics') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Analytics</span>}
                            </div>
                        </Link>
                    </div>

                    {/* Marine Intelligence */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/intelligence" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/intelligence') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Marine Intelligence">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <Compass size={18} className={`transition-all duration-300 group-hover:scale-110 ${pathname.startsWith('/intelligence') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Intelligence</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 6. Alerts */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/alerts" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/alerts') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Alerts Overview">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <AlertTriangle size={18} className={`transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${pathname.startsWith('/alerts') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Alerts</span>}
                            </div>
                        </Link>
                    </div>
                    
                    {/* 7. Reports */}
                    <div className="flex flex-col mt-0.5 mb-1">
                        <Link href="/reports" onClick={closeMobileIfNeeded} className={`group flex items-center px-3 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-[0.95] ${pathname.startsWith('/reports') ? 'text-blue-600 bg-blue-50/50 shadow-sm border border-blue-100/30' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'} ${showCollapsed ? 'md:justify-center' : 'justify-between'}`} title="Reports">
                            <div className={`flex items-center ${showCollapsed ? 'md:gap-0' : 'gap-3'}`}>
                                <FileText size={18} className={`transition-all duration-300 group-hover:scale-110 ${pathname.startsWith('/reports') ? "text-blue-600 flex-shrink-0" : "text-slate-400 flex-shrink-0"}`} />
                                {!showCollapsed && <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">Reports</span>}
                            </div>
                        </Link>
                    </div>
                    

                </div>

            </div>
            
        </aside>
        </>
    );
};
