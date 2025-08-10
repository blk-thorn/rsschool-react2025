import { render } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import CardSkeleton from '@/components/CardSkeleton.tsx';
import { CARD_SKELETON_LINES_COUNT } from '@/components/CardSkeleton.tsx';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

vi.mock('@/context/ThemeContext', async () => {
  const actual = await vi.importActual('@/context/ThemeContext');
  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

describe('CardSkeleton', (): void  => {
  it('renders correct number of skeleton cards', (): void  => {
    const count = 3;
    const mockUseTheme = vi.fn().mockReturnValue({ theme: 'light' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton count={count} />
      </ThemeProvider>
    );

    const cards = document.querySelectorAll('.max-w-xl');
    expect(cards).toHaveLength(count);
  });

  it('applies dark theme styles', (): void  => {
    const mockUseTheme = vi.fn().mockReturnValue({ theme: 'dark' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const card: Element | null = document.querySelector('.max-w-xl');
    expect(card).toHaveClass('bg-slate-600/80');
    expect(card).toHaveClass('border-gray-50');
  });

  it('renders correct number of skeleton lines', (): void  => {
    const mockUseTheme: Mock = vi.fn().mockReturnValue({ theme: 'light' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const lines = document.querySelectorAll('.h-5.animate-pulse');
    expect(lines).toHaveLength(CARD_SKELETON_LINES_COUNT);
  });

  it('applies light theme styles when theme is light', (): void  => {
    const mockUseTheme: Mock = vi.fn().mockReturnValue({ theme: 'light' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const card: Element | null = document.querySelector('.max-w-xl');
    expect(card).toHaveClass('bg-slate-800/60');
    expect(card).toHaveClass('border-slate-400');
  });

  it('renders with default count of 1 when no count prop is provided', (): void  => {
    const mockUseTheme: Mock = vi.fn().mockReturnValue({ theme: 'light' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const cards = document.querySelectorAll('.max-w-xl');
    expect(cards).toHaveLength(1);
  });

  it('applies correct dark theme styles for skeleton image', (): void  => {
    const mockUseTheme: Mock = vi.fn().mockReturnValue({ theme: 'dark' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const imageSkeleton: Element | null = document.querySelector('.w-full.h-58');
    expect(imageSkeleton).toHaveClass('bg-gray-700');
  });

  it('applies correct light theme styles for skeleton image', (): void  => {
    const mockUseTheme: Mock = vi.fn().mockReturnValue({ theme: 'light' });
    vi.mocked(useTheme).mockImplementation(mockUseTheme);

    render(
      <ThemeProvider>
        <CardSkeleton />
      </ThemeProvider>
    );

    const imageSkeleton: Element | null = document.querySelector('.w-full.h-58');
    expect(imageSkeleton).toHaveClass('bg-gray-300');
  });
});
