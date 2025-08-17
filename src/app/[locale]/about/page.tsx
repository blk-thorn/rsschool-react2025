'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { JSX } from 'react';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/context/UseTheme';

const { Link } = createNavigation();

export default function AboutPage(): JSX.Element {
  const { theme } = useTheme();
  const t = useTranslations('About');

  return (
    <div
      data-testid="about-page"
      className="max-w-2xl mx-auto p-4 border-t-2 border-b-2"
    >
      <section className="mb-8">
        <h1 className="text-xl font-semibold mb-2">{t('authorTitle')}</h1>
        <p className="mb-4">{t('authorDescription1')}</p>
        <p>{t('authorDescription2')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-10">{t('courseTitle')}</h2>
        <a
          href="https://rs.school/courses/reactjs"
          className="inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={theme === 'dark' ? '/rs_school_dark.svg' : '/rs_school.svg'}
            alt="RS School logo"
            className="h-30 hover:opacity-80 transition-opacity rounded-md border-2 p-3"
          />
        </a>
      </section>

      <Link
        href={ROUTES.HOME}
        className={`inline-block mt-4 px-4 py-2 rounded transition ${
          theme === 'dark'
            ? 'bg-slate-600 hover:bg-slate-700 text-slate-300'
            : 'bg-sky-600 hover:bg-sky-700 text-white'
        }`}
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
