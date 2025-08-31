import { Suspense } from 'react';
import { Spinner } from './components/UI/Spinner';
import { MainContent } from './components/MainPage';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <MainContent />
    </Suspense>
  );
}

export default App;
