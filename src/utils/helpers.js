export const formatPopulation = (population) => {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
};

export const formatArea = (area) => {
  if (area >= 1000000) {
    return `${(area / 1000000).toFixed(1)}M km²`;
  } else if (area >= 1000) {
    return `${(area / 1000).toFixed(1)}K km²`;
  }
  return `${area} km²`;
};

export const getWeatherIcon = (iconCode) => {
  const WEATHER_ICONS = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '⛅',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌦️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return WEATHER_ICONS[iconCode] || '🌤️';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};