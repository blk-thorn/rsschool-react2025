'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { ReactNode } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ROUTES } from '@/constants/routes';

import { useTheme } from '@/context/UseTheme';

const { Link } = createNavigation();

export default function Header(): ReactNode {
  const { theme } = useTheme();
  const t = useTranslations('Header');

  return (
    <header className="relative flex flex-col items-center justify-center pt-12">
      <div className="flex space-x-2 mb-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <Image src="/logo.png" alt="logo" width={40} height={40}
        className={`rounded-full w-40 h-40 border-5 transition-all duration-100
          ${theme === 'dark'
          ? 'bg-slate-500 text-slate-600 shadow-lg border-slate-600 shadow-sky-500/50 filter brightness-80 invert-[0.1]'
          : 'text-sky-600 shadow-lg shadow-slate-400/50 border-sky-600 filter brightness-100'
        }`}
      />
      <h1
        className={`text-center mt-8 mb-8 font-bold text-5xl transition-all duration-100 ${
          theme === 'dark' ? 'text-slate-600' : 'text-sky-600'
        }`}
      >
        {t('title')}
      </h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              href={ROUTES.ABOUT}
              className={`text-3xl font-bold mb-6 hover:underline transition-all duration-100 ${
                theme === 'dark' ? 'text-slate-600' : 'text-slate-800'
              }`}
            >
              {t('about')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
