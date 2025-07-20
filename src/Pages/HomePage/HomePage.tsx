import { Component, ReactElement } from 'react';
import CharactersList from '@/components/CharacterList';
import ErrorButton from '@/components/ErrorButton.tsx';
import Header from '@/components/Header.tsx';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import type { PageState, LoadingVoid, PageVoid, SearchVoid, EmptyVoid, ApiResponse } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

class HomePage extends Component<object, PageState> {
  state: PageState = {
    characters: [],
    totalPages: 0,
    searchTerm: '',
    currentPage: 1,
    isSearching: false,
    isLoading: true,
    shouldThrowError: false
  }

  loadPage: LoadingVoid = async (page: number, searchTerm: string = '') => {
    this.setState({ isLoading: true });
    try {
      const data: ApiResponse = await fetchCharacters(searchTerm, page);
      setTimeout((): void => {
        this.setState({
          characters: data.results || [],
          totalPages: data.info.pages || 0,
          currentPage: page,
          searchTerm: searchTerm,
          isSearching: Boolean(searchTerm),
          isLoading: false,
        });
      }, 200);
    } catch (error) {
      console.error('Error fetching characters:', error);
      this.setState({
        isLoading: false,
        characters: [],
        totalPages: 0,
      });
    }
  };

  componentDidMount(): void {
    const savedSearchTerm: string = localStorage.getItem('searchTerm-the-rick-morty-api') || '';
    this.setState({ searchTerm: savedSearchTerm }, ():void => {
      this.loadPage(1, savedSearchTerm);
    });
  }

  handleSearch: SearchVoid = (term: string): void => {
    localStorage.setItem('searchTerm-the-rick-morty-api', term);
    this.setState({ searchTerm: term });
    this.loadPage(1, term);
  }

  handlePageChange: PageVoid = (page: number): void => {
    this.loadPage(page, this.state.searchTerm);
  }

  handleErrorClick: EmptyVoid = (): void => {
    this.setState({ shouldThrowError: true });
  }

  render(): ReactElement {
    if (this.state.shouldThrowError) {
      throw new Error('Something went wrong. Please reload the page.');
    }

    const isLoading: boolean = this.state.isLoading

    return (
      <>
        <Header />
        <main>
          <SearchBar
            onFormSubmit={this.handleSearch}
            initialSearchTerm={this.state.searchTerm}
          />
          {isLoading ? ( <Loader /> ) : (
            <CharactersList
              characters={this.state.characters}
              searchTerm={this.state.searchTerm}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          )}
        </main>
        {!isLoading && (
        <footer>
          <ErrorButton onErrorClick={this.handleErrorClick} />
        </footer>
        )}
      </>
    )
  }
}

export default HomePage;
