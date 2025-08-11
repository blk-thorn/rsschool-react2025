import { LoaderFunctionArgs } from 'react-router-dom';
import { ApiResponse } from '@/types/types.ts';
import { loadCharacters } from '@/utils/routerLoaderUtils.ts';


export async function homeLoader ({request}: LoaderFunctionArgs<string>): Promise<{ searchTerm: string, page: number }> {
  const url = new URL(request.url);
  const searchTerm: string = url.searchParams.get('search') ?? '';
  const page: number = Number(url.searchParams.get('page')) ?? 1;
  const data: ApiResponse = await loadCharacters(searchTerm, page);

  if (page > data.info.pages) {
    throw new Response('Not Found', { status: 404 });
  }

  return { searchTerm, page };
}
