import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/app/layout/MainLayout.tsx';
import { ROUTES } from '@/app/routes.ts';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';
import AboutPage from '@/pages/AboutPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { homeLoader } from '@/utils/homeLoader.ts';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element:
    <ErrorBoundary>
      <MainLayout />
    </ErrorBoundary>,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
        errorElement: <NotFoundPage />
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: ROUTES.WILDCARD,
        element: <Navigate to={ROUTES.NOT_FOUND} replace />,
      },
    ],
  },
]);
