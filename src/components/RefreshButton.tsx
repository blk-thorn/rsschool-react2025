import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { JSX, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import RefreshLoader from './RefreshLoader';
import { useTheme } from '@/context/UseTheme';
import { useCharacterStore } from '@/store/useCharacterStore';

export default function RefreshButton(): JSX.Element {
  const { theme } = useTheme();
  const queryClient: QueryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedItems: number[] = useCharacterStore((state ): number[] => state.selectedItems);

  const handleRefreshClick: () => Promise<void> = async (): Promise<void> => {
    if (!navigator.onLine) {
      setError('No internet connection');
      return;
    }

    setError(null);
    setIsRefreshing(true);

    try {
      await queryClient.invalidateQueries({
        queryKey: ['characters'],
        refetchType: 'all',
      });

      for (const id of selectedItems) {
        await queryClient.invalidateQueries({
          queryKey: ['character', id],
          refetchType: 'all',
        });
        const updatedData: unknown = queryClient.getQueryData(['character', id]);
        console.log(`Update cache for character ${id}:`, updatedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refresh failed');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleRefreshClick}
        disabled={isRefreshing}
        className={`inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium rounded-lg cursor-pointer focus:ring-1 focus:outline-none transition-all duration-100 ${
          theme === 'dark'
            ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300'
            : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-600 text-white'
        } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isRefreshing ? (
          <RefreshLoader text="Refreshing..." />
        ) : (
          <>
            <svg
              className="w-4 h-4 me-2"
              role="img"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 1v5h-5M2 17v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
              />
            </svg>
            Refresh
          </>
        )}
      </button>

      {error && (
        <div className="absolute top-full left-0 mt-2">
          <ErrorMessage
            message={error}
            onDismiss={(): void => setError(null)}
          />
        </div>
      )}
    </div>
  );
}
