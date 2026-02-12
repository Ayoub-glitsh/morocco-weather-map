'use client';

import React from 'react';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useWeatherStore } from '@/stores/weatherStore';

const Header = () => {
    const { darkMode, toggleDarkMode, toggleSidebar, isSidebarOpen } = useWeatherStore();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/10 backdrop-blur-md border-b border-white/20 glass">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">

                {/* Left: Logo & Menu Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg relative">
                            {/* Using Morocco Flag SVG from Wikimedia */}
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
                                alt="Morocco Flag"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-xl font-bold font-arabic hidden sm:block text-morocco-red drop-shadow-sm">
                            مغرب الطقس
                        </h1>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher (Placeholder) */}
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium">
                        <Languages size={20} />
                        <span className="hidden sm:inline">العربية</span>
                    </button>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
