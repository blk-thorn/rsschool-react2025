import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { mockCharacters } from '@/__tests__/__mocks__/mockData.ts';
import { Character } from '@/types/types.ts';

vi.mock('@/components/Card', () => ({
  default: vi.fn(({ character }: { character: Character }): ReactElement => (
    <div data-testid="character-card">
      {character.name} - {character.status}
    </div>
  )),
}));

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

const mockUseCharactersQuery: Mock = vi.fn();
vi.mock('@/hooks/useQueries.ts', () => ({
  useCharactersQuery: mockUseCharactersQuery,
}));

describe('Check character list', (): void => {
  const mockPageChange: Mock = vi.fn();

  beforeEach((): void => {
    vi.clearAllMocks();
    mockUseCharactersQuery.mockReturnValue({
      data: { results: [], info: { pages: 0 } },
      isLoading: false,
      isError: false,
    });
  });

  it('renders correct number of cards', async (): Promise<void> => {
    const CharactersList = (await import('@/components/CharacterList')).default;

    mockUseCharactersQuery.mockReturnValue({
      data: { results: mockCharacters, info: { pages: 3 } },
      isLoading: false,
      isError: false,
    });

    render(
      <CharactersList
        searchTerm=""
        currentPage={1}
        onPageChange={mockPageChange}
      />
    );

    const cards: HTMLElement[] = screen.getAllByTestId('character-card');
    expect(cards).toHaveLength(mockCharacters.length);
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('shows not found message correctly', async (): Promise<void> => {
    const CharactersList = (await import('@/components/CharacterList')).default;

    render(
      <CharactersList
        searchTerm="test"
        currentPage={1}
        onPageChange={mockPageChange}
      />
    );

    expect(screen.getByText(/No characters found for "test"/)).toBeInTheDocument();
    expect(screen.queryByTestId('character-card')).toBeNull();
    expect(screen.queryByText('Page')).toBeNull();
  });
});
