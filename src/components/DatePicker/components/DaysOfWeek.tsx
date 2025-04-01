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
      const dayOfWeek = formatter
        .format(day)
        .replace(/^\w/, (c) => c.toUpperCase())
      daysOfWeek.push(dayOfWeek)
    }

    return daysOfWeek
  }

  const daysOfWeek = getDaysOfWeekByLocale()

  return (
    <div className="flex justify-center gap-x-1 pb-1.5">
      {daysOfWeek.map((day) => (
        <span key={day} className="m-px w-8 block text-center text-gray-900">
          {day}
        </span>
      ))}
    </div>
  )
}
