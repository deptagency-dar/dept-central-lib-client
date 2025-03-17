import { Option } from '../DatePicker.types'
import { Dropdown } from './Dropdown'

export const YearSelector = ({
  selectedYear,
  onChange,
}: {
  selectedYear: number
  onChange: (value: string) => void
}) => {
  const currentYear = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYear + 5

  const yearOptions: Option[] = []
  for (let year = minYear; year <= maxYear; year++) {
    yearOptions.push({ label: year?.toString(), value: year?.toString() })
  }

  return (
    <Dropdown
      options={yearOptions}
      onChange={onChange}
      selectedValue={selectedYear.toString()}
    />
  )
}
