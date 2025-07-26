import { Component, ReactNode } from 'react';
import MainLayout from '@/app/layout/MainLayout.tsx';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    );
  }
}

export default App;
