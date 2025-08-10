import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RefreshLoader from '@/components/RefreshLoader.tsx';


describe('RefreshLoader', (): void => {
  it('renders with default text', (): void => {
    render(<RefreshLoader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('flex items-center');
  });

  it('applies custom className and renders with custom text', (): void => {
    render(<RefreshLoader className="custom-class" text="Refreshing..." />);
    const loader: HTMLElement = screen.getByRole('status');
    expect(loader).toHaveClass('custom-class');
    expect(screen.getByText('Refreshing...')).toBeInTheDocument();
  });
});
