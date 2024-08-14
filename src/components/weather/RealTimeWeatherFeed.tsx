import React from 'react';

interface RealTimeWeatherFeedProps {
  weatherData: {
    timestamp: string;
    temp: number;
    weather_main: string;
    weather_description: string;
  }[];
}

const RealTimeWeatherFeed: React.FC<RealTimeWeatherFeedProps> = ({ weatherData }) => {
  return (
    <div className="w-full h-48 overflow-y-auto bg-gray-800 rounded-lg shadow-lg p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Real-Time Weather Feed</h2>
      {weatherData.slice().reverse().map((data, index) => (
        <div key={index} className="mb-4 border-b border-gray-600 pb-2">
          <p className="text-sm text-gray-400">{data.timestamp}</p>
          <p className="text-lg font-semibold">{data.weather_main} - {data.weather_description}</p>
          <p className="text-sm">Temperature: {data.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default RealTimeWeatherFeed;
