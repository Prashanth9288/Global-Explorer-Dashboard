import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by country name or capital..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </form>
  );
};

export default SearchBar;