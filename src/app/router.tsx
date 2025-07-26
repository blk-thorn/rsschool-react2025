import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/app/layout/MainLayout.tsx';
import { Routes } from '@/app/routes.ts';
import NotFoundMessage from '@/components/NotFoundMessage.tsx';
import ErrorBoundary from '@/features/ErrorBoundary';
import HomePage from '@/pages/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: Routes.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundMessage searchTerm={''} show={true} />,
  },
]);
