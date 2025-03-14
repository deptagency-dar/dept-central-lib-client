import { FC, useState, useRef, useEffect } from 'react'
import { SearchInput } from '../SearchInput'
import { classNames } from '../../utils'
import typography from '../../styles/typography.module.css'

interface SelectOption {
  value: string
  label: string
  picture?: string
}

interface SearchSelectProps {
  options: SelectOption[]
  placeholder: string
  disabled?: boolean
  onSelected: (option: SelectOption) => void
}

export const SearchSelect: FC<SearchSelectProps> = ({
  options,
  placeholder,
  disabled,
  onSelected,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    if (searchTerm) setOpen(true)
    else setOpen(false)
  }, [searchTerm, options])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
    onSelected(option)
    setSearchTerm('')
    setOpen(false)
  }

  return (
    <div className="relative w-full" ref={ref}>
      <SearchInput
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        disabled={disabled}
        autoComplete="off"
        onClick={() => {
          if (!open && searchTerm) setOpen(true)
        }}
      />
      {open && filteredOptions.length > 0 && (
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
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                role="option"
                tabIndex={0}
                className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-gray-900 h-12"
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
                  <span className="block truncate text-md">{option.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
