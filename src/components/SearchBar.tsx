import { Component, ReactNode } from 'react';
import { ChangeEvent, ChangeFunction, SearchProps, SubmitEvent, SubmitFunction } from '@/types/types.ts';

class SearchBar extends Component<SearchProps> {
  state: {term: string} = {
    term: this.props.initialSearchTerm
  };


  componentDidUpdate(prevProps: SearchProps): void {
    if (prevProps.initialSearchTerm !== this.props.initialSearchTerm) {
      this.setState({ term: this.props.initialSearchTerm });
    }
  }

  onInputChange: ChangeFunction = (e: ChangeEvent): void => {
    this.setState({term: e.target.value});
  }

  onFormSubmit: SubmitFunction = (e:SubmitEvent): void => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.term);
  }


  render(): ReactNode {

    return (
      <form onSubmit={this.onFormSubmit} className="flex items-center max-w-lg mx-auto mb-10">
        <label htmlFor="search-bar" className="sr-only">Search</label>
        <div className="relative w-full">
          <input type="search" id="search-bar"
                 value={this.state.term}
                 onChange={this.onInputChange}
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
  }

}

export default SearchBar
