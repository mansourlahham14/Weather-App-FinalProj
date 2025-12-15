"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherSearch({ city, setCity, onSearch, loading, isDark }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="mb-8 transform transition-all duration-500">
      <div className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Cerca città..."
          className={`flex-1 px-6 py-4 rounded-2xl text-lg font-medium focus:outline-none focus:ring-4 shadow-xl transition-all duration-300 ${
            isDark 
              ? 'bg-white/10 text-white placeholder-white/50 focus:ring-white/30 backdrop-blur-md border border-white/20' 
              : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-300'
          }`}
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${
            isDark
              ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/20'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
          }`}
        >
          <span className={`text-2xl ${loading ? 'animate-spin inline-block' : ''}`}>
            {loading ? WEATHER_ICONS.loading : WEATHER_ICONS.search}
          </span>
        </button>
      </div>
    </div>
  );
}