'use client';

import { useIsFetching } from '@tanstack/react-query';
import { JSX, ReactNode, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const isFetching: number = useIsFetching();

  const handleErrorClick: () => void = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Something went wrong. Please reload the page.');
  }

  return (
    <div data-testid="main-layout">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer
        isLoading={isFetching > 0}
        onErrorClick={handleErrorClick}
      />
    </div>
  );
}
