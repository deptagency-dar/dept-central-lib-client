import { FC, useState, useEffect } from 'react'
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getPageRange = () => {
    const pages = []
    let i = 1

    if (windowWidth > 400 && totalPages <= 6) {
      for (i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    while (i <= totalPages) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i)
        i++
      } else {
        pages.push('...')

        if (i < currentPage - 1) {
          i = currentPage - 1
        } else {
          i = totalPages
        }
      }
    }
    return pages
  }

  return (
    <div
      className={`flex items-center justify-center gap-1 justify-between sm:gap-4 ${className}`}
      data-testid="pagination-container"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex gap-1 items-center justify-center min-sm:w-20 h-6 sm:w-28 sm:h-8 rounded-full text-sm sm:text-base font-semibold cursor-pointer text-indigo-600 hover:text-white bg-white hover:bg-indigo-500 border-violet-700 hover:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-white disabled:border-gray-300"
      >
        <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex gap-1 sm:gap-2 items-center">
        {getPageRange().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-base font-semibold ${page === currentPage ? 'text-indigo-600 bg-violet-200' : 'text-gray-700 hover:text-white hover:bg-indigo-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="text-gray-500 flex items-center justify-center text-xs sm:text-base"
            >
              ...
            </span>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center min-sm:w-20 h-6 sm:w-28 sm:h-8 rounded-full text-sm sm:text-base font-semibold cursor-pointer text-indigo-600 hover:text-white bg-white hover:bg-indigo-500 border-violet-700 hover:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-white disabled:border-gray-300"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRightIcon className="w-4 h-4 ml-2" aria-hidden="true" />
      </button>
    </div>
  )
}
