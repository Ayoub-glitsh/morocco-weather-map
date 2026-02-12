'use client';

import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 p-2 text-center pointer-events-none">
            <div className="inline-block px-4 py-1.5 bg-white/70 dark:bg-slate-900/70 glass backdrop-blur-md rounded-full shadow-lg border border-white/20 pointer-events-auto">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 font-sans flex items-center gap-1">
                    Made by <span className="text-red-500 animate-pulse">❤️</span> <span className="font-bold text-morocco-red">Merouan</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
