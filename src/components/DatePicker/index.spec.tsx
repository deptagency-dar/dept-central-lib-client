import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

  it('handles change event', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <DatePicker
        startDate={new Date()}
        placeholder="Select date"
        onChange={handleChange}
      />,
    )
    const datePicker = getByPlaceholderText('Select date')

    fireEvent.change(datePicker, { target: { value: '2024-02-09' } })
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    // Add more assertions if needed
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
})
