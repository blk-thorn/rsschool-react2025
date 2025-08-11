import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error: Error): void => console.error('Query Error:', error),
    onSuccess: (data: unknown): void => console.debug('Query Success:', data),
  })
});
