import { RenderResult } from '@testing-library/react';
import type { Mock } from 'vitest';
import { ReactElement } from 'react';

export type ConsoleError = {
  (...data: []): void;
  (message?: string, ...optionalParams: []): void;
}

export type renderFunction =  () => RenderResult


export type searchBarRender = ( term?: string, mockFn?: Mock) => RenderResult


export type childComponent = ({ children }: { children: React.ReactNode }) => ReactElement  | null
