import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer.tsx';
import Header from '@/components/Header.tsx';

export default function MainLayout(): ReactNode {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(false);

  const handleErrorClick = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Something went wrong. Please reload the page.');
  }

  return (
    <>
      <Header />
      <Outlet context={{ setIsMainLoading }} />
      <Footer
        isLoading={isMainLoading}
        onErrorClick={handleErrorClick}
      />
    </>
  )
};
