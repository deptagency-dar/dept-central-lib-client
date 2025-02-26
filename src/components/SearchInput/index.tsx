// SearchInput.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { classNames, getLightenColor } from '../../utils'
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

const createSearchStyles = (
  color: string,
  borderColor: string,
): Record<string, unknown> => ({
  '--search-scheme': color,
  '--search-border-color': borderColor,
})

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputRootAttributes
>(
  (
    {
      colorScheme = 'primary',
      colorShade = 500,
      disabled,
      placeholder,
      ...rest
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const borderColor = getLightenColor(color, 80)

    const searchStyles = createSearchStyles(color, borderColor)
    const disabledClasses = disabled ? 'opacity-50' : ''

    return (
      <>
        <label
          htmlFor="search"
          className={`group relative ${disabledClasses}`}
          style={searchStyles}
        >
          <MagnifyingGlassIcon
            className={classNames(
              !disabled ? 'text-[--search-scheme]' : 'opacity-50',
              'absolute left-3 top-3 h-6 w-6',
            )}
            aria-hidden="true"
          />
          <input
            ref={ref}
            type="search"
            name="search"
            className={classNames(
              disabled ? 'cursor-not-allowed' : '',
              'block w-full h-[3rem] rounded-md focus:outline-none focus:border-[--search-border-color] text-gray-500 placeholder-gray-500 py-4 pr-4 pl-12 gap-3 shadow  group-hover:shadow-md disabled:cursor-not-allowed',
            )}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
        </label>
      </>
    )
  },
)

SearchInput.displayName = 'SearchInput'
