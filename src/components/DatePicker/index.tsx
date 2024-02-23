import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  useState,
  CSSProperties,
  ChangeEventHandler,
  useEffect,
  useRef,
} from 'react'
import { ColorShade, ColorPalette } from '../../types'
import { getColor, getLightenColor } from '../../utils'
import styles from './index.module.css'

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
  onChange?: (value: { startDate: Date | null; endDate?: Date | null }) => void
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

const createDatePickerStyles = (
  color: string,
  rangeItemColor: string,
  disabledColor: string,
): Record<string, unknown> => ({
  '--datepicker-scheme': color,
  '--datepicker-range-item-color': rangeItemColor,
  '--datepicker-disabled-color': disabledColor,
})

const getLocale = (locale?: string): string => {
  if (!locale) {
    locale = navigator.language
  } else if (locale.length === 2) {
    locale = `${locale}-${locale.toUpperCase()}`
  }
  return locale
}

const getDateFormat = (language?: string): string => {
  const locale = getLocale(language)
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(new Date())

  const order = parts.map((part) => part.type)
  const formatMap: Record<string, string> = {
    year: 'yyyy',
    month: 'MM',
    day: 'dd',
  }
  const dateFormat = order
    .map((type, index) => formatMap[type] ?? parts[index].value)
    .join('')
    .toLocaleLowerCase()

  return dateFormat
}

const calculateValue = ({
  isRange,
  startDate,
  endDate,
  language,
}: {
  isRange: boolean
  startDate: Date | null
  endDate?: Date | null
  language?: string
}): string => {
  const config: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const locale = getLocale(language)
  if (isRange && startDate && endDate) {
    return `${new Intl.DateTimeFormat(locale, config).format(startDate)} ~ ${new Intl.DateTimeFormat(locale, config).format(endDate)}`
  }

  return startDate
    ? new Intl.DateTimeFormat(locale, config).format(startDate)
    : ''
}

const getDaysOfWeek = (language?: string): string[] => {
  const locale = getLocale(language)
  const daysOfWeek: string[] = []
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const currentYear = new Date().getUTCFullYear()

  for (let i = 0; i < 7; i++) {
    const day = new Date(Date.UTC(currentYear, 0, 2))
    day.setUTCDate(day.getUTCDate() + i)
    const dayOfWeek = formatter
      .format(day)
      .replace(/^\w/, (c) => c.toUpperCase())
    daysOfWeek.push(dayOfWeek)
  }

  return daysOfWeek
}

const getMonths = (language?: string): string[] => {
  const locale = getLocale(language)
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date()
    date.setMonth(index)
    return formatter.format(date).replace(/^\w/, (c) => c.toUpperCase())
  })
}

const DayOfWeek = ({ day }: { day: string }) => (
  <span className="m-px w-10 block text-center text-sm text-gray-500">
    {day}
  </span>
)

const MonthSelector = ({
  language,
  month,
  onChange,
}: {
  language: string
  month: number
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
  return (
    <select
      className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
      value={month}
      onChange={onChange}
    >
      {getMonths(language).map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  )
}

const YearSelector = ({
  year,
  onChange,
}: {
  year: number
  onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
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
  defaultValue?: string
  placeholder?: string
  className?: string
  style?: CSSProperties
  disabled?: boolean
  ref: ForwardedRef<HTMLInputElement>
}) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <input
        type="text"
        onClick={onClick}
        disabled={disabled}
        readOnly
        {...rest}
        className="block w-full outline-none text-gray-400"
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent border-transparent"
        onClick={onClick}
        disabled={disabled}
      >
        <svg
          className="h-6 w-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          ></path>
        </svg>
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
        className="ml-2 px-4 py-2 bg-[--datepicker-scheme] text-white rounded-md hover:bg-blue-600"
        onClick={onApply}
      >
        {apply}
      </button>
    </div>
  )
}

