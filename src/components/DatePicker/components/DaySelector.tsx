import { FC, useState } from 'react'
import clx from 'classnames'
import { useDatePicker } from '../use-datepicker'

interface DaySelectorProps {
  year: number
  month: number
  isSecondCalendar?: boolean
  isRange?: boolean
  minDate?: Date
  maxDate?: Date
  onSelectDate: (day: number, isSecondCalendar?: boolean) => void
  shouldDisableDate?: (date: Date) => boolean
}

interface CalendarDay {
  day: number
  date: Date
  isCurrentMonth: boolean
  isDisabled: boolean
  isToday: boolean
}

const getMonthDays = (
  year: number,
  month: number,
  minDate?: Date,
  maxDate?: Date,
  shouldDisableDate: (date: Date) => boolean = () => false,
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDay = firstDay.getDay()
  const lastDateOfMonth = lastDay.getDate()

  minDate?.setHours(0, 0, 0)
  maxDate?.setHours(0, 0, 0)

  // Days of the current month
  const days = Array.from({ length: lastDateOfMonth }, (_, i) => {
    const day = i + 1
    const date = new Date(year, month, day)

    const isCurrentMonth = true

    const isDisabled =
      (minDate && date < minDate) ||
      (maxDate && date > maxDate) ||
      shouldDisableDate(date)

    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()

    return { day, date, isCurrentMonth, isDisabled, isToday }
  })

  // Days of the previous month
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()
  const daysFromPrevMonth = startDay === 0 ? 6 : startDay - 1

  const prevMonthDays = Array.from({ length: daysFromPrevMonth }, (_, i) => {
    const day = daysInPrevMonth - daysFromPrevMonth + i + 1
    const date = new Date(prevYear, prevMonth, day)
    return {
      day,
      date,
      isCurrentMonth: false,
      isDisabled: true,
      isToday: false,
    }
  })

  // Days of the next month
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const daysFromNextMonth = 42 - lastDateOfMonth - daysFromPrevMonth

  const nextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => {
    const day = i + 1
    const date = new Date(nextYear, nextMonth, day)
    return {
      day,
      date,
      isCurrentMonth: false,
      isDisabled: true,
      isToday: false,
    }
  })

  return [...prevMonthDays, ...days, ...nextMonthDays]
}

export const DaySelector: FC<DaySelectorProps> = ({
  year,
  month,
  isSecondCalendar,
  isRange,
  minDate,
  maxDate,
  onSelectDate,
  shouldDisableDate = () => false,
}) => {
  const { state } = useDatePicker()
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const isInRange = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false
    const current = new Date(date)
    const startDate = new Date(start)
    const endDate = new Date(end)

    // Reset time part
    ;[current, startDate, endDate].forEach((d) => d.setHours(0, 0, 0, 0))

    // Ensure start is before end
    const [rangeStart, rangeEnd] =
      startDate <= endDate ? [startDate, endDate] : [endDate, startDate]

    return current >= rangeStart && current <= rangeEnd
  }

  const isInHoverRange = (date: Date, hovered: Date | null) => {
    if (!state.startDate || !hovered) return false

    const current = new Date(date).setHours(0, 0, 0, 0)
    const startDate = new Date(state.startDate).setHours(0, 0, 0, 0)
    const hoveredDate = new Date(hovered).setHours(0, 0, 0, 0)

    return current >= startDate && current <= hoveredDate
  }

  const allDays = getMonthDays(year, month, minDate, maxDate, shouldDisableDate)

  return (
    <div className="grid grid-cols-7 gap-x-1.5 gap-y-1 place-items-center">
      {allDays.map(({ day, date, isCurrentMonth, isDisabled, isToday }) => {
        const startDate = state.startDate ? new Date(state.startDate) : null
        const endDate = state.endDate ? new Date(state.endDate) : null

        const isStartDate = startDate?.toDateString() === date.toDateString()
        const isEndDate = endDate?.toDateString() === date.toDateString()
        const isSelected = isStartDate || isEndDate

        const isInHoverRangeValue =
          isRange && !isSelected && isInHoverRange(date, hoveredDate)

        // Determine if the date is in the final range (once endDate is selected)
        const isInSelectedRange =
          startDate && endDate && isInRange(date, startDate, endDate)

        const isRangeItem =
          isCurrentMonth && !isStartDate && !isEndDate && isInSelectedRange

        return (
          <button
            key={date.toString()}
            type="button"
            className={clx(
              'w-10 h-10 flex justify-center items-center transition-colors rounded-full',
              'hover:bg-[--datepicker-hover-color]',
              'disabled:cursor-not-allowed disabled:line-through disabled:hover:bg-transparent',
              isInHoverRangeValue && 'bg-[--datepicker-hover-color]',
              isCurrentMonth ? 'text-grayscale-900' : 'text-grayscale-500',
              isRangeItem && 'bg-[--datepicker-range-item-color]',
              isSelected && 'bg-[--datepicker-scheme] !text-white',
              isToday && 'border-[1.5px] border-[--datepicker-scheme]',
            )}
            onClick={() => {
              isCurrentMonth && onSelectDate(day, isSecondCalendar)
            }}
            onMouseEnter={() => {
              setHoveredDate(date)
            }}
            onMouseLeave={() => {
              setHoveredDate(null)
            }}
            disabled={isDisabled}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}
