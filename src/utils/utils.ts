import type { DataSet, CountryData, YearlyData } from '../types';

export function getAllYears(data: DataSet): number[] {
  const years = new Set<number>();

  Object.values(data).forEach((country: CountryData): void => {
    country.data.forEach((yearData: YearlyData): void => {
      years.add(yearData.year);
    });
  });

  return Array.from(years).sort((a: number, b: number): number => a - b);
}

export function getPopulationAtYear(
  country: CountryData,
  year: number
): number | undefined {
  const found: YearlyData | undefined = country.data.find(
    (d: YearlyData): boolean => d.year === year
  );
  return found?.population;
}
