'use client';

import { useTranslations } from 'next-intl';

interface Props {
  searchTerm: string;
  show: boolean;
}

export default function NotFoundMessage({ searchTerm, show }: Props) {
  const t = useTranslations('NotFoundMessage');

  if (!show) return null;

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold">{t('title')}</h2>
      <p className="mt-2 text-gray-500">
        {t('description', { searchTerm })}
      </p>
    </div>
  );
}
