import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Component, ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';
import ErrorBoundary from '@/features/ErrorBoundary.tsx';
import { ConsoleError } from '@/types/test.types.ts';

class ErrorThrower extends Component<{ shouldThrow?: boolean }> {
  render(): ReactNode {
    if (this.props.shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  }
}

describe('ErrorBoundary', (): void => {
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
    render(
      <ErrorBoundary>
        <div>Test child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test child')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('displays error message when child component throws', (): void => {
    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText('Please reload the page.')).toBeInTheDocument();
    expect(screen.getByText('Start Over')).toBeInTheDocument();
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
  });

  it('calls componentDidCatch and logs error', (): void => {
    const componentDidCatchSpy: MockInstance = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(componentDidCatchSpy).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    componentDidCatchSpy.mockRestore();
  });

  it('resets error state when Start Over button clicked', async (): Promise<void> => {
    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Start Over'));

    await waitFor((): void => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it('reloads page when Start Over button clicked', async (): Promise<void> => {
    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    const startOverButton: HTMLElement = screen.getByText('Start Over');

    await act(async (): Promise<void> => {
      fireEvent.click(startOverButton);
    });

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('matches snapshot when error occurs', (): void => {
    const { asFragment } = render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
