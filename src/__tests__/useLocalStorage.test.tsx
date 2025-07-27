import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';

describe('useLocalStorage Hook', (): void => {
  const key = 'test-key';
  const defaultValue = 'default-value';

  beforeEach((): void => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach((): void => {
    localStorage.clear();
  });

  it('should initialize with default value when localStorage is empty', (): void  => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    expect(result.current[0]).toBe(defaultValue);
  });

  it('should initialize with stored value', (): void  => {
    const storedValue = 'stored-value';
    localStorage.setItem(key, storedValue);

    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    expect(result.current[0]).toBe(storedValue);
  });

});
