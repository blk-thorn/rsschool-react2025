import { Component, ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router.tsx';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;
