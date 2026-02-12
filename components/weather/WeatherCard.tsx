'use client';

import React from 'react';
import { useWeatherStore } from '@/stores/weatherStore';
import { useWeatherData } from '@/hooks/useWeatherData';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cloud, CloudRain, Sun, Moon, CloudLightning, CloudSnow,
    Wind, Droplets, Sunrise, Sunset, X
} from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Helper to map weather description to icon
const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
        case 'Rain':
        case 'Showers':
        case 'Drizzle':
            return <CloudRain className="w-16 h-16 text-blue-400 animate-bounce" />;
        case 'Cloudy':
        case 'Overcast':
        case 'Fog':
            return <Cloud className="w-16 h-16 text-gray-400 animate-pulse" />;
        case 'Snow':
            return <CloudSnow className="w-16 h-16 text-white animate-pulse" />;
        case 'Thunderstorm':
            return <CloudLightning className="w-16 h-16 text-yellow-600 animate-pulse" />;
        case 'ClearNight':
            return <Moon className="w-16 h-16 text-slate-400 animate-pulse" />;
        case 'Clear':
        default:
            return <Sun className="w-16 h-16 text-yellow-400 animate-spin-slow" />;
    }
};

const WeatherCard = () => {
    const { selectedCity, setSelectedCity, darkMode } = useWeatherStore();
    const { weather, forecast, isLoading, isError } = useWeatherData();

    if (!selectedCity) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full md:w-96 z-[1000] mx-auto md:mx-0 shadow-2xl"
                suppressHydrationWarning
            >
                <div className="bg-white/90 dark:bg-slate-900/90 glass rounded-3xl p-6 shadow-2xl backdrop-blur-md border border-white/50 dark:border-white/10 relative overflow-hidden" suppressHydrationWarning>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-morocco-red/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-morocco-green/10 rounded-full blur-3xl -z-10"></div>

                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedCity(null)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4" suppressHydrationWarning>
                            <div className="w-12 h-12 border-4 border-morocco-green border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 dark:text-gray-400 animate-pulse">جاري تحميل الطقس...</p>
                        </div>
                    ) : isError || !weather ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-2 text-center" suppressHydrationWarning>
                            <CloudLightning size={48} className="text-morocco-red mb-2" />
                            <p className="text-gray-800 dark:text-gray-200 font-bold">عذراً، حدث خطأ</p>
                            <p className="text-sm text-gray-500">تأكد من اتصالك بالإنترنت أو مفتاح API</p>
                        </div>
                    ) : (
                        <div className="space-y-6" suppressHydrationWarning>
                            {/* Header */}
                            <div className="text-center pt-2">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-arabic mb-1">{selectedCity.name}</h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider font-semibold text-[10px]">
                                    {weather.description}
                                </span>
                            </div>

                            {/* Main Weather */}
                            <div className="flex items-center justify-center gap-6 py-2">
                                <div className="transform scale-110 drop-shadow-lg p-2 bg-white/50 dark:bg-white/5 rounded-full backdrop-blur-sm">
                                    {getWeatherIcon(weather.icon)}
                                </div>
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-gray-900 dark:text-white tracking-tighter drop-shadow-sm">
                                        {weather.temp}°
                                    </div>
                                </div>
                            </div>

                            {/* Forecast Chart */}
                            {forecast && forecast.length > 0 && (
                                <div className="h-24 w-full mt-4 bg-white/30 dark:bg-slate-800/30 rounded-xl p-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={forecast}>
                                            <Line
                                                type="monotone"
                                                dataKey="temp"
                                                stroke={darkMode ? "#FFB81C" : "#C1272D"}
                                                strokeWidth={3}
                                                dot={{ r: 4, fill: darkMode ? "#FFB81C" : "#C1272D", strokeWidth: 2, stroke: '#fff' }}
                                            />
                                            <XAxis dataKey="dt" tick={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: darkMode ? '#1e293b' : '#fff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                                labelStyle={{ display: 'none' }}
                                                itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                                                formatter={(value: any) => [`${value}°`, '']}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Grid Statistics */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Droplets size={16} className="text-blue-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">الرطوبة</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{weather.humidity}%</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Wind size={16} className="text-gray-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">الرياح</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{weather.windSpeed} <span className="text-[10px]">km/h</span></span>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Sunrise size={16} className="text-orange-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">الشروق</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200 text-xs">
                                        {new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Sunset size={16} className="text-purple-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">الغروب</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200 text-xs">
                                        {new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default WeatherCard;
