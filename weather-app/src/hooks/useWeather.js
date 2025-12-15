"use client"

import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export const useWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
      setCity('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    setCity,
    weather,
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