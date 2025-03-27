import React from 'react';

import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  onPageChange: (page: number) => void;
}

/**
 * Reusable Pagination Component
 * Can be used with any paginated content
 * @param param0 Component properties
 * @returns React component
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPageNumbers = true,
  className = '',
}) => {
  // Generate page numbers array
  const pageNumbers: Array<number> = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calculate visible page numbers (show 5 at a time with current page in center when possible)
  const getVisiblePageNumbers = (): Array<number | string> => {
    if (totalPages <= 7) return pageNumbers;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const visiblePages: Array<number | string> = [];

    if (startPage > 1) {
      visiblePages.push(1);
      if (startPage > 2) visiblePages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) visiblePages.push('...');
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-1 my-6 ${className}`}
    >
      {/* First page button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="İlk Sayfa"
          title="İlk Sayfa"
        >
          <ChevronsLeft size={20} className="stroke-2" />
        </button>
      )}

      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:bg-neutral-800"
        aria-label="Önceki Sayfa"
        title="Önceki Sayfa"
      >
        <ArrowLeft size={18} className="stroke-2" />
      </button>

      {/* Page numbers */}
      {showPageNumbers &&
        getVisiblePageNumbers().map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-neutral-600 dark:text-neutral-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={currentPage === page}
              className={`flex items-center justify-center min-w-[36px] h-9 px-3 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
              aria-label={`Sayfa ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:bg-neutral-800"
        aria-label="Sonraki Sayfa"
        title="Sonraki Sayfa"
      >
        <ArrowRight size={18} className="stroke-2" />
      </button>

      {/* Last page button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Son Sayfa"
          title="Son Sayfa"
        >
          <ChevronsRight size={20} className="stroke-2" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
