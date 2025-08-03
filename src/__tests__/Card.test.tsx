import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { mockCharacter } from '@/__tests__/__mocks__/mockData.ts';
import Card from '@/components/Card';
import { useTheme } from '@/context/ThemeContext.tsx';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { Character, CharacterStatus, Theme } from '@/types/types.ts';
import { ThemeContextType } from '@/types/types.ts';

vi.mock('@/context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

vi.mock('@/store/useCharacterStore', () => ({
  useCharacterStore: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe('Card Component', (): void => {
  const mockUseTheme: Mock = vi.mocked(useTheme);
  const mockUseCharacterStore: Mock = vi.mocked(useCharacterStore);
  const mockNavigate: Mock = vi.fn();
  const mockToggleItem: Mock = vi.fn();

  const renderCard = (character: Character = mockCharacter, theme: Theme = 'light') => {
    mockUseTheme.mockReturnValue({
      theme,
      toggleTheme: vi.fn(),
    } as ThemeContextType);

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    return render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    );
  };

  beforeEach((): void => {
    vi.clearAllMocks();
    mockUseCharacterStore.mockReturnValue({
      toggleItem: mockToggleItem,
      isItemSelected: vi.fn().mockReturnValue(false),
    });
  });

  it('renders all character information correctly', (): void  => {
    renderCard();

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('applies correct status color classes', (): void  => {
    const testCases = [
      { status: CharacterStatus.Alive, expectedClass: 'text-emerald-300' },
      { status: CharacterStatus.Dead, expectedClass: 'text-rose-300' },
      { status: CharacterStatus.Unknown, expectedClass: 'text-sky-300' },
    ];

    testCases.forEach(({ status, expectedClass }): void  => {
      renderCard({ ...mockCharacter, status });
      expect(screen.getByText(status)).toHaveClass(expectedClass);
    });
  });

  it('handles card click correctly', (): void  => {
    renderCard();
    fireEvent.click(screen.getByTestId('character-card'));
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('details='));
  });

  it('handles checkbox change and stops propagation', async (): Promise<void> => {
    const mockToggleItem: Mock = vi.fn();
    mockUseCharacterStore.mockReturnValue({
      toggleItem: mockToggleItem,
      isItemSelected: vi.fn().mockReturnValue(false),
    });

    renderCard();

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    const mockStopPropagation: Mock = vi.fn();

    await act(async (): Promise<void> => {
      fireEvent(
        checkbox,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      const event = new Event('click', { bubbles: true });
      Object.assign(event, { stopPropagation: mockStopPropagation });
      checkbox.dispatchEvent(event);
    });

    expect(mockToggleItem).toHaveBeenCalledWith(mockCharacter.id);
    expect(mockStopPropagation).toHaveBeenCalled();
  });

  it('shows checked checkbox when item selected', (): void  => {
    mockUseCharacterStore.mockReturnValue({
      toggleItem: mockToggleItem,
      isItemSelected: vi.fn().mockImplementation(
        (id: number): boolean => id === mockCharacter.id
      ),
    });

    renderCard();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  describe('Theme-specific styles', (): void  => {
    it('applies dark theme', (): void  => {
      renderCard(mockCharacter, 'dark');

      const card: HTMLElement = screen.getByTestId('character-card');
      expect(card).toHaveClass('border-gray-50');

      const nameElement: HTMLElement = screen.getByText(mockCharacter.name);
      expect(nameElement).toHaveClass('text-white');
    });

    it('applies light theme', (): void  => {
      renderCard(mockCharacter, 'light');

      const card: HTMLElement = screen.getByTestId('character-card');
      expect(card).toHaveClass('border-slate-400');

      const nameElement: HTMLElement = screen.getByText(mockCharacter.name);
      expect(nameElement).toHaveClass('text-black');
    });
  });
});
