import type { WeatherData } from "../services/weatherService";
import {
  getWeatherIcon,
  getWindDirection,
  formatTemp,
} from "../utils/weatherUtils";

interface WeeklyForecastProps {
  weather: WeatherData;
}

export default function WeeklyForecast({ weather }: WeeklyForecastProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100 mx-2 sm:mx-0">
      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6">
        7-Tage Vorhersage
      </h3>

      <div className="space-y-2 sm:space-y-3">
        {weather.daily.map((day, index) => {
          const isToday = index === 0;

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-lg transition-colors hover:bg-gray-50 ${
                isToday ? "bg-blue-50 border border-blue-200" : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <div className="text-xl sm:text-3xl">
                  {getWeatherIcon(day.weatherCode)}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold text-sm sm:text-base ${
                      isToday ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {isToday ? "Heute" : formatDate(day.date)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {formatTemp(day.minTemp)} - {formatTemp(day.maxTemp)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                  <span>💨</span>
                  <span className="hidden xs:inline">{day.windSpeed}</span>
                  <span className="hidden sm:inline">km/h</span>
                </div>

                <div className="w-8 sm:w-16 md:w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(20, (day.maxTemp + 10) * 2)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
