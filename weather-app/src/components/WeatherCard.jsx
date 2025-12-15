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

      {/* <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out 0.2s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style> */}
    </div>
  );
}