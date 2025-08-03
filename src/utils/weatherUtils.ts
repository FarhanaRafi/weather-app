import {
  WEATHER_ICONS,
  WIND_DIRECTIONS,
  WIND_THRESHOLDS,
} from "../constants/weatherCodes";

export function getWeatherIcon(code: number): string {
  return WEATHER_ICONS[code] || "🌤️"; // fallback to partly sunny
}

export function getWindDirection(degrees: number): string {
  const index = Math.round(degrees / 45) % 8;
  return WIND_DIRECTIONS[index];
}

export function getWindCondition(speed: number) {
  // TODO: maybe add more granular conditions later?
  if (speed < WIND_THRESHOLDS.WEAK) {
    return { text: "Schwach", color: "text-gray-500" };
  }

  if (speed < WIND_THRESHOLDS.MODERATE) {
    return { text: "Mäßig", color: "text-blue-500" };
  }

  if (speed < WIND_THRESHOLDS.GOOD) {
    return { text: "Gut", color: "text-green-500" };
  }

  if (speed < WIND_THRESHOLDS.STRONG) {
    return { text: "Stark", color: "text-orange-500" };
  }

  return { text: "Sturm", color: "text-red-500" };
}

// Helper to format temperature nicely
export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°C`;
}

// Format date for german locale
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
