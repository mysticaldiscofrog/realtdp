import React from 'react';

interface TemperatureComparisonWidgetProps {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

const TemperatureComparisonWidget: React.FC<TemperatureComparisonWidgetProps> = ({ temp, feels_like, temp_min, temp_max }) => {
  return (
    <div className="flex flex-col w-full p-4 bg-gray-700 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Temperature Comparison</h2>
      <div className="flex items-center justify-between mb-2">
        <span>Temperature:</span>
        <div className="flex items-center justify-end w-full ml-4">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(temp / temp_max) * 100}%` }} />
          <span className="ml-2">{temp}°C</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Feels Like:</span>
        <div className="flex items-center justify-end w-full ml-4">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(feels_like / temp_max) * 100}%` }} />
          <span className="ml-2">{feels_like}°C</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Min Temperature:</span>
        <div className="flex items-center justify-end w-full ml-4">
          <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${(temp_min / temp_max) * 100}%` }} />
          <span className="ml-2">{temp_min}°C</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Max Temperature:</span>
        <div className="flex items-center justify-end w-full ml-4">
          <div className="bg-red-500 h-4 rounded-full" style={{ width: `100%` }} />
          <span className="ml-2">{temp_max}°C</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureComparisonWidget;
