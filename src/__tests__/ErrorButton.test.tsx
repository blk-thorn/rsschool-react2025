import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, Mock } from 'vitest';
import { vi } from 'vitest';
import ErrorButton from '@/components/ErrorButton.tsx';

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

describe('Check ErrorButton', (): void => {

  it('calls onErrorClick when clicked', (): void => {
    const mockClick: Mock = vi.fn();
    render(<ErrorButton onErrorClick={mockClick} />);

    const button: HTMLElement = screen.getByRole('button', { name: /Error Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  })

});
