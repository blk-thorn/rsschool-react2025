import React, { type JSX } from 'react';
import type { CountryData, YearlyData } from '../../types';
import { CountryTable } from './CountryTable';

type Props = {
  name: string;
  country: CountryData;
};

export const CountryCard: React.FC<Props> = ({
  name,
  country,
}: Props): JSX.Element => {
  const latest: YearlyData = country.data[country.data.length - 1];

  return (
    <div className="bg-slate-300 rounded-xl shadow p-4 mb-6">
      <h2 className="text-lg font-bold text-slate-700">{name}</h2>
      <p className="text-sm text-gray-600">
        Population (latest):{' '}
        <span className="font-medium">{latest.population ?? 'N/A'}</span>
      </p>
      {country.iso_code && (
        <p className="text-sm text-gray-600">
          ISO: <span className="font-medium">{country.iso_code}</span>
        </p>
      )}
      <CountryTable data={country.data} />
    </div>
  );
};
