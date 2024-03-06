// checkbox.spec.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // Para tener acceso a las expectativas adicionales

import { Checkbox } from '.'

describe('Checkbox component', () => {
  it('renders correctly with default props', () => {
    const { getByLabelText } = render(<Checkbox readOnly>Checkbox Label</Checkbox>)

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement

    expect(checkboxInput).toBeInTheDocument()
    expect(checkboxInput).not.toBeChecked()
    expect(checkboxInput).not.toBeDisabled()
  })

  it('renders as checked when the "checked" prop is true', () => {
    const { getByLabelText } = render(
      <Checkbox defaultChecked>
        Checkbox Label
      </Checkbox>,
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement

    expect(checkboxInput).toBeChecked()
  })

  it('renders as disabled when the "disabled" prop is true', () => {
    const { getByLabelText } = render(
      <Checkbox disabled>
        Checkbox Label
      </Checkbox>,
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement

    expect(checkboxInput).toBeDisabled()
  })

  it('triggers onChange handler when clicked', () => {
    const handleChange = jest.fn()
    const { getByLabelText } = render(
      <Checkbox onChange={handleChange}>
        Checkbox Label
      </Checkbox>,
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement
    fireEvent.click(checkboxInput)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders switch for "toggle" variant', () => {
    const { container } = render(
      <Checkbox variant="toggle">
        Checkbox Label
      </Checkbox>,
    )

    const toggle = container.querySelector('.toggleSlider')

    expect(toggle).toBeInTheDocument()
  })
})
