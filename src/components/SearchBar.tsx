import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Stadt eingeben..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
        >
          {loading ? "🔍..." : "Suchen"}
        </button>
      </div>
    </div>
  );
}
