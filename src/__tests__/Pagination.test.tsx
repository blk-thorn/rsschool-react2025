import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@/components/Pagination';
import { ThemeProvider } from '@/context/ThemeContext';

describe('Check pagination', (): void => {
  const mockPageChange = vi.fn();

  const renderPagination = (props: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    return render(
      <ThemeProvider>
        <Pagination {...props} />
      </ThemeProvider>
    );
  };

  it('renders current and total pages correctly', (): void => {
    renderPagination({
      currentPage: 2,
      totalPages: 5,
      onPageChange: mockPageChange,
    });

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables Prev button on first page', (): void => {
    renderPagination({
      currentPage: 1,
      totalPages: 3,
      onPageChange: mockPageChange,
    });

    const prevButton: HTMLElement = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on last page', (): void => {
    renderPagination({
      currentPage: 3,
      totalPages: 3,
      onPageChange: mockPageChange,
    });

    const nextButton: HTMLElement = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls correct page number when Next is clicked', (): void => {
    renderPagination({
      currentPage: 2,
      totalPages: 5,
      onPageChange: mockPageChange,
    });

    const nextButton: HTMLElement = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockPageChange).toHaveBeenCalledWith(3);
  });

  it('calls correct page number when Prev clicked', (): void => {
    renderPagination({
      currentPage: 3,
      totalPages: 5,
      onPageChange: mockPageChange,
    });

    const prevButton: HTMLElement = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });
});
