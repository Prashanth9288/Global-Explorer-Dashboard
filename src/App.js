import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Home from './pages/Home';
import CountryDetailsPage from './pages/CountryDetailspage';
import Favorites from './pages/Favorites';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:countryName" element={<CountryDetailsPage />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;