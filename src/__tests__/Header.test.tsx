import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { ROUTES } from '@/app/routes';
import Header from '@/components/Header.tsx';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }): ReactElement => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('Header Component', (): void => {
  it('renders the application logo with correct attributes', (): void  => {
    render(<Header />);

    const logo: HTMLElement = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/favicon.ico');
    expect(logo).toHaveClass('rounded-full', 'border-5');
  });

  it('displays the correct application title', (): void  => {
    render(<Header />);

    const title: HTMLElement = screen.getByText('The Rick and Morty API');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-center', 'text-sky-600');
  });

  it('renders navigation with About link pointing to correct route', (): void  => {
    render(<Header />);

    const aboutLink: HTMLElement = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', ROUTES.ABOUT);
    expect(aboutLink).toHaveClass('font-bold', 'hover:underline');
  });
});
