import type { WeatherData } from "../services/weatherService";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-3 md:space-y-8 animate-slideUp">
      <div className="text-center mb-3 md:mb-8 px-1">
        <h2 className="text-lg md:text-3xl font-bold text-white mb-2">
          Wetter für {weather.location}
        </h2>
        <p className="text-xs md:text-base text-blue-200">
          <span className="md:hidden">Aktuell und 7-Tage Vorhersage</span>
          <span className="hidden md:inline">
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
