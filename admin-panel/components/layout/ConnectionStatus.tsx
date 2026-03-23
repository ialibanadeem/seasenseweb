'use client';

import React from 'react';
import { useTrackingSocket } from '../../hooks/useTrackingSocket';
import { Wifi, WifiOff } from 'lucide-react';

export const ConnectionStatus = () => {
    const { isConnected } = useTrackingSocket();

    return (
        <div className="flex flex-col items-center gap-1 group">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 border shadow-sm ${isConnected
                    ? 'bg-emerald-50/50 border-emerald-200/50 text-emerald-600'
                    : 'bg-slate-50/50 border-slate-200/50 text-slate-400'
                }`}>
                {isConnected ? (
                    <>
                        <Wifi size={18} />
                        <span className="absolute top-1 right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </>
                ) : (
                    <WifiOff size={18} />
                )}
            </div>

            <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors duration-300 ${isConnected ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                {isConnected ? 'Online' : 'Offline'}
            </span>

            {/* Tooltip */}
            <div className="absolute left-16 px-4 py-2 bg-white/90 backdrop-blur-md border border-white/40 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#0f172a] shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
                System: {isConnected ? 'Connected to Backend' : 'Disconnected'}
            </div>
        </div>
    );
};
