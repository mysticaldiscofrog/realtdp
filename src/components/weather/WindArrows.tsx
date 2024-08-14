import React from 'react';
import { ArrowUp } from 'lucide-react';

interface WindData {
  wind_speed: number;
  wind_deg: number;
}

interface WindArrowsProps {
  windData: WindData;
}

const WindArrows: React.FC<WindArrowsProps> = ({ windData }) => {
  const { wind_speed, wind_deg } = windData;

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="relative w-24 h-24 bg-blue-500 rounded-full shadow-lg">
        <div
          className="absolute inset-0 flex items-center justify-center transform transition-transform duration-300 ease-in-out"
          style={{
            transform: `rotate(${wind_deg}deg)`,
          }}
        >
          <ArrowUp
            size={40}
            className="text-white"
            style={{
              animation: `pulse ${Math.max(1, 10 / wind_speed)}s ease-in-out infinite`,
            }}
          />
        </div>
      </div>
      <div className="text-center text-white mt-4 font-semibold text-lg">
        {wind_speed.toFixed(1)} m/s
      </div>
    </div>
  );
};

export default WindArrows;