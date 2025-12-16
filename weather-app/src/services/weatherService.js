import {WEATHER_API_BASE_URL} from '../config/weather';

const WEATHER_BACKGROUNDS = {
  light: {
    rain: 'from-slate-400 via-slate-500 to-slate-600',
    drizzle: 'from-slate-400 via-slate-500 to-slate-600',
    cloud: 'from-gray-300 via-gray-400 to-gray-500',
    clear_hot: 'from-orange-300 via-orange-400 to-red-400',
    clear_cool: 'from-sky-300 via-sky-400 to-cyan-400',
    snow: 'from-blue-100 via-blue-200 to-blue-300',
    thunder: 'from-purple-400 via-purple-600 to-gray-700',
    default: 'from-blue-300 via-blue-400 to-indigo-500'
  },
  dark: {
    rain: 'from-slate-800 via-slate-900 to-gray-900',
    drizzle: 'from-slate-800 via-slate-900 to-gray-900',
    cloud: 'from-gray-700 via-gray-800 to-gray-900',
    clear_hot: 'from-orange-600 via-red-700 to-red-900',
    clear_cool: 'from-blue-800 via-indigo-900 to-purple-900',
    snow: 'from-blue-900 via-slate-900 to-gray-900',
    thunder: 'from-purple-900 via-indigo-950 to-black',
    default: 'from-slate-800 via-slate-900 to-black'
  }
};

export const fetchWeatherData = async (city) => {
  if (!city.trim()) {
    throw new Error('Inserisci il nome di una città');
  }

  // ⭐ CORRETTO: usa NEXT_PUBLIC_WEATHER_API_KEY
  const url = `${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=it`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Città non trovata');
    }
    throw new Error('Errore nel recupero dei dati meteo');
  }

  const data = await response.json();
  return data;
};

// ⭐ NUOVA FUNZIONE: Previsioni a 5 giorni
export const fetchForecastData = async (city) => {
  if (!city.trim()) {
    throw new Error('Inserisci il nome di una città');
  }

  // ⭐ CORRETTO: usa NEXT_PUBLIC_WEATHER_API_KEY
  const url = `${WEATHER_API_BASE_URL}/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=it`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Città non trovata');
    }
    throw new Error('Errore nel recupero delle previsioni');
  }

  const data = await response.json();
  
  // Raggruppa le previsioni per giorno (OpenWeather restituisce previsioni ogni 3 ore)
  const dailyForecasts = processForecastData(data.list);
  
  return {
    city: data.city,
    forecasts: dailyForecasts
  };
};

// ⭐ FUNZIONE HELPER: Processa i dati delle previsioni
const processForecastData = (forecastList) => {
  const dailyData = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('it-IT', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: dateKey,
        temps: [],
        conditions: [],
        icons: [],
        humidity: [],
        wind: [],
        timestamp: item.dt
      };
    }
    
    dailyData[dateKey].temps.push(item.main.temp);
    dailyData[dateKey].conditions.push(item.weather[0].main);
    dailyData[dateKey].icons.push(item.weather[0].icon);
    dailyData[dateKey].humidity.push(item.main.humidity);
    dailyData[dateKey].wind.push(item.wind.speed);
  });
  
  // Calcola medie e seleziona l'icona più frequente
  return Object.values(dailyData).slice(0, 5).map(day => ({
    date: day.date,
    tempMax: Math.round(Math.max(...day.temps)),
    tempMin: Math.round(Math.min(...day.temps)),
    condition: getMostFrequent(day.conditions),
    icon: getMostFrequent(day.icons),
    humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
    wind: Math.round(day.wind.reduce((a, b) => a + b, 0) / day.wind.length),
    timestamp: day.timestamp
  }));
};

// ⭐ FUNZIONE HELPER: Trova l'elemento più frequente in un array
const getMostFrequent = (arr) => {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

export const getBackgroundGradient = (weatherData, isDark) => {
  const theme = isDark ? WEATHER_BACKGROUNDS.dark : WEATHER_BACKGROUNDS.light;
  
  if (!weatherData) return theme.default;

  const temp = weatherData.main.temp;
  const condition = weatherData.weather[0].main.toLowerCase();

  if (condition.includes('rain') || condition.includes('drizzle')) {
    return theme.rain;
  } else if (condition.includes('cloud')) {
    return theme.cloud;
  } else if (condition.includes('clear')) {
    if (temp > 25) return theme.clear_hot;
    return theme.clear_cool;
  } else if (condition.includes('snow')) {
    return theme.snow;
  } else if (condition.includes('thunder')) {
    return theme.thunder;
  }

  return theme.default;
};

