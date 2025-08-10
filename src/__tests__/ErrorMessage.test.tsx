import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, it, expect, vi, Mock } from 'vitest';
import ErrorMessage from '@/components/ErrorMessage';
import { useTheme } from '@/context/ThemeContext';

vi.mock('@/context/ThemeContext', () => ({
  useTheme: vi.fn(() => ({ theme: 'light', toggleTheme: vi.fn() })),
  ThemeProvider: ({ children }: { children: React.ReactNode }): ReactNode => children,
}));

describe('ErrorMessage', (): void  => {
  it('renders error message and calls onDismiss when clicked', (): void  => {
    const mockDismiss: Mock = vi.fn();
    render(<ErrorMessage message="Test error" onDismiss={mockDismiss} />);

    expect(screen.getByText('Test error')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockDismiss).toHaveBeenCalled();
  });

  it('renders with correct icon', (): void => {
    render(<ErrorMessage message="Test" onDismiss={vi.fn()} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });


  it('should apply light theme styles', (): void  => {
    render(<ErrorMessage message="Test" onDismiss={vi.fn()} />);

    const alert: HTMLElement = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-white');

    const closeButton: HTMLElement = screen.getByLabelText('Close');
    expect(closeButton).toHaveClass('bg-white');
  });
});

it('should render correct icon for themes', (): void  => {
  const { rerender } = render(<ErrorMessage message="Test" onDismiss={vi.fn()} />);
  let iconContainer: ChildNode | null = screen.getByRole('alert').firstChild;
  expect(iconContainer).toHaveClass('text-red-500');

  vi.mocked(useTheme).mockReturnValueOnce({ theme: 'dark', toggleTheme: vi.fn() });
  rerender(<ErrorMessage message="Test" onDismiss={vi.fn()} />);
  iconContainer = screen.getByRole('alert').firstChild;
  expect(iconContainer).toHaveClass('text-red-300');
});
