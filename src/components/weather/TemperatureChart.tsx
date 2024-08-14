import React from 'react';
import Plot from 'react-plotly.js';

interface TemperatureChartProps {
  temperatureHistory: {
    timestamp: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  }[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ temperatureHistory }) => {
  return (
    <div className="w-full">
      <Plot
        data={[
          {
            x: temperatureHistory.map(d => d.timestamp),
            y: temperatureHistory.map(d => d.temp),
            type: 'scatter',
            mode: 'lines',
            name: 'Temperature (°C)',
            line: { color: 'red' },
          },
          {
            x: temperatureHistory.map(d => d.timestamp),
            y: temperatureHistory.map(d => d.feels_like),
            type: 'scatter',
            mode: 'lines',
            name: 'Feels Like (°C)',
            line: { color: 'orange' },
          },
          {
            x: temperatureHistory.map(d => d.timestamp),
            y: temperatureHistory.map(d => d.temp_min),
            type: 'scatter',
            mode: 'lines',
            name: 'Min Temperature (°C)',
            line: { color: 'blue' },
          },
          {
            x: temperatureHistory.map(d => d.timestamp),
            y: temperatureHistory.map(d => d.temp_max),
            type: 'scatter',
            mode: 'lines',
            name: 'Max Temperature (°C)',
            line: { color: 'green' },
          },
        ]}
        layout={{
          title: 'Temperature Over Time',
          xaxis: { title: 'Time' },
          yaxis: { title: 'Temperature (°C)' },
          paper_bgcolor: '#2d3748',
          plot_bgcolor: '#2d3748',
          font: { color: 'white' },
        }}
      />
    </div>
  );
};

export default TemperatureChart;
