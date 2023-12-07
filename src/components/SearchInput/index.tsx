// SearchInput.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'

interface SearchInputOwnProps {
  placeholder: string
}

type SearchInputRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'id'
  | 'name'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'size'
>

export type SearchInputProps = SearchInputRootAttributes & SearchInputOwnProps

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { placeholder, ...rest }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const disabledClasses = rest.disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
      <label className="relative mt-2 flex items-center text-gray-500 font-semibold">
        <input
          type="text"
          name="search"
          id="search"
          ref={ref}
          className={`block w-full rounded-lg border-0 py-3 px-3 pr-12  shadow-sm ring-1 ring-inset ring-gray-300 outline-none ${disabledClasses}`}
          placeholder={placeholder}
          {...rest}
        />
        <div
          className={`absolute right-0 border-l-2 h-full flex items-center justify-center px-3 ${disabledClasses}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </label>
    )
  },
)

SearchInput.displayName = 'SearchInput'
