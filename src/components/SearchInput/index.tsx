// SearchInput.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

type SearchInputRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'value'
  | 'onChange'
  | 'id'
  | 'name'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'size'
  | 'placeholder'
>

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputRootAttributes
>(
  (
    { placeholder, ...rest }: SearchInputRootAttributes,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const disabledClasses = rest.disabled
      ? 'opacity-50 pointer-events-none'
      : ''

    return (
      <label htmlFor="search" className={`group relative ${disabledClasses}`}>
        <MagnifyingGlassIcon
          className="absolute left-3 top-3 h-6 w-6 text-gray-700 group-hover:text-primary-600"
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          name="search"
          className="block w-full rounded-md border-0 focus:outline-none text-gray-500 placeholder-gray-500 p-4 gap-3 shadow group-hover:shadow-md pl-12 focus:border-b-2 focus:border-primary-600 focus:pb-[14px]"
          placeholder={placeholder}
          {...rest}
        />
      </label>
    )
  },
)

SearchInput.displayName = 'SearchInput'
