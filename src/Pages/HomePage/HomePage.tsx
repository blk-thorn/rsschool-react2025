import { useState, useEffect, ReactNode } from 'react';
import CharactersList from '@/components/CharacterList';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import { ApiResponse, LoadingVoid, PageVoid, SearchVoid } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

interface HomePageProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function HomePage({ onLoadingChange }: HomePageProps): ReactNode {
  const [characters, setCharacters] = useState<ApiResponse['results']>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPage: LoadingVoid = async (page: number, searchTerm: string = ''): Promise<void> => {
    setIsLoading(true);
    onLoadingChange?.(true);

    try {
      const data: ApiResponse = await fetchCharacters(searchTerm, page);
      setTimeout((): void => {
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 0);
        setCurrentPage(page);
        setSearchTerm(searchTerm);
        setIsLoading(false);
        onLoadingChange?.(false);
      }, 200);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
      setTotalPages(0);
      setIsLoading(false);
      onLoadingChange?.(false);
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

  return (
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
  );
}
