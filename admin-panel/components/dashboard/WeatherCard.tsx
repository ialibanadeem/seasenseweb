'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';


interface WeatherData {
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}

export default function WeatherCard() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [metricIndex, setMetricIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
                const res = await fetch(`${apiURL}/weather/analytics`);
                if (!res.ok) throw new Error("Failed to fetch weather");
                const data = await res.json();
                
                if (data.live) {
                    setWeather({
                        temp: Math.round(data.live.airTemp),
                        description: getWeatherDescription(data.live.conditionCode),
                        humidity: data.live.humidity,
                        windSpeed: Math.round(data.live.windSpeed),
                        icon: getConditionIconName(data.live.conditionCode),
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                setLoading(false);
            }
        };

        const getWeatherDescription = (code: number) => {
            if (code === 0) return 'Clear Sky';
            if (code >= 1 && code <= 3) return 'Partly Cloudy';
            if (code >= 45 && code <= 48) return 'Foggy';
            if (code >= 51 && code <= 67) return 'Rainy';
            if (code >= 80 && code <= 82) return 'Showers';
            if (code >= 95) return 'Thunderstorm';
            return 'Clear';
        };

        const getConditionIconName = (code: number) => {
            if (code === 0) return 'clear';
            if (code >= 1 && code <= 3) return 'clouds';
            if (code >= 51 && code <= 82) return 'rain';
            return 'clear';
        };

        fetchWeather();
        const refreshInterval = setInterval(fetchWeather, 600000); // Refresh every 10 mins
        
        return () => clearInterval(refreshInterval);
    }, []);

    useEffect(() => {
        if (!weather) return;
        const rotateInterval = setInterval(() => {
            setMetricIndex((prev) => (prev + 1) % 3);
        }, 5000); // Rotate metrics every 5 seconds

        return () => clearInterval(rotateInterval);
    }, [weather]);

    const metrics = weather ? [
        { label: 'Wind', value: `${weather.windSpeed} km/h`, icon: <Wind size={12} className="text-sky-400" /> },
        { label: 'Humidity', value: `${weather.humidity}%`, icon: <Droplets size={12} className="text-blue-400" /> },
        { label: 'Cloud', value: weather.description, icon: <Cloud size={12} className="text-slate-400" /> },
    ] : [];

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'clear': return <Sun className="text-amber-400 animate-pulse" size={16} />;
            case 'clouds': return <Cloud className="text-slate-400" size={16} />;
            case 'rain': return <CloudRain className="text-blue-400" size={16} />;
            default: return <Sun className="text-amber-400" size={16} />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-50 border border-slate-100 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-slate-200" />
                <div className="w-12 h-3 bg-slate-200 rounded" />
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="flex items-center gap-3 px-3 h-9 rounded-lg bg-white border border-slate-200/60 shadow-sm transition-all hover:border-slate-300 group">
            {/* Temp */}
            <div className="flex items-center gap-2 pr-3 border-r border-slate-100 h-5">
                {getWeatherIcon(weather.icon)}
                <span className="text-[13px] font-black text-slate-900 tracking-tighter">{weather.temp}°<span className="text-[10px] text-slate-400 ml-0.5">C</span></span>
            </div>

            {/* Carousel */}
            <div className="relative w-24 h-4 overflow-hidden">
                {metrics.map((metric, idx) => (
                    <div 
                        key={idx}
                        className={`absolute inset-0 flex items-center gap-1.5 transition-all duration-700 ease-in-out transform ${
                            idx === metricIndex 
                                ? 'translate-y-0 opacity-100' 
                                : '-translate-y-full opacity-0'
                        }`}
                    >
                        {metric.icon}
                        <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap tracking-tight capitalize">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
