import { render, screen, fireEvent, act, waitFor, RenderResult } from '@testing-library/react';
import { Component, ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';
import { ConsoleError, renderFunction } from '@/types/test.types.ts';

vi.mock('@/context/ThemeContext.tsx', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/context/ThemeContext.tsx')>();
  return {
    ...actual,
    useTheme: vi.fn((): { theme: string } => ({ theme: 'light' })),
  };
});

class ErrorThrower extends Component<{ shouldThrow?: boolean }> {
  render(): ReactNode {
    if (this.props.shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  }
}

const renderWithError: renderFunction = (shouldThrow: boolean = true): RenderResult => {
  return render(
    <ErrorBoundary>
      <ErrorThrower shouldThrow={shouldThrow} />
    </ErrorBoundary>
  );
};

const renderWithoutError: renderFunction = (): RenderResult => {
  return render(
    <ErrorBoundary>
      <div>Test child</div>
    </ErrorBoundary>
  );
};

describe('Check ErrorBoundary', (): void => {
  const originalConsoleError: ConsoleError = console.error;
  const originalLocation: Location = window.location;
  let useThemeMock: ReturnType<typeof vi.fn>;

  beforeEach(async (): Promise<void> => {
    console.error = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });

    const themeModule = await import('@/context/ThemeContext.tsx');
    useThemeMock = themeModule.useTheme as ReturnType<typeof vi.fn>;
    useThemeMock.mockReturnValue({ theme: 'light' });
  });

  afterEach((): void => {
    console.error = originalConsoleError;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', (): void => {
    renderWithoutError();
    expect(screen.getByText('Test child')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('displays error message when child component throws', (): void => {
    renderWithError();
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText('Please reload the page.')).toBeInTheDocument();
    expect(screen.getByText('Start Over')).toBeInTheDocument();
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
  });

  it('logs error when child component throws', (): void => {
    renderWithError();
    expect(console.error).toHaveBeenCalled();
  });

  it('resets error state when Start Over button clicked', async (): Promise<void> => {
    renderWithError();
    fireEvent.click(screen.getByText('Start Over'));
    await waitFor((): void => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it('reloads page when Start Over button clicked', async (): Promise<void> => {
    renderWithError();
    await act(async (): Promise<void> => {
      fireEvent.click(screen.getByText('Start Over'));
    });
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('renders with dark theme correctly', () => {
    useThemeMock.mockReturnValue({ theme: 'dark' });
    renderWithError();
    expect(screen.getByText('Something went wrong...')).toHaveClass('text-red-400');
  });

  it('renders with light theme correctly', () => {
    useThemeMock.mockReturnValue({ theme: 'light' });
    renderWithError();
    expect(screen.getByText('Something went wrong...')).toHaveClass('text-sky-600');
  });
});
