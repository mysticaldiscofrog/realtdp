import React from 'react';
import Plot from 'react-plotly.js';

interface WindVisualizerProps {
  windData: {
    timestamp: string;
    wind_speed: number;
    wind_gust: number;
  }[];
}

const WindVisualizer: React.FC<WindVisualizerProps> = ({ windData }) => {
  return (
    <div className="w-full">
      <Plot
        data={[
          {
            x: windData.map(d => d.timestamp),
            y: windData.map(d => d.wind_speed),
            type: 'bar',
            name: 'Wind Speed (m/s)',
            marker: { color: 'blue' },
          },
          {
            x: windData.map(d => d.timestamp),
            y: windData.map(d => d.wind_gust),
            type: 'bar',
            name: 'Wind Gust (m/s)',
            marker: { color: 'orange' },
          },
        ]}
        layout={{
          barmode: 'group',
          title: 'Wind Speed and Gusts Over Time',
          xaxis: { title: 'Time' },
          yaxis: { title: 'Speed (m/s)' },
          paper_bgcolor: '#2d3748',
          plot_bgcolor: '#2d3748',
          font: { color: 'white' },
        }}
      />
    </div>
  );
};

export default WindVisualizer;
