import { Component, ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router.tsx';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
  }
}

export default App;
