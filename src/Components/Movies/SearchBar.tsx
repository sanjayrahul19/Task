import React from "react";
import { genres } from "../../Data/index.ts";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string;
  handleGenreChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  handleGenreChange,
}) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
      <div className="flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genre Filter */}
      <div className="flex-shrink-0">
        <label htmlFor="genre" className="text-sm font-medium text-gray-700">
          Filter by Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="mt-2 p-2 rounded-lg border border-gray-300"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
