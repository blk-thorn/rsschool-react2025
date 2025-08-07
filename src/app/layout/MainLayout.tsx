import { useIsFetching } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer.tsx';
import Header from '@/components/Header.tsx';

export default function MainLayout(): ReactNode {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(false);

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
      <main className="flex-grow">
        {isFetching > 0 && (
          <div className="fixed top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
            Updating data...
          </div>
        )}
        <Outlet context={{ setIsMainLoading }} />
      </main>
      <Footer
        isLoading={isMainLoading || isFetching > 0}
        onErrorClick={handleErrorClick}
      />
    </div>
  );
}
