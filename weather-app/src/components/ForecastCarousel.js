"use client"

import React, { useState } from 'react';
import { getWeatherIconUrl } from '../services/weatherService';

export default function ForecastCarousel({ forecast, isDark }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!forecast || !forecast.forecasts || forecast.forecasts.length === 0) {
    return null;
  }

  const forecasts = forecast.forecasts;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, forecasts.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Determina quante card mostrare in base all'indice
  const getVisibleForecasts = () => {
    if (forecasts.length <= 3) {
      return forecasts.map((f, i) => ({ ...f, index: i }));
    }

    const visible = [];
    for (let i = Math.max(0, currentIndex - 1); i <= Math.min(forecasts.length - 1, currentIndex + 1); i++) {
      visible.push({ ...forecasts[i], index: i });
    }
    return visible;
  };

  const visibleForecasts = getVisibleForecasts();

  return (
    <div className="mt-6 animate-fadeIn">
      <h3 className={`text-center text-xl font-bold mb-4 transition-colors duration-500 ${
        isDark ? 'text-white/90' : 'text-gray-800'
      }`}>
        📅 Previsioni dei prossimi 5 giorni
      </h3>

      <div className="relative">
        {/* Carousel Container */}
        <div className="relative h-80 overflow-visible">
          <div className="flex items-center justify-center h-full gap-4">
            {visibleForecasts.map((day) => {
              const isCenter = day.index === currentIndex;
              const position = day.index - currentIndex;

              return (
                <div
                  key={day.timestamp}
                  className={`transition-all duration-500 ease-out ${
                    isCenter
                      ? 'scale-100 opacity-100 z-20'
                      : 'scale-75 opacity-40 z-10'
                  }`}
                  style={{
                    transform: `translateX(${position * 20}px) scale(${isCenter ? 1 : 0.85})`,
                  }}
                >
                  <div className={`w-64 h-72 rounded-2xl p-5 shadow-xl backdrop-blur-md border-2 transition-all duration-300 flex flex-col ${
                    isDark
                      ? 'bg-white/10 border-white/30 hover:bg-white/15'
                      : 'bg-white border-gray-200 hover:shadow-2xl'
                  } ${isCenter ? 'ring-4 ring-blue-400/50' : ''}`}>
                    
                    {/* Data */}
                    <div className={`text-center mb-2 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      <p className="text-base font-bold">{day.date}</p>
                    </div>

                    {/* Icona meteo */}
                    <div className="flex justify-center mb-2">
                      <img 
                        src={getWeatherIconUrl(day.icon)} 
                        alt={day.condition}
                        className="w-16 h-16 drop-shadow-lg"
                      />
                    </div>

                    {/* Condizione */}
                    <p className={`text-center text-sm font-semibold mb-3 ${
                      isDark ? 'text-white/90' : 'text-gray-700'
                    }`}>
                      {day.condition}
                    </p>

                    {/* Temperature */}
                    <div className="flex justify-center items-center gap-3 mb-3">
                      <div className="text-center">
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Max</p>
                        <p className={`text-xl font-bold ${isDark ? 'text-orange-400' : 'text-red-500'}`}>
                          {day.tempMax}°
                        </p>
                      </div>
                      <div className={`h-8 w-px ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}></div>
                      <div className="text-center">
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Min</p>
                        <p className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {day.tempMin}°
                        </p>
                      </div>
                    </div>

                    {/* Info aggiuntive */}
                    <div className={`flex justify-around text-xs mt-auto ${
                      isDark ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      <div className="text-center">
                        <p className="mb-1">💧</p>
                        <p className="font-semibold">{day.humidity}%</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1">💨</p>
                        <p className="font-semibold">{day.wind} km/h</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {forecasts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg border border-gray-200'
              } hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === forecasts.length - 1}
              className={`absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg border border-gray-200'
              } hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {forecasts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? isDark
                    ? 'w-8 bg-white shadow-lg'
                    : 'w-8 bg-blue-500 shadow-lg'
                  : isDark
                    ? 'w-2 bg-white/30 hover:bg-white/50'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Vai al giorno ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}