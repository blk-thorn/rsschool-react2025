import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { ApiResponse, Character } from '@/types/types.ts';
import { fetchCharacters, fetchCharacter } from '@/utils/api'

export const useCharactersQuery = (searchTerm: string = '', page: number = 1): UseQueryResult<ApiResponse, Error> => {

  return useQuery<ApiResponse, Error>({
    queryKey: ['characters', searchTerm, page],
    queryFn: (): Promise<ApiResponse> => fetchCharacters(searchTerm, page),
  });
};

export const useCharacterQuery = ( id: number | undefined ): UseQueryResult<Character, Error> => {

  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: (): Promise<Character> => fetchCharacter(id),
  });
};
