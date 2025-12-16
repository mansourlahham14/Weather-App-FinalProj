"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherHeader({ isDark }) {
  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fadeIn px-4">
      <h1
        className={`font-extrabold mb-2 sm:mb-3 transition-all duration-500
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        ${
          isDark
            ? 'text-white drop-shadow-2xl'
            : 'text-gray-800 drop-shadow-lg'
        }`}
      >
        <span className="inline-block animate-bounce-slow text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {WEATHER_ICONS.cloud}
        </span>
        <span className="ml-2">MansWeather</span>
      </h1>

      <p
        className={`font-medium transition-colors duration-500
        text-base sm:text-lg md:text-xl
        ${
          isDark ? 'text-white/80' : 'text-gray-600'
        }`}
      >
        Il meteo di tutto il mondo a portata di mano
      </p>
    </div>
  );
}
