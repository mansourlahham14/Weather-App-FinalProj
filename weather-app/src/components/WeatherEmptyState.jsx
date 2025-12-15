"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherEmptyState({ isDark }) {
  return (
    <div className={`text-center text-xl transition-colors duration-500 ${
      isDark ? 'text-white/70' : 'text-gray-600'
    }`}>
      <div className="text-8xl mb-6 animate-pulse-slow inline-block">
        {WEATHER_ICONS.globe}
      </div>
      <p className="font-medium">Cerca una città per iniziare</p>
      <p className={`text-base mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
        Prova con Milano, Tokyo, New York...
      </p>
    </div>
  );
}