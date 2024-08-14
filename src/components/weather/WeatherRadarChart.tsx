import React from 'react';
import Plot from 'react-plotly.js';

interface WeatherRadarChartProps {
  weatherData: {
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    visibility: number;
    clouds: {
      all: number;
    };
  };
}

const WeatherRadarChart: React.FC<WeatherRadarChartProps> = ({ weatherData }) => {
  const metrics = ['Temperature', 'Feels Like', 'Wind Speed', 'Visibility', 'Cloudiness', 'Pressure', 'Humidity'];
  const values = [
    weatherData.main.temp,
    weatherData.main.feels_like,
    weatherData.wind.speed,
    weatherData.visibility / 1000, // Normalizing visibility to km
    weatherData.clouds.all,
    weatherData.main.pressure / 10, // Normalizing pressure for better visualization
    weatherData.main.humidity,
  ];

  return (
    <div className="w-full">
      <Plot
        data={[
          {
            type: 'scatterpolar',
            r: values,
            theta: metrics,
            fill: 'toself',
            name: 'Weather Metrics',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          polar: {
            radialaxis: { visible: true, range: [0, Math.max(...values)] },
          },
          showlegend: false,
          title: 'Weather Overview',
          paper_bgcolor: '#2d3748',
          plot_bgcolor: '#2d3748',
          font: { color: 'white' },
        }}
      />
    </div>
  );
};

export default WeatherRadarChart;
