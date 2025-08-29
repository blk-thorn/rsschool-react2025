import React, { useState, type JSX } from 'react';
import type { CountryData, YearlyData } from '../../types';
import { ExpandedTable } from './ExtandedTable.tsx';

type Props = {
  name: string;
  country: CountryData;
  columns: string[];
};

export const CountryRow: React.FC<Props> = ({
  name,
  country,
  columns,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const latest: YearlyData = country.data[country.data.length - 1];

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-300"
        onClick={(): void => setExpanded((prev: boolean): boolean => !prev)}
      >
        <td className="p-2 border font-semibold text-slate-700">{name}</td>
        <td className="p-2 border font-semibold text-slate-700">
          {country.iso_code ?? 'N/A'}
        </td>
        <td className="p-2 border font-semibold text-slate-700">
          {latest.population ?? 'N/A'}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={3} className="p-0">
            <div className="flex justify-center w-full bg-gray-300 py-2">
              <ExpandedTable data={country.data} columns={columns} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
