import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useReducer,
} from 'react'
import { ColorShade, ColorPalette } from '../../types'
import {
  classNames,
  getColor,
  getDarkenColor,
  getLightenColor,
} from '../../utils'
import styles from './index.module.css'
import { getDateFormatByLocale } from '../../utils/dates'
import { DatePickerContext, datePickerReducer } from './use-datepicker'
import { Calendar, DatePickerInput } from './components'

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
                  shouldDisableDate={shouldDisableDate}
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
                    shouldDisableDate={shouldDisableDate}
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
