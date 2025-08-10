import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter, useNavigate, useSearchParams, useLoaderData, SetURLSearchParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockResponseSuccess } from '@/__tests__/__mocks__/mockData';
import { ThemeProvider } from '@/context/ThemeContext.tsx';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCharactersQuery } from '@/hooks/useQueries.ts';
import HomePage from '@/pages/HomePage';
import { MockUseCharactersQueryReturn } from '@/types/test.types.ts';

type SearchParamsTuple = [URLSearchParams, SetURLSearchParams];
type RenderHomePageOptions = {
  props?: Partial<React.ComponentProps<typeof HomePage>>;
  searchParams?: SearchParamsTuple;
  loaderData?: { searchTerm: string; page: number };
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

vi.mock('@/hooks/useQueries', () => ({
  useCharactersQuery: vi.fn(),
}));

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('@/components/CharacterDetails', (): { default: () => ReactElement} => ({
  default: (): ReactElement => <div>CharacterDetails</div>,
}));

vi.mock('@/components/CharacterList', (): { default: () => ReactElement} => ({
  default: (): ReactElement => <div>CharactersList</div>,
}));

vi.mock('@/components/Loader', (): { default: () => ReactElement}  => ({
  default: (): ReactElement => <div>Loader</div>,
}));

vi.mock('@/components/NotFoundMessage', (): { default: () => ReactElement} => ({
  default: (): ReactElement => <div>NotFoundMessage</div>,
}));

vi.mock('@/components/SearchBar', () => ({
  default: ({ onFormSubmit, initialSearchTerm }: {
    onFormSubmit: (term: string) => void;
    initialSearchTerm: string
  }): ReactElement => (
    <div>
      <input
        defaultValue={initialSearchTerm}
        onChange={(e ): void => onFormSubmit(e.target.value)}
        data-testid="search-input"
      />
    </div>
  ),
}));

const DEFAULT_PROPS = {
  onLoadingChange: vi.fn(),
};

const DEFAULT_LOADER_DATA = {
  searchTerm: '',
  page: 1,
};

const PAGE_2_LOADER_DATA = {
  searchTerm: '',
  page: 2,
};

const SEARCH_LOADER_DATA = {
  searchTerm: 'test',
  page: 1,
};

const DETAILS_SEARCH_PARAMS: SearchParamsTuple = [
  new URLSearchParams('details=1'),
  vi.fn() as SetURLSearchParams,
];

const renderHomePage = (options: RenderHomePageOptions = {}) => {
  const { props = {}, searchParams = [new URLSearchParams(''), vi.fn() as SetURLSearchParams], loaderData = DEFAULT_LOADER_DATA } = options;

  vi.mocked(useSearchParams).mockReturnValue(searchParams);
  vi.mocked(useLoaderData).mockReturnValue(loaderData);

  return render(
    <MemoryRouter>
      <ThemeProvider>
        <HomePage {...DEFAULT_PROPS} {...props} />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('HomePage Component', () => {
  const mockNavigate = vi.fn();
  const mockSetSearchParams = vi.fn() as SetURLSearchParams;

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      mockSetSearchParams
    ]);
    vi.mocked(useLoaderData).mockReturnValue(DEFAULT_LOADER_DATA);
    vi.mocked(useLocalStorage).mockImplementation(() => ['', vi.fn()]);
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    } as MockUseCharactersQueryReturn);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display Loader while data is loading', () => {
    renderHomePage();
    expect(screen.getByText('Loader')).toBeInTheDocument();
  });

  it('should call onLoadingChange when loading starts and finishes', async (): Promise<void> => {
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage();

    await waitFor(() => {
      expect(DEFAULT_PROPS.onLoadingChange).toHaveBeenCalledWith(true);
      expect(DEFAULT_PROPS.onLoadingChange).toHaveBeenCalledWith(false);
    });
  });

  it('should display CharactersList after successful data fetch', async (): Promise<void> => {
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('CharactersList')).toBeInTheDocument();
    });
  });

  it('should display NotFoundMessage when no results are found', async (): Promise<void> => {
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      error: new Error('Not found'),
    } as MockUseCharactersQueryReturn);

    vi.mocked(useLocalStorage).mockImplementation(() => ['test', vi.fn()]);
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('NotFoundMessage')).toBeInTheDocument();
    });
  });

  it('should display CharacterDetails when details param is present', async (): Promise<void> => {
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage({ searchParams: DETAILS_SEARCH_PARAMS });

    await waitFor(() => {
      expect(screen.getByText('CharacterDetails')).toBeInTheDocument();
    });
  });

  it('should handle search through SearchBar', async (): Promise<void> => {
    const mockSetSearchValue = vi.fn();
    vi.mocked(useLocalStorage).mockImplementation(() => ['', mockSetSearchValue]);
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Rick' } });

    await waitFor(() => {
      expect(mockSetSearchValue).toHaveBeenCalledWith('Rick');
      expect(mockNavigate).toHaveBeenCalledWith('?search=Rick&page=1');
    });
  });

  it('should fetch data when page changes', async (): Promise<void> => {
    vi.mocked(useLoaderData).mockReturnValue(PAGE_2_LOADER_DATA);
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage({ loaderData: PAGE_2_LOADER_DATA });

    await waitFor(() => {
      expect(useCharactersQuery).toHaveBeenCalledWith('', 2);
    });
  });

  it('should fetch data with search term when provided', async (): Promise<void> => {
    vi.mocked(useLoaderData).mockReturnValue(SEARCH_LOADER_DATA);
    vi.mocked(useLocalStorage).mockImplementation(() => ['test', vi.fn()]);
    vi.mocked(useCharactersQuery).mockReturnValue({
      data: mockResponseSuccess,
      isFetching: false,
      error: null,
    } as MockUseCharactersQueryReturn);

    renderHomePage({ loaderData: SEARCH_LOADER_DATA });

    await waitFor(() => {
      expect(useCharactersQuery).toHaveBeenCalledWith('test', 1);
    });
  });
});
