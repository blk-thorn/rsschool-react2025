import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { mockCharacter } from '@/__tests__/__mocks__/mockData.ts'
import Card from '@/components/Card';
import { CharacterStatus } from '@/types/types.ts';

describe('Check character Card', (): void => {
  const renderCard = () => {
    return render(
      <MemoryRouter>
        <Card character={mockCharacter} />
      </MemoryRouter>
    );
  };

  it('renders character information correctly', (): void => {
    renderCard();

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('displays correct image with alt text', (): void => {
    renderCard();

    const image: HTMLElement = screen.getByAltText('Tiny Rick');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('applies correct status color classes', (): void => {
    const { rerender } = renderCard();

    const aliveStatus: HTMLElement = screen.getByText(mockCharacter.status);
    expect(aliveStatus).toHaveClass('text-emerald-300');

    rerender(
      <MemoryRouter>
        <Card character={{...mockCharacter, status: CharacterStatus.Dead}} />
      </MemoryRouter>
    );
    expect(screen.getByText(CharacterStatus.Dead)).toHaveClass('text-rose-400');

    rerender(
      <MemoryRouter>
        <Card character={{...mockCharacter, status: CharacterStatus.Unknown}} />
      </MemoryRouter>
    );
    expect(screen.getByText(CharacterStatus.Unknown)).toHaveClass('text-sky-200');
  });

  it('have correct container classes', (): void => {
    const { container } = renderCard();

    const cardElement: Element | null = container.querySelector('[data-testid="character-card"]');
    expect(cardElement).toHaveClass('flex', 'overflow-hidden');
  });

  it('renders name and overlay', (): void => {
    renderCard();

    const nameElement: HTMLElement = screen.getByText(mockCharacter.name);
    expect(nameElement).toHaveClass('text-white', 'font-bold', 'truncate');
    expect(nameElement.parentElement).toHaveClass('absolute', 'rounded-lg');
  });
});
