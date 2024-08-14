// src/types/index.ts

export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export interface Metrics {
    air_quality: number;
    population_density: number;
    environmental_policies: number;
    gdp_per_capita: number;
    healthcare_quality: number;
    education_quality: number;
    crime_rate: number;
  }
  
  export interface City {
    city: string;
    country: string;
    coordinates: Coordinates;
    metrics: Metrics;
  }
  
export interface WeatherDataType {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDataProps {

  weatherData: any;

}