import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import CountryCard from '../components/country/CountryCard';
import { FaHeart, FaSadTear } from 'react-icons/fa';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-header">
            <h1><FaHeart /> Favorite Countries</h1>
          </div>
          <div className="no-favorites">
            <FaSadTear className="no-favorites-icon" />
            <h3>No favorite countries yet</h3>
            <p>Start exploring countries and add them to your favorites!</p>
            <Link to="/" className="explore-link">
              Explore Countries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1><FaHeart /> Favorite Countries</h1>
          <p>You have {favorites.length} favorite {favorites.length === 1 ? 'country' : 'countries'}</p>
        </div>

        <div className="favorites-grid">
          {favorites.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;