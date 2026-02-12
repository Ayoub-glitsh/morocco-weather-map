import axios from 'axios';

// Open-Meteo base URL (Free API, No Key)
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  cityName: string;
  country: string;
}

export interface ForecastData {
  dt: string; // Formatted time string (HH:MM)
  temp: number;
  icon: string;
  description: string;
}

// Map WMO weather code to description and icon
const getWeatherInfo = (code: number, isDay: boolean = true) => {
  const descriptions: { [key: number]: string } = {
    0: 'سماء صافية',
    1: 'غائم جزئياً', 2: 'غائم جزئياً', 3: 'غائم كلياً',
    45: 'ضباب', 48: 'ضباب كثيف',
    51: 'رذاذ خفيف', 53: 'رذاذ متوسط', 55: 'رذاذ كثيف',
    56: 'رذاذ متجمد', 57: 'رذاذ متجمد كثيف',
    61: 'مطر خفيف', 63: 'مطر متوسط', 65: 'مطر غزير',
    66: 'مطر متجمد', 67: 'مطر متجمد غزير',
    71: 'ثلوج خفيفة', 73: 'ثلوج متوسطة', 75: 'ثلوج كثيفة',
    77: 'حبيبات ثلجية',
    80: 'زخات مطر', 81: 'زخات مطر', 82: 'زخات مطر قوية',
    85: 'زخات ثلج', 86: 'زخات ثلج قوية',
    95: 'عاصفة رعدية', 96: 'عاصفة رعدية وحبرد', 99: 'عاصفة رعدية شديدة'
  };

  const icons: { [key: number]: string } = {
    0: isDay ? 'Clear' : 'ClearNight',
    1: 'Cloudy', 2: 'Cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Fog',
    51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
    61: 'Rain', 63: 'Rain', 65: 'Rain',
    71: 'Snow', 73: 'Snow', 75: 'Snow',
    80: 'Rain', 81: 'Rain', 82: 'Rain',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };

  return {
    description: descriptions[code] || 'غير معروف',
    icon: icons[code] || 'Unknown' // Ideally return component or string to map later
  };
};

export const getWeather = async (lat: number, lon: number, lang: string = 'ar'): Promise<WeatherData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,is_day',
        daily: 'sunrise,sunset',
        timezone: 'auto'
      }
    });

    const current = response.data.current;
    const daily = response.data.daily;
    const weatherInfo = getWeatherInfo(current.weather_code, current.is_day === 1);

    const sunrise = daily?.sunrise?.[0] ? new Date(daily.sunrise[0]).getTime() / 1000 : 0;
    const sunset = daily?.sunset?.[0] ? new Date(daily.sunset[0]).getTime() / 1000 : 0;

    return {
      temp: Math.round(current.temperature_2m),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      pressure: current.surface_pressure,
      sunrise: sunrise,
      sunset: sunset,
      cityName: '',
      country: 'MA'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};


export const getForecast = async (lat: number, lon: number, lang: string = 'ar'): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,weather_code',
        timezone: 'auto',
        forecast_days: 1
      }
    });

    const hourly = response.data.hourly;
    const forecastList: ForecastData[] = [];

    for (let i = 0; i < hourly.time.length; i += 3) {
      if (i > 24) break;

      const time = hourly.time[i];
      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      const weatherInfo = getWeatherInfo(hourly.weather_code[i]);

      forecastList.push({
        dt: formattedTime,
        temp: Math.round(hourly.temperature_2m[i]),
        icon: weatherInfo.icon,
        description: weatherInfo.description
      });
    }

    return forecastList;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
