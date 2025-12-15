"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherHeader({ isDark }) {
  return (
    <div className="text-center mb-10 animate-fadeIn">
      <h1 className={`text-6xl font-extrabold mb-3 transition-all duration-500 ${
        isDark 
          ? 'text-white drop-shadow-2xl' 
          : 'text-gray-800 drop-shadow-lg'
      }`}>
        <span className="inline-block animate-bounce-slow">{WEATHER_ICONS.cloud}</span> 
        <span className="ml-2">Meteo</span>
      </h1>
      <p className={`text-xl font-medium transition-colors duration-500 ${
        isDark ? 'text-white/80' : 'text-gray-600'
      }`}>
        Il meteo di tutto il mondo a portata di mano
      </p>
    </div>
  );
}