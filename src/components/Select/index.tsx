// Select.tsx
import { FC, useCallback, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { classNames } from '../../utils'

export interface SelectOption {
  label: string
  value: string
}
interface SelectProps {
  label: string
  options: SelectOption[]
  placeholder: string
  disabled?: boolean
  onChange: (option: SelectOption) => void
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  placeholder,
  disabled,
  onChange,
}) => {
  const [selected, setSelected] = useState<SelectOption>()
  const [open, setOpen] = useState(false)

  if (!options) throw new Error('Options are required.')

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
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">
              {selected ? selected.label : placeholder}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <li
                key={option.value}
                id="listbox-item-0"
                role="option"
                className={classNames(
                  selected?.value === option.value
                    ? 'text-white bg-indigo-600'
                    : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                )}
                onClick={() => handleOnChange(option)}
              >
                <div className="flex items-center">
                  <span
                    className={classNames(
                      selected?.value === option.value
                        ? 'font-semibold'
                        : 'font-normal',
                      'ml-3 block truncate',
                    )}
                  >
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
