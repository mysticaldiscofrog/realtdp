import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  weatherData: {
    temp: number;
    wind_speed: number;
    weather_main: string;
    weather_description: string;
  };
}

const WeatherMap: React.FC<WeatherMapProps> = ({ latitude, longitude, weatherData }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={10}
      style={{ height: '300px', width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <div>
            <p><strong>Temperature:</strong> {weatherData.temp} °C</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</p>
            <p><strong>Weather:</strong> {weatherData.weather_main} - {weatherData.weather_description}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherMap;