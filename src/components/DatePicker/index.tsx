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
import { getColor, getLightenColor } from '../../utils'
import styles from './index.module.css'
import {
  getDateFormatByLocale,
  getDaysOfWeekByLocale,
  getMonthsByLocale,
  getDateStringByLocale,
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
): Record<string, unknown> => ({
  '--datepicker-scheme': color,
  '--datepicker-range-item-color': rangeItemColor,
  '--datepicker-disabled-color': disabledColor,
})

const DayOfWeek = ({ day }: { day: string }) => (
  <span className="m-px w-10 block text-center text-sm text-gray-500">
    {day}
  </span>
)

const MonthSelector = ({
  months,
  onChange,
}: {
  months: string[]
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
  const {
    state: { month },
  } = useDatePicker()

  return (
    <select
      className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
      value={month}
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
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
  const {
    state: { year },
  } = useDatePicker()

  return (
    <select
      className="px-2 py-1 border border-gray-300 rounded-md"
      value={year}
      onChange={onChange}
    >
      {Array.from({ length: 10 }, (_, index) => (
        <option key={index} value={year - 5 + index}>
          {year - 5 + index}
        </option>
      ))}
    </select>
  )
}

const DatePickerInput = ({
  className = '',
  style = {},
  disabled,
  onClick,
  ...rest
}: {
  onClick: () => void
  placeholder?: string
  className?: string
  style?: CSSProperties
  disabled?: boolean
  ref: ForwardedRef<HTMLInputElement>
}) => {
  const {
    state: { value },
  } = useDatePicker()

  return (
    <div className={`relative bg-white ${className}`} style={style}>
      <input
        type="text"
        onClick={onClick}
        disabled={disabled}
        defaultValue={value}
        readOnly
        {...rest}
        className="block w-full outline-none text-gray-400"
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent border-transparent"
        onClick={onClick}
        disabled={disabled}
      >
        <CalendarDaysIcon className="h-6 w-6 text-gray-400" />
      </button>
    </div>
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
  dateButtons,
  language,
  onMonthChange,
  onYearChange,
}: {
  dateButtons: JSX.Element[] | null
  language: string
  onMonthChange: (value: number) => void
  onYearChange: (value: number) => void
}) => {
  return (
    <div className="p-3">
      <div className="space-y-0.5">
        <div className="flex justify-center mb-3">
          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <MonthSelector
              months={getMonthsByLocale(language)}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
            />
            <YearSelector
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
    </div>
  )
}

interface DatePickerOwnProps {
  startDate?: Date
  endDate?: Date
  isRange?: boolean
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  maxDate?: Date
  minDate?: Date
  showFooter?: boolean
  config?: DatePickerConfig
  onChange?: (value: { startDate: Date; endDate?: Date }) => void
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

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
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
      onChange,
      disabled,
      showFooter,
      minDate,
      maxDate,
      placeholder,
    }: DatePickerProps,
    ref: ForwardedRef<HTMLInputElement>,
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
      value: getDateStringByLocale({
        isRange,
        startDate: initialStartDate ?? null,
        endDate: initialEndDate ?? null,
        language,
      }),
    })

    const datePickerRef = useRef<HTMLDivElement>(null)

    const color = getColor(colorScheme, colorShade)
    const disabledColor = getColor('grayscale', 100)
    const rangeItemColor = getLightenColor(color, 80)
    const datePickerStyles = createDatePickerStyles(
      color,
      rangeItemColor,
      disabledColor,
    )
    const datePickerClasses =
      `${styles.datepicker} ${disabled ? styles.disabled : ''}`.trim()
    const dateButtons = getCalendarDays(
      state.year,
      state.month,
      handleDateSelection,
      minDate,
      maxDate,
    )
    const secondDateButtons = isRange
      ? getCalendarDays(
          state.year,
          state.secondMonth,
          (day) => handleDateSelection(day, true),
          minDate,
          maxDate,
        )
      : null

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
      dispatch({
        type: 'SET_VALUE',
        payload: getDateStringByLocale({
          isRange,
          startDate: state.startDate,
          endDate: state.endDate,
          language,
        }),
      })
      handleToggleModal()
    }

    const handleHoverEffect = (id: string) => {
      resetCalendarStyles()
      const buttons = document.querySelectorAll<HTMLButtonElement>(
        `.${styles.day}:enabled`,
      )
      const selectedButton = Array.from(buttons).find((button) =>
        button.classList.contains(`${styles.selected}`),
      )
      const hoveredIndex = Array.from(buttons).findIndex(
        (button) => button.id === id,
      )

      if (selectedButton) {
        const selectedIndex = Array.from(buttons).indexOf(selectedButton)

        buttons.forEach((button, index) => {
          if (index > selectedIndex && index < hoveredIndex) {
            button.classList.contains(`${styles.selected}`) &&
              button.classList.remove(`${styles.selected}`)
            button.classList.add(`${styles.rangeItem}`)
          } else if (index === hoveredIndex) {
            button.classList.add(`${styles.selected}`)
          } else {
            index !== selectedIndex &&
              button.classList.remove(
                `${styles.rangeItem}`,
                `${styles.selected}`,
              )
          }
        })
      }
    }

    const resetCalendarStyles = () => {
      document
        .querySelectorAll<HTMLButtonElement>(`.${styles.day}:enabled`)
        .forEach((item) => item.classList.remove(`${styles.rangeItem}`))
    }

    function handleDateSelection(day: number, isSecondCalendar?: boolean) {
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
          dispatch({
            type: 'SET_VALUE',
            payload: getDateStringByLocale({
              isRange,
              startDate: selectedDate,
              language,
            }),
          })
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
          dispatch({
            type: 'SET_VALUE',
            payload: getDateStringByLocale({
              isRange,
              startDate: state.startDate,
              endDate: selectedDate,
              language,
            }),
          })

          handleToggleModal()
        }
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
        return { day, date, isCurrentMonth, isDisabled }
      })

      const prevMonth = month === 0 ? 11 : month - 1
      const prevYear = month === 0 ? year - 1 : year
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()
      const daysFromPrevMonth = startDay === 0 ? 6 : startDay - 1

      const prevMonthDays = Array.from(
        { length: daysFromPrevMonth },
        (_, i) => {
          const day = daysInPrevMonth - daysFromPrevMonth + i + 1
          const date = new Date(prevYear, prevMonth, day)
          const isCurrentMonth = false
          const isDisabled = true
          return { day, date, isCurrentMonth, isDisabled }
        },
      )

      const nextMonth = month === 11 ? 0 : month + 1
      const nextYear = month === 11 ? year + 1 : year
      const daysFromNextMonth = 42 - lastDateOfMonth - daysFromPrevMonth

      const nextMonthDays = Array.from(
        { length: daysFromNextMonth },
        (_, i) => {
          const day = i + 1
          const date = new Date(nextYear, nextMonth, day)
          const isCurrentMonth = false
          const isDisabled = true
          return { day, date, isCurrentMonth, isDisabled }
        },
      )

      const allDays = [...prevMonthDays, ...days, ...nextMonthDays]

      return allDays.map(({ day, date, isCurrentMonth, isDisabled }) => {
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
              isInRange && !isStartDate && !isEndDate
                ? `${styles.rangeItem}`
                : ''
            } ${isCurrentMonth && isDisabled ? 'line-through' : ''}`}
            onClick={() => isCurrentMonth && onSelectDate(day)}
            onMouseEnter={() =>
              isRange &&
              isCurrentMonth &&
              state.startDate &&
              !state.endDate &&
              handleHoverEffect(date.toString())
            }
            disabled={isDisabled}
          >
            <span className="text-sm">{day}</span>
          </button>
        )
      })
    }

    return (
      <DatePickerContext.Provider value={{ state, dispatch }}>
        <DatePickerInput
          placeholder={placeholder ?? getDateFormatByLocale(language)}
          onClick={handleToggleModal}
          className={datePickerClasses}
          style={datePickerStyles}
          disabled={disabled}
          ref={ref}
        />
        {state.modalOpen && (
          <div
            className=" mt-2 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden"
            style={datePickerStyles}
            ref={datePickerRef}
            role="dialog"
          >
            <div className="flex flex-row">
              <Calendar
                dateButtons={dateButtons}
                language={language}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
              {isRange && (
                <Calendar
                  dateButtons={secondDateButtons}
                  language={language}
                  onMonthChange={handleSecondMonthChange}
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
      </DatePickerContext.Provider>
    )
  },
)

DatePicker.displayName = 'DatePicker'
