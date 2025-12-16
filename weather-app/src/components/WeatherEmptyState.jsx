"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherEmptyState({ isDark }) {
  return (
    <div className={`text-center text-xl transition-colors duration-500 ${
      isDark ? 'text-white/70' : 'text-gray-600'
    }`}>
      <div className="text-8xl mb-6 animate-pulse-slow inline-block">
        {/* {WEATHER_ICONS.globe} */}
      </div>
      <p className="font-medium"></p>
      <p className={`text-base mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
        
      </p>
    </div>
  );
}