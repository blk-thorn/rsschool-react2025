import { render, screen, fireEvent, act, waitFor, RenderResult } from '@testing-library/react';
import { Component, ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';
import { ConsoleError, renderFunction } from '@/types/test.types.ts';

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

  beforeEach((): void => {
    console.error = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });
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

  it('calls componentDidCatch and logs error', (): void => {
    const componentDidCatchSpy: MockInstance = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    renderWithError();
    expect(componentDidCatchSpy).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    componentDidCatchSpy.mockRestore();
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
});
