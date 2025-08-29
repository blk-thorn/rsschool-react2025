import React, { type JSX } from 'react';
import type { YearlyData } from '../../types';

type Props = {
  data: YearlyData[];
  columns: string[];
};

export const ExpandedTable: React.FC<Props> = ({
  data,
  columns,
}: Props): JSX.Element => {
  return (
    <div className="overflow-x-auto flex w-full justify-center">
      <table className="min-w-full border border-gray-200 text-sm max-w-4xl mx-auto">
        <thead className="bg-gray-400">
          <tr>
            {columns.map(
              (col: string): JSX.Element => (
                <th
                  key={col}
                  className="p-2 border border-slate-700 text-slate-800"
                >
                  {col.replaceAll('_', ' ').toUpperCase()}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (row: YearlyData): JSX.Element => (
              <tr key={row.year} className="hover:bg-gray-100 ">
                {columns.map(
                  (col: string): JSX.Element => (
                    <td key={col} className="p-2 border text-slate-700">
                      {row[col as keyof YearlyData] ?? 'N/A'}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
