export interface WeatherData {
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex?: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  description: string;
  pop: number;
}

export interface HistoricalWeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  clouds: number;
}