import React, { useState } from 'react';
import { useCountries } from '../hooks/useCountries';
import SearchBar from '../components/common/SearchBar';
import Filter from '../components/common/Filter';
import CountryList from '../components/country/CountryList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaExclamationTriangle, FaSync } from 'react-icons/fa';

const Home = () => {
  const { 
    countries, 
    loading, 
    error, 
    usingMockData,
    searchCountries, 
    filterByRegion, 
    sortCountries,
    refetch
  } = useCountries();
  
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (searchTerm) => {
    setCurrentPage(1);
    searchCountries(searchTerm);
  };

  const handleFilter = (region) => {
    setCurrentPage(1);
    filterByRegion(region);
  };

  const handleSort = (sortBy) => {
    setCurrentPage(1);
    sortCountries(sortBy);
  };

  if (loading) {
    return <LoadingSpinner message="Loading countries..." />;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Explore Countries</h1>
          <p>Discover information about countries around the world</p>
        </div>

        {error && (
          <div className={`api-warning ${usingMockData ? 'mock-data' : ''}`}>
            <div className="warning-content">
              <FaExclamationTriangle className="warning-icon" />
              <div className="warning-text">
                <strong>{usingMockData ? 'Demo Mode' : 'Warning'}</strong>
                <p>{error}</p>
              </div>
              {usingMockData && (
                <button onClick={refetch} className="retry-btn">
                  <FaSync />
                  Retry API
                </button>
              )}
            </div>
          </div>
        )}

        <div className="controls">
          <SearchBar onSearch={handleSearch} />
          <Filter onFilter={handleFilter} onSort={handleSort} />
        </div>

        <div className="results-info">
          <p>Found {countries.length} countries</p>
          {usingMockData && (
            <span className="demo-badge">Demo Data</span>
          )}
        </div>

        <CountryList
          countries={countries}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;