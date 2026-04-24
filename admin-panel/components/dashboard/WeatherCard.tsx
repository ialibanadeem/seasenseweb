'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';

const API_KEY = '9e377abda5f48e8778647493d637ac07';
const CITY = 'Karachi';

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
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
                );
                const data = await response.json();
                
                if (data.main) {
                    setWeather({
                        temp: Math.round(data.main.temp),
                        description: data.weather[0].description,
                        humidity: data.main.humidity,
                        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                        icon: data.weather[0].main,
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                setLoading(false);
            }
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
