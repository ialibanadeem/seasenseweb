'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, Legend } from 'recharts';
import { Loader2, Wind, Waves, Compass, Thermometer, Droplets, AlertTriangle, Activity, ShieldCheck, Clock, Navigation, Info } from 'lucide-react';

const InfoTooltip = ({ text }: { text: string }) => (
    <div className="relative group flex items-center">
        <Info size={14} className="text-slate-300 hover:text-blue-500 cursor-help transition-colors" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-[220px] p-2.5 bg-slate-800 text-white text-[11px] font-medium leading-relaxed rounded-xl shadow-xl z-50 text-center pointer-events-none normal-case tracking-normal">
            {text}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
        </div>
    </div>
);

const IntelligenceCard = ({ icon, label, value, unit, tooltip, color, extra, badge }: any) => {
    const colorMap: any = {
        blue: 'bg-blue-50 text-blue-600',
        cyan: 'bg-cyan-50 text-cyan-600',
        indigo: 'bg-indigo-50 text-indigo-600',
        orange: 'bg-orange-50 text-orange-600',
        sky: 'bg-sky-50 text-sky-600',
        emerald: 'bg-emerald-50 text-emerald-600',
    };

    return (
        <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${colorMap[color] || colorMap.blue} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    {icon}
                </div>
                <InfoTooltip text={tooltip} />
            </div>
            
            <div className="space-y-1">
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
                    <span className="text-[14px] font-bold text-slate-400">{unit}</span>
                </div>
                
                {(extra || badge) && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
                        {extra && <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{extra}</p>}
                        {badge && (
                            <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-tighter">
                                {badge}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function MarineIntelligencePage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchIntelligence = async () => {
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                const res = await fetch(`${apiURL}/weather/analytics`);
                if (!res.ok) throw new Error("Failed to fetch weather data");
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch marine intelligence:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIntelligence();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-slate-500 font-medium tracking-tight">Gathering Marine Intelligence...</p>
                </div>
            </div>
        );
    }

    if (!data) return (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
            <p className="text-slate-500 font-medium">Failed to load marine data. Please try again later.</p>
        </div>
    );

    const { live, intelligence, forecast } = data;

    // Process forecast data for charts
    const waveChartData = forecast.hourly?.time?.slice(0, 24).map((timeStr: string, index: number) => ({
        time: new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waveHeight: forecast.hourly.wave_height[index] || 0
    })) || [];

    const tideChartData = forecast.minutely?.time?.slice(0, 24).map((timeStr: string, index: number) => ({
        time: new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        level: forecast.minutely.sea_level_height_msl[index] || 0
    })) || [];

    // Helper to get risk color
    const getRiskColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'dangerous': return 'bg-rose-50 text-rose-600 border-rose-200';
            case 'moderate': return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'safe': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-8 py-5 md:py-8 flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Compass size={20} />
                            </div>
                            Marine Intelligence
                        </h1>
                        <p className="text-[14px] font-medium text-slate-500 mt-2">Real-time oceanographic telemetry and predictive safety analysis.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-4 py-2.5 rounded-xl border font-bold text-[14px] flex items-center gap-2 ${getRiskColor(live.riskLevel)}`}>
                            {live.riskLevel === 'Dangerous' ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
                            Risk Level: {live.riskLevel}
                        </div>
                        <div className="px-4 py-2.5 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center gap-2 capitalize">
                            <Thermometer size={18} />
                            {(() => {
                                const code = live.conditionCode;
                                if (code === 0) return 'Sunny / Clear';
                                if (code >= 1 && code <= 3) return 'Partly Cloudy';
                                if (code >= 45 && code <= 48) return 'Foggy';
                                if (code >= 51 && code <= 67) return 'Rainy';
                                if (code >= 71 && code <= 77) return 'Snowy';
                                if (code >= 80 && code <= 82) return 'Showers';
                                if (code >= 95) return 'Thunderstorm';
                                return 'Clear';
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-4 md:gap-8">
                
                {/* Intelligence Overview Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                            <Activity size={32} />
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                Sea Condition Score
                                <InfoTooltip text="A score from 0 to 100 indicating overall safety based on wave size and water current speed. Higher is safer." />
                            </p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{intelligence.seaConditionScore}</p>
                                <p className="text-[14px] font-bold text-slate-400 mb-1">/ 100</p>
                            </div>
                            <p className="text-[13px] font-medium text-slate-500 mt-1">Based on composite wave and current data.</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                            <Clock size={32} />
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                Safe Sailing Window
                                <InfoTooltip text="The number of hours from now until the waves are forecasted to become too high (over 1.5m) for safe travel." />
                            </p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tight">{intelligence.safeSailingWindowHours}</p>
                                <p className="text-[14px] font-bold text-slate-400 mb-1">Hours</p>
                            </div>
                            <p className="text-[13px] font-medium text-slate-500 mt-1">Contiguous safe conditions forecasted ahead.</p>
                        </div>
                    </div>
                </div>

                {/* Live Cards (Snapshot) */}
                <h2 className="text-lg font-bold text-slate-900 mt-2">Live Ocean Conditions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <IntelligenceCard 
                        icon={<Waves size={20} />} 
                        label="Wave Height" 
                        value={live.waveHeight.toFixed(2)} 
                        unit="m" 
                        tooltip="The average size of the largest ocean waves right now."
                        color="blue"
                    />
                    <IntelligenceCard 
                        icon={<Wind size={20} />} 
                        label="Wind Wave" 
                        value={live.windWaveHeight.toFixed(2)} 
                        unit="m" 
                        tooltip="The size of the waves caused directly by local winds blowing over the water."
                        color="cyan"
                    />
                    <IntelligenceCard 
                        icon={<Wind size={20} />} 
                        label="Wind Speed" 
                        value={live.windSpeed?.toFixed(0)} 
                        unit="km/h" 
                        tooltip="Land-based wind speed measured in Karachi city center."
                        color="indigo"
                    />
                    <IntelligenceCard 
                        icon={<Navigation size={20} />} 
                        label="Current Speed" 
                        value={live.currentSpeed.toFixed(2)} 
                        unit="kn" 
                        tooltip="How fast the water itself is moving (measured in knots)."
                        color="cyan"
                    />
                    <IntelligenceCard 
                        icon={<Thermometer size={20} />} 
                        label="Air / Sea Temp" 
                        value={live.airTemp?.toFixed(1)} 
                        unit="°C" 
                        tooltip="Air temperature (Karachi) and Sea Surface temperature."
                        color="orange"
                        extra={`Sea: ${live.seaSurfaceTemp.toFixed(1)}°C`}
                    />
                    <IntelligenceCard 
                        icon={<Droplets size={20} />} 
                        label="Tide Level" 
                        value={live.tideLevel.toFixed(2)} 
                        unit="m" 
                        tooltip="The current height of the sea level compared to average levels."
                        color="sky"
                        badge={live.tideTrend}
                    />
                </div>

                {/* Forecast Charts */}
                <h2 className="text-lg font-bold text-slate-900 mt-4">Forecast Projections</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                    
                    {/* Wave Forecast */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-[15px] font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Waves size={18} className="text-blue-500"/> Wave Height Forecast (24h)
                            <InfoTooltip text="Predicted wave heights for the next 24 hours based on marine models." />
                        </h3>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={waveChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} minTickGap={30} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                    <Area type="monotone" name="Wave Height (m)" dataKey="waveHeight" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tide Schedule */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-[15px] font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Droplets size={18} className="text-sky-500"/> Tide Level Forecast (6h)
                            <InfoTooltip text="Predicted sea level variations from the mean for the next 6 hours." />
                        </h3>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tideChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} minTickGap={20} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} domain={['auto', 'auto']} />
                                    <RTTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                    <Line type="monotone" name="Sea Level MSL (m)" dataKey="level" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{r: 6, strokeWidth: 0, fill: '#0ea5e9'}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
