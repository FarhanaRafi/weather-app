import { httpClient } from "./httpClient";

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  daily: DailyForecast[];
}

interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  time: string;
}

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
}

interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
}

const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData(
  lat: number,
  lon: number,
  locationName: string
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,wind_speed_10m,wind_direction_10m,weather_code",
    daily:
      "temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,wind_direction_10m_dominant",
    timezone: "Europe/Berlin",
    forecast_days: "7",
  });

  try {
    const data = await httpClient.get<WeatherApiResponse>(
      `${WEATHER_BASE_URL}?${params}`
    );

    return {
      location: locationName,
      current: {
        temperature: Math.round(data.current.temperature_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: Math.round(data.current.wind_direction_10m),
        weatherCode: data.current.weather_code,
        time: data.current.time,
      },
      daily: data.daily.time.map((date, index) => ({
        date,
        maxTemp: Math.round(data.daily.temperature_2m_max[index]),
        minTemp: Math.round(data.daily.temperature_2m_min[index]),
        weatherCode: data.daily.weather_code[index],
        windSpeed: Math.round(data.daily.wind_speed_10m_max[index]),
        windDirection: Math.round(
          data.daily.wind_direction_10m_dominant[index]
        ),
      })),
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    throw new Error("Could not load weather data. Please try again.");
  }
}
