import { Component } from 'react';

class SearchBar extends Component{
  render() {
    return (
      <form className="flex items-center max-w-lg mx-auto mb-10">
        <label htmlFor="search-bar" className="sr-only">Search</label>
        <div className="relative w-full">
          <input type="text" id="search-bar"
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5"
                 placeholder="Search a character..." required />
        </div>
        <button type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          Search
        </button>
      </form>
    )
  }

}

export default SearchBar
