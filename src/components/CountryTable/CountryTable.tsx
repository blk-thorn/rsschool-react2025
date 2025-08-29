import React, { type JSX } from 'react';
import type { DataSet } from '../../types';
import { CountryRow } from './CountryRow';

type Props = {
  data: DataSet;
};

export const CountryTable: React.FC<Props> = ({ data }: Props): JSX.Element => {
  const defaultColumns: string[] = [
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ];

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-400">
          <tr>
            <th className="p-2 border border-slate-700 text-slate-800">
              Country
            </th>
            <th className="p-2 border border-slate-700 text-slate-800">
              ISO Code
            </th>
            <th className="p-2 border border-slate-700 text-slate-800">
              Population
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([name, country]) => (
            <CountryRow
              key={name}
              name={name}
              country={country}
              columns={defaultColumns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
