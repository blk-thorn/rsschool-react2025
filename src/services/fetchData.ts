import type { DataSet } from '../types';

export async function fetchCO2Data(): Promise<DataSet> {
  const response = await fetch('/owid-co2-data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch CO2 data');
  }
  const data: DataSet = await response.json();
  return data;
}
