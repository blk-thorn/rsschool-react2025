import { ReactNode, useEffect, useState } from 'react';
import { ChangeEvent, ChangeFunction, SearchProps, SubmitEvent, SubmitFunction } from '@/types/types.ts';

export default function SearchBar({initialSearchTerm, onFormSubmit}: SearchProps ): ReactNode{

  const [term, setTerm] = useState(initialSearchTerm);

  useEffect((): void => {
    setTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange: ChangeFunction = (e: ChangeEvent): void => {
    setTerm(e.target.value);
  }

  const handleFormSubmit: SubmitFunction = (e:SubmitEvent): void => {
    e.preventDefault();
    onFormSubmit(term);
  }

    return (
      <form onSubmit={handleFormSubmit} className="flex items-center max-w-lg mx-auto mb-10">
        <label htmlFor="search-bar" className="sr-only">Search</label>
        <div className="relative w-full">
          <input type="search" id="search-bar"
                 value={term}
                 onChange={handleInputChange}
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full ps-5 p-2.5"
                 placeholder="Search a character..."/>
        </div>
        <button type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-1 focus:outline-none focus:ring-sky-600 cursor-pointer">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          Search
        </button>
      </form>
    )
};
