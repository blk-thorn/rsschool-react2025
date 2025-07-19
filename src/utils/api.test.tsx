import { describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { fetchCharacters } from '@/utils/api.ts';

import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { ApiResponse } from '@/types/types.ts';

describe('Fetch characters', (): void => {
  const mockFetch = vi.fn() as Mock;

  beforeEach((): void => {
    global.fetch = mockFetch;
  })

  afterEach((): void => {
     vi.resetAllMocks();
  })

  it('fetch all character with specific search term', async (): Promise<void> => {
    const mockResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result: ApiResponse = await fetchCharacters('Rick');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick'
    );

    expect(result).toEqual(mockResponse);
  });

  it('fetch all character with page number', async (): Promise<void> => {
    const mockResponse: ApiResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    };

   mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async (): Promise<ApiResponse> => mockResponse,
    })

    const result: ApiResponse = await fetchCharacters('', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=2'
    );
    expect(result).toEqual(mockResponse);
  });

  it('fetch error 404', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result: ApiResponse = await fetchCharacters('nonexistent');

    expect(result).toEqual({
      info: { count: 0, pages: 0, next: null, prev: null, },
      results: [],
    });
  });

  it('throw error for different error status', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchCharacters('test'))
      .rejects
      .toThrow('Error! status: 500');
  });
})
