export const getWeatherBackground = (icon: string, isNight: boolean = false) => {
  const weatherType = icon.slice(0, 2);
  const timeOfDay = icon.slice(-1);
  const nightTime = timeOfDay === 'n' || isNight;
  
  switch (weatherType) {
    case '01': // clear sky
      return nightTime 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900'
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500';
    
    case '02': // few clouds
    case '03': // scattered clouds
      return nightTime
        ? 'bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900'
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-gray-500';
    
    case '04': // broken clouds
      return 'bg-gradient-to-br from-gray-500 via-gray-600 to-slate-700';
    
    case '09': // shower rain
    case '10': // rain
      return nightTime
        ? 'bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-900'
        : 'bg-gradient-to-br from-gray-600 via-blue-600 to-blue-700';
    
    case '11': // thunderstorm
      return 'bg-gradient-to-br from-gray-800 via-slate-900 to-black';
    
    case '13': // snow
      return nightTime
        ? 'bg-gradient-to-br from-slate-600 via-blue-300 to-white'
        : 'bg-gradient-to-br from-gray-300 via-blue-200 to-white';
    
    case '50': // mist/fog
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-slate-600';
    
    default:
      return nightTime
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900'
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500';
  }
};

export const getBackgroundParticles = (weatherType: string) => {
  switch (weatherType.slice(0, 2)) {
    case '13': // snow
      return 'snow';
    case '09':
    case '10': // rain
      return 'rain';
    case '11': // thunderstorm
      return 'lightning';
    default:
      return 'none';
  }
};