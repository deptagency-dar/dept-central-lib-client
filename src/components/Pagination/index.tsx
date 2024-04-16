import { FC } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

interface PaginationProps {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div
      className={`flex items-center justify-center gap-4 justify-between ${className}`}
      data-testid="pagination-container"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`inline-flex gap-1 items-center justify-center w-28 h-8 rounded-full text-base font-semibold ${currentPage === 1 ? 'cursor-not-allowed text-gray-400 bg-white' : 'text-violet-800 hover:text-white bg-white hover:bg-indigo-500'} border-2 ${currentPage === 1 ? 'border-gray-300' : 'border-violet-700 hover:border-transparent'} focus:outline-none`}
      >
        <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-base font-semibold ${page === currentPage ? 'text-purple-800' : 'text-gray-700'} ${page === currentPage ? '' : 'hover:bg-purple-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            style={{
              backgroundColor:
                page === currentPage ? 'rgba(219, 211, 254, 1)' : 'transparent',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center justify-center w-28 h-8 rounded-full text-base font-semibold ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400 bg-white' : 'text-violet-800 hover:text-white bg-white hover:bg-indigo-500'} border-2 ${currentPage === totalPages ? 'border-gray-300' : 'border-violet-700 hover:border-transparent'} focus:outline-none`}
      >
        Next
        <ArrowRightIcon className="w-4 h-4 ml-2" aria-hidden="true" />
      </button>
    </div>
  )
}
