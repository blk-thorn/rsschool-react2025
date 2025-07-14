import { Component, ReactElement } from 'react';
import Card from '@/components/Card';
import NotFoundMessage from '@/components/NotFoundMessage';
import Pagination from '@/components/Pagination';
import { CharactersListProps } from '@/types/types.ts';

class CharactersList extends Component<CharactersListProps> {
  render(): ReactElement {
    const { characters, searchTerm, totalPages, currentPage, onPageChange } = this.props;
    const showNotFound= characters.length === 0 && searchTerm !== '';
    const showPagination= totalPages > 0;

    return (
      <>
        <div className="grid gap-4 mt-8 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4 animate-fadeIn justify-center">
          {characters.map((character)  => (
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
}

export default CharactersList;
