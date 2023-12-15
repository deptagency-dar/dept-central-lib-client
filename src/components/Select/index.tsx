// Select.tsx
import { FC, Fragment, useCallback, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
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

  if (!options) throw new Error('Options are required.')

  const handleOnChange = useCallback(
    (option: SelectOption) => {
      setSelected(option)
      onChange(option)
    },
    [onChange],
  )

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      {({ open }) => (
        <div className="relative mt-2 w-full">
          <Listbox.Button
            className={classNames(
              open && 'border-b-2 border-primary-600',
              disabled && 'pointer-events-none opacity-50',
              'relative w-full min-w-[15rem] rounded-md cursor-default bg-white py-4 pl-6 pr-16 text-left  shadow-md focus:outline-none',
            )}
          >
            {label && (
              <Listbox.Label className="block text-sm leading-5 text-gray-800 mb-4">
                {label}
              </Listbox.Label>
            )}
            {selected ? (
              <span className="block truncate">{selected.label}</span>
            ) : (
              <span className="block truncate text-gray-400">
                {placeholder}
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              {open ? (
                <ChevronUpIcon
                  className="h-8 w-8 text-primary-600"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="h-8 w-8 text-gray-900"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span
                      className={classNames(
                        selected ? 'font-semibold' : 'font-normal',
                        'block truncate',
                      )}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
