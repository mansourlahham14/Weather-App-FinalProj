"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherError({ message, isDark }) {
  if (!message) return null;

  return (
    <div className={`px-6 py-5 rounded-2xl mb-6 text-center shadow-xl animate-shake transition-all duration-300 ${
      isDark 
        ? 'bg-red-500/30 backdrop-blur-md text-white border border-red-400/50' 
        : 'bg-red-500 text-white'
    }`}>
      <span className="text-2xl mr-2">{WEATHER_ICONS.error}</span>
      <span className="text-lg font-semibold">{message}</span>

      {/* <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style> */}
    </div>
  );
}