import React, { useState, useMemo, type JSX } from 'react';
import type { CountryData, DataSet } from '../../types';
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

const baseColumns: string[] = ['year', 'population', 'co2', 'co2_per_capita'];
const additionalColumnsList: string[] = [
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'total_ghg',
];

const MemoCountryRow = React.memo(CountryRow);

export const CountryTable: React.FC<Props> = ({ data }: Props): JSX.Element => {
  const years: number[] = useMemo((): number[] => getAllYears(data), [data]);

  const [selectedYear, setSelectedYear] = useState<number>(
    years.length ? years[years.length - 1] : FALLBACK_YEAR
  );
  const [region, setRegion] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<SortKind>('name-asc');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState<boolean>(false);

  const regions: string[] = useMemo(
    (): string[] =>
      Object.keys(data).filter((key: string): boolean =>
        allowedRegions.includes(key)
      ),
    [data]
  );

  const allColumns: string[] = useMemo(
    (): string[] => [...baseColumns, ...selectedColumns],
    [selectedColumns]
  );

  const collator: Intl.Collator = useMemo(
    (): Intl.Collator => new Intl.Collator(undefined, { sensitivity: 'base' }),
    []
  );

  const filteredEntries: [string, CountryData][] = useMemo(() => {
    let entries: [string, CountryData][] = Object.entries(data) as [
      string,
      CountryData,
    ][];

    if (region !== 'All') {
      entries = entries.filter(([name]): boolean => name === region);
    }

    if (query.trim()) {
      const q: string = query.trim().toLowerCase();
      entries = entries.filter(([name]): boolean =>
        name.toLowerCase().includes(q)
      );
    }

    switch (currentSort) {
      case 'name-asc':
        entries.sort(([a], [b]): number => collator.compare(a, b));
        break;
      case 'name-desc':
        entries.sort(([a], [b]): number => collator.compare(b, a));
        break;
      case 'pop-asc':
      case 'pop-desc':
        entries.sort(([, a], [, b]): number => {
          const pa: number = getPopulationAtYear(a, selectedYear) ?? 0;
          const pb: number = getPopulationAtYear(b, selectedYear) ?? 0;
          return currentSort === 'pop-asc' ? pa - pb : pb - pa;
        });
        break;
    }

    return entries;
  }, [data, region, query, currentSort, selectedYear, collator]);

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
            onChange={(e): void => setRegion(e.target.value)}
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
            onChange={(e): void => setQuery(e.target.value)}
            placeholder="Country name…"
            className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
          />
        </div>

        <SortControl
          initialSort={currentSort}
          onSortChange={(sort: SortKind): void => setCurrentSort(sort)}
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
            <MemoCountryRow
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
          onClose={(): void => setShowSelector(false)}
        />
      )}
    </div>
  );
};
