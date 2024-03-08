import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  CSSProperties,
  ChangeEventHandler,
  useEffect,
  useRef,
  useReducer,
} from 'react'
import { CalendarDaysIcon } from '@heroicons/react/16/solid'
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

const DayOfWeek = ({ day }: { day: string }) => (
  <span className="m-px w-10 block text-center text-sm text-gray-500">
    {day}
  </span>
)

const MonthSelector = ({
  selectedMonth,
  months,
  onChange,
}: {
  selectedMonth: number
  months: string[]
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
  return (
    <select
      className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
      value={selectedMonth}
      onChange={onChange}
    >
      {months.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  )
}

const YearSelector = ({
  selectedYear,
  onChange,
}: {
  selectedYear: number
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
  return (
    <select
      className="px-2 py-1 border border-gray-300 rounded-md"
      value={selectedYear}
      onChange={onChange}
    >
      {Array.from({ length: 10 }, (_, index) => (
        <option key={index} value={selectedYear - 5 + index}>
          {selectedYear - 5 + index}
        </option>
      ))}
    </select>
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
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent border-transparent"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <CalendarDaysIcon className="h-6 w-6 text-gray-400" />
      </button>
    </>
  )
}

const FooterActions = ({
  labels: { cancel, apply },
  onApply,
  onCancel,
}: {
  labels: FooterLabels
  onApply: () => void
  onCancel: () => void
}) => {
  return (
    <div className="flex justify-end p-3 bg-gray-100 dark:bg-slate-800 border-t dark:border-gray-700">
      <button
        className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onCancel}
      >
        {cancel}
      </button>
      <button
        className="ml-2 px-4 py-2 bg-[--datepicker-scheme] text-white rounded-md hover:opacity-80"
        onClick={onApply}
      >
        {apply}
      </button>
    </div>
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
}: {
  language: string
  onMonthChange: (value: number) => void
  onSelectDate: (day: number, isSecondCalendar?: boolean) => void
  onYearChange: (value: number) => void
  maxDate?: Date
  minDate?: Date
  isSecondCalendar?: boolean
  isRage?: boolean
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
      const isDisabled = dateTime < minDateTime || dateTime > maxDateTime
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
      const isStartDate =
        state.startDate &&
        isCurrentMonth &&
        date.toDateString() === state.startDate.toDateString()
      const isEndDate =
        state.endDate &&
        isCurrentMonth &&
        date.toDateString() === state.endDate.toDateString()
      const isInRange =
        state.rangeDays &&
        state.rangeDays.some(
          (rangeDate) => date.toDateString() === rangeDate.toDateString(),
        )

      return (
        <button
          key={date.toString()}
          id={date.toString()}
          type="button"
          className={`${styles.day} ${
            !isCurrentMonth ? 'text-gray-400 cursor-not-allowed' : ''
          } ${isStartDate || isEndDate ? `${styles.selected}` : ''} ${
            isInRange && !isStartDate && !isEndDate && isCurrentMonth
              ? `${styles.rangeItem}`
              : ''
          } ${isCurrentMonth && isDisabled ? 'line-through' : ''} ${isToday ? 'text-[--datepicker-scheme]' : ''}`}
          onClick={() => isCurrentMonth && onSelectDate(day)}
          onMouseEnter={() =>
            isCurrentMonth && handleHoverEffect(date.toString())
          }
          disabled={isDisabled}
        >
          <span className="text-sm">{day}</span>
        </button>
      )
    })
  }

  return (
    <div className="p-3">
      <div className="flex justify-center mb-3">
        <div className="col-span-3 flex justify-center items-center gap-x-1">
          <MonthSelector
            selectedMonth={isSecondCalendar ? state.secondMonth : state.month}
            months={getMonthsByLocale(language)}
            onChange={(e) => onMonthChange(parseInt(e.target.value))}
          />
          <YearSelector
            selectedYear={isSecondCalendar ? state.secondYear : state.year}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
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
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  maxDate?: Date
  minDate?: Date
  showFooter?: boolean
  config?: DatePickerConfig
  errorMessage?: string
  onChange?: (value: { startDate: Date; endDate?: Date }) => void
  onBlur?: (value?: { startDate?: Date; endDate?: Date }) => void
}

type DatePickerConfig = {
  language: string
  footer: FooterLabels
}

type FooterLabels = {
  cancel: string
  apply: string
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
      config = {
        language: 'en',
        footer: {
          cancel: 'Cancel',
          apply: 'Apply',
        },
      },
      isRange = false,
      startDate: initialStartDate,
      endDate: initialEndDate,
      disabled,
      label,
      showFooter,
      minDate,
      maxDate,
      placeholder,
      isRequired,
      errorMessage,
      onChange,
      onBlur,
    }: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { language, footer: footerLabels } = config
    const [state, dispatch] = useReducer(datePickerReducer, {
      startDate: initialStartDate ?? null,
      endDate: initialEndDate ?? null,
      modalOpen: false,
      year: new Date().getFullYear(),
      secondYear: new Date().getFullYear(),
      month: new Date().getMonth(),
      secondMonth: new Date().getMonth() + 1,
      rangeDays: [],
    })

    const datePickerRef = useRef<HTMLDivElement>(null)

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
    }, [state.modalOpen])

    useEffect(() => {
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
    }, [isRange, state.startDate, state.endDate])

    useEffect(() => {
      const startDate = initialStartDate ?? null
      const endDate = initialEndDate ?? null
      if (onChange) {
        onChange({ startDate: initialStartDate!, endDate: initialEndDate })
      }
      dispatch({ type: 'SET_START_DATE', payload: startDate })
      dispatch({ type: 'SET_END_DATE', payload: endDate })
    }, [initialStartDate, initialEndDate, isRange, language, onChange, onBlur])

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

    const handleApply = () => {
      if (onChange) {
        onChange({ startDate: state.startDate!, ...state.endDate })
      }
      handleToggleModal()
    }

    const resetCalendarStyles = () => {
      document
        .querySelectorAll<HTMLButtonElement>(`.${styles.day}:enabled`)
        .forEach((item) => item.classList.remove(`${styles.rangeItem}`))
    }

    const handleDateSelection = (day: number, isSecondCalendar?: boolean) => {
      const selectedDate = new Date(
        state.year,
        isSecondCalendar ? state.secondMonth : state.month,
        day,
      )

      if (!isRange) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
        if (!showFooter) {
          if (onChange) {
            onChange({ startDate: selectedDate })
          }
          handleToggleModal()
        }
      } else if (!state.startDate || state.endDate) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
        dispatch({ type: 'SET_END_DATE', payload: null })
        resetCalendarStyles()
      } else if (selectedDate < state.startDate) {
        dispatch({ type: 'SET_START_DATE', payload: selectedDate })
      } else {
        dispatch({ type: 'SET_END_DATE', payload: selectedDate })
        if (!showFooter) {
          if (onChange) {
            onChange({ startDate: state.startDate, endDate: selectedDate })
          }

          handleToggleModal()
        }
      }
    }

    const getDefaultPlaceholder = (): string => {
      const displayFormat = getDateFormatByLocale(language)
      return isRange ? `${displayFormat} - ${displayFormat}` : displayFormat
    }

    return (
      <DatePickerContext.Provider value={{ state, dispatch }}>
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
            language={language}
            isRange={isRange}
            placeholder={placeholder ?? getDefaultPlaceholder()}
            onClick={handleToggleModal}
            onBlur={onBlur}
            className={datePickerInputClasses}
            disabled={disabled}
          />
          {state.modalOpen && (
            <div
              className="absolute z-10 mt-1 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden"
              ref={datePickerRef}
              role="dialog"
            >
              <div className="flex flex-row">
                <Calendar
                  language={language}
                  isRage={isRange}
                  minDate={minDate}
                  maxDate={maxDate}
                  onMonthChange={handleMonthChange}
                  onSelectDate={handleDateSelection}
                  onYearChange={handleYearChange}
                />
                {isRange && (
                  <Calendar
                    language={language}
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
              {showFooter && (
                <FooterActions
                  labels={footerLabels}
                  onApply={handleApply}
                  onCancel={handleToggleModal}
                />
              )}
            </div>
          )}
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
