import { useDatePicker } from '../use-datepicker'
import { getLocale } from '../../../utils/dates'

export const DaysOfWeek = () => {
  const { state } = useDatePicker()

  const getDaysOfWeekByLocale = (): string[] => {
    const locale = getLocale(state.language)
    const daysOfWeek: string[] = []
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
    const currentYear = new Date().getUTCFullYear()

    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.UTC(currentYear, 0, 0))
      day.setUTCDate(day.getUTCDate() + i)

      const dayOfWeek = formatter.format(day)

      daysOfWeek.push(dayOfWeek)
    }

    return daysOfWeek
  }

  const daysOfWeek = getDaysOfWeekByLocale()

  return (
    <div className="grid grid-cols-7 gap-x-1.5 gap-y-1 place-items-center mb-2">
      {daysOfWeek.map((day) => (
        <span
          key={day}
          className="w-10 h-10 flex justify-center items-center text-center text-gray-900"
        >
          {day}
        </span>
      ))}
    </div>
  )
}
