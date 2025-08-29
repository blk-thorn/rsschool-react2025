import React, { type JSX } from 'react';
import type { YearlyData } from '../../types';

type Props = {
  data: YearlyData[];
};

export const CountryTable: React.FC<Props> = ({ data }: Props): JSX.Element => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-400">
          <tr>
            <th className="p-2 border border-slate-700">Year</th>
            <th className="p-2 border border-slate-700">Population</th>
            <th className="p-2 border border-slate-700">CO₂</th>
            <th className="p-2 border border-slate-700">CO₂ per capita</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (row: YearlyData): JSX.Element => (
              <tr key={row.year} className="hover:bg-gray-100">
                <td className="p-2 border text-slate-700">{row.year}</td>
                <td className="p-2 border text-slate-700">
                  {row.population ?? 'N/A'}
                </td>
                <td className="p-2 border text-slate-700">
                  {row.co2 ?? 'N/A'}
                </td>
                <td className="p-2 border text-slate-700">
                  {row.co2_per_capita ?? 'N/A'}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
