import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { FaHeart, FaArrowLeft, FaMapMarkerAlt, FaUsers, FaGlobe } from 'react-icons/fa';
import { formatPopulation, formatArea } from '../../utils/helpers';
import './CountryDetails.css';

const CountryDetails = ({ country, weather, news }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!country) return null;

  const handleFavoriteClick = () => {
    toggleFavorite(country);
  };

  return (
    <div className="country-details">
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
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn large ${isFavorite(country.name.common) ? 'active' : ''}`}
          >
            <FaHeart />
            {isFavorite(country.name.common) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <div className="country-info">
          <h1>{country.name.common}</h1>
          <h2 className="official-name">{country.name.official}</h2>
          
          <div className="basic-info">
            <p><FaMapMarkerAlt /> <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            <p><FaGlobe /> <strong>Region:</strong> {country.region}</p>
            <p><FaUsers /> <strong>Population:</strong> {formatPopulation(country.population)}</p>
            {country.area && <p><strong>Area:</strong> {formatArea(country.area)}</p>}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CountryDetails;