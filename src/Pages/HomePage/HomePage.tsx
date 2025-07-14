import { Component, ReactElement } from 'react';
import Card from '@/components/Card/Card';
import ErrorButton from '@/components/ErrorButton/ErrorButton';
import Header from '@/components/Header/Header';
import Loader from '@/components/Loader/Loader';
import NotFoundMessage from '@/components/NotFoundMessage/NotFoundMessage';
import Pagination from '@/components/Pagination/Pagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import type { Character, PageState, LoadingVoid, PageVoid, SearchVoid, EmptyVoid } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api';

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
      const data = await fetchCharacters(searchTerm, page);
      setTimeout(() => {
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

    const showNotFound: boolean = this.state.characters.length === 0 && this.state.searchTerm !== '';
    const showPagination: boolean = this.state.totalPages > 0;
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
            <>
              <div className="grid gap-4 mt-8 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4 animate-fadeIn justify-center">
                {this.state.characters.map((character: Character): ReactElement => (
                  <Card
                    key={character.id}
                    character={character}
                  />
                ))}
                <NotFoundMessage
                  searchTerm={this.state.searchTerm}
                  show={showNotFound}
                />
              </div>
              {showPagination && (
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPages={this.state.totalPages}
                  onPageChange={this.handlePageChange}
                />
              )}
            </>
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
