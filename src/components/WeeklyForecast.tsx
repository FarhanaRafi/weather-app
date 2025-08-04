import type { WeatherData } from "../services/weatherService";
import { getWeatherIcon, formatTemp } from "../utils/weatherUtils";

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
    <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-6 shadow-sm border border-gray-100 mx-1 md:mx-0">
      <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-6">
        7-Tage Vorhersage
      </h3>

      <div className="space-y-1 md:space-y-3">
        {weather.daily.map((day, index) => {
          const isToday = index === 0;

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-2 md:p-4 rounded-md md:rounded-lg transition-colors hover:bg-gray-50 ${
                isToday ? "bg-blue-50 border border-blue-200" : ""
              }`}
            >
              <div className="flex items-center gap-2 md:gap-4 flex-1">
                <div className="text-lg md:text-3xl">
                  {getWeatherIcon(day.weatherCode)}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold text-xs md:text-base ${
                      isToday ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {isToday ? "Heute" : formatDate(day.date)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {formatTemp(day.minTemp)} - {formatTemp(day.maxTemp)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 md:gap-4">
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                  <span>💨</span>
                  <span>{day.windSpeed}</span>
                  <span className="hidden md:inline">km/h</span>
                </div>

                <div className="w-6 md:w-16 lg:w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
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
