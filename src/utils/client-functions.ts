'use client'

import { useRef } from 'react'

// eslint-disable-next-line
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  return (...args: Parameters<T>) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
