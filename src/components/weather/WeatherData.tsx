import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getWeatherByCity } from "@/services/openWeather";
import { citiesData } from "@/data/cities";
import { WeatherDataType } from "@/types";

// Dynamic imports
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
const WeatherMap = dynamic(() => import("./WeatherMap"), { ssr: false });
const TemperatureChart = dynamic(() => import("./TemperatureChart"), {
  ssr: false,
});
const WindVisualizer = dynamic(() => import("./WindVisualizer"), {
  ssr: false,
});
const WindArrows = dynamic(() => import("./WindArrows"), { ssr: false });
const WeatherRadarChart = dynamic(() => import("./WeatherRadarChart"), {
  ssr: false,
});
const TemperatureComparisonWidget = dynamic(
  () => import("./TemperatureComparisonWidget"),
  {
    ssr: false,
  }
);
const WeatherSummaryCard = dynamic(() => import("./WeatherSummaryCard"), {
  ssr: false,
});
const RealTimeWeatherFeed = dynamic(() => import("./RealTimeWeatherFeed"), {
  ssr: false,
});

interface WeatherDataProps {
  city: string;
  weatherData: WeatherDataType;
}

const WeatherData: React.FC<WeatherDataProps> = ({ city, weatherData }) => {
  const [temperatureHistory, setTemperatureHistory] = useState<any[]>([]);
  const [windHistory, setWindHistory] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
    const [cityName, setCityName] = useState("San Francisco");
  const [inputCity, setInputCity] = useState(cityName);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value);
  };
  const handleCitySubmit = () => {
    setCityName(inputCity);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (weatherData) {
      // Update temperature history
      setTemperatureHistory((prevHistory) => [
        ...prevHistory,
        {
          timestamp: new Date().toLocaleTimeString(),
          temp: weatherData.main.temp,
          feels_like: weatherData.main.feels_like,
          temp_min: weatherData.main.temp_min,
          temp_max: weatherData.main.temp_max,
        },
      ]);

      // Update wind history
      setWindHistory((prevHistory) => [
        ...prevHistory,
        {
          timestamp: new Date().toLocaleTimeString(),
          wind_speed: weatherData.wind.speed,
          wind_gust:
            typeof weatherData.wind.gust === "number"
              ? weatherData.wind.gust
              : weatherData.wind.speed, // Default to wind speed if gust is not a number
        },
      ]);
    }
  }, [weatherData]);

  if (!isClient || !weatherData) return <p>Loading weather data...</p>;
  
  const flattenedWeatherData = {
    temp: weatherData.main.temp,
    wind_speed: weatherData.wind.speed,
    weather_main: weatherData.weather[0].main,
    weather_description: weatherData.weather[0].description,
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Weather in {weatherData.name}, {weatherData.sys.country}
      </h1>
      <div className="mt-8 w-full">
        <RealTimeWeatherFeed weatherData={temperatureHistory} />
      </div>
      <div className="mt-8 w-full">
        <WeatherSummaryCard
          weatherData={{
            name: weatherData.name,
            country: weatherData.sys.country,
            temp: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            wind_speed: weatherData.wind.speed,
            cloudiness: weatherData.clouds.all,
            weather_main: weatherData.weather[0].main,
            weather_description: weatherData.weather[0].description,
          }}
        />
      </div>
      {/* Additional components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="flex justify-center">
          <Plot
            data={[
              {
                type: "indicator",
                mode: "gauge+number",
                value: weatherData.main.temp,
                title: { text: "Temperature (°C)", font: { size: 18 } },
                gauge: {
                  axis: {
                    range: [-10, 40],
                    tickwidth: 1,
                    tickcolor: "darkblue",
                  },
                  bar: { color: "darkblue" },
                  bgcolor: "white",
                  borderwidth: 2,
                  bordercolor: "gray",
                  steps: [
                    { range: [-10, 0], color: "cyan" },
                    { range: [0, 20], color: "lightgreen" },
                    { range: [20, 30], color: "yellow" },
                    { range: [30, 40], color: "red" },
                  ],
                },
              },
            ]}
            layout={{
              width: 250,
              height: 250,
              margin: { t: 20, b: 20, l: 20, r: 20 },
              paper_bgcolor: "gray",
              font: { color: "white", family: "Arial" },
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <div
              className="absolute inset-0 transform rotate-[calc(90deg+weatherData.wind.deg)]"
              style={{
                borderBottom: "10px solid white",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                height: "50%",
                width: "10%",
                marginLeft: "45%",
                marginTop: "25%",
              }}
            />
            <div className="flex items-center justify-center w-full h-full text-2xl">
              {weatherData.wind.speed} m/s
            </div>
          </div>
          <p className="mt-2">Wind Direction</p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-8">
        <p className="text-center">
          <span className="text-4xl">{weatherData.weather[0].main}</span>
          <br />
          {weatherData.weather[0].description}
        </p>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-6">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${weatherData.clouds.all}%` }}
        />
      </div>
      <p className="mt-2 text-center">Cloudiness: {weatherData.clouds.all}%</p>
      <div className="grid grid-cols-1 gap-4 text-sm md:text-base mt-8">
        <p>
          <span className="font-bold">Temperature:</span> {weatherData.main.temp} °C
        </p>
        <p>
          <span className="font-bold">Feels Like:</span>{" "}
          {weatherData.main.feels_like} °C
        </p>
        <p>
          <span className="font-bold">Min Temperature:</span>{" "}
          {weatherData.main.temp_min} °C
        </p>
        <p>
          <span className="font-bold">Max Temperature:</span>{" "}
          {weatherData.main.temp_max} °C
        </p>
        <p>
          <span className="font-bold">Pressure:</span> {weatherData.main.pressure}{" "}
          hPa
        </p>
        <p>
          <span className="font-bold">Humidity:</span> {weatherData.main.humidity} %
        </p>
        <p>
          <span className="font-bold">Visibility:</span>{" "}
          {weatherData.visibility} meters
        </p>
        <p>
          <span className="font-bold">Wind Speed:</span>{" "}
          {weatherData.wind.speed} m/s
        </p>
        <p>
          <span className="font-bold">Wind Direction:</span>{" "}
          {weatherData.wind.deg}°
        </p>
        <p>
          <span className="font-bold">Cloudiness:</span>{" "}
          {weatherData.clouds.all} %
        </p>
        <p>
          <span className="font-bold">Weather:</span> {weatherData.weather[0].main}{" "}
          - {weatherData.weather[0].description}
        </p>
      </div>
      {/* Wind Arrows Visualization */}
      <WindArrows
        windData={{
          wind_speed: weatherData.wind.speed,
          wind_deg: weatherData.wind.deg,
        }}
      />
      {/* Wind Speed and Gust Visualizer */}
      <WindVisualizer windData={windHistory} />
      {/* Temperature Line Graph */}
      <TemperatureChart temperatureHistory={temperatureHistory} />
      <div className="mt-8 w-full">
        <WeatherRadarChart weatherData={weatherData} />
      </div>
      <div className="mt-8 w-full">
        <TemperatureComparisonWidget
          temp={weatherData.main.temp}
          feels_like={weatherData.main.feels_like}
          temp_min={weatherData.main.temp_min}
          temp_max={weatherData.main.temp_max}
        />
      </div>
      {/* Weather Map */}
      <div className="mt-8 w-full">
        <WeatherMap
          latitude={weatherData.coord.lat}
          longitude={weatherData.coord.lon}
          weatherData={flattenedWeatherData} 
        />
      </div>
    </div>
  );
};

export default WeatherData;
