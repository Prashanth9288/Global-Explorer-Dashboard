Installation
Clone the repository

bash
git clone <repository-url>
cd global-explorer-dashboard
Install dependencies

bash
npm install
Set up environment variables
Create a .env file in the root directory:

env
REACT_APP_OPENWEATHER_API_KEY=demo_weather_key
REACT_APP_NEWS_API_KEY=demo_news_key
Run the application

bash
npm start
The app will open in your browser at http://localhost:3000

📁 Project Structure
text
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filter.jsx
│   │   ├── Pagination.jsx
│   │   └── LoadingSpinner.jsx
│   ├── country/
│   │   ├── CountryCard.jsx
│   │   ├── CountryList.jsx
│   │   └── CountryDetails.jsx
│   └── weather/
│       └── WeatherWidget.jsx
├── pages/
│   ├── Home.jsx
│   ├── CountryDetailsPage.jsx
│   └── Favorites.jsx
├── services/
│   ├── countriesAPI.js
│   ├── weatherAPI.js
│   └── newsAPI.js
├── hooks/
│   ├── useCountries.js
│   ├── useFavorites.js
│   └── useTheme.js
├── context/
│   └── ThemeContext.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── styles/
│   └── App.css
├── App.js
└── index.js
🔑 API Configuration
For Demo Mode
The app works perfectly with demo keys:

env
REACT_APP_OPENWEATHER_API_KEY=demo_weather_key
REACT_APP_NEWS_API_KEY=demo_news_key
For Full Functionality
Get real API keys from:

OpenWeatherMap: https://openweathermap.org/api

NewsAPI: https://newsapi.org/

Replace the demo keys in your .env file with your actual API keys.

🎯 Available Scripts
bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
🌐 APIs Used
REST Countries API: https://restcountries.com/

OpenWeatherMap API: https://openweathermap.org/api

NewsAPI: https://newsapi.org/

🎨 Features Overview
Home Page
Search countries by name or capital

Filter by region (Africa, Americas, Asia, Europe, Oceania)

Sort by population, name, or area

Paginated results (12 countries per page)

Country Details Page
Complete country information

Current weather in capital city

Latest news headlines

Interactive map links

Favorite functionality

Favorites Page
Persistent favorite countries

Easy add/remove functionality

Empty state with call-to-action

🔧 Customization
Adding New Features
Create new components in src/components/

Add new pages in src/pages/

Extend API services in src/services/

Styling
The app uses CSS custom properties for theming. Modify variables in src/styles/App.css:

css
:root {
  --primary-color: #2563eb;
  --background-color: #ffffff;
  --text-color: #1e293b;
}
🐛 Troubleshooting
Common Issues
API Errors

The app uses demo data as fallback when APIs fail

Check browser console for specific error messages

Build Failures

Ensure all dependencies are installed: npm install

Check for syntax errors in component files

Environment Variables

Restart development server after adding .env file

Ensure variable names start with REACT_APP_

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
REST Countries for country data

OpenWeatherMap for weather API

NewsAPI for news data

React Team for the amazing framework