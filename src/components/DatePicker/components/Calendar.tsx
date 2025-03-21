import { FC } from 'react'
import { getDaysOfWeekByLocale, getMonthsByLocale } from '../../../utils/dates'
import { useDatePicker } from '../use-datepicker'
import { DayOfWeek } from './DayOfWeek'
import { MonthSelector } from './MonthSelector'
import { YearSelector } from './YearSelector'
import styles from '../index.module.css'
import { TimeSelector } from './TimeSelector'

interface CalendarProps {
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
  withTime?: boolean
}

export const Calendar: FC<CalendarProps> = ({
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
  withTime = false,
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
            ${alwaysOpen || isDisabled ? '' : 'hover:bg-[--datepicker-hover-color]'}
          `}
          onClick={() => {
            isCurrentMonth && onSelectDate(day)
          }}
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
      {withTime && (
        <div className="p-3">
          <TimeSelector />
        </div>
      )}
    </div>
  )
}
