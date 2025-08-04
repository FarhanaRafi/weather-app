import type { WeatherData } from "../services/weatherService";
import {
  getWeatherIcon,
  getWindCondition,
  formatTemp,
  getWindDirection,
} from "../utils/weatherUtils";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const windCondition = getWindCondition(weather.current.windSpeed);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-6 mb-3 sm:mb-6 shadow-sm mx-2 sm:mx-0">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-xl font-bold text-gray-800">
          Aktuell
        </h3>
        <div className="text-xs sm:text-sm text-gray-500">
          {new Date(weather.current.time).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">
            {getWeatherIcon(weather.current.weatherCode)}
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
            {formatTemp(weather.current.temperature)}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Temperatur</div>
        </div>

        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm border border-gray-100">
          <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">💨</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1">
            {weather.current.windSpeed}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">km/h</div>
        </div>

        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm border border-gray-100">
          <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">🌬️</div>
          <div
            className={`text-sm sm:text-lg lg:text-xl font-bold mb-1 ${windCondition.color}`}
          >
            {windCondition.text}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Wind</div>
        </div>

        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm border border-gray-100">
          <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">📍</div>
          <div className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-800 mb-1 truncate">
            {weather.location}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Ort</div>
        </div>
      </div>
    </div>
  );
}
