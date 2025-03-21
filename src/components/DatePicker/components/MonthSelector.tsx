import { FC } from 'react'
import { Option } from '../DatePicker.types'
import { Dropdown } from './Dropdown'

interface MonthSelectorProps {
  selectedMonth: number
  months: string[]
  onChange: (value: string) => void
}

export const MonthSelector: FC<MonthSelectorProps> = ({
  selectedMonth,
  months,
  onChange,
}) => {
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
