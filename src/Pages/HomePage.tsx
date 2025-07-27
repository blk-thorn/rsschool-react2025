import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams, useNavigate, NavigateFunction, useLoaderData } from 'react-router-dom';
import CharacterDetails from '@/components/CharacterDetails.tsx';
import CharactersList from '@/components/CharacterList.tsx';
import Loader from '@/components/Loader.tsx';
import NotFoundMessage from '@/components/NotFoundMessage.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ApiResponse, HomePageProps, LoadingVoid, PageVoid, SearchVoid } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

export default function HomePage({ onLoadingChange }: HomePageProps): ReactNode {
  const [characters, setCharacters] = useState<ApiResponse['results']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();

  const loaderData = useLoaderData() as { searchTerm: string; page: number };
  const [searchValue, setSearchValue] = useLocalStorage('', loaderData.searchTerm);
  const currentPage: number = loaderData.page;
  const detailsId: string | null = searchParams.get('details');

  const loadPage: LoadingVoid = async (page: number, term: string = ''): Promise<void> => {
    setIsLoading(true);
    setNotFound(false);
    onLoadingChange?.(true);

    try {
      const data: ApiResponse = await fetchCharacters(term, page);

      if (!data.results || data.results.length === 0) {
        setNotFound(true);
        setCharacters([]);
        return;
      }

      setCharacters(data.results);

      const newSearchParams = new URLSearchParams();
      if (term) newSearchParams.set('search', term);
      if (page > 1) newSearchParams.set('page', page.toString());
      if (detailsId) newSearchParams.set('details', detailsId);
      setSearchParams(newSearchParams, { replace: true });

    } catch (error) {
      console.error('Error fetching characters:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  useEffect((): void => {
    loadPage(currentPage, searchValue);
  }, [currentPage, searchValue]);

  const handleSearch: SearchVoid = (term: string): void => {
    setSearchValue(term);
    navigate(`?search=${term}&page=1`);
  };

  const handlePageChange: PageVoid = (page: number): void => {
    navigate(`?search=${searchValue}&page=${page}`);
  };

  return (
    <div className="flex flex-1">
      <div className={`p-2 overflow-y-auto transition-all duration-300 ${detailsId ? 'w-[95%]' : 'w-full'}`}>
        <SearchBar
          onFormSubmit={handleSearch}
          initialSearchTerm={searchValue}
        />

        {isLoading ? (
          <Loader />
        ) : notFound ? (
          <NotFoundMessage
            searchTerm={searchValue}
            show={notFound}
          />
        ) : (
          <CharactersList
            characters={characters}
            searchTerm={searchValue}
            totalPages={characters.length > 0 ? 42 : 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {detailsId && (
        <div className="w-[30%] p-1 overflow-y-auto border-l border-slate-600">
          <CharacterDetails />
        </div>
      )}
    </div>
  );
}
