import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, it, expect, vi, Mock } from 'vitest';
import ErrorMessage from '@/components/ErrorMessage.tsx';

vi.mock('@/context/ThemeContext', () => ({
  useTheme: (): { theme: string } => ({ theme: 'light' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }): ReactNode => children,
}));

describe('ErrorMessage', (): void => {
  it('renders error message and calls onDismiss when clicked', (): void  => {
    const mockDismiss: Mock = vi.fn();
    render(<ErrorMessage message="Test error" onDismiss={mockDismiss} />);

    expect(screen.getByText('Test error')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockDismiss).toHaveBeenCalled();
  });

  it('renders with correct icon', (): void  => {
    render(<ErrorMessage message="Test" onDismiss={(): void => {}} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});
