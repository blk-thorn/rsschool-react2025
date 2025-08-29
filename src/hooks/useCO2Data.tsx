import { fetchCO2Data } from '../services/fetchData';
import type { DataSet } from '../types';

function wrapPromise<T>(promise: Promise<T>): { read(): T } {
  let status: string = 'pending';
  let result: T;
  const suspender: Promise<void> = promise.then(
    (res: T): void => {
      status = 'success';
      result = res;
    },
    (err): void => {
      status = 'error';
      result = err;
    }
  );
  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else {
        return result;
      }
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
