import React, { useState, useMemo, useCallback, type JSX } from 'react';
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
  const years: number[] = useMemo((): number[] => getAllYears(data), [data]);
  const [selectedYear, setSelectedYear] = useState(
    years.length ? years[years.length - 1] : FALLBACK_YEAR
  );
  const regions: string[] = useMemo(
    (): string[] =>
      Object.keys(data).filter((key: string): boolean =>
        allowedRegions.includes(key)
      ),
    [data]
  );
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<SortKind>('name-asc');

  const baseColumns: string[] = useMemo(
    (): string[] => ['year', 'population', 'co2', 'co2_per_capita'],
    []
  );
  const additionalColumnsList: string[] = useMemo(
    (): string[] => [
      'methane',
      'oil_co2',
      'temperature_change_from_co2',
      'total_ghg',
    ],
    []
  );
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const allColumns: string[] = useMemo(
    (): string[] => [...baseColumns, ...selectedColumns],
    [baseColumns, selectedColumns]
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void =>
      setSelectedYear(Number(e.target.value)),
    []
  );
  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void =>
      setRegion(e.target.value),
    []
  );
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => setQuery(e.target.value),
    []
  );
  const handleColumnSelectorClose: () => void = useCallback(
    (): void => setShowSelector(false),
    []
  );
  const handleSortChange = useCallback(
    (sort: SortKind): void => setCurrentSort(sort),
    []
  );

  const filteredEntries = useMemo(() => {
    let entries = Object.entries(data);

    if (region !== 'All')
      entries = entries.filter(([name]): boolean => name === region);

    if (query.trim()) {
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

    return entries;
  }, [data, region, query, currentSort, selectedYear]);

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          >
            {years.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Region:</label>
          <select
            value={region}
            onChange={handleRegionChange}
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          >
            <option value="All">All</option>
            {regions.map((region: string) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-800 font-semibold">Search:</label>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Country name…"
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          />
        </div>

        <SortControl
          initialSort={currentSort}
          onSortChange={handleSortChange}
        />

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
          {filteredEntries.map(([name, country]) => (
            <CountryRow
              key={name}
              name={name}
              country={country}
              columns={allColumns}
              selectedYear={selectedYear}
            />
          ))}
        </tbody>
      </table>

      {showSelector && (
        <Modal
          available={[...additionalColumnsList]}
          selected={selectedColumns}
          onChange={setSelectedColumns}
          onClose={handleColumnSelectorClose}
        />
      )}
    </div>
  );
};
