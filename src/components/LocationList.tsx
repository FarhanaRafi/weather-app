import type { LocationResult } from "../services/geocodingService";

interface LocationListProps {
  locations: LocationResult[];
  onLocationSelect: (location: LocationResult) => void;
  loading: boolean;
}

export default function LocationList({
  locations,
  onLocationSelect,
  loading,
}: LocationListProps) {
  if (locations.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Suchergebnisse
      </h3>
      <div className="space-y-2">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => onLocationSelect(location)}
            disabled={loading}
            className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50 transition-colors group"
          >
            <div className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {location.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              📍 {location.country}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
