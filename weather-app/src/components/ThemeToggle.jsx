"use client"

import { useEffect, useState } from "react";
import { WEATHER_ICONS } from "../config/weather";

export default function ThemeToggle({ isDark, toggleTheme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Evita hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-180 z-50 border border-white/20"
    >
      <span className="block transition-transform duration-500 text-xl sm:text-2xl md:text-3xl">
        {isDark ? WEATHER_ICONS.sun : WEATHER_ICONS.moon}
      </span>
    </button>
  );
}

