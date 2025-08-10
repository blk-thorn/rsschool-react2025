import { mockResponseError } from '@/__tests__/__mocks__/mockData.ts';
import type { ApiResponse, Character } from '@/types/types.ts';

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


export const fetchCharacter: (id: number | undefined) => Promise<Character> = async (id: number | undefined): Promise<Character> => {
  if (id === undefined) {
    throw new Error('Character ID is required');
  }
  const response: Response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return await response.json() as Character;
};
