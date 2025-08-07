import React, { useEffect, useState } from 'react';
import { Cloud, Info, Thermometer, Calendar, TrendingUp } from 'lucide-react';
import SearchBar from './components/SearchBar';
import DateTimePicker from './components/DateTimePicker';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyForecast from './components/HourlyForecast';
import HistoricalWeather from './components/HistoricalWeather';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherBackground from './components/WeatherBackground';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/background';

function App() {
  const { 
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
    retryLastSearch 
  } = useWeather();
  
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'historical'>('current');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load default city on app start
  useEffect(() => {
    searchWeather('London');
  }, []);

  const handleCitySearch = (city: string) => {
    searchWeather(city);
  };

  const handleLocationSearch = () => {
    searchWeatherByLocation();
  };

  const handleHistoricalDateSelect = (date: Date) => {
    searchHistoricalWeather(date);
  };

  const handleDateTimeChange = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
    // For demo purposes, we'll just update the selected time
    // In a real app with historical data API, you'd fetch data for this specific time
  };

  const backgroundClass = weather 
    ? getWeatherBackground(weather.icon)
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 ease-in-out relative overflow-hidden`}>
      {/* Weather Background Effects */}
      {weather && <WeatherBackground weatherType={weather.icon} />}
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Cloud className="w-12 h-12 md:w-16 md:h-16 text-white mr-4 drop-shadow-2xl" />
              <Thermometer className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-200" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl">
                WeatherPro
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Real-time Weather Intelligence
              </p>
            </div>
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Get comprehensive weather information with real-time updates, 5-day forecasts, and historical data
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleCitySearch} 
          onLocationSearch={handleLocationSearch}
          loading={loading} 
        />

        {/* Navigation Tabs */}
        {weather && (
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'current'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  Current
                </button>
                <button
                  onClick={() => setActiveTab('forecast')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'forecast'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  5-Day Forecast
                </button>
                <button
                  onClick={() => setActiveTab('historical')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'historical'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Past Weather
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Notice */}
        {!weather && (
          <div className="bg-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 max-w-3xl mx-auto mb-8">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-200 mr-4 flex-shrink-0 mt-1" />
              <div className="text-white/90 text-sm md:text-base">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold mb-2">🌍 Current Weather</p>
                    <p className="text-sm">Search any city to view real-time weather conditions and hourly forecasts.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">📊 5-Day Forecast</p>
                    <p className="text-sm">Get detailed weather predictions with temperature ranges and conditions.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">📅 Historical Data</p>
                    <p className="text-sm">View past weather data for any date within the last 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Info Notice for Active Weather */}
        {weather && activeTab === 'current' && (
          <div className="bg-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 max-w-3xl mx-auto mb-8">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-200 mr-4 flex-shrink-0 mt-1" />
              <div className="text-white/90 text-sm md:text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">🌍 Location Services</p>
                    <p className="text-sm">Click the navigation icon to use your current location for instant weather updates.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">📊 Comprehensive Data</p>
                    <p className="text-sm">View current conditions, hourly forecasts, and detailed metrics with real-time updates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date Time Picker for Current Weather */}
        {weather && activeTab === 'current' && (
          <DateTimePicker 
            onDateTimeChange={handleDateTimeChange}
            disabled={loading}
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={retryLastSearch} />}

        {/* Weather Content Based on Active Tab */}
        {weather && !loading && (
          <div className="space-y-8">
            {/* Current Weather Tab */}
            {activeTab === 'current' && (
              <>
                <WeatherCard weather={weather} />
                
                {hourlyForecast.length > 0 && (
                  <HourlyForecast hourlyData={hourlyForecast} />
                )}
              </>
            )}

            {/* 5-Day Forecast Tab */}
            {activeTab === 'forecast' && forecast.length > 0 && (
              <ForecastCard forecasts={forecast} />
            )}

            {/* Historical Weather Tab */}
            {activeTab === 'historical' && (
              <HistoricalWeather
                onDateSelect={handleHistoricalDateSelect}
                historicalData={historicalData}
                loading={historicalLoading}
                cityName={lastSearchedCity}
              />
            )}
          </div>
        )}

        {/* Enhanced Info Notice */}
        {weather && activeTab === 'forecast' && (
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-200 mr-4 flex-shrink-0 mt-1" />
            <div className="text-white/90 text-sm md:text-base">
              <div className="text-center">
                <div>
                  <p className="font-semibold mb-2">📊 5-Day Weather Forecast</p>
                  <p className="text-sm">Detailed weather predictions showing temperature ranges, conditions, humidity, wind speed, and precipitation probability for the next 5 days.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-white/60">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm mb-2">
              Powered by OpenWeatherMap API • Real-time data • 5-Day Forecasts • Historical Weather
            </p>
            <p className="text-xs">
              Built with React 18, TypeScript, Tailwind CSS • Responsive design for all devices
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
              <span>🌡️ Temperature</span>
              <span>💨 Wind Speed</span>
              <span>💧 Humidity</span>
              <span>🌅 Sun Times</span>
              <span>📊 5-Day Forecast</span>
              <span>📅 Historical Data</span>
              <span>📍 Geolocation</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;