import type { WeatherData } from "../services/weatherService";
import { getWeatherIcon, formatTemp } from "../utils/weatherUtils";

interface HourlyForecastProps {
  weather: WeatherData;
}

export default function HourlyForecast({ weather }: HourlyForecastProps) {
  const formatHour = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="hidden sm:block bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100 mx-2 sm:mx-0">
      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6">
        24h Vorhersage
      </h3>

      <div className="overflow-x-auto -mx-1 sm:mx-0">
        <div
          className="flex gap-2 sm:gap-4 pb-2 px-1 sm:px-0"
          style={{ minWidth: "max-content" }}
        >
          {weather.hourly.map((hour, index) => {
            const isCurrentHour = index === 0;

            return (
              <div
                key={index}
                className={`flex-shrink-0 text-center p-2 sm:p-3 rounded-lg min-w-[50px] sm:min-w-[80px] ${
                  isCurrentHour
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`text-xs font-medium mb-1 ${
                    isCurrentHour ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  {isCurrentHour ? "Jetzt" : formatHour(hour.time)}
                </div>

                <div className="text-lg sm:text-2xl mb-1">
                  {getWeatherIcon(hour.weatherCode)}
                </div>

                <div
                  className={`text-sm sm:text-lg font-bold mb-1 ${
                    isCurrentHour ? "text-blue-700" : "text-gray-800"
                  }`}
                >
                  {formatTemp(hour.temperature)}
                </div>

                <div className="text-xs text-gray-500">💨{hour.windSpeed}</div>

                {hour.precipitation > 0 && (
                  <div className="text-xs text-blue-600">
                    🌧️{hour.precipitation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
