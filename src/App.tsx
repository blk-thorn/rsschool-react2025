import { Component, ReactNode } from 'react';
import HomePage from '@/Pages/HomePage/HomePage.tsx';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

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
