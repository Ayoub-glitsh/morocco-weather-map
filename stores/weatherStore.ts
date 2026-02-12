import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface City {
    id: number;
    name: string;
    nameFr: string;
    nameEn: string;
    lat: number;
    lon: number;
    isCapital: boolean;
    region: string;
}

interface WeatherStore {
    selectedCity: City | null;
    favorites: number[]; // Array of City IDs
    darkMode: boolean;
    language: 'ar' | 'fr' | 'en';
    isSidebarOpen: boolean;

    // Actions
    setSelectedCity: (city: City | null) => void;
    toggleFavorite: (cityId: number) => void;
    toggleDarkMode: () => void;
    setLanguage: (lang: 'ar' | 'fr' | 'en') => void;
    toggleSidebar: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
    persist(
        (set) => ({
            selectedCity: null, // Will be set to Rabat initially
            favorites: [],
            darkMode: false,
            language: 'ar',
            isSidebarOpen: true,

            setSelectedCity: (city) => set({ selectedCity: city }),
            toggleFavorite: (cityId) => set((state) => ({
                favorites: state.favorites.includes(cityId)
                    ? state.favorites.filter(id => id !== cityId)
                    : [...state.favorites, cityId]
            })),
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
            setLanguage: (lang) => set({ language: lang }),
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        {
            name: 'morocco-weather-storage',
            partialize: (state) => ({
                favorites: state.favorites,
                darkMode: state.darkMode,
                language: state.language
            }),
        }
    )
);
