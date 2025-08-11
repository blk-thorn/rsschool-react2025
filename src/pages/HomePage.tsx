import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterDetails from '@/components/CharacterDetails.tsx';
import CharactersList from '@/components/CharacterList.tsx';
import DownloadFlyout from '@/components/DownloadFlyout.tsx';
import Loader from '@/components/Loader.tsx';
import NotFoundMessage from '@/components/NotFoundMessage.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import { useTheme } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCharactersQuery } from '@/hooks/useQueries.ts';
import { Character, HomePageProps, PageVoid, SearchVoid } from '@/types/types.ts';

export default function HomePage({ onLoadingChange }: HomePageProps): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  const searchTerm: string = searchParams.get('search') ?? '';
  const page: number = Number(searchParams.get('page')) || 1;
  const detailsId: string | null = searchParams.get('details');

  const [searchValue, setSearchValue] = useLocalStorage('', searchTerm);

  const { data, isFetching, error } = useCharactersQuery(searchTerm, page);

  const [notFound, setNotFound] = useState(false);
  const characters: Character[] = data?.results ?? [];

  useEffect((): void => {
    onLoadingChange?.(isFetching);
  }, [isFetching, onLoadingChange]);

  useEffect((): void => {
    if (error || data?.results?.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [error, data]);

  const handleSearch: SearchVoid = (term: string): void => {
    setSearchValue(term);
    setSearchParams({ search: term, page: '1' });
  };

  const handlePageChange: PageVoid = (newPage: number): void => {
    setSearchParams((prev: URLSearchParams): URLSearchParams => {
      const updated = new URLSearchParams(prev);
      updated.set('page', newPage.toString());
      if (searchValue) updated.set('search', searchValue);
      return updated;
    });
  };

  return (
    <div data-testid="home-page" className={`flex flex-1 relative pb-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-20 text-black'}`}>
      <div className={`p-2 overflow-y-auto transition-all duration-300 ${detailsId ? 'w-[95%]' : 'w-full'}`}>
        <SearchBar
          onFormSubmit={handleSearch}
          initialSearchTerm={searchValue}
        />

        {isFetching ? (
          <Loader />
        ) : notFound ? (
          <NotFoundMessage
            searchTerm={searchValue}
            show={notFound}
          />
        ) : (
          <CharactersList
            searchTerm={searchValue}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {detailsId && (
        <div className={`w-[30%] p-1 overflow-y-auto border-l ${theme === 'dark' ? 'border-gray-600' : 'border-slate-600'}`}>
          <CharacterDetails />
        </div>
      )}

      <DownloadFlyout characters={characters} />
    </div>
  );
}
