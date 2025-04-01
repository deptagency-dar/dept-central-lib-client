import { FC } from 'react'
import { Option } from '../DatePicker.types'
import { Dropdown } from './Dropdown'
import { getMonthsByLocale } from '../../../utils/dates'

interface MonthSelectorProps {
  language: string
  selectedMonth: number
  onChange: (value: string) => void
}

export const MonthSelector: FC<MonthSelectorProps> = ({
  language = 'en',
  selectedMonth,
  onChange,
}) => {
  const months = getMonthsByLocale(language)

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
