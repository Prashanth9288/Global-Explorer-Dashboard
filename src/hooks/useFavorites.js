import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCountries');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (country) => {
    const isAlreadyFavorite = favorites.some(
      fav => fav.name.common === country.name.common
    );
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (countryName) => {
    const updatedFavorites = favorites.filter(
      country => country.name.common !== countryName
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (countryName) => {
    return favorites.some(country => country.name.common === countryName);
  };

  const toggleFavorite = (country) => {
    if (isFavorite(country.name.common)) {
      removeFromFavorites(country.name.common);
    } else {
      addToFavorites(country);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};