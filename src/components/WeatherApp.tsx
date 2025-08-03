import { useState } from "react";
import { searchLocations } from "../services/geocodingService";
import { getWeatherData } from "../services/weatherService";
import type { LocationResult } from "../services/geocodingService";
import type { WeatherData } from "../services/weatherService";

import SearchBar from "./SearchBar";
import LocationList from "./LocationList";
import WeatherDetails from "./WeatherDetails";

export default function WeatherApp() {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setLocations([]);

    try {
      const results = await searchLocations(query);
      setLocations(results);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Suche fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (location: LocationResult) => {
    setLoading(true);
    try {
      const weather = await getWeatherData(
        location.latitude,
        location.longitude,
        location.name
      );
      setWeatherData(weather);
      setLocations([]);
    } catch (error) {
      console.error("Weather fetch failed:", error);
      alert("Wetter konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          🏄‍♂️ Surfer Wetter
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

        <LocationList
          locations={locations}
          onLocationSelect={handleLocationSelect}
          loading={loading}
        />

        {weatherData && <WeatherDetails weather={weatherData} />}
      </div>
    </div>
  );
}
