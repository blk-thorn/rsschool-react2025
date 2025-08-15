'use client';

import { JSX, ReactElement, useEffect } from 'react';
import Card from '@/components/Card';
import CardSkeleton from '@/components/CardSkeleton';
import Loader from '@/components/Loader';
import NotFoundMessage from '@/components/NotFoundMessage';
import Pagination from '@/components/Pagination';
import { useCharactersQuery } from '@/hooks/useQueries';
import { useCharacterStore } from '@/store/useCharacterStore';
import { Character } from '@/types/types';

interface CharactersListProps {
  searchTerm: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function CharactersList({ searchTerm, currentPage, onPageChange }: CharactersListProps): JSX.Element {
  const componentKey = `${searchTerm}-${currentPage}`;

  const { data, isLoading, isError, error, isRefetching } =
    useCharactersQuery(searchTerm, currentPage);

  const { isItemSelected } = useCharacterStore();

  useEffect(() => {
    if (data?.info.pages && currentPage > data.info.pages) {
      onPageChange(1);
    }
  }, [data, currentPage, onPageChange]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error?.message}</div>;

  const characters: Character[] = data?.results || [];
  const totalPages: number = data?.info.pages || 0;
  const showNotFound: boolean = characters.length === 0 && searchTerm !== '';

  return (
    <div key={componentKey}>
      <div className="grid grid-cols-1 overflow-hidden p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-fadeIn justify-center">
        {isRefetching ? (
          <CardSkeleton count={characters.length} />
        ) : (
          <>
            {characters.map((character: Character): ReactElement => (
              <Card
                key={`${character.id}-${currentPage}`}
                character={character}
                isSelected={isItemSelected(character.id)}
              />
            ))}
            <NotFoundMessage searchTerm={searchTerm} show={showNotFound} />
          </>
        )}
      </div>

      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
