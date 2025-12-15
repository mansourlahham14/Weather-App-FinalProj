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

      {/* <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style> */}
    </div>
  );
}