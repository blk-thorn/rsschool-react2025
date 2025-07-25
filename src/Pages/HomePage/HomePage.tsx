import { useState, useEffect, ReactNode } from 'react';
import CharactersList from '@/components/CharacterList';
import ErrorButton from '@/components/ErrorButton.tsx';
import Header from '@/components/Header.tsx';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import { ApiResponse, EmptyVoid, LoadingVoid, PageVoid, SearchVoid } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

export default function HomePage(): ReactNode {
  const [characters, setCharacters] = useState<ApiResponse['results']>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const loadPage: LoadingVoid = async (page: number, searchTerm: string = ''): Promise<void> => {
    setIsLoading(true);
    try {
      const data: ApiResponse = await fetchCharacters(searchTerm, page);
      setTimeout((): void => {
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 0);
        setCurrentPage(page);
        setSearchTerm(searchTerm);
        setIsLoading(false);
      }, 200);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
      setTotalPages(0);
      setIsLoading(false);
    }
  };

  useEffect((): void => {
    const savedSearchTerm: string = localStorage.getItem('searchTerm-the-rick-morty-api') || '';
    setSearchTerm(savedSearchTerm);
    loadPage(1, savedSearchTerm);
  }, []);

  const handleSearch: SearchVoid = (term: string): void => {
    localStorage.setItem('searchTerm-the-rick-morty-api', term);
    setSearchTerm(term);
    loadPage(1, term);
  };

  const handlePageChange: PageVoid = (page: number): void => {
    loadPage(page, searchTerm);
  };

  const handleErrorClick: EmptyVoid = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Something went wrong. Please reload the page.');
  }

  return (
    <>
      <Header />
      <main>
        <SearchBar
          onFormSubmit={handleSearch}
          initialSearchTerm={searchTerm}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <CharactersList
            characters={characters}
            searchTerm={searchTerm}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      {!isLoading && (
        <footer>
          <ErrorButton onErrorClick={handleErrorClick} />
        </footer>
      )}
    </>
  );
}
