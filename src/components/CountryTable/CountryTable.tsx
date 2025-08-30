import React, { useState, type JSX } from 'react';
import type { DataSet } from '../../types';
import { CountryRow } from './CountryRow';
import { Modal } from '../Modal/Modal.tsx';
import { getAllYears, getPopulationAtYear } from '../../utils/utils.ts';
import { SortControl, type SortKind } from '../SortControl/SortControl';

type Props = { data: DataSet };

const FALLBACK_YEAR = 2023;
const allowedRegions: string[] = [
  'Asia',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Antarctica',
];

export const CountryTable: React.FC<Props> = ({ data }: Props): JSX.Element => {
  const years: number[] = getAllYears(data);
  const [selectedYear, setSelectedYear] = useState<number>(
    years.length > 0 ? years[years.length - 1] : FALLBACK_YEAR
  );

  const regions: string[] = Object.keys(data).filter((key: string): boolean =>
    allowedRegions.includes(key)
  );

  const [region, setRegion] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<SortKind>('name-asc');

  const baseColumns = ['year', 'population', 'co2', 'co2_per_capita'] as const;
  const additionalColumns = [
    'methane',
    'oil_co2',
    'temperature_change_from_co2',
    'total_ghg',
  ] as const;
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const allColumns: string[] = [...baseColumns, ...selectedColumns];

  let entries = Object.entries(data);

  if (region !== 'All') {
    entries = entries.filter(([name]): boolean => name === region || false);
  }

  if (query.trim().length > 0) {
    const q: string = query.trim().toLowerCase();
    entries = entries.filter(([name]): boolean =>
      name.toLowerCase().includes(q)
    );
  }

  entries.sort(([nameA, countryA], [nameB, countryB]): number => {
    if (currentSort === 'name-asc' || currentSort === 'name-desc') {
      const cmp: number = nameA.localeCompare(nameB);
      return currentSort === 'name-asc' ? cmp : -cmp;
    }

    const a: number = getPopulationAtYear(countryA, selectedYear) ?? 0;
    const b: number = getPopulationAtYear(countryB, selectedYear) ?? 0;

    return currentSort === 'pop-asc' ? a - b : b - a;
  });

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Year:</label>
          <select
            value={selectedYear}
            onChange={(e): void => setSelectedYear(Number(e.target.value))}
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          >
            {years.map((y: number) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Region:</label>
          <select
            value={region}
            onChange={(e): void => setRegion(e.target.value)}
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          >
            <option value="All">All</option>
            {regions.map((r: string) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Search:</label>
          <input
            type="text"
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
            placeholder="Country name…"
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          />
        </div>

        <SortControl initialSort={currentSort} onSortChange={setCurrentSort} />

        <div className="ml-auto">
          <button
            onClick={(): void => setShowSelector(true)}
            className="px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-700"
          >
            ⚙️ Columns
          </button>
        </div>
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
          {entries.map(
            ([name, country]): JSX.Element => (
              <CountryRow
                key={name}
                name={name}
                country={country}
                columns={allColumns}
                selectedYear={selectedYear}
              />
            )
          )}
        </tbody>
      </table>

      {showSelector && (
        <Modal
          available={[...additionalColumns]}
          selected={selectedColumns}
          onChange={setSelectedColumns}
          onClose={(): void => setShowSelector(false)}
        />
      )}
    </div>
  );
};
