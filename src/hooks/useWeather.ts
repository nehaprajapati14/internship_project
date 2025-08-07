import { useState } from 'react';
import { WeatherData, ForecastData, HourlyForecast, HistoricalWeatherData } from '../types/weather';
import { 
  fetchWeatherByCity, 
  fetchForecast, 
  fetchHourlyForecast,
  fetchWeatherByCoords,
  fetchHistoricalWeather
} from '../services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');

  const searchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    setLastSearchedCity(city);

    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecast(city),
        fetchHourlyForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
      setHistoricalData(null); // Clear historical data when searching new city
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
      setHistoricalData(null);
    } finally {
      setLoading(false);
    }
  };

  const searchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      const weatherData = await fetchWeatherByCoords(latitude, longitude);
      const [forecastData, hourlyData] = await Promise.all([
        fetchForecast(weatherData.name),
        fetchHourlyForecast(weatherData.name),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
      setLastSearchedCity(weatherData.name);
      setHistoricalData(null);
    } catch (err) {
      let errorMessage = 'Unable to get your location.';
      
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services and try again.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try searching for a city instead.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or search for a city.';
            break;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
      setHistoricalData(null);
    } finally {
      setLoading(false);
    }
  };

  const searchHistoricalWeather = async (date: Date) => {
    if (!lastSearchedCity) {
      setError('Please search for a city first');
      return;
    }

    setHistoricalLoading(true);
    setError(null);

    try {
      const historicalWeather = await fetchHistoricalWeather(lastSearchedCity, date);
      setHistoricalData(historicalWeather);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to fetch historical data';
      setError(errorMessage);
      setHistoricalData(null);
    } finally {
      setHistoricalLoading(false);
    }
  };

  const retryLastSearch = () => {
    if (lastSearchedCity) {
      searchWeather(lastSearchedCity);
    }
  };

  return {
    weather,
    forecast,
    hourlyForecast,
    historicalData,
    loading,
    historicalLoading,
    error,
    lastSearchedCity,
    searchWeather,
    searchWeatherByLocation,
    searchHistoricalWeather,
    retryLastSearch,
  };
};