"use client"

import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService'; // ⭐ Aggiungi fetchForecastData

export const useWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // ⭐ NUOVO STATO per le previsioni
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ⭐ MODIFICATA: ora accetta un parametro opzionale cityToSearch
  const searchWeather = async (cityToSearch) => {
    // ⭐ Usa il parametro passato oppure lo stato city
    const searchCity = cityToSearch || city;
    
    // ⭐ Controlla che ci sia una città da cercare
    if (!searchCity.trim()) {
      setError('Per favore inserisci una città');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ⭐ Fetch SIMULTANEO di meteo corrente E previsioni a 5 giorni
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(searchCity),
        fetchForecastData(searchCity)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData); // ⭐ Salva le previsioni
      setCity(''); // ⭐ Pulisce l'input dopo la ricerca
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null); // ⭐ Resetta anche le previsioni in caso di errore
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    setCity,
    weather,
    forecast, // ⭐ ESPONI forecast
    loading,
    error,
    searchWeather
  };
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('weather-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Rileva preferenza sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('weather-theme', newTheme ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
};