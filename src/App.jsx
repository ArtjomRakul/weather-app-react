// src/App.js
import { useState } from "react";


const API_KEY = "7cd930e6dfb1c0f94e5eae01721fd6d7";

export default function App() {
  // State to store the input city and fetched weather data
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Handle form submission and API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const trimmedCity = city.toLowerCase().trim();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Please enter a valid city name");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
      console.error(error);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="page-name">Weather App</h1>
      </header>

      <main className="main-container">
        <form id="form" onSubmit={handleSubmit}>
          <input
            id="input"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" id="search-button">
            Search
          </button>
        </form>

        {/* Only render the card if weatherData is available */}
        {weatherData && (
          <div className="card">
            <div className="weather-card">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="temp">
                Temp: {Math.round(weatherData.main.temp)}°C
              </div>
              <div className="description">
                Weather: {weatherData.weather[0].description}
              </div>
              <div className="details">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
