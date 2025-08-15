import { ReactNode, useEffect, useState } from 'react';
import RefreshButton from './RefreshButton';
import { useTheme } from '@/context/ThemeContext';
import { ChangeEvent, ChangeFunction, SearchProps, SubmitEvent, SubmitFunction } from '@/types/types';

export default function SearchBar({ initialSearchTerm, onFormSubmit }: SearchProps): ReactNode {
  const [term, setTerm] = useState(initialSearchTerm);
  const { theme } = useTheme();

  useEffect((): void => {
    setTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange: ChangeFunction = (e: ChangeEvent): void => {
    setTerm(e.target.value);
  };

  const handleFormSubmit: SubmitFunction = (e: SubmitEvent): void => {
    e.preventDefault();
    onFormSubmit(term);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-10">
      <form onSubmit={handleFormSubmit} className="flex items-center w-full" role="form">
        <label htmlFor="search-bar" className="sr-only">Search</label>
        <div className="relative w-full">
          <input
            type="search"
            id="search-bar"
            value={term}
            onChange={handleInputChange}
            className={`text-sm rounded-lg block w-full ps-5 p-2.5 border ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-50 text-white'
                : 'bg-gray-100 border-gray-300 text-gray-900'
            }`}
            placeholder="Search a character..."
          />
        </div>
        <button
          type="submit"
          className={`inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium rounded-lg cursor-pointer focus:ring-1 focus:outline-none transition-all duration-100 ${
            theme === 'dark'
              ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300'
              : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-600 text-white'
          }`}
        >
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          Search
        </button>
      </form>

      <RefreshButton />
    </div>
  );
}
