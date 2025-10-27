import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Mock weather data for demo
const mockWeatherData = {
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  main: { temp: 22, feels_like: 20, humidity: 50, pressure: 1013 },
  wind: { speed: 3.6 },
  name: 'City'
};

export const weatherAPI = {
  getWeatherByCity: async (city) => {
    // If no API key or demo key, return mock data
    if (!API_KEY || API_KEY === 'demo_weather_key') {
      console.log('Using mock weather data for demo');
      return { ...mockWeatherData, name: city };
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.warn('Weather API failed, using mock data:', error.message);
      // Return mock data as fallback
      return { ...mockWeatherData, name: city };
    }
  }
};