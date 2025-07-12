import { Component, ReactElement } from 'react';
import Card from '@/Components/Card/Card.tsx';
import type { Character, ApiResponse, PageState, ApiPromise, LoadingVoid, PageVoid, SearchVoid } from '@/types/types.ts';
import SearchBar from '@/Components/SearchBar/SearchBar.tsx';
import NotFoundMessage from '@/Components/NotFoundMessage/NotFoundMessage.tsx';
import Pagination from '@/Components/Pagination/Pagination.tsx';
import Header from '@/Components/Header/Header.tsx';
import ErrorButton from '@/Components/ErrorButton/ErrorButton.tsx';

class CardGrid extends Component<object, PageState> {
  state: PageState = {
    characters: [],
    totalPages: 0,
    searchTerm: '',
    currentPage: 1,
    isSearching: false,
    shouldThrowError: false
  }

  loadPage: LoadingVoid = (page: number, searchTerm: string = ''): void => {
    const url: string = searchTerm
      ? `https://rickandmortyapi.com/api/character/?name=${searchTerm.toLowerCase()}&page=${page}`
      : `https://rickandmortyapi.com/api/character/?page=${page}`;

    fetch(url)
      .then((res: Response): ApiPromise => {
        if (res.status === 404) {
          return Promise.resolve({
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null
            },
            results: []
          });
        }
        return res.json();
      })
      .then((data: ApiResponse): void => {
        this.setState({
          characters: data.results || [],
          totalPages: data.info.pages || 0,
          currentPage: page,
          searchTerm: searchTerm,
          isSearching: Boolean(searchTerm)
        });
      })
  }

  componentDidMount(): void {
    this.loadPage(1, '');
  }

  handleSearch: SearchVoid = (term: string): void => {
    this.loadPage(1, term);
  }

  handlePageChange: PageVoid = (page: number): void => {
    this.loadPage(page, this.state.searchTerm);
  }

  handleErrorClick = (): void => {
    this.setState({ shouldThrowError: true });
  }

  render(): ReactElement {
    if (this.state.shouldThrowError) {
      throw new Error('Something went wrong. Please reload the page.');
    }

    const showNotFound: boolean = this.state.characters.length === 0 && this.state.searchTerm !== '';
    const showPagination: boolean = this.state.totalPages > 0;

    return (
      <>
        <Header />

        <main>
        <SearchBar onFormSubmit={this.handleSearch} />
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
        </main>

        <footer>
          <ErrorButton onErrorClick={this.handleErrorClick} />
        </footer>
      </>
    )
  }
}

export default CardGrid;
