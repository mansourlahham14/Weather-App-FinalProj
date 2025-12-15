"use client"

import { getWeatherIconUrl } from '../services/weatherService';
import WeatherDetails from './WeatherDetails';
import WeatherTemperature from './WeatherTemperature';

export default function WeatherCard({ weather, isDark }) {
  if (!weather) return null;

  return (
    <div className={`rounded-3xl p-8 shadow-2xl transition-all duration-700 transform hover:scale-[1.02] ${
      isDark 
        ? 'bg-white/10 backdrop-blur-xl border border-white/20' 
        : 'bg-white/90 backdrop-blur-xl'
    }`}>
      {/* Location */}
      <div className="text-center mb-6 animate-fadeIn">
        <h2 className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {weather.name}, {weather.sys.country}
        </h2>
        <p className={`text-xl opacity-80 capitalize transition-colors duration-500 ${
          isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          {weather.weather[0].description}
        </p>
      </div>

      {/* Weather Icon & Temp */}
      <div className="flex items-center justify-center mb-8 animate-slideIn">
        <img
          src={getWeatherIconUrl(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="w-32 h-32 drop-shadow-2xl animate-float"
        />
        <div className={`text-7xl font-bold transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {Math.round(weather.main.temp)}°C
        </div>
      </div>

      {/* Weather Details */}
      <WeatherDetails weather={weather} isDark={isDark} />

      {/* Min/Max Temperature */}
      <WeatherTemperature 
        min={weather.main.temp_min} 
        max={weather.main.temp_max}
        isDark={isDark}
      />
    </div>
  );
}