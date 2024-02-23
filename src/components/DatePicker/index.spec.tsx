import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { DatePicker } from '.'

describe('Test DatePicker component', () => {
  it('renders DatePicker correctly', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        startDate={new Date()}
        placeholder="Select date"
        onChange={() => {}}
      />,
    )
    const datePicker = getByPlaceholderText('Select date')
    expect(datePicker).toBeInTheDocument()
  })

  it('renders disabled DatePicker', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        startDate={new Date()}
        placeholder="Select date"
        onChange={() => {}}
        disabled
      />,
    )
    const datePicker = getByPlaceholderText('Select date') as HTMLInputElement
    expect(datePicker.disabled).toBe(true)
  })

  it('opens the calendar modal on input click', () => {
    render(<DatePicker />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.click(inputElement)
    const calendarModal = screen.getByRole('dialog')
    expect(calendarModal).toBeInTheDocument()
  })

  it('selects a date on button click', () => {
    render(<DatePicker />)
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.click(inputElement) // Open calendar modal
    const dateButton = screen.getByRole('button', { name: '15' })
    fireEvent.click(dateButton)
    const value = inputElement.value
    expect(value).toContain('15')
  })

  it('closes the calendar modal on apply button click', () => {
    render(<DatePicker showFooter />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.click(inputElement) // Open calendar modal
    const applyButton = screen.getByRole('button', { name: 'Apply' })
    fireEvent.click(applyButton)
    const calendarModal = screen.queryByRole('dialog')
    expect(calendarModal).not.toBeInTheDocument()
  })

  it('updates the value when endDate is changed in range mode', () => {
    render(<DatePicker isRange />)
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.click(inputElement) // Open calendar modal
    const startDateButton = screen.getAllByRole('button', { name: '15' })[0]
    fireEvent.click(startDateButton) // Select start date
    const endDateButton = screen.getAllByRole('button', { name: '16' })[0]
    fireEvent.click(endDateButton) // Select end date
    const value = inputElement.value
    expect(value).toContain('15')
    expect(value).toContain('16')
    expect(value).toContain('~')
  })

  it('changes month correctly', () => {
    render(<DatePicker />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.click(inputElement) // Open calendar modal
    const monthSelect = screen.getAllByRole('combobox')[0]
    fireEvent.change(monthSelect, { target: { value: '1' } }) // Change to February (index 1)
    expect(screen.getByText('February')).toBeInTheDocument()
  })

  it('changes year correctly', () => {
    render(<DatePicker />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.click(inputElement) // Open calendar modal
    const yearSelect = screen.getAllByRole('combobox')[1]
    fireEvent.change(yearSelect, { target: { value: '2023' } }) // Change to 2023
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('selects date within range when clicked', () => {
    const today = new Date()
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    )
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
    )

    render(<DatePicker minDate={minDate} maxDate={maxDate} />)

    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.click(inputElement)

    const currentDayButton = screen.getByRole('button', {
      name: `${today.getDate()}`,
    })

    fireEvent.click(currentDayButton)

    const selectedDate = new Date(inputElement.value)
    expect(selectedDate.getTime()).toBeGreaterThanOrEqual(minDate.getTime())
    expect(selectedDate.getTime()).toBeLessThanOrEqual(maxDate.getTime())
  })
})
