"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function WeatherDetails({ weather, isDark }) {
  const details = [
    {
      icon: WEATHER_ICONS.temperature,
      label: 'Percepita',
      value: `${Math.round(weather.main.feels_like)}°C`
    },
    {
      icon: WEATHER_ICONS.humidity,
      label: 'Umidità',
      value: `${weather.main.humidity}%`
    },
    {
      icon: WEATHER_ICONS.wind,
      label: 'Vento',
      value: `${Math.round(weather.wind.speed * 3.6)} km/h`
    },
    {
      icon: WEATHER_ICONS.pressure,
      label: 'Pressione',
      value: `${weather.main.pressure} hPa`
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {details.map((detail, index) => (
        <div 
          key={index}
          className={`rounded-2xl p-5 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
            isDark 
              ? 'bg-white/10 backdrop-blur-sm border border-white/10' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-4xl mb-2 transition-transform duration-300 hover:scale-125">
            {detail.icon}
          </div>
          <div className={`text-sm font-medium mb-1 transition-colors duration-500 ${
            isDark ? 'text-white/70' : 'text-gray-600'
          }`}>
            {detail.label}
          </div>
          <div className={`text-2xl font-bold transition-colors duration-500 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {detail.value}
          </div>
        </div>
      ))}
    </div>
  );
}