"use client"

import { useWeather, useTheme } from '../hooks/useWeather';
import { getBackgroundGradient } from '../services/weatherService';
import WeatherHeader from '../components/WeatherHeader';
import WeatherSearch from '../components/WeatherSearch';
import WeatherError from '../components/WeatherError';
import WeatherCard from '../components/WeatherCard';
import WeatherEmptyState from '../components/WeatherEmptyState';
import ThemeToggle from '../components/ThemeToggle';
import CityCarousel from '../components/CityCarousel';

export default function WeatherApp() {
  const { city, setCity, weather, loading, error, searchWeather } = useWeather();
  const { isDark, toggleTheme } = useTheme();

  // Gestisce il click dalla carosella
  const handleCitySelect = (cityName) => {
    setCity(cityName);
    // Aspetta un momento per aggiornare lo stato, poi cerca
    setTimeout(() => {
      searchWeather(cityName);
    }, 100);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather, isDark)} transition-all duration-1000 flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob ${
          isDark ? 'bg-blue-500' : 'bg-yellow-300'
        }`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 ${
          isDark ? 'bg-purple-500' : 'bg-pink-300'
        }`}></div>
        <div className={`absolute -bottom-20 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 ${
          isDark ? 'bg-indigo-500' : 'bg-blue-300'
        }`}></div>
      </div>

      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      <div className="w-full max-w-md relative z-10">
        <WeatherHeader isDark={isDark} />
        
        <WeatherSearch
          city={city}
          setCity={setCity}
          onSearch={searchWeather}
          loading={loading}
          isDark={isDark}
        />

        {/* ⭐ CAROSELLA SOTTO LA SEARCH BAR - mostrata solo quando non c'è meteo */}
        {!weather && !loading && (
          <CityCarousel 
            onCitySelect={handleCitySelect} 
            isDark={isDark} 
          />
        )}

        <WeatherError message={error} isDark={isDark} />

        <WeatherCard weather={weather} isDark={isDark} />

        {!weather && !error && !loading && <WeatherEmptyState isDark={isDark} />}
      </div>
    </div>
  );
}