import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import type { ApiResponse, Character } from '@/types/types.ts';
import { fetchCharacters, fetchCharacter } from '@/utils/api.ts'

export const useCharactersQuery = (searchTerm: string = '', page: number = 1): UseQueryResult<ApiResponse, Error> => {
  return useQuery<ApiResponse, Error>({
    queryKey: ['characters', searchTerm, page],
    queryFn: (): Promise<ApiResponse> => fetchCharacters(searchTerm, page),
    placeholderData: (prev) => prev
  });
};

export const useCharacterQuery = (
  id: number | undefined,
): UseQueryResult<Character, Error> => {
  const queryClient: QueryClient = useQueryClient();

  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: (): Promise<Character> => fetchCharacter(id),
    enabled: !!id,

    initialData: (): Character | undefined => {
      const cachedData: ApiResponse | undefined = queryClient.getQueryData<ApiResponse>(['characters']);
      return cachedData?.results.find((character: Character): boolean => character.id === id);
    },
  });
};
