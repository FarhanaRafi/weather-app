import type { WeatherData } from "../services/weatherService";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-slideUp">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Wetter für {weather.location}
        </h2>
        <p className="text-blue-200">
          Aktuelle Bedingungen, 24h und 7-Tage Vorhersage
        </p>
      </div>

      <CurrentWeather weather={weather} />
      <HourlyForecast weather={weather} />
      <WeeklyForecast weather={weather} />
    </div>
  );
}
