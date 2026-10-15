import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search currency code (e.g., EUR, GBP)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-blue-700 font-bold"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-2.5 text-sm text-gray-400 hover:text-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;