import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { useTheme } from '@/context/ThemeContext.tsx';

export default function Header(): ReactNode {
  const { theme } = useTheme();
  return (
    <header className="flex flex-col items-center justify-center">
      <img src="/favicon.ico" alt="logo" className={`rounded-full w-40 h-40 border-5 ${theme === 'dark' ? 'text-slate-600' : 'text-sky-600'}`} />
      <h1 className={`text-center mt-8 mb-8 font-bold text-5xl ${theme === 'dark' ? 'text-slate-600' : 'text-sky-600'}`}>The Rick and Morty API</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              to={ROUTES.ABOUT}
              className={`text-3xl font-bold mb-6 hover:underline ${theme === 'dark' ? 'text-slate-600' : 'text-slate-800'}`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};
