import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockCharacter } from '@/__tests__/__mocks__/mockData.ts'
import Card from '@/components/Card';
import { CharacterStatus } from '@/types/types.ts';

describe('Card Component', (): void => {
  it('renders character information correctly', (): void => {
    render(<Card character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('displays correct image with alt text', (): void => {
    render(<Card character={mockCharacter} />);

    const image: HTMLElement = screen.getByAltText('Tiny Rick');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('applies correct status color classes', (): void => {
    const { rerender } = render(<Card character={mockCharacter} />);

    const aliveStatus: HTMLElement = screen.getByText(mockCharacter.status);
    expect(aliveStatus).toHaveClass('text-emerald-300');

    rerender(<Card character={{...mockCharacter, status: CharacterStatus.Dead}} />);
    expect(screen.getByText(CharacterStatus.Dead)).toHaveClass('text-rose-400');

    rerender(<Card character={{...mockCharacter, status: CharacterStatus.Unknown}} />);
    expect(screen.getByText(CharacterStatus.Unknown)).toHaveClass('text-sky-200');
  });

  it('have correct container classes', (): void => {
    const { container } = render(<Card character={mockCharacter} />);

    const cardElement: ChildNode | null = container.firstChild;
    expect(cardElement).toHaveClass( 'flex', 'overflow-hidden');
  });

  it('renders name and overlay', (): void => {
    render(<Card character={mockCharacter} />);

    const nameElement: HTMLElement = screen.getByText(mockCharacter.name);
    expect(nameElement).toHaveClass('text-white', 'font-bold', 'truncate');
    expect(nameElement.parentElement).toHaveClass('absolute', 'rounded-lg');
  });

  it('matches snapshot', (): void => {
    const { asFragment } = render(<Card character={mockCharacter} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
