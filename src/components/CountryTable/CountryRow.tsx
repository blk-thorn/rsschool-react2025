import React, { useEffect, useState, type JSX } from 'react';
import type { CountryData, YearlyData } from '../../types';
import { ExpandedTable } from './ExtandedTable.tsx';

type Props = {
  name: string;
  country: CountryData;
  columns: string[];
  selectedYear: number;
};

function getAtYear(country: CountryData, year: number): YearlyData | undefined {
  return country.data.find((d: YearlyData): boolean => d.year === year);
}

export const CountryRow: React.FC<Props> = ({
  name,
  country,
  columns,
  selectedYear,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);

  useEffect((): (() => void) => {
    setFlash(true);
    const t = setTimeout((): void => setFlash(false), 700);
    return (): void => clearTimeout(t);
  }, [selectedYear]);

  const rowAtYear: YearlyData | undefined = getAtYear(country, selectedYear);
  const population: number | undefined = rowAtYear?.population;

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-100"
        onClick={(): void => setExpanded((p: boolean): boolean => !p)}
      >
        <td className="p-2 border text-slate-700">{name}</td>
        <td className="p-2 border text-slate-700">
          {country.iso_code ?? 'N/A'}
        </td>
        <td
          className={`p-2 border text-slate-700 transition ${flash ? 'bg-yellow-200' : ''}`}
        >
          {typeof population === 'number' ? population : 'N/A'}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={3}>
            <ExpandedTable data={country.data} columns={columns} />
          </td>
        </tr>
      )}
    </>
  );
};
