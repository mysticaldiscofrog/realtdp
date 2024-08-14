import React from "react";

interface WeatherSummaryCardProps {
  weatherData: {
    name: string;
    country: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    wind_speed: number;
    cloudiness: number;
    weather_main: string;
    weather_description: string;
  };
}

const WeatherSummaryCard: React.FC<WeatherSummaryCardProps> = ({
  weatherData,
}) => {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-700 rounded-lg shadow-lg text-white mb-3">
      <h2 className="text-2xl font-bold mb-2">
        {weatherData.name}, {weatherData.country}
      </h2>
      <p className="text-xl mb-4">
        {weatherData.weather_main} - {weatherData.weather_description}
      </p>
      <p className="text-4xl font-bold">{weatherData.temp}°C</p>
      <p className="text-sm">Feels Like: {weatherData.feels_like}°C</p>
      <div className="flex justify-between w-full mb-4">
        <div className="text-center">
          <p className="text-sm">Min Temp: {weatherData.temp_min}°C</p>
          <p className="text-sm">Max Temp: {weatherData.temp_max}°C</p>
        </div>
        <div className="text-center">
          <p className="text-sm">Wind Speed: {weatherData.wind_speed} m/s</p>
          <p className="text-sm">Cloudiness: {weatherData.cloudiness}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummaryCard;
