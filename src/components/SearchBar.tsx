import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [userInputText, setUserInputText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFormSubmission = () => {
    console.log("User wants to submit form");
    console.log("Current input text:", userInputText);

    if (!userInputText.trim()) {
      console.log("Input is empty, not submitting");
      alert("Bitte geben Sie einen Ort ein!");
      return;
    }

    console.log("Submitting search with text:", userInputText);
    onSearch(userInputText);
  };

  const handleInputTextChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputValue = changeEvent.target.value;
    console.log("Input text change:", newInputValue);
    setUserInputText(newInputValue);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    console.log("Input field lost focus");
    setIsInputFocused(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmission();
    }
  };

  const isSearchButtonDisabled = loading || !userInputText.trim();
  console.log("Search button disabled:", isSearchButtonDisabled);

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      <div
        className={`relative bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 ${
          isInputFocused ? "shadow-blue-500/25 scale-105" : "shadow-black/20"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-2 gap-2 sm:gap-0">
          <div className="flex-1 relative">
            <input
              type="text"
              value={userInputText}
              onChange={handleInputTextChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder="Stadt eingeben..."
              className="w-full pl-3 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-lg bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleFormSubmission}
            disabled={isSearchButtonDisabled}
            className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 transform text-sm sm:text-base ${
              isSearchButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Suchen...</span>
              </div>
            ) : (
              "Suchen"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
