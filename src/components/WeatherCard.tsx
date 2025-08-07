import React from 'react';
import { WeatherData } from '../types/weather';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  Navigation,
  Clock
} from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const formatTime = (timestamp: number, timezone: number = 0) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  const getCurrentTime = (timezone: number) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezone * 1000));
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-400';
    if (temp >= 20) return 'text-orange-400';
    if (temp >= 10) return 'text-yellow-400';
    if (temp >= 0) return 'text-blue-400';
    return 'text-cyan-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
      {/* Header with Location and Time */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {weather.name}, {weather.country}
        </h1>
        <div className="flex items-center justify-center gap-4 text-white/80 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Local Time: {getCurrentTime(weather.timezone)}</span>
          </div>
        </div>
        <p className="text-white/90 text-lg md:text-xl capitalize mt-2 font-medium">
          {weather.description}
        </p>
      </div>

      {/* Main Temperature Display */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl"
          />
        </div>
        <div className={`text-6xl md:text-8xl font-bold mb-4 ${getTemperatureColor(weather.temperature)}`}>
          {weather.temperature}°
        </div>
        <p className="text-white/90 text-xl md:text-2xl font-medium">
          Feels like {weather.feelsLike}°C
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
          <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-3" />
          <p className="text-white/80 text-sm font-medium">Humidity</p>
          <p className="text-white font-bold text-xl">{weather.humidity}%</p>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
          <Wind className="w-8 h-8 text-blue-300 mx-auto mb-3" />
          <p className="text-white/80 text-sm font-medium">Wind</p>
          <p className="text-white font-bold text-xl">{weather.windSpeed} km/h</p>
          <p className="text-white/60 text-sm">{getWindDirection(weather.windDirection)}</p>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
          <Gauge className="w-8 h-8 text-blue-300 mx-auto mb-3" />
          <p className="text-white/80 text-sm font-medium">Pressure</p>
          <p className="text-white font-bold text-xl">{weather.pressure}</p>
          <p className="text-white/60 text-sm">hPa</p>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
          <Eye className="w-8 h-8 text-blue-300 mx-auto mb-3" />
          <p className="text-white/80 text-sm font-medium">Visibility</p>
          <p className="text-white font-bold text-xl">{weather.visibility}</p>
          <p className="text-white/60 text-sm">km</p>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-4 flex items-center hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 border border-orange-500/20">
          <Sunrise className="w-8 h-8 text-orange-300 mr-4 flex-shrink-0" />
          <div>
            <p className="text-white/80 text-sm font-medium">Sunrise</p>
            <p className="text-white font-bold text-lg">{formatTime(weather.sunrise, weather.timezone)}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 flex items-center hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/20">
          <Sunset className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
          <div>
            <p className="text-white/80 text-sm font-medium">Sunset</p>
            <p className="text-white font-bold text-lg">{formatTime(weather.sunset, weather.timezone)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;