import { RenderResult } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import type { Mock } from 'vitest';
import { ApiResponse } from '@/types/types.ts';
import { UseQueryResult } from '@tanstack/react-query';

export type ConsoleError = {
  (...data: []): void;
  (message?: string, ...optionalParams: []): void;
}

export type renderFunction =  () => RenderResult


export type searchBarRender = ( term?: string, mockFn?: Mock) => RenderResult


export type childComponent = ({ children }: { children: ReactNode }) => ReactElement  | null

export type MockUseCharactersQueryReturn = UseQueryResult<ApiResponse, Error> & {
  data: ApiResponse | undefined;
  isFetching: boolean;
  error: Error | null;
};
