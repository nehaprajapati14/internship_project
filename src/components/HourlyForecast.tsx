import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import { Droplets } from 'lucide-react';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
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
        24-Hour Forecast
      </h2>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4 min-w-max">
          {hourlyData.map((hour, index) => (
            <div 
              key={index}
              className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/10 min-w-[120px] group"
            >
              <p className="text-white/80 text-sm font-medium mb-2">
                {hour.time}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                alt={hour.description}
                className="w-12 h-12 mx-auto mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <p className={`font-bold text-lg mb-2 ${getTemperatureColor(hour.temperature)}`}>
                {hour.temperature}°
              </p>
              {hour.pop > 0 && (
                <div className="flex items-center justify-center text-blue-300 text-xs">
                  <Droplets className="w-3 h-3 mr-1" />
                  <span>{hour.pop}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;