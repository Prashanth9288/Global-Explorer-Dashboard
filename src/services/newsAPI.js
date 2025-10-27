import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

// Mock news data for demo
const mockNewsData = [
  {
    title: 'Sample News Article 1',
    description: 'This is a sample news article for demonstration purposes. In a real application, this would show actual news from the country.',
    url: 'https://example.com/article1',
    source: { name: 'Sample News' }
  },
  {
    title: 'Sample News Article 2',
    description: 'Another sample news article showing how the news section would work with real API data.',
    url: 'https://example.com/article2',
    source: { name: 'Demo News' }
  },
  {
    title: 'Sample News Article 3',
    description: 'This demonstrates the news functionality of the Global Explorer Dashboard.',
    url: 'https://example.com/article3',
    source: { name: 'Example News' }
  }
];

export const newsAPI = {
  getTopHeadlinesByCountry: async (countryCode) => {
    // If no API key or demo key, return mock data
    if (!API_KEY || API_KEY === 'demo_news_key') {
      console.log('Using mock news data for demo');
      return mockNewsData;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/top-headlines?country=${countryCode}&pageSize=3&apiKey=${API_KEY}`
      );
      return response.data.articles || [];
    } catch (error) {
      console.warn('News API failed, using mock data:', error.message);
      // Return mock data as fallback
      return mockNewsData;
    }
  }
};