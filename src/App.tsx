import React, { Suspense } from 'react';
import { useCO2Data } from './hooks/useCO2Data';
import { Spinner } from './components/UI/Spinner';

const CountryList: React.FC = () => {
  const data = useCO2Data();
  const countries = Object.keys(data).slice(0, 30);

  return (
    <div>
      <h1>CO2 Emissions Data</h1>
      <ul>
        {countries.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
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
