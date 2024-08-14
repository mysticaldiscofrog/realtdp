const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeatherByCity(city: string) {
  const response = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}

export async function getWeatherByCoordinates(lat: number, lon: number) {
  const response = await fetch(`${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}

const GEO_BASE_URL = "http://api.openweathermap.org/geo/1.0/";

export async function getCoordinatesByCityName(city: string) {
  const response = await fetch(`${GEO_BASE_URL}direct?q=${city}&limit=1&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("City not found");
  }
  return data[0]; // Return the first match
}
