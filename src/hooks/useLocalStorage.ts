import { useState, useEffect } from 'react';
import { UseLocalStorage } from '@/types/types.ts';

export const useLocalStorage: UseLocalStorage = (
  key: string = 'searchTerm-the-rick-morty-api',
  defaultValue: string = ''
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>((): string  => {
    try {
      return localStorage.getItem(key) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect((): void => {
    try {
      localStorage.setItem(key, value.trim());
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  }, [key, value]);

  return [value, setValue];
};
