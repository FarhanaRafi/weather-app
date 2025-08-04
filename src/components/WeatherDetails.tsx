import type { WeatherData } from "../services/weatherService";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8 animate-slideUp">
      <div className="text-center mb-4 sm:mb-8 px-2">
        <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">
          Wetter für {weather.location}
        </h2>
        <p className="text-sm sm:text-base text-blue-200">
          <span className="sm:hidden">Aktuell und 7-Tage Vorhersage</span>
          <span className="hidden sm:inline">
            Aktuelle Bedingungen, 24h und 7-Tage Vorhersage
          </span>
        </p>
      </div>

      <CurrentWeather weather={weather} />
      <HourlyForecast weather={weather} />
      <WeeklyForecast weather={weather} />
    </div>
  );
}
