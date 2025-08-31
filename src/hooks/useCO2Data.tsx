import { fetchCO2Data } from '../services/fetchData';
import type { DataSet } from '../types';

function wrapPromise<T>(promise: Promise<T>): { read(): T } {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender: Promise<void> = promise.then(
    (res: T): void => {
      status = 'success';
      result = res;
    },
    (err: unknown): void => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') throw suspender;
      if (status === 'error') {
        if (error instanceof Error) throw error;
        throw new Error(String(error));
      }
      return result;
    },
  };
}

let resource: { read: () => DataSet };

export function useCO2Data(): DataSet {
  if (!resource) {
    resource = wrapPromise(fetchCO2Data());
  }
  return resource.read();
}
