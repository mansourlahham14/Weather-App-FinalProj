"use client"

import React, { useState, useEffect } from 'react';

const POPULAR_CITIES = [
  { 
    name: 'Milano', 
    country: 'Italia',
    imageDay: 'https://www.daichepartiamo.com/wp-content/uploads/2019/08/milano-duomo.jpg',
    imageNight: 'https://www.yesmilano.it/sites/default/files/styles/testata_full/public/itinerario/copertina/6298/23579/posti-da-vedere-fotografare-a-milano-di-notte.jpg?itok=wP9aMJ1Z',
    gradient: 'from-red-500/20 to-green-500/20'
  },
  { 
    name: 'New York', 
    country: 'USA',
    imageDay: 'https://www.travel365.it/foto/nyc-new-york-city-america-2.jpg',
    imageNight: 'https://www.amerigo.it/application/files/2316/0024/6242/new_york_skyline_di_notte.jpg',
    gradient: 'from-blue-500/20 to-purple-500/20'
  },
  { 
    name: 'Tokyo', 
    country: 'Giappone',
    imageDay: 'https://www.sonoinviaggio.com/wp-content/uploads/2022/04/ueno-cosa-vedere-tokyo.jpg',
    imageNight: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
    gradient: 'from-pink-500/20 to-red-500/20'
  },
  { 
    name: 'Londra', 
    country: 'UK',
    imageDay: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop',
    imageNight: 'https://st.depositphotos.com/1086793/2354/i/450/depositphotos_23543167-stock-photo-london-bridge-and-river-thames.jpg',
    gradient: 'from-gray-500/20 to-blue-500/20'
  },
  { 
    name: 'Parigi', 
    country: 'Francia',
    imageDay: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    imageNight: 'https://i.pinimg.com/736x/07/2e/eb/072eebc7d53a7ef94c93b81962db5efd.jpg',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    name: 'Dubai', 
    country: 'UAE',
    imageDay: 'https://www.viaggioadubai.it/wp-content/uploads/2018/10/downtown-dubai.jpg',
    imageNight: 'https://www.shutterstock.com/image-photo/futuristic-dubai-cityscape-including-iconic-600nw-2377132037.jpg',
    gradient: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    name: 'Sydney', 
    country: 'Australia',
    imageDay: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop',
    imageNight: 'https://res.cloudinary.com/hello-tickets/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_800/v1709165867/wbpuxmzbdnavmweies4p.jpg',
    gradient: 'from-blue-500/20 to-teal-500/20'
  },
  { 
    name: 'Roma', 
    country: 'Italia',
    imageDay: 'https://duezaininviaggio.it/wp-content/uploads/2020/09/visitare-roma-in-3-giorni-il-colosseo.jpg',
    imageNight: 'https://www.visitareroma.info/wp-content/uploads/2020/07/Roma-di-notte-1200x630-1.jpg',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
];

export default function CityCarousel({ onCitySelect, isDark }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll ogni 3 secondi
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % POPULAR_CITIES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleCityClick = (cityName) => {
    onCitySelect(cityName);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % POPULAR_CITIES.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + POPULAR_CITIES.length) % POPULAR_CITIES.length);
    setIsAutoPlaying(false);
  };

  // Calcola le città visibili (quella corrente + le 2 adiacenti)
  const getVisibleCities = () => {
    const cities = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + POPULAR_CITIES.length) % POPULAR_CITIES.length;
      cities.push({ ...POPULAR_CITIES[index], position: i });
    }
    return cities;
  };

  return (
    <div className="mb-8 animate-fadeIn">
      <h2 className={`text-center text-lg font-semibold mb-4 transition-colors duration-500 ${
        isDark ? 'text-white/90' : 'text-gray-700'
      }`}>
        🌍 Città Popolari
      </h2>

      <div className="relative px-12">
        {/* Carousel Container */}
        <div className="relative h-48 overflow-visible">
          <div className="flex items-center justify-center h-full">
            {getVisibleCities().map((city, idx) => {
              const isCenter = city.position === 0;
              return (
                <button
                  key={`${city.name}-${idx}`}
                  onClick={() => isCenter && handleCityClick(city.name)}
                  disabled={!isCenter}
                  className={`absolute transition-all duration-500 ease-out ${
                    isCenter 
                      ? 'z-20 scale-100 opacity-100 cursor-pointer' 
                      : 'z-10 scale-75 opacity-30 cursor-default pointer-events-none'
                  }`}
                  style={{
                    transform: `translateX(${city.position * 180}px) scale(${isCenter ? 1 : 0.75})`,
                  }}
                >
                  <div className={`relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border-2 transition-all duration-300 group ${
                    isDark
                      ? 'border-white/30 hover:border-white/50'
                      : 'border-gray-200 hover:border-blue-400'
                  } ${isCenter ? 'hover:scale-105 hover:shadow-3xl active:scale-95' : ''}`}>
                    
                    {/* Immagine di sfondo */}
                    <div className="absolute inset-0">
                      <img 
                        src={isDark ? city.imageNight : city.imageDay} 
                        alt={`${city.name} ${isDark ? 'di notte' : 'di giorno'}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        key={isDark ? 'night' : 'day'}
                      />
                      {/* Overlay sfumato */}
                      <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                        isDark 
                          ? 'from-black/80 via-black/40 to-transparent' 
                          : 'from-black/60 via-black/30 to-transparent'
                      }`}></div>
                      {/* Overlay colorato */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} mix-blend-overlay`}></div>
                    </div>

                    {/* Contenuto */}
                    <div className="relative h-full flex flex-col justify-end p-4">
                      <div className="text-left">
                        <h3 className="text-white text-xl font-bold drop-shadow-lg mb-1">
                          {city.name}
                        </h3>
                        <p className="text-white/80 text-sm font-medium drop-shadow-md">
                          {city.country}
                        </p>
                      </div>
                      
                      {/* Icona click (solo su centrale) */}
                      {isCenter && (
                        <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isDark 
                            ? 'bg-white/20 backdrop-blur-md' 
                            : 'bg-white/40 backdrop-blur-md'
                        } group-hover:scale-110`}>
                          <svg className="w-4 h-4 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30'
              : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg border border-gray-200'
          } hover:scale-110 active:scale-95`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className={`absolute -right-2 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30'
              : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg border border-gray-200'
          } hover:scale-110 active:scale-95`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {POPULAR_CITIES.map((_, index) => (
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
              aria-label={`Vai alla città ${index + 1}`}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
}