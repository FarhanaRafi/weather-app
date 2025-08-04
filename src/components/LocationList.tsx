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
  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-white/20">
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
            Standorte gefunden:
          </h3>
          <div className="space-y-1 sm:space-y-2 max-h-48 sm:max-h-80 overflow-y-auto">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => onLocationSelect(location)}
                disabled={loading}
                className="w-full text-left p-2 sm:p-4 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-blue-200"
              >
                <div className="font-medium text-gray-800 text-sm sm:text-base">
                  {location.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  {location.country} • {location.admin1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
