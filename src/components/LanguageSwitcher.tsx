'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ReactElement, useEffect, useState } from 'react';
import { useTheme } from '@/context/UseTheme';
import { EmptyVoid } from '@/types/types';

export default function LanguageSwitcher(): ReactElement {
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();
  const locale: string = useLocale();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect((): void => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleLanguage: EmptyVoid = (): void => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    router.push(`/${newLocale}${pathname.replace(/^\/(en|ru)/, '')}`);
    router.refresh();
  };

  return (
    <div className="absolute top-4 right-20">
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center px-4 py-2 rounded-md ms-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-100 ${
          theme === 'dark'
            ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300'
            : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-600 text-white'
        }`}
      >
        {locale === 'en' ? 'Русский' : 'English'}
      </button>
    </div>
  );
}
