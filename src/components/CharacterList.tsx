import { JSX, ReactElement, useEffect } from 'react';
import Card from '@/components/Card';
import CardSkeleton from '@/components/CardSkeleton';
import Loader from '@/components/Loader.tsx';
import NotFoundMessage from '@/components/NotFoundMessage';
import Pagination from '@/components/Pagination';
import { useCharactersQuery } from '@/hooks/useQueries.ts';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { Character } from '@/types/types.ts';
import { queryClient } from '@/utils/react-query.ts';

export default function CharactersList({ searchTerm, currentPage, onPageChange }: {
  searchTerm: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}): JSX.Element {
  const { data, isLoading, isError, error, isRefetching } = useCharactersQuery(searchTerm, currentPage);
  const { isItemSelected } = useCharacterStore();

  useEffect((): void => {
    if (data) {
      const cachedData = queryClient.getQueryCache().findAll({
        predicate: query => query.queryKey[0] === 'characters'
      });
      console.log('Cached data:', cachedData[0]?.state.data);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error?.message}</div>;

  const characters: Character[] = data?.results || [];
  const totalPages: number = data?.info.pages || 0;
  const showNotFound: boolean = characters.length === 0 && searchTerm !== '';
  const showPagination: boolean = totalPages > 0;

  return (
    <>
      <div className="grid grid-cols-1 overflow-hidden p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-fadeIn justify-center">
        {isRefetching ? (
          <CardSkeleton count={characters.length} />
        ) : (
          <>
            {characters.map((character: Character): ReactElement => (
              <Card
                key={character.id}
                character={character}
                isSelected={isItemSelected(character.id)}
              />
            ))}
            <NotFoundMessage searchTerm={searchTerm} show={showNotFound} />
          </>
        )}
      </div>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
