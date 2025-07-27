import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    RouterProvider: vi.fn((): ReactElement => <div>RouterProvider Content</div>),
    createBrowserRouter: vi.fn(),
  };
});

vi.mock('@/features/ErrorBoundary.tsx', () => ({
  default: vi.fn(({ children }): ReactElement => <div>ErrorBoundary: {children}</div>),
}));

describe('App Component', (): void => {
  it('renders without crashing', (): void => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('contains RouterProvider within ErrorBoundary', (): void => {
    render(<App />);

    expect(ErrorBoundary).toHaveBeenCalled();

    expect(RouterProvider).toHaveBeenCalled();

    expect(document.body.textContent).toContain('ErrorBoundary: RouterProvider Content');
  });
});
