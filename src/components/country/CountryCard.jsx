import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { FaHeart, FaMapMarkerAlt, FaUsers, FaStar } from 'react-icons/fa';
import { formatPopulation } from '../../utils/helpers';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(country);
  };

  const favorite = isFavorite(country.name.common);

  return (
    <div className="country-card">
      <Link to={`/country/${country.name.common}`} className="card-link">
        <div className="card-header">
          <img 
            src={country.flags.png} 
            alt={`${country.name.common} flag`}
            className="flag"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Flag+Not+Found';
            }}
          />
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FaHeart />
          </button>
        </div>
        
        <div className="card-content">
          <h3 className="country-name">{country.name.common}</h3>
          <p className="country-official">{country.name.official}</p>
          
          <div className="country-details">
            <p className="capital">
              <FaMapMarkerAlt className="detail-icon" />
              <span>{country.capital ? country.capital[0] : 'No Capital'}</span>
            </p>
            <p className="region">
              <span className="region-badge">{country.region}</span>
            </p>
            <p className="population">
              <FaUsers className="detail-icon" />
              <span>{formatPopulation(country.population)}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;