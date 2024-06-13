import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  CSSProperties,
  useEffect,
  useRef,
  useReducer,
  useState,
} from 'react'
import { ColorShade, ColorPalette } from '../../types'
import {
  classNames,
  getColor,
  getDarkenColor,
  getLightenColor,
} from '../../utils'
import styles from './index.module.css'
import {
  getDateFormatByLocale,
  getDateStringByLocale,
  getDaysOfWeekByLocale,
  getMonthsByLocale,
} from '../../utils/dates'
import {
  DatePickerContext,
  datePickerReducer,
  useDatePicker,
} from './use-datepicker'

const createDatePickerStyles = (
  color: string,
  rangeItemColor: string,
  disabledColor: string,
  hoverColor: string,
  selectedHoverColor: string,
  errorColor: string,
): Record<string, unknown> => ({
  '--datepicker-scheme': color,
  '--datepicker-range-item-color': rangeItemColor,
  '--datepicker-disabled-color': disabledColor,
  '--datepicker-hover-color': hoverColor,
  '--datepicker-selected-hover-color': selectedHoverColor,
  '--datepicker-error-color': errorColor,
})

interface Option {
  value: string
  label: string
}

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

const Dropdown = ({ options, onChange, selectedValue }: DropdownProps) => {
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
        className="bg-white rounded-md px-2 py-1 text-gray-800 hover:bg-gray-300 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
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

const DayOfWeek = ({ day }: { day: string }) => (
  <span className="m-px w-8 block text-center text-gray-500">{day}</span>
)

const MonthSelector = ({
  selectedMonth,
  months,
  onChange,
}: {
  selectedMonth: number
  months: string[]
  onChange: (value: string) => void
}) => {
  const monthOptions: Option[] = months.map((month, index) => ({
    label: month,
    value: index.toString(),
  }))
  return (
    <Dropdown
      options={monthOptions}
      onChange={onChange}
      selectedValue={selectedMonth.toString()}
    />
  )
}

const YearSelector = ({
  selectedYear,
  onChange,
}: {
  selectedYear: number
  onChange: (value: string) => void
}) => {
  const currentYear = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYear + 5

  const yearOptions: Option[] = []
  for (let year = minYear; year <= maxYear; year++) {
    yearOptions.push({ label: year?.toString(), value: year?.toString() })
  }

  return (
    <Dropdown
      options={yearOptions}
      onChange={onChange}
      selectedValue={selectedYear.toString()}
    />
  )
}

const DatePickerInput = ({
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

const Calendar = ({
  language,
  isSecondCalendar,
  isRage,
  minDate,
  maxDate,
  onMonthChange,
  onSelectDate,
  onYearChange,
  shouldDisableDate = () => false,
  alwaysOpen,
}: {
  language: string
  onMonthChange: (value: number) => void
  onSelectDate: (day: number, isSecondCalendar?: boolean) => void
  onYearChange: (value: number) => void
  maxDate?: Date
  minDate?: Date
  isSecondCalendar?: boolean
  isRage?: boolean
  shouldDisableDate?: (date: Date) => boolean
  alwaysOpen?: boolean
}) => {
  const { state } = useDatePicker()

  const dateButtons = isSecondCalendar
    ? getCalendarDays(
        state.secondYear,
        state.secondMonth,
        (day) => onSelectDate(day, isSecondCalendar),
        minDate,
        maxDate,
      )
    : getCalendarDays(state.year, state.month, onSelectDate, minDate, maxDate)

  const handleHoverEffect = (id: string) => {
    if (!state.modalOpen) return

    const buttons = document.querySelectorAll<HTMLButtonElement>(
      `.${styles.day}:enabled`,
    )
    const selectedButtons = Array.from(buttons).filter((button) =>
      button.classList.contains(styles.selected),
    )
    const hoveredIndex = Array.from(buttons).findIndex(
      (button) => button.id === id,
    )

    if (isRage && state.startDate && !state.endDate && selectedButtons[0]) {
      const selectedIndex = Array.from(buttons).indexOf(selectedButtons[0])
      buttons.forEach((button, index) => {
        if (index > selectedIndex && index < hoveredIndex) {
          button.classList.contains(styles.selected) &&
            button.classList.remove(styles.selected)
          button.classList.add(styles.rangeItem)
        } else if (index === hoveredIndex) {
          button.classList.add(styles.selected)
        } else {
          index !== selectedIndex &&
            button.classList.remove(styles.rangeItem, styles.selected)
        }
      })
    } else {
      const selectedIndex = Array.from(buttons).indexOf(selectedButtons[0])
      const selectedIndexSecond = Array.from(buttons).indexOf(
        selectedButtons[1],
      )
      buttons.forEach((button, index) => {
        if (
          selectedButtons.length > 0 &&
          (selectedIndex === hoveredIndex ||
            selectedIndexSecond === hoveredIndex) &&
          index === hoveredIndex
        ) {
          button.classList.add(styles.selectedHover)
        } else if (index === hoveredIndex) {
          button.classList.add(styles.hovered)
        } else {
          button.classList.remove(styles.hovered, styles.selectedHover)
        }
      })
    }
  }

  function getCalendarDays(
    year: number,
    month: number,
    onSelectDate: (day: number, isSecondCalendar?: boolean) => void,
    minDate?: Date,
    maxDate?: Date,
  ) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDay = firstDay.getDay()
    const lastDateOfMonth = lastDay.getDate()

    minDate?.setHours(0, 0, 0)
    maxDate?.setHours(0, 0, 0)
    const minDateTime = minDate?.getTime() || Number.MIN_VALUE
    const maxDateTime = maxDate?.getTime() || Number.MAX_VALUE

    const days = Array.from({ length: lastDateOfMonth }, (_, i) => {
      const day = i + 1
      const date = new Date(year, month, day)
      const isCurrentMonth = true
      const dateTime = date.getTime()
      const isDisabled =
        dateTime < minDateTime ||
        dateTime > maxDateTime ||
        shouldDisableDate(date)
      const isToday = day === new Date().getDate() && !isSecondCalendar
      return { day, date, isCurrentMonth, isDisabled, isToday }
    })

    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()
    const daysFromPrevMonth = startDay === 0 ? 6 : startDay - 1

    const prevMonthDays = Array.from({ length: daysFromPrevMonth }, (_, i) => {
      const day = daysInPrevMonth - daysFromPrevMonth + i + 1
      const date = new Date(prevYear, prevMonth, day)
      const isCurrentMonth = false
      const isDisabled = true
      const isToday = false
      return { day, date, isCurrentMonth, isDisabled, isToday }
    })

    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    const daysFromNextMonth = 42 - lastDateOfMonth - daysFromPrevMonth

    const nextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => {
      const day = i + 1
      const date = new Date(nextYear, nextMonth, day)
      const isCurrentMonth = false
      const isDisabled = true
      const isToday = false
      return { day, date, isCurrentMonth, isDisabled, isToday }
    })

    const allDays = [...prevMonthDays, ...days, ...nextMonthDays]

    return allDays.map(({ day, date, isCurrentMonth, isDisabled, isToday }) => {
      const startDate = state.startDate ? new Date(state.startDate) : null
      const endDate = state.endDate ? new Date(state.endDate) : null

      const isStartDate =
        startDate instanceof Date &&
        isCurrentMonth &&
        date.toDateString() === startDate.toDateString()
      const isEndDate =
        endDate instanceof Date &&
        isCurrentMonth &&
        date.toDateString() === endDate.toDateString()
      const isInRange =
        state.rangeDays &&
        state.rangeDays.some(
          (rangeDate) =>
            rangeDate instanceof Date &&
            date.toDateString() === rangeDate.toDateString(),
        )

      return (
        <button
          key={date.toString()}
          id={date.toString()}
          type="button"
          className={`
            ${styles.day} ${!isCurrentMonth ? 'text-gray-400 cursor-not-allowed' : ''} 
            ${isStartDate || isEndDate ? `${styles.selected}` : ''} 
            ${isInRange && !isStartDate && !isEndDate && isCurrentMonth ? `${styles.rangeItem}` : ''}
            ${isCurrentMonth && isDisabled ? 'line-through' : ''} 
            ${isToday ? 'text-[--datepicker-scheme]' : ''}
            ${alwaysOpen ? '' : 'hover:bg-[--datepicker-hover-color]'}
          `}
          onClick={() => isCurrentMonth && onSelectDate(day)}
          onMouseEnter={() =>
            isCurrentMonth && handleHoverEffect(date.toString())
          }
          disabled={isDisabled}
        >
          <span>{day}</span>
        </button>
      )
    })
  }

  return (
    <div className="p-3">
      <div className="flex justify-center mb-3">
        <div className="relative col-span-3 flex justify-center items-center gap-x-1">
          <MonthSelector
            selectedMonth={isSecondCalendar ? state.secondMonth : state.month}
            months={getMonthsByLocale(language)}
            onChange={(value) => onMonthChange(parseInt(value))}
          />
          <span className="text-gray-800 dark:text-gray-200">/</span>
          <YearSelector
            selectedYear={isSecondCalendar ? state.secondYear : state.year}
            onChange={(value) => onYearChange(parseInt(value))}
          />
        </div>
      </div>
      <div className="flex justify-center gap-x-1 pb-1.5">
        {getDaysOfWeekByLocale(language).map((day) => (
          <DayOfWeek key={day} day={day} />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{dateButtons}</div>
    </div>
  )
}

interface DatePickerOwnProps {
  label?: string
  startDate?: Date
  endDate?: Date
  isRange?: boolean
  isRequired?: boolean
  alwaysOpen?: boolean
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  maxDate?: Date
  minDate?: Date
  i18n?: string
  hint?: string
  errorMessage?: string
  onChange?: (value: { startDate: Date; endDate?: Date }) => void
  onBlur?: (value?: { startDate?: Date; endDate?: Date }) => void
  shouldDisableDate?: (date: Date) => boolean
}

type DatePickerRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'required' | 'placeholder'
>

export type DatePickerProps = DatePickerRootAttributes & DatePickerOwnProps

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      i18n = 'en',
      isRange = false,
      startDate: initialStartDate,
      endDate: initialEndDate,
      disabled,
      label,
      minDate,
      maxDate,
      placeholder,
      isRequired,
      errorMessage,
      hint,
      alwaysOpen = false,
      onChange,
      onBlur,
      shouldDisableDate,
    }: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const startDateObj = initialStartDate ? new Date(initialStartDate) : null
    const endDateObj = initialEndDate ? new Date(initialEndDate) : null

    const [state, dispatch] = useReducer(datePickerReducer, {
      startDate: initialStartDate ?? null,
      endDate: initialEndDate ?? null,
      modalOpen: alwaysOpen,
      year: startDateObj
        ? startDateObj.getFullYear()
        : new Date().getFullYear(),
      secondYear: endDateObj
        ? endDateObj.getFullYear()
        : new Date().getFullYear(),
      month: startDateObj ? startDateObj.getMonth() : new Date().getMonth(),
      secondMonth: endDateObj
        ? endDateObj.getMonth()
        : new Date().getMonth() + 1,
      rangeDays: [],
    })

    const datePickerRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    const color = getColor(colorScheme, colorShade)
    const disabledColor = getColor('grayscale', 100)
    const rangeItemColor = getLightenColor(color, 70)
    const hoverColor = getLightenColor(color, 80)
    const selectedHoverColor = getDarkenColor(color)
    const errorColor = getColor('error', 500)
    const datePickerStyles = createDatePickerStyles(
      color,
      rangeItemColor,
      disabledColor,
      hoverColor,
      selectedHoverColor,
      errorColor,
    )
    const datePickerInputClasses =
      `${styles.datepickerInput} ${disabled ? styles.disabled : ''}`.trim()

    useEffect(() => {
      if (alwaysOpen) return

      const handleOutsideClick = (event: MouseEvent) => {
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(event.target as Node)
        ) {
          dispatch({ type: 'TOGGLE_MODAL' })
        }
      }

      if (state.modalOpen) {
        document.addEventListener('mousedown', handleOutsideClick)
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [state.modalOpen, alwaysOpen])

    useEffect(() => {
      if (!state.modalOpen) return
      if (isRange && state.startDate && state.endDate) {
        const daysInRange = []
        const currentDate = new Date(state.startDate)
        while (currentDate <= state.endDate) {
          daysInRange.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
        dispatch({ type: 'SET_RANGE_DAYS', payload: daysInRange })
      } else {
        dispatch({ type: 'SET_RANGE_DAYS', payload: [] })
      }
    }, [isRange, state.endDate, state.modalOpen, state.startDate])

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      const startDate = initialStartDate ?? null
      const endDate = initialEndDate ?? null
      if (onChange) {
        onChange({ startDate: initialStartDate!, endDate: initialEndDate })
      }
      dispatch({ type: 'SET_START_DATE', payload: startDate })
      dispatch({ type: 'SET_END_DATE', payload: endDate })
    }, [initialStartDate, initialEndDate, onChange])

    const handleToggleModal = () => {
      dispatch({ type: 'TOGGLE_MODAL' })
    }

    const handleYearChange = (newYear: number) => {
      if (newYear > state.secondYear) {
        dispatch({ type: 'SET_YEAR', payload: newYear })
        dispatch({ type: 'SET_SECOND_YEAR', payload: newYear })
      } else {
        dispatch({ type: 'SET_YEAR', payload: newYear })
      }
    }

    const handleMonthChange = (newMonth: number) => {
      if (
        state.year < state.secondYear ||
        (state.year === state.secondYear && newMonth < state.secondMonth)
      ) {
        dispatch({ type: 'SET_MONTH', payload: newMonth })
      } else {
        dispatch({ type: 'SET_MONTH', payload: newMonth })
        if (newMonth === 11) {
          dispatch({ type: 'SET_SECOND_MONTH', payload: 0 })
          dispatch({ type: 'SET_SECOND_YEAR', payload: state.secondYear + 1 })
        } else {
          dispatch({ type: 'SET_SECOND_MONTH', payload: newMonth + 1 })
        }
      }
    }

    const handleSecondYearChange = (newYear: number) => {
      if (newYear < state.year) {
        dispatch({ type: 'SET_SECOND_YEAR', payload: newYear })
        dispatch({ type: 'SET_YEAR', payload: newYear })
      } else {
        dispatch({ type: 'SET_SECOND_YEAR', payload: newYear })
      }
    }

    const handleSecondMonthChange = (newMonth: number) => {
      if (
        state.secondYear > state.year ||
        (state.secondYear === state.year && newMonth > state.month)
      ) {
        dispatch({ type: 'SET_SECOND_MONTH', payload: newMonth })
      } else {
        dispatch({ type: 'SET_SECOND_MONTH', payload: newMonth })
        if (state.secondYear === state.year && newMonth === 0) {
          dispatch({ type: 'SET_YEAR', payload: state.year - 1 })
          dispatch({ type: 'SET_MONTH', payload: 11 })
        } else {
          dispatch({ type: 'SET_MONTH', payload: state.month - 1 })
        }
      }
    }

    const resetCalendarStyles = () => {
      document
        .querySelectorAll<HTMLButtonElement>(`.${styles.day}:enabled`)
        .forEach((item) => item.classList.remove(`${styles.rangeItem}`))
    }

    const handleDateSelection = (day: number, isSecondCalendar?: boolean) => {
      const selectedDate = new Date(
        isSecondCalendar ? state.secondYear : state.year,
        isSecondCalendar ? state.secondMonth : state.month,
        day,
      )

      if (!isRange) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
        if (onChange) {
          onChange({ startDate: selectedDate })
        }
        handleToggleModal()
      } else if (!state.startDate || state.endDate) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
        dispatch({ type: 'SET_END_DATE', payload: null })
        resetCalendarStyles()
      } else if (selectedDate < state.startDate) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
      } else {
        dispatch({ type: 'SET_END_DATE', payload: selectedDate })
        if (onChange) {
          onChange({ startDate: state.startDate, endDate: selectedDate })
        }

        handleToggleModal()
      }
    }

    const getDefaultPlaceholder = (): string => {
      const displayFormat = getDateFormatByLocale(i18n)
      return isRange ? `${displayFormat} - ${displayFormat}` : displayFormat
    }

    if (alwaysOpen) {
      return (
        <DatePickerContext.Provider value={{ state, dispatch }}>
          <div className="flex flex-col gap-2 items-start w-full">
            <div style={datePickerStyles} id="datepicker" ref={ref}>
              <div className={styles.calendar}>
                <Calendar
                  language={i18n}
                  isRage={isRange}
                  minDate={minDate}
                  maxDate={maxDate}
                  onMonthChange={handleMonthChange}
                  onSelectDate={handleDateSelection}
                  onYearChange={handleYearChange}
                  alwaysOpen={alwaysOpen}
                />
              </div>
            </div>
            {errorMessage && (
              <small className={styles.errorMessage} style={datePickerStyles}>
                {errorMessage}
              </small>
            )}
          </div>
        </DatePickerContext.Provider>
      )
    }

    return (
      <DatePickerContext.Provider value={{ state, dispatch }}>
        <div className="flex flex-col gap-2 items-start w-full">
          {label && (
            <label
              htmlFor="datepicker"
              className={classNames(
                isRequired
                  ? 'after:content-["*"] after:ml-0.5 after:text-red-500'
                  : '',
                styles.label,
              )}
            >
              {label}
            </label>
          )}
          <div
            className={classNames(
              errorMessage ? styles.error : '',
              'relative',
              styles.datepicker,
            )}
            style={datePickerStyles}
            id="datepicker"
            ref={ref}
          >
            <DatePickerInput
              language={i18n}
              isRange={isRange}
              placeholder={placeholder ?? getDefaultPlaceholder()}
              onClick={handleToggleModal}
              onBlur={(e) => {
                !state.modalOpen && onBlur && onBlur(e)
              }}
              className={datePickerInputClasses}
              disabled={disabled}
            />
            {state.modalOpen && (
              <div
                className={styles.datePickerModal}
                ref={datePickerRef}
                role="dialog"
              >
                <Calendar
                  language={i18n}
                  isRage={isRange}
                  minDate={minDate}
                  maxDate={maxDate}
                  onMonthChange={handleMonthChange}
                  onSelectDate={handleDateSelection}
                  onYearChange={handleYearChange}
                  {...(!isRange ? { shouldDisableDate } : {})}
                />
                {isRange && (
                  <Calendar
                    language={i18n}
                    isRage={isRange}
                    isSecondCalendar={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    onMonthChange={handleSecondMonthChange}
                    onSelectDate={handleDateSelection}
                    onYearChange={handleSecondYearChange}
                  />
                )}
              </div>
            )}
            {hint && (
              <span className="pt-1 fixed font-sans text-sm font-normal leading-[18px] tracking-[0.01em] text-left text-gray-500">
                {hint}
              </span>
            )}
          </div>
          {errorMessage && (
            <small className={styles.errorMessage} style={datePickerStyles}>
              {errorMessage}
            </small>
          )}
        </div>
      </DatePickerContext.Provider>
    )
  },
)

DatePicker.displayName = 'DatePicker'
