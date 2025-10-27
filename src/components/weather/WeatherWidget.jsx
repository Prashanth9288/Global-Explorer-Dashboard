import React from 'react';
import { FaThermometerHalf, FaTint, FaWind, FaInfoCircle } from 'react-icons/fa';
import { getWeatherIcon } from '../../utils/helpers';
import './WeatherWidget.css';

const WeatherWidget = ({ weather, city, isDemo = false }) => {
  if (!weather) {
    return (
      <div className="weather-widget error">
        <h3>Weather in {city}</h3>
        <p>Weather data not available</p>
      </div>
    );
  }

  const { main, weather: weatherInfo, wind } = weather;

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>Weather in {city}</h3>
        {isDemo && (
          <div className="demo-badge">
            <FaInfoCircle />
            Demo Data
          </div>
        )}
      </div>
      
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon">
            {getWeatherIcon(weatherInfo[0]?.icon)}
          </div>
          <div className="weather-temp">
            {Math.round(main.temp)}°C
          </div>
          <div className="weather-desc">
            {weatherInfo[0]?.description}
          </div>
        </div>
        
        <div className="weather-details">
          <div className="weather-detail">
            <FaThermometerHalf />
            <span>Feels like: {Math.round(main.feels_like)}°C</span>
          </div>
          <div className="weather-detail">
            <FaTint />
            <span>Humidity: {main.humidity}%</span>
          </div>
          <div className="weather-detail">
            <FaWind />
            <span>Wind: {wind.speed} m/s</span>
          </div>
        </div>
      </div>
      
      {isDemo && (
        <div className="demo-notice">
          <FaInfoCircle />
          <small>Add a real OpenWeatherMap API key for live data</small>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;