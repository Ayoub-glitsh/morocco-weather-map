'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building2, Star, X } from 'lucide-react';
import { useWeatherStore, City } from '@/stores/weatherStore';
import citiesData from '@/data/moroccanCities.json';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const {
        selectedCity,
        setSelectedCity,
        favorites,
        toggleFavorite,
        isSidebarOpen,
        toggleSidebar
    } = useWeatherStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'favorites'>('all');
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Filter cities based on search and favorite status
    const filteredCities = (citiesData as City[]).filter(city => {
        const matchesSearch =
            city.name.includes(searchTerm) ||
            city.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.nameEn.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeFilter === 'favorites') {
            return matchesSearch && favorites.includes(city.id);
        }
        return matchesSearch;
    });

    return (
        <AnimatePresence mode="wait">
            {isSidebarOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 shadow-2xl z-50 overflow-hidden flex flex-col border-l border-white/20 backdrop-blur-md pt-20"
                    suppressHydrationWarning
                >
                    {/* Search Header */}
                    <div className="p-4 border-b border-white/20 dark:border-white/5">
                        <div className="relative mb-4">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="ابحث عن مدينة..."
                                className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-white/10 rounded-lg pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-morocco-green/50 text-right placeholder-gray-500 text-gray-800 dark:text-gray-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm transition-colors ${activeFilter === 'all'
                                    ? 'bg-morocco-green text-white shadow-md'
                                    : 'bg-white/40 dark:bg-slate-700/40 hover:bg-white/60 dark:hover:bg-slate-600/40 text-gray-700 dark:text-gray-200'
                                    }`}
                            >
                                الكل
                            </button>
                            <button
                                onClick={() => setActiveFilter('favorites')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm transition-colors flex items-center justify-center gap-1 ${activeFilter === 'favorites'
                                    ? 'bg-morocco-gold text-white shadow-md'
                                    : 'bg-white/40 dark:bg-slate-700/40 hover:bg-white/60 dark:hover:bg-slate-600/40 text-gray-700 dark:text-gray-200'
                                    }`}
                            >
                                <Star size={14} fill={activeFilter === 'favorites' ? 'currentColor' : 'none'} />
                                المفضلة
                            </button>
                        </div>
                    </div>

                    {/* Cities List */}
                    <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                        {filteredCities.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                لا توجد نتائج
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredCities.map((city) => (
                                    <motion.div
                                        key={city.id}
                                        layoutId={`city-${city.id}`}
                                        onClick={() => {
                                            setSelectedCity(city);
                                            if (window.innerWidth < 768) toggleSidebar();
                                        }}
                                        className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedCity?.id === city.id
                                            ? 'bg-white/80 dark:bg-slate-800/80 border-morocco-green shadow-sm'
                                            : 'bg-white/30 dark:bg-slate-800/30 border-transparent hover:bg-white/50 dark:hover:bg-slate-700/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${city.isCapital
                                                    ? 'bg-morocco-red/10 text-morocco-red dark:bg-morocco-red/20'
                                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                                                    }`}>
                                                    {city.isCapital ? <Building2 size={18} /> : <MapPin size={18} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 font-arabic">{city.name}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">{city.nameEn}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(city.id);
                                                }}
                                                className={`p-1.5 rounded-full transition-colors ${favorites.includes(city.id)
                                                    ? 'text-morocco-gold hover:bg-morocco-gold/10'
                                                    : 'text-gray-400 hover:text-morocco-gold hover:bg-gray-100 dark:hover:bg-slate-700'
                                                    }`}
                                            >
                                                <Star size={18} fill={favorites.includes(city.id) ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
