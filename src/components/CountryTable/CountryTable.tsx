import React, { useState, type JSX } from 'react';
import type { DataSet, CountryData, YearlyData } from '../../types';
import { CountryRow } from './CountryRow';
import { Modal } from '../Modal/Modal.tsx';

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

function getAllYears(data: DataSet): number[] {
  const years = new Set<number>();

  Object.values(data).forEach((country: CountryData) => {
    country.data.forEach((yearData: YearlyData) => {
      years.add(yearData.year);
    });
  });

  return Array.from(years).sort((a, b) => a - b);
}

function getPopulationAtYear(
  country: CountryData,
  year: number
): number | undefined {
  const found: YearlyData | undefined = country.data.find(
    (d: YearlyData): boolean => d.year === year
  );
  return found?.population;
}

type SortKind = 'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc';

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
  const [sort, setSort] = useState<SortKind>('name-asc');

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
    const q = query.trim().toLowerCase();
    entries = entries.filter(([name]): boolean =>
      name.toLowerCase().includes(q)
    );
  }

  entries.sort(([nameA, countryA], [nameB, countryB]): number => {
    if (sort === 'name-asc' || sort === 'name-desc') {
      const cmp: number = nameA.localeCompare(nameB);
      return sort === 'name-asc' ? cmp : -cmp;
    }

    const a: number = getPopulationAtYear(countryA, selectedYear) ?? 0;
    const b: number = getPopulationAtYear(countryB, selectedYear) ?? 0;

    return sort === 'pop-asc' ? a - b : b - a;
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

        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Sort:</label>
          <select
            value={sort}
            onChange={(e): void => setSort(e.target.value as SortKind)}
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          >
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="pop-asc">Population ↑</option>
            <option value="pop-desc">Population ↓</option>
          </select>
        </div>

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
