// radio.spec.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For additional expectations

import { Radio } from '.'

describe('Radio component', () => {
  it('renders correctly with default props', () => {
    const { getByLabelText } = render(<Radio readOnly>Radio Label</Radio>)

    const radioInput = getByLabelText('Radio Label') as HTMLInputElement

    expect(radioInput).toBeInTheDocument()
    expect(radioInput).not.toBeChecked()
    expect(radioInput).not.toBeDisabled()
  })

  it('renders as checked when the "checked" prop is true', () => {
    const { getByLabelText } = render(<Radio defaultChecked>Radio Label</Radio>)

    const radioInput = getByLabelText('Radio Label') as HTMLInputElement

    expect(radioInput).toBeChecked()
  })

  it('renders as disabled when the "disabled" prop is true', () => {
    const { getByLabelText } = render(<Radio disabled>Radio Label</Radio>)

    const radioInput = getByLabelText('Radio Label') as HTMLInputElement

    expect(radioInput).toBeDisabled()
  })

  it('triggers onChange handler when clicked', () => {
    const handleChange = jest.fn()
    const { getByLabelText } = render(
      <Radio onChange={handleChange}>Radio Label</Radio>,
    )

    const radioInput = getByLabelText('Radio Label') as HTMLInputElement
    fireEvent.click(radioInput)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('updates when checked prop changes', () => {
    const { getByLabelText, rerender } = render(<Radio>Radio Label</Radio>)
    const radioInput = getByLabelText('Radio Label') as HTMLInputElement

    expect(radioInput).not.toBeChecked()

    rerender(<Radio checked>Radio Label</Radio>)

    expect(radioInput).toBeChecked()
  })
})
