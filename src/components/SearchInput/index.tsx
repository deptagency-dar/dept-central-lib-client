// SearchInput.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { getLightenColor } from '../../utils'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'

interface SearchInputOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
}

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

export type SearchInputProps = SearchInputRootAttributes & SearchInputOwnProps

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputRootAttributes
>(
  (
    {
      colorScheme = 'primary',
      colorShade = 500,
      placeholder,
      ...rest
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const borderColor = getLightenColor(color, 80)

    const disabledClasses = rest.disabled
      ? 'opacity-50 pointer-events-none'
      : ''

    return (
      <label htmlFor="search" className={`group relative ${disabledClasses}`}>
        <MagnifyingGlassIcon
          style={{ color }}
          className="absolute left-3 top-3 h-6 w-6 "
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          name="search"
          style={{ borderColor }}
          className="block w-full rounded-md border-0 focus:outline-none text-gray-500 placeholder-gray-500 p-4 gap-3 shadow group-hover:shadow-md pl-12 focus:border-b-2  focus:pb-[14px]"
          placeholder={placeholder}
          {...rest}
        />
      </label>
    )
  },
)

SearchInput.displayName = 'SearchInput'
