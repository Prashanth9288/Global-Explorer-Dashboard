import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaHeart } from 'react-icons/fa';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🌍 Global Explorer
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">
            <FaHeart className="nav-icon" />
            Favorites
          </Link>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;