'use client';

import { ReactNode } from 'react';
import ErrorButton from '@/components/ErrorButton';
import { FooterProps } from '@/types/types';

export default function Footer({ isLoading, onErrorClick }: FooterProps): ReactNode | null {
  if (isLoading) return null;

  return (
    <footer>
      <ErrorButton onErrorClick={onErrorClick} />
    </footer>
  );
}
