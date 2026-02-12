'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import MapWrapper from '@/components/map/MapWrapper';
import WeatherCard from '@/components/weather/WeatherCard';
import Footer from '@/components/layout/Footer';
import { useWeatherStore } from '@/stores/weatherStore';

export default function Home() {
  const { darkMode } = useWeatherStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors" suppressHydrationWarning>
        <div className="text-center font-arabic animate-pulse">
          <h1 className="text-2xl text-morocco-red font-bold mb-2">مغرب الطقس</h1>
          <p className="text-morocco-green">جاري التحميل...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden relative bg-gray-50 dark:bg-slate-900" suppressHydrationWarning>
      <Header />

      <div className="flex-1 relative w-full h-full z-0 overflow-hidden">
        {/* Map Layer */}
        <div className="absolute inset-0 z-0">
          <MapWrapper />
        </div>

        {/* Weather Card Layer (Above Map, Below Sidebar) */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center md:items-start md:justify-end md:pt-24 md:pl-8 pb-8 md:pb-0">
          <div className="pointer-events-auto w-full md:w-auto px-4 md:px-0">
            <WeatherCard />
          </div>
        </div>

        {/* Sidebar Layer (Top) */}
        <Sidebar />
      </div>

      <Footer />
    </main>
  );
}
