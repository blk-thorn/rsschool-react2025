import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useSearchParams, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockCharacter } from '@/__tests__/__mocks__/mockData.ts';
import { ROUTES } from '@/app/routes';
import CharacterDetails from '@/components/CharacterDetails.tsx';
import { fetchCharacter } from '@/utils/api';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('@/utils/api', () => ({
  fetchCharacter: vi.fn(),
}));

vi.mock('@/utils/getStatusColor', () => ({
  getStatusColor: vi.fn().mockReturnValue('text-green-500'),
}));

describe('CharacterDetails Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render anything when characterId is not provided', () => {
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(), vi.fn()]);

    const { container } = render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });


  it('should render character details when data is loaded', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?details=1'),
      vi.fn()
    ]);
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    });
  });

  it('should navigate to not found page when character fetch fails', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?details=999'),
      vi.fn()
    ]);
    vi.mocked(fetchCharacter).mockRejectedValue(new Error('Character not found'));

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.NOT_FOUND, { replace: true });
    });
  });

  it('should close details when close button is clicked', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?details=1'),
      vi.fn()
    ]);
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const closeButton = screen.getByText('× Close');
      closeButton.click();
      expect(mockNavigate).toHaveBeenCalledWith('?', { replace: true });
    });
  });

  it('should apply correct status color class', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?details=1'),
      vi.fn()
    ]);
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const statusElement = screen.getByText('Alive');
      expect(statusElement).toHaveClass('text-green-500');
    });
  });
});
