import { createBrowserRouter, LoaderFunctionArgs } from 'react-router-dom';
import MainLayout from '@/app/layout/MainLayout.tsx';
import { ROUTES } from '@/app/routes.ts';
import ErrorBoundary from '@/features/ErrorBoundary';
import AboutPage from '@/pages/AboutPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { ApiResponse } from '@/types/types.ts';
import { fetchCharacters } from '@/utils/api.ts';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        loader: async ({ request }: LoaderFunctionArgs<string>): Promise<{ searchTerm: string, page: number }> => {
          const url = new URL(request.url);
          const searchTerm: string = url.searchParams.get('search') || '';
          const page: number = Number(url.searchParams.get('page')) || 1;

          try {
            const data: ApiResponse = await fetchCharacters(searchTerm, 1);
            const totalPages: number = data.info?.pages || 1;

            if (page < 1 || page > totalPages) {
              throw new Response('Not Found', { status: 404 });
            }

            return { searchTerm, page };
          } catch (error) {
            throw new Response('Not Found', { status: 404 });
          }
        },
        errorElement: <NotFoundPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
