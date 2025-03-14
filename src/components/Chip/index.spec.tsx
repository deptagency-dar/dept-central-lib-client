import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Chip } from '.'

describe('Chip Component', () => {
  it('renders the Chip with the correct label', () => {
    const { getByText } = render(<Chip label="Test Chip" />)
    const chipLabel = getByText('Test Chip')
    expect(chipLabel).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const { getByText } = render(
      <Chip label="Clickable Chip" onClick={onClick} />,
    )
    const chipButton = getByText('Clickable Chip')
    fireEvent.click(chipButton)
    expect(onClick).toHaveBeenCalled()
  })

  it('disables the Chip when disabled is true', () => {
    const { getByRole } = render(<Chip label="Disabled Chip" disabled />)
    const chipButton = getByRole('button')
    expect(chipButton).toBeDisabled()
  })

  it('renders PlusCircle icon when suggested is true', () => {
    const { getByTestId } = render(<Chip label="Suggested Chip" suggested />)
    const plusIcon = getByTestId('plus-circle-icon')
    expect(plusIcon).toBeInTheDocument()
  })

  it('renders XCircle icon when suggested is false', () => {
    const { getByTestId } = render(<Chip label="Regular Chip" />)
    const xIcon = getByTestId('x-circle-icon')
    expect(xIcon).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { getByRole, rerender } = render(
      <Chip label="Small Chip" size="small" />,
    )
    const chipButton = getByRole('button')
    expect(chipButton).toHaveClass('text-xs')

    rerender(<Chip label="Base Chip" size="base" />)
    expect(chipButton).toHaveClass('text-sm')

    rerender(<Chip label="Large Chip" size="large" />)
    expect(chipButton).toHaveClass('text-base')
  })
})
