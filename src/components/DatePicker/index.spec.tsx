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

    const currentDayButton = screen
      .getAllByRole('button', {
        name: `${today.getDate()}`,
      })
      .find((item) => !item.classList.contains('text-gray-400'))

    fireEvent.click(currentDayButton!)

    const selectedDate = new Date(inputElement.value)
    expect(selectedDate.getTime()).toBeGreaterThanOrEqual(minDate.getTime())
    expect(selectedDate.getTime()).toBeLessThanOrEqual(maxDate.getTime())
  })

  it('displays hint text when the hint prop is provided', () => {
    const hintMessage = "This is a hint for the date picker";
    render(
      <DatePicker
        hint={hintMessage}
        onChange={() => {}}
      />
    );
    const hintElement = screen.getByText(hintMessage);
    expect(hintElement).toBeInTheDocument();
    expect(hintElement).toHaveClass('text-gray-500');
  });

  it('does not display hint text when the hint prop is not provided', () => {
    render(<DatePicker onChange={() => {}} />);
    const hintElements = screen.queryAllByText(/This is a hint for the date picker/i);
    expect(hintElements).toHaveLength(0);
  });
})
