import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { useTheme } from '@/context/ThemeContext.tsx';

export default function NotFoundPage (): JSX.Element {
  const { theme } = useTheme();
  return (
    <div className={`flex flex-col items-center p-2 mb-40 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
      <h1 className={`text-9xl font-bold mb-10 ${theme === 'dark' ? 'text-rose-400' : 'text-sky-600'}`}>404</h1>
      <h2 className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>
        Page Not Found
      </h2>
      <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={ROUTES.HOME}
        className={`inline-block px-6 py-3 font-medium rounded-lg transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
      >
        Go Back Home
      </Link>
    </div>
  )
};
