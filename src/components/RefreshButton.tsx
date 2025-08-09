import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useTheme } from '@/context/ThemeContext.tsx';

export default function RefreshButton(): ReactNode {
  const { theme } = useTheme();
  const queryClient: QueryClient = useQueryClient();

  const handleRefreshClick: () => void = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['characters'],
      refetchType: 'all'
    });
    queryClient.invalidateQueries({
      queryKey: ['character'],
      refetchType: 'active'
    });
  };

  return (
    <button
      onClick={handleRefreshClick}
      className={`inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium rounded-lg cursor-pointer focus:ring-1 focus:outline-none transition-all duration-100 ${
        theme === 'dark'
          ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300'
          : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-600 text-white'
      }`}
    >
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 17v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
      </svg>
      Refresh
    </button>
  );
}
