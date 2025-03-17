// SearchInput.tsx
import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
} from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { classNames, getLightenColor } from '../../utils'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import typography from '../../styles/typography.module.css'

interface SelectOption {
  value: string
  label: string
  picture?: string
}
interface SearchInputOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  selectOptions?: SelectOption[]
  onClickSelect?: (option: SelectOption) => void
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
  | 'autoComplete'
>

export type SearchInputProps = SearchInputRootAttributes & SearchInputOwnProps

const createSearchStyles = (
  color: string,
  borderColor: string,
): Record<string, unknown> => ({
  '--search-scheme': color,
  '--search-border-color': borderColor,
})

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 500,
      disabled,
      placeholder,
      selectOptions,
      onClickSelect,
      ...rest
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [open, setOpen] = useState(false)
    const refInputContainer = useRef<HTMLDivElement>(null)
    const color = getColor(colorScheme, colorShade)
    const borderColor = getLightenColor(color, 80)

    const searchStyles = createSearchStyles(color, borderColor)
    const disabledClasses = disabled ? 'opacity-50' : ''

    useEffect(() => {
      if (selectOptions?.length) setOpen(true)
      else setOpen(false)
    }, [selectOptions])

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          refInputContainer.current &&
          !refInputContainer.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleOutsideClick)
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [open])

    const handleSelect = (option: SelectOption) => {
      onClickSelect?.(option)
      setOpen(false)
    }

    return (
      <div className="relative w-full" ref={refInputContainer}>
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
            onClick={() => {
              if (selectOptions?.length && !open) setOpen(true)
            }}
            {...rest}
          />
        </label>
        {open && (
          <div
            className={classNames(
              open ? 'block' : 'hidden',
              'absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg',
            )}
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              className={classNames(
                'max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm',
                typography.base,
              )}
            >
              {selectOptions?.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  role="option"
                  tabIndex={0}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-gray-900 h-12"
                >
                  <div className="flex items-center gap-2 h-full">
                    {option.picture ? (
                      <img
                        src={option.picture}
                        alt={option.label}
                        className="size-8 rounded-full"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="block truncate text-md">
                      {option.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
