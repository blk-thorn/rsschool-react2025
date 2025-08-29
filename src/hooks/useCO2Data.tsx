import { fetchCO2Data } from '../services/fetchData';
import type { DataSet } from '../types';

function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
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

export function useCO2Data() {
  if (!resource) {
    resource = wrapPromise(fetchCO2Data());
  }
  return resource.read();
}
