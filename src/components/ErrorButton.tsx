import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useTheme } from '@/context/UseTheme';
import { ClickEvent, ClickFunction, ErrorButtonProps } from '@/types/types';

export default function ErrorButton({ onErrorClick }: ErrorButtonProps): JSX.Element {
  const { theme } = useTheme();
  const t = useTranslations('ErrorButton');

  const handleClick: ClickFunction = (e: ClickEvent): void => {
    e.preventDefault();
    onErrorClick();
  };

  return (
    <button
      onClick={handleClick}
      data-testid="error-button"
      type="button"
      className={`float-right font-medium rounded-lg text-md px-10 py-3 me-2 mb-2 focus:outline-none focus:ring-1 transition-all duration-100 cursor-pointer ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-rose-400' : 'text-gray-50 bg-rose-600 hover:bg-rose-700 focus:ring-rose-300'}`}
    >
      {t('label')}
    </button>
  );
}
