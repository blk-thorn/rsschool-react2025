import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SearchBar from '@/components/SearchBar';
import { searchBarRender } from '@/types/test.types.ts';

const queryClient = new QueryClient();

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('@/components/RefreshButton', () => ({
  default: () => <div data-testid="refresh-button">Refresh Button</div>,
}));

describe('SearchBar Component', (): void => {
  const initialTerm = 'Rick';
  let mockSubmit: Mock;

  const renderSearchBar: searchBarRender = (term = '', mockFn?: Mock): RenderResult => {
    return render(
      <QueryClientProvider client={queryClient}>
        <SearchBar
          initialSearchTerm={term}
          onFormSubmit={mockFn || mockSubmit}
        />
      </QueryClientProvider>
    );
  };

  const getSearchInput: () => HTMLInputElement = (): HTMLInputElement =>
    screen.getByPlaceholderText('Search a character...');

  beforeEach((): void => {
    mockSubmit = vi.fn();
    localStorage.clear();
  });

  it('render with initial search term', (): void => {
    renderSearchBar(initialTerm);
    expect(getSearchInput().value).toBe(initialTerm);
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  });

  it('update when search term changes', (): void => {
    const { rerender } = renderSearchBar('');
    expect(getSearchInput().value).toBe('');

    rerender(
      <QueryClientProvider client={queryClient}>
        <SearchBar
          initialSearchTerm={initialTerm}
          onFormSubmit={mockSubmit}
        />
      </QueryClientProvider>
    );
    expect(getSearchInput().value).toBe(initialTerm);
  });

  it('should update input value when typing', (): void => {
    renderSearchBar();
    const input: HTMLInputElement = getSearchInput();
    const testValue = 'Morty';

    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toBe(testValue);

    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
  });

  it('should call current term when form is submitted', (): void => {
    const testTerm = 'Rick Sanchez';
    renderSearchBar(testTerm, mockSubmit);

    const searchButton: HTMLElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockSubmit).toHaveBeenCalledWith(testTerm);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
})
