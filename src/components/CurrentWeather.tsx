import type { WeatherData } from "../services/weatherService";
import {
  getWeatherIcon,
  getWindCondition,
  formatTemp,
} from "../utils/weatherUtils";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const windCondition = getWindCondition(weather.current.windSpeed);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Aktuelles Wetter</h3>
        <div className="text-sm text-gray-500">
          {new Date(weather.current.time).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <div className="text-4xl mb-2">
            {getWeatherIcon(weather.current.weatherCode)}
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {formatTemp(weather.current.temperature)}
          </div>
          <div className="text-sm text-gray-500">Temperatur</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">💨</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {weather.current.windSpeed}
          </div>
          <div className="text-sm text-gray-500 mb-1">km/h</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">🌬️</div>
          <div className={`text-xl font-bold mb-1 ${windCondition.color}`}>
            {windCondition.text}
          </div>
          <div className="text-sm text-gray-500">Wind Bedingungen</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">📍</div>
          <div className="text-lg font-semibold text-gray-800 mb-1">
            {weather.location}
          </div>
          <div className="text-sm text-gray-500">Standort</div>
        </div>
      </div>
    </div>
  );
}
