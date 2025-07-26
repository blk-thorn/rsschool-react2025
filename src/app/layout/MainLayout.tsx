import { ReactNode, useState } from 'react';
import Footer from '@/components/Footer.tsx';
import Header from '@/components/Header.tsx';
import HomePage from '@/pages/HomePage/HomePage.tsx';

export default function MainLayout(): ReactNode {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(true);

  const handleErrorClick = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Something went wrong. Please reload the page.');
  }

  return (
    <>
      <Header />
      <HomePage onLoadingChange={setIsMainLoading} />
      <Footer
        isLoading={isMainLoading}
        onErrorClick={handleErrorClick}
      />
    </>
  );
}
