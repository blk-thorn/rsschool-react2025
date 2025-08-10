import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import RefreshButton from '@/components/RefreshButton.tsx';
import { ThemeProvider } from '@/context/ThemeContext';

const queryClient = new QueryClient();
const mockInvalidateQueries: Mock = vi.fn();
queryClient.invalidateQueries = mockInvalidateQueries;

describe('RefreshButton', (): void  => {
  it('renders refresh button with icon', (): void  => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RefreshButton />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('shows loader when refreshing', async (): Promise<void> => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RefreshButton />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('Refresh'));
    await waitFor((): void => {
      expect(screen.getByText('Refreshing...')).toBeInTheDocument();
    });
  });

  it('shows error when offline', async (): Promise<void> => {
    Object.defineProperty(window, 'navigator', {
      value: { onLine: false },
      writable: true
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RefreshButton />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('Refresh'));
    await waitFor((): void  => {
      expect(screen.getByText('No internet connection')).toBeInTheDocument();
    });
  });
});
