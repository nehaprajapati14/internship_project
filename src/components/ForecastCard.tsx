import React from 'react';
import { ForecastData } from '../types/weather';
import { Droplets, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecasts: ForecastData[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecasts }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-400';
    if (temp >= 20) return 'text-orange-400';
    if (temp >= 10) return 'text-yellow-400';
    if (temp >= 0) return 'text-blue-400';
    return 'text-cyan-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        5-Day Forecast
      </h2>
      
      <div className="space-y-4">
        {forecasts.map((forecast, index) => (
          <div 
            key={index}
            className="bg-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/20 transition-all duration-300 border border-white/10 group"
          >
            <div className="flex items-center flex-1">
              <img
                src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt={forecast.description}
                className="w-16 h-16 mr-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <p className="text-white font-bold text-lg">
                  {formatDate(forecast.date)}
                </p>
                <p className="text-white/80 text-sm capitalize font-medium">
                  {forecast.description}
                </p>
                {forecast.pop > 0 && (
                  <div className="flex items-center text-blue-300 text-sm mt-1">
                    <Droplets className="w-3 h-3 mr-1" />
                    <span>{forecast.pop}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-xl mb-2 ${getTemperatureColor(forecast.temperature.max)}`}>
                {forecast.temperature.max}° / {forecast.temperature.min}°
              </div>
              <div className="flex items-center justify-end text-white/60 text-sm space-x-4">
                <div className="flex items-center">
                  <Droplets className="w-3 h-3 mr-1" />
                  <span>{forecast.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-3 h-3 mr-1" />
                  <span>{forecast.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;