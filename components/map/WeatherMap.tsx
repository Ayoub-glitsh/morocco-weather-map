'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeatherStore, City } from '@/stores/weatherStore';
import citiesData from '@/data/moroccanCities.json';
import L from 'leaflet';

// Fix Leaflet Default Icon in Next.js
const DefaultIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Icon for Capital
const CapitalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map view updates
function MapController() {
    const { selectedCity } = useWeatherStore();
    const map = useMap();

    useEffect(() => {
        if (selectedCity) {
            map.flyTo([selectedCity.lat, selectedCity.lon], 13, {
                duration: 2
            });
        }
    }, [selectedCity, map]);

    return null;
}

const WeatherMap = () => {
    const { setSelectedCity, darkMode } = useWeatherStore();

    const tileLayerUrl = darkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution = darkMode
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    return (
        <MapContainer
            center={[31.7917, -7.0926]} // Center of Morocco roughly
            zoom={6}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            zoomControl={false}
            minZoom={5}
            maxBounds={[
                [21, -17], // Southwest
                [36, -1]   // Northeast
            ]}
        >
            <TileLayer
                attribution={attribution}
                url={tileLayerUrl}
            />

            <MapController />

            {(citiesData as City[]).map((city) => (
                <Marker
                    key={city.id}
                    position={[city.lat, city.lon]}
                    eventHandlers={{
                        click: () => {
                            setSelectedCity(city);
                        },
                    }}
                    icon={city.isCapital ? CapitalIcon : DefaultIcon}
                >
                    <Popup className="rubik-font">
                        <div className="text-center">
                            <h3 className="font-bold text-lg font-arabic text-primary">{city.name}</h3>
                            <p className="text-sm text-gray-600">{city.nameEn}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default WeatherMap;
