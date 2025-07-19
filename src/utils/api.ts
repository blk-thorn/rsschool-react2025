import type { ApiResponse } from '@/types/types';

export const fetchCharacters = async (
  searchTerm: string = '',
  page: number = 1
): Promise<ApiResponse> => {
  const url: string = searchTerm
    ? `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
    : `https://rickandmortyapi.com/api/character/?page=${page}`;

  const response: Response  = await fetch(url);

  if (response.status === 404) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return await response.json() as ApiResponse;
};
