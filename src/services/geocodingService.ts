import { httpClient } from "./httpClient";

export interface LocationResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface GeocodingApiResult {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface GeocodingResponse {
  results?: GeocodingApiResult[];
}

const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchLocations(
  query: string
): Promise<LocationResult[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "de",
    format: "json",
  });

  try {
    const data = await httpClient.get<GeocodingResponse>(
      `${GEOCODING_BASE_URL}?${params}`
    );

    if (!data.results) {
      console.log("No results from geocoding API");
      return [];
    }

    const locations = data.results.map((result) => ({
      name: result.name,
      country: result.country || "Unknown",
      latitude: result.latitude,
      longitude: result.longitude,
      admin1: result.admin1,
    }));

    console.log(`Found ${locations.length} locations for "${query}"`);
    return locations;
  } catch (error) {
    console.error("Geocoding search failed:", error);
    throw new Error("Location search failed. Please try again.");
  }
}
