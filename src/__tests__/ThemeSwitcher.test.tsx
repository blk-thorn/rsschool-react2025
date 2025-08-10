import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';

vi.mock('@/context/ThemeContext');

describe('ThemeSwitcher', (): void => {
  it('should render light theme button initially', (): void => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    const button: HTMLElement = screen.getByRole('button');
    expect(button).toHaveTextContent('🌙 Dark');
    expect(button).toHaveClass('bg-sky-600');
    expect(button).toHaveClass('text-white');
  });

  it('should render dark theme button when theme is dark', (): void => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    const button: HTMLElement = screen.getByRole('button');
    expect(button).toHaveTextContent('☀️ Light');
    expect(button).toHaveClass('bg-slate-600');
    expect(button).toHaveClass('text-slate-300');
  });

  it('should call toggleTheme when button is clicked', (): void => {
    const mockToggleTheme: Mock = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    const button: HTMLElement = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('should apply correct hover styles for light theme', (): void => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    const button: HTMLElement = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-sky-700');
  });

  it('should apply correct hover styles for dark theme', (): void => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    const button: HTMLElement = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-slate-700');
  });
});
