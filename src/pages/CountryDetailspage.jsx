import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countriesAPI } from '../services/countriesAPI';
import { weatherAPI } from '../services/weatherAPI';
import { newsAPI } from '../services/newsAPI';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WeatherWidget from '../components/weather/WeatherWidget';
import { FaArrowLeft, FaMapMarkerAlt, FaUsers, FaGlobe, FaLanguage, FaMoneyBillWave } from 'react-icons/fa';
import { formatPopulation, formatArea } from '../utils/helpers';
import './CountryDetailsPage.css';

const CountryDetailsPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    fetchCountryData();
  }, [countryName]);

  const fetchCountryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const countryData = await countriesAPI.getCountryByName(countryName);
      setCountry(countryData);

      // Fetch weather data for capital
      if (countryData.capital && countryData.capital[0]) {
        try {
          const weatherData = await weatherAPI.getWeatherByCity(countryData.capital[0]);
          setWeather(weatherData);
          setWeatherError(null);
        } catch (weatherErr) {
          setWeatherError(weatherErr.message);
        }
      }

      // Fetch news data
      if (countryData.cca2) {
        try {
          const newsData = await newsAPI.getTopHeadlinesByCountry(countryData.cca2.toLowerCase());
          setNews(newsData);
          setNewsError(null);
        } catch (newsErr) {
          setNewsError(newsErr.message);
        }
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading country details..." />;
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Country Not Found</h3>
          <p>The country you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="country-details-page">
      <div className="container">
        <div className="back-button">
          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Countries
          </Link>
        </div>

        <div className="country-header">
          <div className="flag-section">
            <img 
              src={country.flags.png} 
              alt={country.name.common}
              className="large-flag"
            />
          </div>

          <div className="country-info">
            <h1>{country.name.common}</h1>
            <h2 className="official-name">{country.name.official}</h2>
            
            <div className="basic-info">
              <p><FaMapMarkerAlt /> <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
              <p><FaGlobe /> <strong>Region:</strong> {country.region} {country.subregion && `- ${country.subregion}`}</p>
              <p><FaUsers /> <strong>Population:</strong> {formatPopulation(country.population)}</p>
              {country.area && <p><strong>Area:</strong> {formatArea(country.area)}</p>}
            </div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-section">
            <h3><FaLanguage /> Languages</h3>
            <div className="languages-list">
              {country.languages ? 
                Object.values(country.languages).map(lang => (
                  <span key={lang} className="language-tag">{lang}</span>
                )) : 
                <p>No languages data</p>
              }
            </div>
          </div>

          <div className="detail-section">
            <h3><FaMoneyBillWave /> Currencies</h3>
            <div className="currencies-list">
              {country.currencies ? 
                Object.entries(country.currencies).map(([code, currency]) => (
                  <div key={code} className="currency-item">
                    <strong>{currency.name}</strong> ({currency.symbol}) - {code}
                  </div>
                )) : 
                <p>No currencies data</p>
              }
            </div>
          </div>

          <div className="detail-section">
            <h3>📍 Location</h3>
            <p>Latitude: {country.latlng[0]}, Longitude: {country.latlng[1]}</p>
            <a 
              href={`https://maps.google.com/?q=${country.latlng[0]},${country.latlng[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {country.borders && country.borders.length > 0 && (
          <div className="border-countries">
            <h3>Border Countries</h3>
            <div className="borders-list">
              {country.borders.map(border => (
                <span key={border} className="border-country">
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="external-data">
          {country.capital && country.capital[0] && (
            <div className="weather-section">
              <WeatherWidget 
                weather={weather} 
                city={country.capital[0]}
              />
              {weatherError && (
                <div className="api-error">
                  <p>{weatherError}</p>
                </div>
              )}
            </div>
          )}

          <div className="news-section">
            <h3>Latest News from {country.name.common}</h3>
            {newsError ? (
              <div className="api-error">
                <p>{newsError}</p>
              </div>
            ) : news.length > 0 ? (
              <div className="news-list">
                {news.map((article, index) => (
                  <div key={index} className="news-item">
                    <h4>{article.title}</h4>
                    <p>{article.description}</p>
                    {article.url && (
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                        Read full article
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent news available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsPage;