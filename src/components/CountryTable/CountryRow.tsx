import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type JSX,
} from 'react';
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

const CountryRowComponent: React.FC<Props> = ({
  name,
  country,
  columns,
  selectedYear,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);

  const rowAtYear: YearlyData | undefined = useMemo(
    (): YearlyData | undefined => getAtYear(country, selectedYear),
    [country, selectedYear]
  );
  const population: number | undefined = useMemo(
    (): number | undefined => rowAtYear?.population,
    [rowAtYear]
  );

  useEffect((): (() => void) => {
    setFlash(true);
    const timeout = setTimeout((): void => setFlash(false), 700);
    return (): void => clearTimeout(timeout);
  }, [selectedYear]);

  const toggleExpanded: () => void = useCallback((): void => {
    setExpanded((prev: boolean): boolean => !prev);
  }, []);

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-100" onClick={toggleExpanded}>
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
            <ExpandedTable
              data={country.data}
              columns={columns}
              expandTrigger={expanded}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export const CountryRow = React.memo(
  CountryRowComponent,
  (prevProps, nextProps): boolean => {
    return (
      prevProps.selectedYear === nextProps.selectedYear &&
      prevProps.name === nextProps.name &&
      prevProps.columns === nextProps.columns &&
      prevProps.country.data === nextProps.country.data &&
      prevProps.country.iso_code === nextProps.country.iso_code
    );
  }
);
