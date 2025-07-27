import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { mockCharacters } from '@/__tests__/__mocks__/mockData.ts';
import CharactersList from '@/components/CharacterList';
import { Character } from '@/types/types.ts';

vi.mock('@/components/Card', () => ({
  default: vi.fn(({ character }: { character: Character }): ReactElement => (
    <div data-testid="character-card">
      {character.name} - {character.status}
    </div>
  )),
}));

describe('Check character list', (): void => {
  const mockPageChange: Mock = vi.fn();

  it('renders correct number of cards', (): void => {
    render(
      <CharactersList
        characters={mockCharacters}
        searchTerm=""
        currentPage={1}
        totalPages={3}
        onPageChange={mockPageChange}
      />
    );

    const cards: HTMLElement[] = screen.getAllByTestId('character-card');
    expect(cards).toHaveLength(mockCharacters.length);

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('shows not found message correctly', (): void => {
    render(
      <CharactersList
        characters={[]}
        searchTerm="test"
        currentPage={1}
        totalPages={0}
        onPageChange={mockPageChange}
      />
    );

    expect(screen.getByText(/No characters found for "test"/)).toBeInTheDocument();
    expect(screen.queryByTestId('character-card')).toBeNull();
    expect(screen.queryByText('Page')).toBeNull();
  });
});
