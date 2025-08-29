import { Suspense } from 'react';
import { useCO2Data } from './hooks/useCO2Data';
import { Spinner } from './components/UI/Spinner';
import { MainContent } from './components/MainPage.tsx';
import type { DataSet } from './types.tsx';

function App() {
  const data: DataSet = useCO2Data();

  return (
    <Suspense fallback={<Spinner />}>
      <MainContent data={data} />
    </Suspense>
  );
}

export default App;
