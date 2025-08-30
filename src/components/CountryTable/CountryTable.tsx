import React, { useState, type JSX } from 'react';
import type { DataSet } from '../../types';
import { CountryRow } from './CountryRow';
import { Modal } from '../Modal/Modal.tsx';

type Props = {
  data: DataSet;
};

export const CountryTable: React.FC<Props> = ({ data }: Props): JSX.Element => {
  const baseColumns: string[] = ['year', 'population', 'co2', 'co2_per_capita'];
  const additionalColumns: string[] = [
    'methane',
    'oil_co2',
    'temperature_change_from_co2',
    'total_ghg',
  ];

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const allColumns: string[] = [...baseColumns, ...selectedColumns];

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex justify-end mb-2">
        <button
          onClick={(): void => setShowSelector(true)}
          className="px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-700 cursor-pointer"
        >
          ⚙️ Columns
        </button>
      </div>

      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-400">
          <tr>
            <th className="p-2 border border-slate-700">Country</th>
            <th className="p-2 border border-slate-700">ISO Code</th>
            <th className="p-2 border border-slate-700">Population</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(
            ([name, country]): JSX.Element => (
              <CountryRow
                key={name}
                name={name}
                country={country}
                columns={allColumns}
              />
            )
          )}
        </tbody>
      </table>

      {showSelector && (
        <Modal
          available={additionalColumns}
          selected={selectedColumns}
          onChange={setSelectedColumns}
          onClose={(): void => setShowSelector(false)}
        />
      )}
    </div>
  );
};
