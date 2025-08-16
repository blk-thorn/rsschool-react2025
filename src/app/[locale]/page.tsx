'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, JSX } from 'react';
import CharacterDetails from '@/components/CharacterDetails';
import CharactersList from '@/components/CharacterList';
import DownloadFlyout from '@/components/DownloadFlyout';
import Loader from '@/components/Loader';
import NotFoundMessage from '@/components/NotFoundMessage';
import SearchBar from '@/components/SearchBar';
import { useTheme } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCharactersQuery } from '@/hooks/useQueries';
import { Character } from '@/types/types';

export default function HomePage(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const searchTerm: string = searchParams?.get('search') ?? '';
  const page: number = Number(searchParams?.get('page') ?? '1');
  const detailsId: string = searchParams?.get('details') ?? '';

  const [searchValue, setSearchValue] = useLocalStorage('', searchTerm);
  const { data, isFetching, error } = useCharactersQuery(searchTerm, page);
  const [notFound, setNotFound] = useState(false);

  const characters: Character[] = data?.results ?? [];

  useEffect((): void => {
    if (error || (data && data.results?.length === 0)) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [error, data]);

  const handleSearch: (term: string) => void  = (term: string): void => {
    setSearchValue(term);
    router.push(`/?search=${encodeURIComponent(term)}&page=1`);
  };

  const handlePageChange: (newPage: number) => void = (newPage: number): void => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (searchValue) params.set('search', searchValue);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      data-testid="home-page"
      className={`flex flex-1 relative pb-20 transition-colors ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-20 text-black'
      }`}
    >
      <div
        className={`p-2 overflow-y-auto transition-all ${
          detailsId ? 'w-[70%]' : 'w-full'
        }`}
      >
        <SearchBar onFormSubmit={handleSearch} initialSearchTerm={searchValue} />

        {isFetching ? (
          <Loader />
        ) : notFound ? (
          <NotFoundMessage searchTerm={searchValue} show={notFound} />
        ) : (
          <CharactersList
            searchTerm={searchValue}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {detailsId && (
        <div
          className={`w-[30%] p-1 overflow-y-auto border-l transition-colors duration-300 ${
            theme === 'dark' ? 'border-gray-600' : 'border-slate-600'
          }`}
        >
          <CharacterDetails />
        </div>
      )}

      <DownloadFlyout characters={characters} />
    </div>
  );
}
