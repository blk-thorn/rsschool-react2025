import { ApiResponse } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api';
import { queryClient } from '@/utils/queryClient.ts';

export async function loadCharacters(searchTerm: string, page: number): Promise<ApiResponse> {
  return queryClient.fetchQuery({
    queryKey: ['characters', searchTerm, page],
    queryFn: (): Promise<ApiResponse> => fetchCharacters(searchTerm, page),
  });
}
