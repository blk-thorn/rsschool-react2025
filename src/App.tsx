import { Component, ReactNode } from 'react';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';
import HomePage from '@/pages/HomePage/HomePage';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );
  }
}

export default App;
