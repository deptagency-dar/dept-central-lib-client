import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Chip } from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Chip Component', () => {
  it('renders the Chip with the correct label', () => {
    const { getByText } = render(<Chip label="Test Chip" />)
    expect(getByText('Test Chip')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <Chip label="Clickable Chip" onClick={onClick} />,
    )
    fireEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledWith('Clickable Chip')
  })

  it('does not throw error if onClick is not provided', () => {
    const { getByRole } = render(<Chip label="No Click Handler" />)
    fireEvent.click(getByRole('button'))
  })

  it('disables the Chip when variant is "disabled"', () => {
    const { getByRole } = render(
      <Chip label="Disabled Chip" variant="disabled" />,
    )
    expect(getByRole('button')).toBeDisabled()
  })

  it('renders icon if provided', () => {
    const { getByTestId } = render(
      <Chip label="Chip with Icon" icon={<span data-testid="icon">🔔</span>} />,
    )
    expect(getByTestId('icon')).toBeInTheDocument()
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

  it('applies variant classes correctly', () => {
    const { getByRole, rerender } = render(
      <Chip label="Default Chip" variant="default" />,
    )
    const chipButton = getByRole('button')
    expect(chipButton).toHaveClass('bg-grayscale-200', 'text-grayscale-700')

    rerender(<Chip label="Primary Chip" variant="primary" />)
    expect(chipButton).toHaveClass('bg-primary-25', 'text-primary-600')

    rerender(<Chip label="Disabled Chip" variant="disabled" />)
    expect(chipButton).toHaveClass('bg-grayscale-200', 'text-grayscale-500')
  })
})
