import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header.tsx';
import '@testing-library/jest-dom/vitest';

describe('Header', (): void => {
  it('renders app title and logo', (): void => {
    render(<Header />);
    expect(screen.getByText('The Rick and Morty API')).toBeInTheDocument();

    const logo: HTMLElement = screen.getByRole('img');

    expect(logo).toHaveAttribute('src', './favicon.ico');
    expect(logo).toHaveAttribute('alt', 'logo');
    expect(logo).toHaveClass('border-5');

    const style: CSSStyleDeclaration = window.getComputedStyle(logo);

    if (style.borderWidth !== '') {
      expect(style.borderWidth).toBe('5px');
    }
    expect(logo).toBeVisible();
  });
});
