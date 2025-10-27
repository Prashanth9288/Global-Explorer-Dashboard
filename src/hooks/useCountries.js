import { useState, useEffect } from 'react';
import { countriesAPI } from '../services/countriesAPI';


const mockCountries = [
  {
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington D.C.'],
    region: 'Americas',
    population: 331002651,
    flags: { png: 'https://flagcdn.com/w320/us.png' },
    cca2: 'US'
  },
  {
    name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
    capital: ['London'],
    region: 'Europe',
    population: 67886011,
    flags: { png: 'https://flagcdn.com/w320/gb.png' },
    cca2: 'GB'
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    capital: ['Ottawa'],
    region: 'Americas',
    population: 38005238,
    flags: { png: 'https://flagcdn.com/w320/ca.png' },
    cca2: 'CA'
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    capital: ['Canberra'],
    region: 'Oceania',
    population: 25687041,
    flags: { png: 'https://flagcdn.com/w320/au.png' },
    cca2: 'AU'
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    capital: ['Tokyo'],
    region: 'Asia',
    population: 125836021,
    flags: { png: 'https://flagcdn.com/w320/jp.png' },
    cca2: 'JP'
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    population: 83240525,
    flags: { png: 'https://flagcdn.com/w320/de.png' },
    cca2: 'DE'
  }
];

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await countriesAPI.getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
      setUsingMockData(false);
    } catch (err) {
      console.warn('Using mock data due to API error:', err.message);
      // Use mock data as fallback
      setCountries(mockCountries);
      setFilteredCountries(mockCountries);
      setUsingMockData(true);
      setError(`API temporarily unavailable. Showing sample data. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.capital && country.capital[0]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.name.official && country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCountries(filtered);
  };

  const filterByRegion = (region) => {
    if (region === 'all') {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country => 
      country.region.toLowerCase() === region.toLowerCase()
    );
    setFilteredCountries(filtered);
  };

  const sortCountries = (sortBy) => {
    const sorted = [...filteredCountries].sort((a, b) => {
      switch (sortBy) {
        case 'population':
          return b.population - a.population;
        case 'name':
          return a.name.common.localeCompare(b.name.common);
        case 'area':
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });
    setFilteredCountries(sorted);
  };

  return {
    countries: filteredCountries,
    loading,
    error,
    usingMockData,
    searchCountries,
    filterByRegion,
    sortCountries,
    refetch: fetchAllCountries
  };
};