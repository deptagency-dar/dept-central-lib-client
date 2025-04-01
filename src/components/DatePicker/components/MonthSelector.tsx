import { FC } from 'react'
import { Option } from '../DatePicker.types'
import { Dropdown } from './Dropdown'
import { getMonthsByLocale } from '../../../utils/dates'
import { useDatePicker } from '../use-datepicker'

interface MonthSelectorProps {
  selectedMonth: number
  onChange: (value: string) => void
}

export const MonthSelector: FC<MonthSelectorProps> = ({
  selectedMonth,
  onChange,
}) => {
  const { state } = useDatePicker()
  const months = getMonthsByLocale(state.language)

  const monthOptions: Option[] = months.map((month, index) => ({
    label: month,
    value: index.toString(),
  }))
  return (
    <Dropdown
      options={monthOptions}
      onChange={onChange}
      selectedValue={selectedMonth.toString()}
    />
  )
}
