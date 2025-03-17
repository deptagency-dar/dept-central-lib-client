import { Option } from '../DatePicker.types'
import { Dropdown } from './Dropdown'

export const MonthSelector = ({
  selectedMonth,
  months,
  onChange,
}: {
  selectedMonth: number
  months: string[]
  onChange: (value: string) => void
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
