import React from 'react';
import CountryCard from './CountryCard';
import Pagination from '../common/Pagination';
import { COUNTRIES_PER_PAGE } from '../../utils/constants';
import './CountryList.css';

const CountryList = ({ 
  countries, 
  currentPage, 
  onPageChange 
}) => {
  const countriesPerPage = COUNTRIES_PER_PAGE;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  if (countries.length === 0) {
    return (
      <div className="no-countries">
        <h3>No countries found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="country-list">
      <div className="countries-grid">
        {currentCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
      
      <Pagination
        totalCountries={countries.length}
        countriesPerPage={countriesPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CountryList;