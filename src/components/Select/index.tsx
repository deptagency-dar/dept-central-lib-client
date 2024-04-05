// Select.tsx
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { classNames, getLightenColor } from '../../utils'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import typography from '../../styles/typography.module.css'

export interface SelectOption {
  label: string
  value: string
}
export interface SelectProps {
  options: SelectOption[]
  placeholder: string
  label?: string
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  errorMessage?: string
  disabled?: boolean
  isRequired?: boolean
  hint?: string;
  onChange: (option: SelectOption) => void
  onBlur?: (option?: SelectOption) => void
}

const createSelectStyles = (
  color: string,
  borderColor: string,
  errorColor: string,
): Record<string, unknown> => ({
  '--select-scheme': color,
  '--select-border-color': borderColor,
  '--select-error-color': errorColor,
})

export const Select: FC<SelectProps> = ({
  colorScheme = 'primary',
  colorShade = 600,
  errorMessage,
  label,
  options,
  placeholder,
  disabled,
  isRequired,
  hint,
  onChange,
  onBlur,
}) => {
  const [selected, setSelected] = useState<SelectOption>()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const selectContent = document.querySelector('.select-content');
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (onBlur) {
          onBlur(selected)
        }
        if (selectContent && !selectContent.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onBlur, open, selected])

  if (!options) throw new Error('Options are required.')

  const color = getColor(colorScheme, colorShade)
  const borderColor = getLightenColor(color, 80)
  const errorColor = getColor('error', 500)

  const handleOnChange = useCallback(
    (option: SelectOption) => {
      setSelected(option)
      onChange(option)
      setOpen(false)
    },
    [onChange],
  )

  const Icon = open ? ChevronUpIcon : ChevronDownIcon

  return (
    <div
      className="relative flex flex-col gap-2 items-start w-full"
      style={createSelectStyles(color, borderColor, errorColor)}
    >
      {label && (
        <label
          htmlFor="listbox"
          className={classNames(
            disabled ? 'opacity-50' : '',
            isRequired
              ? 'after:content-["*"] after:ml-0.5 after:text-red-500'
              : '',
            typography.smallBold,
          )}
        >
          {label}
        </label>
      )}
      <div className="relative w-full select-content">
        <button
          type="button"
          disabled={disabled}
          data-testid="select"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className={classNames(
            disabled ? 'cursor-not-allowed opacity-50' : '',
            errorMessage ? 'border-2 border-[--select-error-color]' : '',
            'relative w-full h-[3rem] bg-white border rounded-md shadow-sm py-3 px-4 text-left cursor-default focus:border-[--select-scheme] focus:border-2',
            typography.base,
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center mr-6">
            <span className="block truncate">
              {selected ? selected.label : placeholder}
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Icon
              className={classNames(
                open ? 'text-[--select-scheme]' : '',
                'h-6 w-6 text-black',
              )}
              aria-hidden="true"
            />
          </span>
        </button>
        <div
          className={classNames(
            open ? 'block' : 'hidden',
            'absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg',
          )}
          ref={ref}
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
            {options.map((option) => (
              <li
                key={option.value}
                id="listbox-item-0"
                role="option"
                tabIndex={0}
                className={classNames(
                  selected?.value === option.value
                    ? 'bg-gray-50'
                    : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100',
                )}
                onClick={() => handleOnChange(option)}
                onKeyDown={(key) =>
                  key.code === 'Enter' && handleOnChange(option)
                }
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate text-md">
                    {option.label}
                  </span>
                </div>
                {selected?.value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[--select-scheme]">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {hint && <span className="font-sans text-sm font-normal leading-[18px] tracking-[0.01em] text-left text-gray-500">{hint}</span>}
      {errorMessage && (
        <small
          className={classNames(
            'text-[--select-error-color]',
            typography.small,
          )}
        >
          {errorMessage}
        </small>
      )}
    </div>
  )
}
