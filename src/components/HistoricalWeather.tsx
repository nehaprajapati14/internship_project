import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Cloud, Droplets, Wind, Gauge } from 'lucide-react';
import { HistoricalWeatherData } from '../types/weather';

interface HistoricalWeatherProps {
  onDateSelect: (date: Date) => void;
  historicalData: HistoricalWeatherData | null;
  loading: boolean;
  cityName: string;
}

const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({ 
  onDateSelect, 
  historicalData, 
  loading, 
  cityName 
}) => {
  const [selectedDate, setSelectedDate] = useState('');

  // Get date range (30 days ago to yesterday)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const maxDate = yesterday.toISOString().split('T')[0];
  const minDate = thirtyDaysAgo.toISOString().split('T')[0];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onDateSelect(new Date(date));
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-400';
    if (temp >= 20) return 'text-orange-400';
    if (temp >= 10) return 'text-yellow-400';
    if (temp >= 0) return 'text-blue-400';
    return 'text-cyan-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
        <Calendar className="w-8 h-8" />
        Past Weather Data
      </h2>

      {/* Date Picker */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <label className="block text-white/80 text-sm font-medium mb-3 text-center">
            Select a date to view historical weather
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
              max={maxDate}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-gray-900 transition-all duration-300 text-center font-medium"
            />
          </div>
          <p className="text-white/60 text-xs mt-2 text-center">
            Available for the last 30 days
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span className="text-white/90 font-medium">Loading historical data...</span>
          </div>
        </div>
      )}

      {/* Historical Data Display */}
      {historicalData && !loading && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {cityName} - {formatDate(historicalData.date)}
            </h3>
            <p className="text-white/80 capitalize text-lg">
              {historicalData.description}
            </p>
          </div>

          {/* Temperature Display */}
          <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
            <div className="flex items-center justify-center mb-4">
              <img
                src={`https://openweathermap.org/img/wn/${historicalData.icon}@4x.png`}
                alt={historicalData.description}
                className="w-24 h-24 drop-shadow-2xl"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="text-white/80 text-sm font-medium">Low</span>
                </div>
                <div className={`text-2xl font-bold ${getTemperatureColor(historicalData.temperature.min)}`}>
                  {historicalData.temperature.min}°C
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Cloud className="w-5 h-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm font-medium">Avg</span>
                </div>
                <div className={`text-3xl font-bold ${getTemperatureColor(historicalData.temperature.avg)}`}>
                  {historicalData.temperature.avg}°C
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-red-300 mr-2" />
                  <span className="text-white/80 text-sm font-medium">High</span>
                </div>
                <div className={`text-2xl font-bold ${getTemperatureColor(historicalData.temperature.max)}`}>
                  {historicalData.temperature.max}°C
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
              <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">Humidity</p>
              <p className="text-white font-bold text-lg">{historicalData.humidity}%</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
              <Wind className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">Wind</p>
              <p className="text-white font-bold text-lg">{historicalData.windSpeed} km/h</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
              <Gauge className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">Pressure</p>
              <p className="text-white font-bold text-lg">{historicalData.pressure} hPa</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
              <Cloud className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">Clouds</p>
              <p className="text-white font-bold text-lg">{historicalData.clouds}%</p>
            </div>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!historicalData && !loading && selectedDate && (
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/80 text-lg font-medium">
            Select a date to view historical weather data
          </p>
          <p className="text-white/60 text-sm mt-2">
            Historical data available for the past 30 days
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoricalWeather;