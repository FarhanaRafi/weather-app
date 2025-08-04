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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        24-Stunden Vorhersage
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ minWidth: "max-content" }}>
          {weather.hourly.map((hour, index) => {
            const isCurrentHour = index === 0;

            return (
              <div
                key={index}
                className={`flex-shrink-0 text-center p-3 rounded-lg min-w-[80px] ${
                  isCurrentHour ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isCurrentHour ? "text-blue-700" : "text-gray-600"
                }`}>
                  {isCurrentHour ? "Jetzt" : formatHour(hour.time)}
                </div>

                <div className="text-2xl mb-2">
                  {getWeatherIcon(hour.weatherCode)}
                </div>

                <div className={`text-lg font-bold mb-1 ${
                  isCurrentHour ? "text-blue-700" : "text-gray-800"
                }`}>
                  {formatTemp(hour.temperature)}
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  💨 {hour.windSpeed} km/h
                </div>

                {hour.precipitation > 0 && (
                  <div className="text-xs text-blue-600">
                    🌧️ {hour.precipitation}mm
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