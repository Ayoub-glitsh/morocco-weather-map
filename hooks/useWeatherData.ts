'use client';

import { useQuery } from '@tanstack/react-query';
import { getWeather, getForecast, WeatherData, ForecastData } from '@/services/weatherAPI';
import { useWeatherStore } from '@/stores/weatherStore';

export const useWeatherData = () => {
    const { selectedCity, language } = useWeatherStore();

    const weatherQuery = useQuery({
        queryKey: ['weather', selectedCity?.id, language],
        queryFn: () => selectedCity ? getWeather(selectedCity.lat, selectedCity.lon, language) : null,
        enabled: !!selectedCity,
        refetchInterval: 10 * 60 * 1000, // 10 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const forecastQuery = useQuery({
        queryKey: ['forecast', selectedCity?.id, language],
        queryFn: () => selectedCity ? getForecast(selectedCity.lat, selectedCity.lon, language) : null,
        enabled: !!selectedCity,
        refetchInterval: 10 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
    });

    return {
        weather: weatherQuery.data,
        forecast: forecastQuery.data,
        isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
        isError: weatherQuery.isError || forecastQuery.isError,
        error: weatherQuery.error || forecastQuery.error,
        refetch: () => {
            weatherQuery.refetch();
            forecastQuery.refetch();
        }
    };
};
