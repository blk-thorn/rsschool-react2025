import { Component, ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/app/providers.tsx';
import { router } from '@/app/router.tsx';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <ThemeProvider>
        <QueryProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryProvider>
      </ThemeProvider>
    );
  }
}

export default App;
