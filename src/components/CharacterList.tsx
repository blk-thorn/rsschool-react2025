import { ReactElement, ReactNode } from 'react';
import Card from '@/components/Card';
import NotFoundMessage from '@/components/NotFoundMessage';
import Pagination from '@/components/Pagination';
import { Character, CharactersListProps } from '@/types/types.ts';

export default function CharactersList({characters, searchTerm, totalPages, currentPage, onPageChange}: CharactersListProps): ReactNode {

    const showNotFound: boolean= characters.length === 0 && searchTerm !== '';
    const showPagination: boolean= totalPages > 0;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 animate-fadeIn justify-center">
          {characters.map((character: Character): ReactElement  => (
            <Card key={character.id} character={character} />
          ))}
          <NotFoundMessage searchTerm={searchTerm} show={showNotFound} />
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
