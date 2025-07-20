import { render, RenderResult, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SearchBar from '@/components/SearchBar';
import { searchBarRender } from '@/types/test.types.ts';

describe('SearchBar Component', (): void => {
  const initialTerm = 'Rick';
  let mockSubmit: Mock;

  const renderSearchBar: searchBarRender = (term = '', mockFn?: Mock): RenderResult => {
    return render(
      <SearchBar
        initialSearchTerm={term}
        onFormSubmit={mockFn || mockSubmit}
      />
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
  });

  it('update when search term changes', (): void => {
    const { rerender } = renderSearchBar('');
    expect(getSearchInput().value).toBe('');

    rerender(
      <SearchBar
        initialSearchTerm={initialTerm}
        onFormSubmit={mockSubmit}
      />
    );
    expect(getSearchInput().value).toBe(initialTerm);
  });
});
