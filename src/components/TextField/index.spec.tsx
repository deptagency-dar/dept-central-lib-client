import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TextField } from '.'

describe('Test TextField component', () => {
  it('renders TextField correctly', () => {
    const { getByPlaceholderText } = render(
      <TextField
        label="Test Label"
        placeholder="Enter text"
        onChange={() => {}}
      />,
    )
    const textField = getByPlaceholderText('Enter text')
    expect(textField).toBeInTheDocument()
  })

  it('handles change event', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <TextField
        label="Test Label"
        placeholder="Enter text"
        onChange={handleChange}
      />,
    )
    const textField = getByPlaceholderText('Enter text')

    fireEvent.change(textField, { target: { value: 'new value' } })
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    expect(handleChange.mock.calls[0][0].target.value).toBe('new value')
  })

  it('renders TextField with error', () => {
    const { getByText } = render(
      <TextField
        label="Test Label"
        value=""
        onChange={() => {}}
        errorMessage="This is an error"
      />,
    )
    const errorText = getByText('This is an error')
    expect(errorText).toBeInTheDocument()
  })

  it('renders disabled TextField', () => {
    const { getByPlaceholderText } = render(
      <TextField
        label="Test Label"
        placeholder="Enter text"
        onChange={() => {}}
        disabled
      />,
    )
    const textField = getByPlaceholderText('Enter text') as HTMLInputElement
    expect(textField.disabled).toBe(true)
  })

  it('renders controlled TextField', () => {
    const { getByPlaceholderText } = render(
      <TextField
        label="Test Label"
        placeholder="Enter text"
        value="controlled value"
        onChange={() => {}}
      />,
    )
    const textField = getByPlaceholderText('Enter text') as HTMLInputElement
    expect(textField.value).toBe('controlled value')
  })
})
