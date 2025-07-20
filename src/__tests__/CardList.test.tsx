import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { mockCharacters } from '@/__tests__/__mocks__/mockData.ts';
import CharactersList from '@/components/CharacterList'

describe('CharactersList', (): void => {
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

    const cards: HTMLElement[] = screen.getAllByText(/Status:/);
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
    expect(screen.queryByText(/Status:/)).not.toBeInTheDocument();
    expect(screen.queryByText('Page')).not.toBeInTheDocument();
  });
});
