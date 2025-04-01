import { FC } from 'react'
import { useDatePicker } from '../use-datepicker'
import {
  DaysOfWeek,
  MonthSelector,
  YearSelector,
  TimeSelector,
  DaySelector,
} from '.'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface CalendarProps {
  onMonthChange: (value: number) => void
  onSelectDate: (day: number, isSecondCalendar?: boolean) => void
  onYearChange: (value: number) => void
  maxDate?: Date
  minDate?: Date
  isSecondCalendar?: boolean
  isRange?: boolean
  shouldDisableDate?: (date: Date) => boolean
  withTime?: boolean
}

export const Calendar: FC<CalendarProps> = ({
  isSecondCalendar,
  isRange,
  minDate,
  maxDate,
  onMonthChange,
  onSelectDate,
  onYearChange,
  shouldDisableDate = () => false,
  withTime = false,
}) => {
  const { state } = useDatePicker()

  const handlePreviousMonth = () => {
    if (state.month === 0) {
      onYearChange(state.year - 1)
      onMonthChange(11)
    } else {
      onMonthChange(state.month - 1)
    }
  }

  const handleNextMonth = () => {
    if (state.month === 11) {
      onYearChange(state.year + 1)
      onMonthChange(0)
    } else {
      onMonthChange(state.month + 1)
    }
  }

  return (
    <div className="p-6 min-w-[24.5rem]">
      <div className="flex items-center text-gray-500 mb-2">
        {!isRange && (
          <button onClick={handlePreviousMonth}>
            <ChevronLeftIcon className="w-4 h-4 stroke stroke-gray-300" />
          </button>
        )}

        <div className="relative col-span-3 flex justify-center items-center w-full text-[16px]">
          <MonthSelector
            selectedMonth={isSecondCalendar ? state.secondMonth : state.month}
            onChange={(value) => onMonthChange(parseInt(value))}
          />
          <YearSelector
            selectedYear={isSecondCalendar ? state.secondYear : state.year}
            onChange={(value) => onYearChange(parseInt(value))}
          />
        </div>
        {!isRange && (
          <button onClick={handleNextMonth}>
            <ChevronRightIcon className="w-4 h-4 stroke stroke-gray-300" />
          </button>
        )}
      </div>

      <DaysOfWeek />

      <DaySelector
        year={isSecondCalendar ? state.secondYear : state.year}
        month={isSecondCalendar ? state.secondMonth : state.month}
        isSecondCalendar={isSecondCalendar}
        isRange={isRange}
        minDate={minDate}
        maxDate={maxDate}
        onSelectDate={onSelectDate}
        shouldDisableDate={shouldDisableDate}
      />

      {withTime && (
        <div className="pt-6">
          <TimeSelector />
        </div>
      )}
    </div>
  )
}
