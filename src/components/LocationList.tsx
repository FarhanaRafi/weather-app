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
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="mr-2">📍</span>
            Suchergebnisse
          </h3>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => onLocationSelect(location)}
              disabled={loading}
              className="w-full text-left p-6 hover:bg-blue-50 transition-all duration-200 border-b border-gray-50 last:border-b-0 disabled:opacity-50 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 text-lg">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center">
                    <span className="mr-1">🌍</span>
                    {location.country}
                  </div>
                </div>

                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
