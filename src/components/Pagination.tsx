import { ReactNode } from 'react';
import type { EmptyVoid, PaginationProps } from '@/types/types.ts';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): ReactNode {
  const handleNextPage: EmptyVoid = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage: EmptyVoid = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-1 focus:outline-none focus:ring-sky-600 disabled:pointer-events-none cursor-pointer"
      >
        Prev
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-1 focus:outline-none focus:ring-sky-600 disabled:pointer-events-none cursor-pointer"
      >
        Next
      </button>
    </div>
  )
};
