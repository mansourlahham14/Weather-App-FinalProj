🌦️ Weather App

Una Weather App moderna e responsive sviluppata con Next.js e Tailwind CSS.
Consente di consultare il meteo attuale e le previsioni a 5 giorni per qualsiasi città, con supporto al tema chiaro/scuro.

🚀 Demo

👉 Aggiungi qui il link alla demo (Vercel, Netlify, ecc.)

✨ Features

🔍 Ricerca meteo per città

🌡️ Meteo attuale

📅 Previsioni meteo a 5 giorni

🌗 Dark / Light Mode

📱 Design responsive

⚡ Performance ottimizzate con Next.js

🛠️ Tech Stack

Next.js (App Router)

React

Tailwind CSS

OpenWeather API

JavaScript (ES6+)

📁 Project Structure
src/
├── app/
│   └── page.js
├── components/
│   ├── CityCarousel.js
│   ├── ForecastCarousel.js
│   ├── ThemeToggle.jsx
│   ├── WeatherCard.jsx
│   ├── WeatherDetails.jsx
│   ├── WeatherEmptyState.jsx
│   ├── WeatherError.jsx
│   ├── WeatherHeader.jsx
│   ├── WeatherSearch.jsx
│   └── WeatherTemperature.jsx
├── hooks/
│   └── useWeather.js
├── services/
│   └── weatherService.js
├── config/
  └── weather.js



▶️ Getting Started
# Install dependencies
npm install

# Run development server
npm run dev


Apri http://localhost:3000 nel browser.

🧠 Technical Notes

Il toggle del tema è renderizzato solo lato client per evitare hydration errors

Custom hooks per una migliore separazione della logica

API centralizzate in weatherService.js


📄 License

Questo progetto è rilasciato sotto licenza MIT.

👨‍💻 Mansour Eduardo Lahham
Sviluppato come progetto Front-End con Next.js e Tailwind CSS.

