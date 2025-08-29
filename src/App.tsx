import React, { Suspense } from 'react';
import { useCO2Data } from './hooks/useCO2Data';
import { Spinner } from './components/UI/Spinner';
import { CountryCard } from './components/CountryCard';

const CountryList: React.FC = () => {
  const data = useCO2Data();
  const countries = Object.entries(data).slice(0, 5);

  return (
    <div className="p-6 w-[70vw]">
      <h1 className="text-2xl font-bold mb-4">CO2 Emissions Data</h1>
      {countries.map(([name, country]) => (
        <CountryCard key={name} name={name} country={country} />
      ))}
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <CountryList />
    </Suspense>
  );
}

export default App;
