// Weather code mappings from Open-Meteo API
export const WEATHER_ICONS: Record<number, string> = {
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫️", // Fog
  48: "🌫️", // Depositing rime fog
  51: "🌦️", // Light drizzle
  53: "🌦️", // Moderate drizzle
  55: "🌧️", // Dense drizzle
  61: "🌧️", // Slight rain
  63: "🌧️", // Moderate rain
  65: "🌧️", // Heavy rain
  71: "🌨️", // Slight snow
  73: "🌨️", // Moderate snow
  75: "❄️", // Heavy snow
  95: "⛈️", // Thunderstorm
  96: "⛈️", // Thunderstorm with hail
  99: "⛈️", // Thunderstorm with heavy hail
};

export const WIND_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

// Wind condition thresholds (km/h)
export const WIND_THRESHOLDS = {
  WEAK: 5,
  MODERATE: 15,
  GOOD: 25,
  STRONG: 35,
} as const;
