import { JSX } from 'react';
import { useTheme } from '@/context/UseTheme';
import type { EmptyVoid, PaginationProps } from '@/types/types.ts';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element {
  const {theme} = useTheme();

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
        className={`inline-flex items-center px-4 py-2 rounded-md ms-2 text-sm font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-sky-600 disabled:pointer-events-none transition-all duration-100 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300' : 'bg-sky-600  hover:bg-sky-700  focus:ring-sky-600 text-white'}`}
      >
        Prev
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`inline-flex items-center px-4 py-2 rounded-md ms-2 text-sm font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-sky-600 disabled:pointer-events-none transition-all duration-100 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300' : 'bg-sky-600  hover:bg-sky-700  focus:ring-sky-600 text-white'}`}
      >
        Next
      </button>
    </div>
  )
};
