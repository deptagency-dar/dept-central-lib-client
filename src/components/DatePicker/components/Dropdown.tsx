'use client'

import { useEffect, useRef, useState } from 'react'
import { Option } from '../DatePicker.types'

interface DropdownProps {
  options: Option[]
  onChange: (selectedValue: string) => void
  selectedValue: string
}

function getSelectedIndex(
  options: Option[],
  selectedValue: string,
): number | null {
  const index = options.findIndex((option) => option.value === selectedValue)
  return index !== -1 ? index : null
}

export const Dropdown = ({
  options,
  onChange,
  selectedValue,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<number | null>(
    getSelectedIndex(options, selectedValue),
  )

  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setSelectedPosition(getSelectedIndex(options, selectedValue))
  }, [options, selectedValue])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && selectedPosition !== null && ref.current) {
      const selectedItem = ref.current.children[
        selectedPosition
      ] as HTMLUListElement
      if (selectedItem) {
        const scrollOffset = selectedItem.offsetTop - ref.current.offsetTop
        ref.current.scrollTop = scrollOffset
      }
    }
  }, [isOpen, selectedPosition])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setSelectedPosition(getSelectedIndex(options, selectedValue))
  }

  const handleSelect = (value: string, index: number) => {
    onChange(value)
    setIsOpen(false)
    setSelectedPosition(index)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white rounded-md px-2 py-1 focus:outline-none"
        onClick={handleToggle}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          'Select an option'}
      </button>
      {isOpen && (
        <ul
          ref={ref}
          className="absolute max-h-40 min-w-fit overflow-y-auto z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer ${
                selectedValue === option.value ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSelect(option.value, index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
