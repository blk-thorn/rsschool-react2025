import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import App from '@/App';

vi.mock('@/features/ErrorBoundary.tsx', () => ({
  default: ({ children }: { children: React.ReactNode }): ReactElement => (
    <div data-testid="error-boundary">{children}</div>
  )
}));

vi.mock('@/pages/HomePage/HomePage', () => ({
  default: (): ReactElement => <div data-testid="home-page">HomePage Content</div>
}));

describe('App Component', (): void => {
  it('renders without crashing', (): void => {
    render(<App />);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('wraps HomePage with ErrorBoundary', (): void => {
    render(<App />);
    const errorBoundary: HTMLElement = screen.getByTestId('error-boundary');
    expect(errorBoundary).toContainElement(screen.getByTestId('home-page'));
  });

});
