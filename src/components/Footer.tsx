import { ReactNode } from 'react';
import ErrorButton from '@/components/ErrorButton.tsx';
import { FooterProps } from '@/types/types.ts';

export default function Footer({ isLoading, onErrorClick }: FooterProps): ReactNode | null {
  if (isLoading) return null;

  return (
    <footer>
      <ErrorButton onErrorClick={onErrorClick} />
    </footer>
  )
};
