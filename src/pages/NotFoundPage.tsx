import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';

export default function NotFoundPage (): JSX.Element {
  return (
    <div className="flex flex-col items-center p-2 mb-40">
        <h1 className="text-9xl font-bold text-sky-600 mb-10">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="inline-block px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
        >
          Go Back Home
        </Link>
    </div>
  )
};
