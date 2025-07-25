import { mockResponseError } from '@/__tests__/__mocks__/mockData.ts';
import type { ApiResponse } from '@/types/types.ts';

export const fetchCharacters = async (
  searchTerm: string = '',
  page: number = 1
): Promise<ApiResponse> => {
  const url: string = searchTerm
    ? `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
    : `https://rickandmortyapi.com/api/character/?page=${page}`;

  const response: Response  = await fetch(url);

  if (response.status === 404) {
    return mockResponseError
  }

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return await response.json() as ApiResponse;
};
