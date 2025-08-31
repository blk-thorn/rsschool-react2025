import React, { type JSX, useMemo } from 'react';
import type { YearlyData } from '../../types';

type Props = {
  data: YearlyData[];
  columns: string[];
};

const ExpandedTableComponent: React.FC<Props> = ({
  data,
  columns,
}: Props): JSX.Element => {
  const rows = useMemo(
    () =>
      data.map((row: YearlyData) => (
        <tr key={row.year} className="hover:bg-gray-100">
          {columns.map((col: string) => (
            <td key={col} className="p-2 border text-slate-700">
              {row[col as keyof YearlyData] ?? 'N/A'}
            </td>
          ))}
        </tr>
      )),
    [data, columns]
  );

  const headers = useMemo(
    () =>
      columns.map((col: string) => (
        <th key={col} className="p-2 border border-slate-700 text-slate-800">
          {col.replaceAll('_', ' ').toUpperCase()}
        </th>
      )),
    [columns]
  );

  return (
    <div className="overflow-x-auto flex w-full justify-center">
      <table className="min-w-full border border-gray-200 text-sm max-w-4xl mx-auto">
        <thead className="bg-gray-400">
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export const ExpandedTable = React.memo(ExpandedTableComponent);
