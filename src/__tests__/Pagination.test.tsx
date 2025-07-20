import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@/components/Pagination';

describe('Check pagination', (): void => {
  const mockPageChange = vi.fn();

  it('renders current and total pages correctly', (): void => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables Prev button on first page', (): void => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockPageChange}
      />
    );

    const prevButton: HTMLElement  = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on last page', (): void => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={mockPageChange}
      />
    );

    const nextButton: HTMLElement  = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls correct page number when Next is clicked', (): void => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    );

    const nextButton: HTMLElement = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockPageChange).toHaveBeenCalledWith(3);
  });

  it('calls correct page number when Prev clicked', (): void => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    );

    const prevButton: HTMLElement = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

});