const Calendar = ({
  language,
  year,
  month,
  dateButtons,
  onMonthChange,
  onYearChange,
}: {
  language: string
  year: number
  month: number
  dateButtons: JSX.Element[] | null
  onMonthChange: (value: number) => void
  onYearChange: (value: number) => void
}) => {
  return (
    <div className="p-3">
      <div className="space-y-0.5">
        <div className="flex justify-center mb-3">
          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <MonthSelector
              language={language}
              month={month}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
            />
            <YearSelector
              year={year}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-center gap-x-1 pb-1.5">
          {getDaysOfWeek(language).map((day) => (
            <DayOfWeek key={day} day={day} />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{dateButtons}</div>
      </div>
    </div>
  )
}

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
    const [modalOpen, setModalOpen] = useState(false)
    const [year, setYear] = useState(new Date().getFullYear())
    const [secondYear, setSecondYear] = useState(year)
    const [month, setMonth] = useState(new Date().getMonth())
    const [secondMonth, setSecondMonth] = useState(month + 1)
    const [startDate, setStartDate] = useState<Date | null>(
      initialStartDate ?? null,
    )
    const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null)
    const [rangeDays, setRangeDays] = useState<Date[]>([])
    const [value, setValue] = useState(
      calculateValue({ isRange, startDate, endDate, language }),
    )
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
      year,
      month,
      handleDateSelection,
      minDate,
      maxDate,
    )
    const secondDateButtons = isRange
      ? getCalendarDays(
          year,
          secondMonth,
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
          setModalOpen(false)
        }
      }

      if (modalOpen) {
        document.addEventListener('mousedown', handleOutsideClick)
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [modalOpen])

    useEffect(() => {
      if (isRange && startDate && endDate) {
        const daysInRange = []
        const currentDate = new Date(startDate)
        while (currentDate <= endDate) {
          daysInRange.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
        setRangeDays(daysInRange)
      } else {
        setRangeDays([])
      }
    }, [isRange, startDate, endDate])

    const handleToggleModal = () => {
      setModalOpen((isOpen) => !isOpen)
    }

    const handleYearChange = (newYear: number) => {
      if (newYear > secondYear) {
        setYear(newYear)
        setSecondYear(newYear)
      } else {
        setYear(newYear)
      }
    }

    const handleMonthChange = (newMonth: number) => {
      if (
        year < secondYear ||
        (year === secondYear && newMonth < secondMonth)
      ) {
        setMonth(newMonth)
      } else {
        setMonth(newMonth)
        if (newMonth === 11) {
          setSecondMonth(0)
          setSecondYear(secondYear + 1)
        } else {
          setSecondMonth(newMonth + 1)
        }
      }
    }

    const handleSecondYearChange = (newYear: number) => {
      if (newYear < year) {
        setSecondYear(newYear)
        setYear(newYear)
      } else {
        setSecondYear(newYear)
      }
    }

    const handleSecondMonthChange = (newMonth: number) => {
      if (secondYear > year || (secondYear === year && newMonth > month)) {
        setSecondMonth(newMonth)
      } else {
        setSecondMonth(newMonth)
        if (secondYear === year && newMonth === 0) {
          setYear(year - 1)
          setMonth(11)
        } else {
          setMonth(month - 1)
        }
      }
    }

    const handleApply = () => {
      if (onChange) {
        onChange({ startDate, endDate })
      }
      setValue(calculateValue({ isRange, startDate, endDate, language }))
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
        year,
        isSecondCalendar ? secondMonth : month,
        day,
      )

      if (!isRange) {
        setStartDate(selectedDate)
        if (!showFooter) {
          if (onChange) {
            onChange({ startDate: selectedDate })
          }
          setValue(
            calculateValue({ isRange, startDate: selectedDate, language }),
          )
          handleToggleModal()
        }
      } else if (!startDate || endDate) {
        setStartDate(selectedDate)
        setEndDate(null)
        resetCalendarStyles()
      } else if (selectedDate < startDate) {
        setStartDate(selectedDate)
      } else {
        setEndDate(selectedDate)
        if (!showFooter) {
          if (onChange) {
            onChange({ startDate, endDate: selectedDate })
          }
          setValue(
            calculateValue({
              isRange,
              startDate,
              endDate: selectedDate,
              language,
            }),
          )
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
          startDate &&
          isCurrentMonth &&
          date.toDateString() === startDate.toDateString()
        const isEndDate =
          endDate &&
          isCurrentMonth &&
          date.toDateString() === endDate.toDateString()
        const isInRange =
          rangeDays &&
          rangeDays.some(
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
              startDate &&
              !endDate &&
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
      <>
        <DatePickerInput
          placeholder={placeholder ?? getDateFormat(language)}
          defaultValue={value}
          onClick={handleToggleModal}
          className={datePickerClasses}
          style={datePickerStyles}
          disabled={disabled}
          ref={ref}
        />
        {modalOpen && (
          <div
            className=" mt-2 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden"
            style={datePickerStyles}
            ref={datePickerRef}
            role="dialog"
          >
            <div className="flex flex-row">
              <Calendar
                language={language}
                year={year}
                month={month}
                dateButtons={dateButtons}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
              {isRange && (
                <Calendar
                  language={language}
                  year={secondYear}
                  month={secondMonth}
                  dateButtons={secondDateButtons}
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
      </>
    )
  },
)

DatePicker.displayName = 'DatePicker'
