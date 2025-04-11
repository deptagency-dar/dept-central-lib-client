'use client'

import { Select, SelectOption } from '../../Select'
import { useDatePicker } from '../use-datepicker'

const generateOption = (v: string) => ({
  label: v,
  value: v,
})

const HOURS = Array.from({ length: 12 }, (_, i) =>
  generateOption((i + 1).toString().padStart(2, '0')),
)

const MINUTES = Array.from({ length: 12 }, (_, i) =>
  generateOption((i * 5).toString().padStart(2, '0')),
)

const TIME = ['AM', 'PM'].map(generateOption)

export const TimeSelector = () => {
  const { state, dispatch } = useDatePicker()

  const currentDate = state.startDate ? new Date(state.startDate) : null
  const currentHour = currentDate ? currentDate.getHours() : null
  const currentMinutes = currentDate
    ? Math.ceil(currentDate.getMinutes() / 5) * 5
    : null

  const isPM = currentHour !== null && currentHour >= 12
  const displayHour =
    currentHour !== null
      ? currentHour % 12 === 0
        ? 12
        : currentHour % 12
      : null

  const hour =
    currentHour !== null
      ? HOURS.find(
          (option) => option.value === displayHour?.toString().padStart(2, '0'),
        )
      : undefined

  const minutes =
    currentMinutes !== null
      ? MINUTES.find(
          (option) =>
            option.value === currentMinutes.toString().padStart(2, '0'),
        )
      : undefined

  const period = currentHour !== null ? (isPM ? TIME[1] : TIME[0]) : undefined

  const handleChange = (
    option: SelectOption,
    type: 'hour' | 'minutes' | 'period',
  ) => {
    const newDate = state.startDate ? new Date(state.startDate) : new Date()

    if (type === 'hour') {
      let value = parseInt(option.value) || 0
      if (period?.value === 'PM' && value !== 12) value += 12
      if (period?.value === 'AM' && value === 12) value = 0
      newDate.setHours(value)
    }

    if (type === 'minutes') {
      newDate.setMinutes(parseInt(option.value) || 0)
    }

    if (type === 'period') {
      const hours = newDate.getHours()
      if (option.value === 'PM' && hours < 12) {
        newDate.setHours(hours + 12)
      } else if (option.value === 'AM' && hours >= 12) {
        newDate.setHours(hours - 12)
      }
    }

    dispatch({ type: 'SET_START_DATE', payload: newDate })
  }

  return (
    <div className="flex gap-4 text-grayscale-900">
      <Select
        small
        options={HOURS}
        placeholder="--"
        selectedOption={hour}
        onChange={(option) => handleChange(option, 'hour')}
      />

      <Select
        small
        options={MINUTES}
        placeholder="--"
        selectedOption={minutes}
        onChange={(option) => handleChange(option, 'minutes')}
      />

      <Select
        small
        options={TIME}
        placeholder="--"
        selectedOption={period}
        onChange={(option) => handleChange(option, 'period')}
      />
    </div>
  )
}
