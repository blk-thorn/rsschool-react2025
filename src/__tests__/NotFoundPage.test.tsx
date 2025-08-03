import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { ThemeProvider, useTheme } from '@/context/ThemeContext.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import type { ThemeContextType } from '@/types/types.ts';

vi.mock('@/context/ThemeContext.tsx', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }): ReactNode => children,
  useTheme: vi.fn(),
}));

describe('NotFoundPage component', (): void => {
  const mockUseTheme: Mock = vi.mocked(useTheme);
  const mockToggleTheme: Mock = vi.fn();

  const mockThemeContext = (theme: 'light' | 'dark'): ThemeContextType => ({
    theme,
    toggleTheme: mockToggleTheme,
  });

  beforeEach((): void => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue(mockThemeContext('light'));
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <NotFoundPage />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('should render 404 heading with correct light theme styles', (): void => {
    mockUseTheme.mockReturnValue(mockThemeContext('light'));
    renderComponent();

    const heading: HTMLElement = screen.getByText('404');
    expect(heading).toHaveClass('text-sky-600');
    expect(heading).not.toHaveClass('text-rose-400');
  });

  it('should render 404 heading with correct dark theme styles', (): void => {
    mockUseTheme.mockReturnValue(mockThemeContext('dark'));
    renderComponent();

    const heading: HTMLElement = screen.getByText('404');
    expect(heading).toHaveClass('text-rose-400');
    expect(heading).not.toHaveClass('text-sky-600');
  });

  it('should render page not found message', (): void => {
    renderComponent();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should render home link with correct href', (): void => {
    renderComponent();
    expect(screen.getByText('Go Back Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('should apply correct dark theme background', (): void => {
    mockUseTheme.mockReturnValue(mockThemeContext('dark'));
    renderComponent();
    const container: HTMLElement | null = screen.getByText('404').parentElement;
    expect(container).toHaveClass('bg-gray-900');
  });

  it('should not apply dark background in light theme', (): void => {
    mockUseTheme.mockReturnValue(mockThemeContext('light'));
    renderComponent();
    const container: HTMLElement | null = screen.getByText('404').parentElement;
    expect(container).not.toHaveClass('bg-gray-900');
  });
});
