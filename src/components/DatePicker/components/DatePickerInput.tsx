import { CSSProperties, useRef } from 'react'
import { useDatePicker } from '../use-datepicker'
import { getDateStringByLocale } from '../../../utils/dates'

export const DatePickerInput = ({
  className = '',
  style = {},
  isRange = false,
  language = 'en',
  disabled,
  onClick,
  onBlur,
  ...rest
}: {
  onClick: () => void
  onBlur?: (value?: { startDate?: Date; endDate?: Date }) => void
  language?: string
  isRange?: boolean
  placeholder?: string
  className?: string
  style?: CSSProperties
  disabled?: boolean
}) => {
  const {
    state: { startDate, endDate },
  } = useDatePicker()
  const ref = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    ref.current?.focus()
    onClick()
  }

  return (
    <>
      <input
        className={`relative bg-transparent block w-full outline-none text-gray-400 ${className}`}
        style={style}
        type="text"
        onClick={onClick}
        onBlur={() =>
          onBlur &&
          onBlur({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
          })
        }
        disabled={disabled}
        defaultValue={getDateStringByLocale({
          isRange,
          startDate,
          endDate,
          language,
        })}
        readOnly
        ref={ref}
        {...rest}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent border-transparent"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
            stroke="#101828"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  )
}
