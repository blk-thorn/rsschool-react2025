import { ReactNode } from 'react';
import { ClickEvent, ClickFunction, ErrorButtonProps } from '@/types/types.ts';
import { useTheme } from '@/context/ThemeContext.tsx';

export default function ErrorButton({onErrorClick}: ErrorButtonProps): ReactNode  {
  const { theme } = useTheme();

  const handleClick: ClickFunction = (e: ClickEvent): void => {
    e.preventDefault();
    onErrorClick();
  }

    return (
      <button
        onClick={handleClick}
        data-testid="error-button"
        type="button"
        className={`float-right font-medium rounded-lg text-md px-20 py-3 me-2 mb-2 focus:outline-none focus:ring-1 transition-all duration-100 cursor-pointer ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-rose-400' : 'text-gray-50 bg-rose-600 hover:bg-rose-700 focus:ring-rose-300'}`}>
        Error Button
      </button>
    )
};
