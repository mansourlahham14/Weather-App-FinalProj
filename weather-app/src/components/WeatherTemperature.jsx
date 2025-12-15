"use client"

export default function WeatherTemperature({ min, max, isDark }) {
  return (
    <div className={`flex justify-between rounded-2xl p-5 transition-all duration-500 hover:shadow-xl ${
      isDark 
        ? 'bg-white/10 backdrop-blur-sm border border-white/10' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
    }`}>
      <div className="text-center flex-1 transition-all duration-300 hover:scale-110">
        <div className={`text-sm font-medium mb-2 transition-colors duration-500 ${
          isDark ? 'text-white/70' : 'text-gray-600'
        }`}>
          🥶 Min
        </div>
        <div className={`text-3xl font-bold transition-colors duration-500 ${
          isDark ? 'text-blue-300' : 'text-blue-600'
        }`}>
          {Math.round(min)}°C
        </div>
      </div>
      <div className={`border-l transition-colors duration-500 ${
        isDark ? 'border-white/20' : 'border-gray-300'
      }`}></div>
      <div className="text-center flex-1 transition-all duration-300 hover:scale-110">
        <div className={`text-sm font-medium mb-2 transition-colors duration-500 ${
          isDark ? 'text-white/70' : 'text-gray-600'
        }`}>
          🔥 Max
        </div>
        <div className={`text-3xl font-bold transition-colors duration-500 ${
          isDark ? 'text-orange-300' : 'text-orange-600'
        }`}>
          {Math.round(max)}°C
        </div>
      </div>
    </div>
  );
}