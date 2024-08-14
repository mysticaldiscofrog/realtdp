'use client';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import dynamic from 'next/dynamic';
import { getCoordinatesByCityName, getWeatherByCoordinates } from '../services/openWeather';

const WeatherData = dynamic(() => import('../components/weather/WeatherData'), { ssr: false }); // Disable SSR

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  const fetchWeatherData = async (cityName: string) => {
    try {
      const coordinates = await getCoordinatesByCityName(cityName.trim());
      const weather = await getWeatherByCoordinates(coordinates.lat, coordinates.lon);
      setWeatherData(weather);
      console.log("City:", cityName, "weather:", weather);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('City not found or unable to fetch weather data. Please try another city.');
    }
  };

  const handleCitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      await fetchWeatherData(city.trim());
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        
        {/* Button to toggle form visibility */}
        <button
          onClick={toggleFormVisibility}
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {isFormVisible ? 'No Weather' : 'Show Weather?'}
        </button>

        {/* Conditionally render the form */}
        {isFormVisible && (
          <div>
            <form onSubmit={handleCitySubmit} className="mb-4">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="px-4 py-2 mr-2 text-black rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Let's Go!
              </button>
            </form>
            {weatherData && (
              <div className="flex items-center justify-center w-full">
                <WeatherData city={city} weatherData={weatherData} />
              </div>
            )}
          </div>
        )}
      </div>
    </Provider>
  );
}
