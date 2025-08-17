import { mockResponseError } from '@/__tests__/__mocks__/mockData';
import type { ApiResponse, Character } from '@/types/types.ts';

export const fetchCharacters = async (
  searchTerm: string = '',
  page: number = 1
): Promise<ApiResponse> => {
  const url: string = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchTerm}`
  const response: Response  = await fetch(url);
console.log(response)
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


export const getCharactersByIds = async (ids: number[]): Promise<Character[]> => {
  if (ids.length === 0) return [];

  const url = `https://rickandmortyapi.com/api/character/${ids.join(',')}`;
  const response: Response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const data = (await response.json()) as Character | Character[];

  return Array.isArray(data) ? data : [data];
};
