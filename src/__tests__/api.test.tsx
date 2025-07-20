import { describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { mockResponseSuccess, mockResponseError } from '@/__tests__/__mocks__/mockData.ts';
import { ApiPromise, ApiResponse } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

describe('Fetch characters', (): void => {
  const mockFetch = vi.fn() as Mock;

  beforeEach((): void => {
    global.fetch = mockFetch;
  })

  afterEach((): void => {
     vi.resetAllMocks();
  })

  it('fetch all character with specific search term', async (): Promise<void> => {

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async (): ApiPromise => mockResponseSuccess,
    });

    const result: ApiResponse = await fetchCharacters('Rick');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick'
    );

    expect(result).toEqual(mockResponseSuccess);
  });

  it('fetch all character with page number', async (): Promise<void> => {

   mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async (): ApiPromise => mockResponseSuccess,
    })

    const result: ApiResponse = await fetchCharacters('', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=2'
    );
    expect(result).toEqual(mockResponseSuccess);
  });

  it('fetch error 404', async (): Promise<void> => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result: ApiResponse = await fetchCharacters('nonexistent');

    expect(result).toEqual(mockResponseError);
  });

  it('throw error for different error status', async (): Promise<void> => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchCharacters('test'))
      .rejects
      .toThrow('Error! status: 500');
  });
})
