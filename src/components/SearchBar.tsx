import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-24 py-4 border-2 border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 transition-all duration-300 text-lg font-medium"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={onLocationSearch}
              disabled={loading}
              className="mr-2 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Use current location"
            >
              <Navigation className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;