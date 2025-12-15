"use client"

import { WEATHER_ICONS } from '../config/weather';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-180 z-50 border border-white/20"
      aria-label="Toggle theme"
    >
      <span className="text-3xl block transition-transform duration-500">
        {isDark ? WEATHER_ICONS.sun : WEATHER_ICONS.moon}
      </span>
    </button>
  );
}