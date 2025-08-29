import React, { type JSX } from 'react';
import type { DataSet } from '../types.tsx';
import { CountryTable } from './CountryTable/CountryTable.tsx';

type Props = {
  data: DataSet;
};

export const MainContent: React.FC<Props> = ({ data }: Props): JSX.Element => {
  return (
    <div className="p-6 w-[70vw] bg-slate-400">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">
        CO2 Emissions Data
      </h1>
      <CountryTable data={data} />
    </div>
  );
};
