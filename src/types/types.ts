import { ErrorInfo, ReactNode } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export type ApiPromise = Promise<ApiResponse>;

export interface PageState {
  characters: Character[];
  searchResults?: Character[],
  totalPages: number;
  searchTotalPages?: number;
  currentPage: number;
  searchTerm: string;
  isSearching?: boolean;
  itemsPerPage?: number;
  isLoading: boolean;
  shouldThrowError: boolean;
}

export interface NotFoundMessageProps {
  searchTerm: string;
  show: boolean;
}

export interface CardProps {
  character: Character;
}

export interface SearchProps {
  onFormSubmit: (term: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown'
}

export type EmptyVoid = () => void;

export type PageVoid = (page: number) => void;

export type SearchVoid = (term: string) => void;

export type LoadingVoid = (page: Parameters<PageVoid>[0], term: Parameters<SearchVoid>[0]) => void;

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}
