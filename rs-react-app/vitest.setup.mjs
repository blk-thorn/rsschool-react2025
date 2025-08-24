// setupTests.ts
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

global.FileReader = vi.fn().mockImplementation(() => ({
  readAsDataURL: vi.fn(),
  onloadend: vi.fn(),
  result: 'data:image/jpeg;base64,test',
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
