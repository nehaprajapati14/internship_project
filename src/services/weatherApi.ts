const API_KEY = '6af007b18de00cb180321d2070d4a0ea'; // Demo API key - works for testing
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      if (response.status === 401) {
        throw new Error('Weather service temporarily unavailable. Please try again later.');
      }
      throw new Error('Unable to fetch weather data. Please try again.');
    }

    const data = await response.json();
    
    return {
      name: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: data.wind.deg || 0,
      visibility: Math.round((data.visibility || 10000) / 1000), // Convert to km
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again.');
  }
};

export const fetchForecast = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Weather service temporarily unavailable. Please try again later.');
      }
      throw new Error('Unable to fetch forecast data. Please try again.');
    }

    const data = await response.json();
    
    // Group forecast by date and get daily data
    const dailyForecasts = data.list.reduce((acc: any, item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!acc[date]) {
        acc[date] = {
          date,
          temps: [],
          descriptions: [],
          icons: [],
          humidity: [],
          windSpeed: [],
          pop: [],
        };
      }
      
      acc[date].temps.push(item.main.temp);
      acc[date].descriptions.push(item.weather[0].description);
      acc[date].icons.push(item.weather[0].icon);
      acc[date].humidity.push(item.main.humidity);
      acc[date].windSpeed.push(item.wind.speed * 3.6);
      acc[date].pop.push(item.pop * 100);
      
      return acc;
    }, {});

    return Object.values(dailyForecasts).slice(0, 5).map((day: any) => ({
      date: day.date,
      temperature: {
        min: Math.round(Math.min(...day.temps)),
        max: Math.round(Math.max(...day.temps)),
      },
      description: day.descriptions[0],
      icon: day.icons[0],
      humidity: Math.round(day.humidity.reduce((a: number, b: number) => a + b) / day.humidity.length),
      windSpeed: Math.round(day.windSpeed.reduce((a: number, b: number) => a + b) / day.windSpeed.length),
      pop: Math.round(day.pop.reduce((a: number, b: number) => a + b) / day.pop.length),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again.');
  }
};

export const fetchHourlyForecast = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch hourly forecast data.');
    }

    const data = await response.json();
    
    // Get next 24 hours (8 data points, each 3 hours apart)
    return data.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      temperature: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      pop: Math.round(item.pop * 100),
    }));
  } catch (error) {
    throw new Error('Unable to fetch hourly forecast data.');
  }
};

// Get weather by coordinates (for geolocation)
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch weather data for your location.');
    }

    const data = await response.json();
    
    return {
      name: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6),
      windDirection: data.wind.deg || 0,
      visibility: Math.round((data.visibility || 10000) / 1000),
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
    };
  } catch (error) {
    throw new Error('Unable to fetch weather data for your location.');
  }
};

// Fetch historical weather data (simulated for demo)
export const fetchHistoricalWeather = async (city: string, date: Date) => {
  try {
    // For demo purposes, we'll simulate historical data
    // In production, you'd use the OpenWeatherMap Historical API
    const currentWeather = await fetchWeatherByCity(city);
    
    // Simulate historical data with some variations
    const daysDiff = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const tempVariation = Math.random() * 10 - 5; // ±5 degrees variation
    
    return {
      date: date.toISOString().split('T')[0],
      temperature: {
        min: Math.round(currentWeather.temperature - 5 + tempVariation),
        max: Math.round(currentWeather.temperature + 3 + tempVariation),
        avg: Math.round(currentWeather.temperature + tempVariation),
      },
      description: currentWeather.description,
      icon: currentWeather.icon,
      humidity: Math.max(20, Math.min(100, currentWeather.humidity + Math.floor(Math.random() * 20 - 10))),
      pressure: currentWeather.pressure + Math.floor(Math.random() * 20 - 10),
      windSpeed: Math.max(0, currentWeather.windSpeed + Math.floor(Math.random() * 10 - 5)),
      clouds: Math.floor(Math.random() * 100),
    };
  } catch (error) {
    throw new Error('Unable to fetch historical weather data.');
  }
};