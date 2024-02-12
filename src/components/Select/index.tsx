// Select.tsx
import { FC, useCallback, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { classNames, getLightenColor } from '../../utils'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'

export interface SelectOption {
  label: string
  value: string
}
export interface SelectProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  label: string
  options: SelectOption[]
  placeholder: string
  disabled?: boolean
  onChange: (option: SelectOption) => void
}

export const Select: FC<SelectProps> = ({
  colorScheme = 'primary',
  colorShade = 600,
  label,
  options,
  placeholder,
  disabled,
  onChange,
}) => {
  const [selected, setSelected] = useState<SelectOption>()
  const [open, setOpen] = useState(false)

  if (!options) throw new Error('Options are required.')

  const color = getColor(colorScheme, colorShade)
  const borderColor = getLightenColor(color, 80)

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
    <div className="relative">
      <label
        htmlFor="listbox"
        className="block text-sm font-medium text-secondary-700"
      >
        {label}
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          disabled={disabled}
          data-testid="select"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          style={{ borderColor, outlineColor: color }}
          className="relative w-full min-w-[18rem] bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">
              {selected ? selected.label : placeholder}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon
              className="h-5 w-5 text-gray-400"
              style={{ color }}
              aria-hidden="true"
            />
          </span>
        </button>
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
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <li
                key={option.value}
                id="listbox-item-0"
                role="option"
                tabIndex={0}
                style={{ outlineColor: color }}
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
                  <span
                    className={classNames(
                      selected?.value === option.value
                        ? 'text-white'
                        : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    )}
                    style={{ color }}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
