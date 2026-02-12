'use client';

import dynamic from 'next/dynamic';

const MapWrapper = dynamic(() => import('./WeatherMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-morocco-green/5 dark:bg-slate-900 border-2 border-dashed border-morocco-gold/20 flex items-center justify-center text-morocco-gold animate-pulse">جاري تحميل الخريطة...</div>
});

export default MapWrapper;
