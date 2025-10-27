import axios from 'axios';

const ENDPOINTS = [
  'https://restcountries.com/v3.1/all',
  'https://restcountries.com/v2/all',
  'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca2,area,languages,currencies,latlng,borders,subregion'
];

const mockCountries = [
  {
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington D.C.'],
    region: 'Americas',
    subregion: 'North America',
    population: 331002651,
    area: 9833520,
    flags: { png: 'https://flagcdn.com/w320/us.png', svg: 'https://flagcdn.com/us.svg' },
    cca2: 'US',
    languages: { eng: 'English' },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } },
    latlng: [38, -97],
    borders: ['CAN', 'MEX']
  },
  {
    name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
    capital: ['London'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67886011,
    area: 242900,
    flags: { png: 'https://flagcdn.com/w320/gb.png', svg: 'https://flagcdn.com/gb.svg' },
    cca2: 'GB',
    languages: { eng: 'English' },
    currencies: { GBP: { name: 'British pound', symbol: '£' } },
    latlng: [54, -2],
    borders: ['IRL']
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    capital: ['Ottawa'],
    region: 'Americas',
    subregion: 'North America',
    population: 38005238,
    area: 9984670,
    flags: { png: 'https://flagcdn.com/w320/ca.png', svg: 'https://flagcdn.com/ca.svg' },
    cca2: 'CA',
    languages: { eng: 'English', fra: 'French' },
    currencies: { CAD: { name: 'Canadian dollar', symbol: '$' } },
    latlng: [60, -95],
    borders: ['USA']
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    capital: ['Canberra'],
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 25687041,
    area: 7692024,
    flags: { png: 'https://flagcdn.com/w320/au.png', svg: 'https://flagcdn.com/au.svg' },
    cca2: 'AU',
    languages: { eng: 'English' },
    currencies: { AUD: { name: 'Australian dollar', symbol: '$' } },
    latlng: [-27, 133],
    borders: []
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125836021,
    area: 377930,
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg' },
    cca2: 'JP',
    languages: { jpn: 'Japanese' },
    currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
    latlng: [36, 138],
    borders: []
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83240525,
    area: 357114,
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
    cca2: 'DE',
    languages: { deu: 'German' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    latlng: [51, 9],
    borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE']
  }
];

export const countriesAPI = {
  getAllCountries: async () => {
    // Try each endpoint until one works
    for (const endpoint of ENDPOINTS) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await axios.get(endpoint, {
          timeout: 10000,
        });
        console.log('Success with endpoint:', endpoint);
        return response.data;
      } catch (error) {
        console.warn(`Endpoint failed: ${endpoint}`, error.message);
        // Continue to next endpoint
      }
    }
    
    // If all endpoints fail, use mock data
    console.log('All API endpoints failed, using mock data');
    return mockCountries;
  },

  getCountryByName: async (name) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`, {
        timeout: 10000,
      });
      return response.data[0];
    } catch (error) {
      console.warn('Country API failed, using mock data');
      // Find in mock data
      const country = mockCountries.find(c => 
        c.name.common.toLowerCase() === name.toLowerCase()
      );
      if (country) return country;
      throw new Error(`Country "${name}" not found`);
    }
  },

  getCountriesByRegion: async (region) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.warn('Region API failed, using mock data');
      // Filter mock data by region
      return mockCountries.filter(country => 
        country.region.toLowerCase() === region.toLowerCase()
      );
    }
  },

  getCountryByCode: async (code) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`, {
        timeout: 10000,
      });
      return response.data[0];
    } catch (error) {
      console.warn('Country code API failed');
      throw new Error('Failed to fetch country details.');
    }
  }
};