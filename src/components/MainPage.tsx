import React, { type JSX } from 'react';
import { useCO2Data } from '../hooks/useCO2Data';
import { CountryTable } from './CountryTable/CountryTable.tsx';
import type { DataSet } from '../types.tsx';

export const MainContent: React.FC = (): JSX.Element => {
  const data: DataSet = useCO2Data();

  return (
    <div className="p-6 w-[70vw] bg-slate-400">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">
        CO2 Emissions Data
      </h1>
      <CountryTable data={data} />
    </div>
  );
};
