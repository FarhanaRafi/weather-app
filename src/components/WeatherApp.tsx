import { useState } from "react";
import { searchLocations } from "../services/geocodingService";
import { getWeatherData } from "../services/weatherService";
import type { LocationResult } from "../services/geocodingService";
import type { WeatherData } from "../services/weatherService";

import SearchBar from "./SearchBar";
import LocationList from "./LocationList";
import WeatherDetails from "./WeatherDetails";
import Header from "./Header";
import Footer from "./Footer";

function WeatherApp() {
  const [locationSearchResults, setLocationSearchResults] = useState<
    LocationResult[]
  >([]);
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [isCurrentlyLoading, setIsCurrentlyLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // search location
  const handleUserSearch = async (userSearchQuery: string) => {
    console.log("User is searching for:", userSearchQuery);

    setIsCurrentlyLoading(true);
    setLocationSearchResults([]);
    setCurrentWeatherData(null);
    setHasError(false);
    setErrorMessage("");

    try {
      console.log("Calling geo location API.");
      const searchResults = await searchLocations(userSearchQuery);
      console.log("Got location list dropdown:", searchResults);

      if (searchResults && searchResults.length > 0) {
        setLocationSearchResults(searchResults);
        console.log("set location list");
      } else {
        console.log("No results found");
        setHasError(true);
        setErrorMessage("Error loading locations");
      }
    } catch (error) {
      console.error("Error with location search:", error);
      setHasError(true);
      setErrorMessage("Error with location search");
    }

    setIsCurrentlyLoading(false);
    console.log("Search completed");
  };

  const handleUserLocationSelection = async (
    selectedLocation: LocationResult
  ) => {
    console.log("User selected location:", selectedLocation);
    console.log("Location name:", selectedLocation.name);
    console.log("Location latitude:", selectedLocation.latitude);
    console.log("Location longitude:", selectedLocation.longitude);

    setIsCurrentlyLoading(true);
    setHasError(false);
    setErrorMessage("");

    try {
      console.log("Getting weather data for selected location...");
      const weatherDataFromAPI = await getWeatherData(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedLocation.name
      );
      console.log("Got weather data:", weatherDataFromAPI);

      setCurrentWeatherData(weatherDataFromAPI);
      setLocationSearchResults([]); // Clear the search results
      console.log("Successfully loaded weather data");
    } catch (error) {
      console.error("Failed to get weather data:", error);
      setHasError(true);
      setErrorMessage(
        "Wetter konnte nicht geladen werden. Versuchen Sie es erneut."
      );
    }

    setIsCurrentlyLoading(false);
    console.log("Weather loading completed");
  };

  const getBackgroundColorBasedOnWeather = () => {
    console.log("Determining background color...");

    if (!currentWeatherData) {
      console.log("No weather data, using default background");
      return "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900";
    }

    const currentTemperature = currentWeatherData.current.temperature;
    const currentWeatherCode = currentWeatherData.current.weatherCode;

    console.log("temperature now:", currentTemperature);
    console.log("Current weather:", currentWeatherCode);

    if (currentTemperature < 10) {
      console.log("--cold--");
      return "bg-gradient-to-br from-slate-800 via-gray-800 to-blue-900";
    }

    if (currentTemperature > 25) {
      console.log("--hot--");
      return "bg-gradient-to-br from-orange-800 via-red-800 to-pink-900";
    }

    if (currentWeatherCode >= 61 || currentWeatherCode >= 95) {
      console.log("--rainy--");
      return "bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900";
    }

    if (currentWeatherCode <= 1) {
      console.log("--sunny--");
      return "bg-gradient-to-br from-blue-600 via-cyan-700 to-teal-800";
    }

    console.log("--default--");
    return "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900";
  };

  const backgroundColorClass = getBackgroundColorBasedOnWeather();
  console.log("background-class:", backgroundColorClass);

  return (
    <div
      className={`min-h-screen ${backgroundColorClass} relative overflow-hidden transition-all duration-1000 flex flex-col`}
    >
      <div
        className="absolute inset-0 bg-dots opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "15px 15px sm:20px sm:20px",
        }}
      ></div>

      <Header />

      <main className="relative z-10 w-full mx-auto px-1 md:px-4 lg:px-6 xl:px-8 py-2 md:py-6 lg:py-8 flex-grow">
        <div className="text-center mb-3 md:mb-10 lg:mb-12">
          <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 md:mb-4 tracking-tight px-1">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Wetter
            </span>
            <span className="text-white"> App</span>
          </h1>
          <p className="text-xs md:text-xl text-blue-100 max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-1">
            Skifahren dieses Wochenende oder nicht?!
          </p>
        </div>

        <div className="space-y-3 md:space-y-8">
          <SearchBar onSearch={handleUserSearch} loading={isCurrentlyLoading} />

          {hasError && (
            <div className="max-w-2xl mx-auto px-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm sm:text-base">
                {errorMessage}
              </div>
            </div>
          )}

          <div className="transition-all duration-500 ease-in-out">
            {locationSearchResults.length > 0 && (
              <LocationList
                locations={locationSearchResults}
                onLocationSelect={handleUserLocationSelection}
                loading={isCurrentlyLoading}
              />
            )}
          </div>

          <div className="transition-all duration-700 ease-in-out">
            {currentWeatherData && (
              <WeatherDetails weather={currentWeatherData} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WeatherApp;
