import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';

export default function Header(): ReactNode {
  return (
    <header className="flex flex-col items-center justify-center">
      <img src="/favicon.ico" alt="logo" className="rounded-full w-40 h-40 border-5" />
      <h1 className="text-center mt-8 mb-8 font-bold text-5xl text-sky-600">The Rick and Morty API</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              to={ROUTES.ABOUT}
              className="text-3xl font-bold mb-6 text-slate-800  hover:underline"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};
