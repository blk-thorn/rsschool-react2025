'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation';
import { useState, useEffect, JSX } from 'react';
import CharacterDetails from '@/components/CharacterDetails';
import CharactersList from '@/components/CharacterList';
import Loader from '@/components/Loader';
import NotFoundMessage from '@/components/NotFoundMessage';
import SearchBar from '@/components/SearchBar';
import { useTheme } from '@/context/UseTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCharactersQuery } from '@/hooks/useQueries';
import { useCharacterStore } from '@/store/useCharacterStore';
import { EmptyVoid, PageVoid, SearchVoid } from '@/types/types';

export default function HomeClient(): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const { theme } = useTheme();

  const searchTerm: string = searchParams?.get('search') ?? '';
  const page: number = Number(searchParams?.get('page') ?? '1');
  const detailsId: string = searchParams?.get('details') ?? '';

  const [searchValue, setSearchValue] = useLocalStorage('', searchTerm);
  const { data, isFetching, error } = useCharactersQuery(searchTerm, page);
  const [notFound, setNotFound] = useState(false);

  const hydrateFromCookies: EmptyVoid = useCharacterStore((state): EmptyVoid => state.hydrateFromCookies);
  useEffect((): void => {
    hydrateFromCookies();
  }, [hydrateFromCookies]);

  useEffect((): void => {
    if (error || (data && data.results?.length === 0)) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [error, data]);

  const handleSearch: SearchVoid = (term: string): void => {
    setSearchValue(term);
    router.push(`/?search=${encodeURIComponent(term)}&page=1`);
  };

  const handlePageChange: PageVoid = (newPage: number): void => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (searchValue) params.set('search', searchValue);
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <div
        className={`p-2 overflow-y-auto transition-all ${
          detailsId ? 'w-[90%]' : 'w-full'
        } ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-20 text-black'}`}
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
          <CharacterDetails id={Number(detailsId)} />
        </div>
      )}
    </>
  );
}
