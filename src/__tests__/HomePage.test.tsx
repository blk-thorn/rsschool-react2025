import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import HomePage from '../pages/HomePage.tsx';
import { mockCharacter } from '@/__tests__/__mocks__/mockData.ts';
import { ApiResponse } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

type ConsoleSpy = {
  mockImplementation: (fn: () => void) => void;
  mockRestore: () => void;
};

vi.mock('@/utils/api');

describe('Check HomePage and local storage', (): void => {
  beforeEach((): void => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [ mockCharacter ],
    });
  });

  it('check loading characters on mount', async (): Promise<void> => {
    render(<HomePage />);
    await waitFor((): void => {
      expect(fetchCharacters).toHaveBeenCalled();
    });
  });

  it('check loading state', (): void => {
    vi.mocked(fetchCharacters).mockImplementation((): Promise<ApiResponse> =>
      new Promise((): void => {})
    );
    render(<HomePage />);
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
  });

  it('check error state', async (): Promise<void> => {
    const consoleSpy: ConsoleSpy = vi.spyOn(console, 'error').mockImplementation((): void => {});
    vi.mocked(fetchCharacters).mockRejectedValue(new Error('API Error'));

    render(<HomePage />);
    await waitFor((): void => {
      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('display footer', async (): Promise<void> => {
    render(<HomePage />);
    await waitFor((): void => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  it('check search functionality', async (): Promise<void> => {
    render(<HomePage />);

    const searchInput: HTMLElement = screen.getByPlaceholderText('Search a character...');
    const searchButton: HTMLElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor((): void => {
      expect(fetchCharacters).toHaveBeenCalledWith('Rick', 1);
      expect(localStorage.getItem('searchTerm-the-rick-morty-api')).toBe('Rick');
    });
  });

  it('throw error when ErrorButton is clicked', async (): Promise<void> => {
    render(<HomePage />);

    const errorButton: HTMLElement = await screen.findByRole('button', { name: /Error Button/i });

    expect(errorButton).toBeInTheDocument();
    expect((): boolean => fireEvent.click(errorButton)).toThrow('Something went wrong. Please reload the page.');
  });
});
