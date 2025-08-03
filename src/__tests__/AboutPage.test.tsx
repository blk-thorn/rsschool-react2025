import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext.tsx';
import AboutPage from '@/pages/AboutPage.tsx';

vi.mock('@/context/ThemeContext.tsx', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/context/ThemeContext.tsx')>();
  return {
    ...actual,
    useTheme: vi.fn(() => ({ theme: 'light' })),
  };
});

describe('AboutPage Component', (): void => {
  beforeEach((): void => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AboutPage />
        </ThemeProvider>
      </BrowserRouter>
    );
  });

  it('renders author information section', (): void => {
    expect(screen.getByText('Author Information:')).toBeInTheDocument();
    expect(
      screen.getByText(/This app was created as part of the RS School React course/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/It allows you to browse characters/)
    ).toBeInTheDocument();
  });

  it('renders course information with RS School logo', (): void => {
    expect(screen.getByText('Course Information:')).toBeInTheDocument();
    const logo: HTMLElement = screen.getByAltText('RS School logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/rs_school.svg');
  });

  it('has a working link back to home', (): void => {
    const homeLink: HTMLElement = screen.getByText('Back Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('has RS School external link with proper attributes', (): void => {
    const rsLink: HTMLAnchorElement | null = screen
      .getByAltText('RS School logo')
      .closest('a');
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
