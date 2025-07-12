import { Component, ReactElement } from 'react';
import type { EmptyVoid, PaginationProps } from '@/types/types.ts';

class Pagination extends Component<PaginationProps> {
  handleNextPage: EmptyVoid = (): void => {
    if (this.props.currentPage < this.props.totalPages) {
      this.props.onPageChange(this.props.currentPage + 1);
    }
  }

  handlePrevPage: EmptyVoid = (): void => {
    if (this.props.currentPage > 1) {
      this.props.onPageChange(this.props.currentPage - 1);
    }
  }

  render(): ReactElement {
    const { currentPage, totalPages } = this.props;

    return (
      <div className="flex justify-center my-4">
        <button
          onClick={this.handlePrevPage}
          disabled={currentPage === 1}
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300 disabled:pointer-events-none cursor-pointer"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={this.handleNextPage}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300 disabled:pointer-events-none cursor-pointer"
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination;
