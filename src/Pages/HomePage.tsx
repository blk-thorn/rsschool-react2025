import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes.ts';
import CharactersList from '@/components/CharacterList.tsx';
import Loader from '@/components/Loader.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import { ApiResponse, HomePageProps, LoadingVoid, PageVoid, SearchVoid } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

export default function HomePage({ onLoadingChange }: HomePageProps): ReactNode {
  const [characters, setCharacters] = useState<ApiResponse['results']>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();

  const currentPage: number = Number(searchParams.get('page')) || 1;
  const searchTerm: string = searchParams.get('search') || '';

  const loadPage: LoadingVoid = async (page: number, term: string = ''): Promise<void> => {
    setIsLoading(true);
    onLoadingChange?.(true);

    try {
      const data: ApiResponse = await fetchCharacters(term, page);

      if (!data.results || data.results.length === 0) {
        navigate(ROUTES.NOT_FOUND, { replace: true });
        return;
      }

      setCharacters(data.results);
      setTotalPages(data.info?.pages || 0);

      const newSearchParams = new URLSearchParams();
      if (term) newSearchParams.set('search', term);
      if (page > 1) newSearchParams.set('page', page.toString());
      setSearchParams(newSearchParams, { replace: true });

    } catch (error) {
      console.error('Error fetching characters:', error);
      navigate(ROUTES.NOT_FOUND, { replace: true });
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  useEffect((): void => {
    const savedSearchTerm: string = localStorage.getItem('searchTerm-the-rick-morty-api') || '';
    const initialSearchTerm: string = searchParams.get('search') || savedSearchTerm;

    if (initialSearchTerm && !searchParams.has('search')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', initialSearchTerm);
      setSearchParams(newSearchParams, { replace: true });
    } else {
      loadPage(currentPage, initialSearchTerm);
    }
  }, []);

  const handleSearch: SearchVoid = (term: string): void => {
    localStorage.setItem('searchTerm-the-rick-morty-api', term);
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
