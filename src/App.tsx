import { Component, ReactNode } from 'react';
import CardGrid from '@/Components/CardGrid/CardGrid.tsx';
import ErrorBoundary from '@/Features/ErrorBoundary.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <CardGrid />
      </ErrorBoundary>
    );
  }
}

export default App;
