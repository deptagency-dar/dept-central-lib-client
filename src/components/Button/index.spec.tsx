import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Button } from '.'

describe('Test button component', () => {
  it('renders button correctly', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>)
    const button = getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  it('renders button type submit', () => {
    const { getByText } = render(
      <Button type="submit" onClick={() => {}}>
        Click Me
      </Button>,
    )
    const button = getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  it('handles click event', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    )
    const button = getByText('Click Me')

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(
      <Button onClick={() => {}} disabled>
        Click Me
      </Button>,
    )
    const button = getByText('Click Me') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('renders children', () => {
    const { container } = render(
      <Button onClick={() => {}}>
        <span>Click Me</span>
      </Button>,
    )
    const button = container.querySelector('button')
    const span = button?.querySelector('span')
    expect(span).toBeInTheDocument()
  })

  it('renders correctly with icon', () => {
    const { getByText } = render(
      <Button>
        <span role="img" aria-label="icon">
          🚀
        </span>
      </Button>,
    )
    const button = getByText('🚀')
    expect(button).toBeInTheDocument()
  })

  it('renders solid button', () => {
    const { getByText } = render(<Button variant="solid">Solid Button</Button>)
    const buttonElement = getByText('Solid Button')
    expect(buttonElement).toHaveClass('solid')
  })

  it('renders outline button', () => {
    const { getByText } = render(
      <Button variant="outline">Outline Button</Button>,
    )
    const buttonElement = getByText('Outline Button')
    expect(buttonElement).toHaveClass('outline')
  })

  it('renders link button', () => {
    const { getByText } = render(<Button variant="link">Link Button</Button>)
    const buttonElement = getByText('Link Button')
    expect(buttonElement).toHaveClass('link')
  })

  it('renders button with color scheme', () => {
    const { getByText } = render(
      <Button colorScheme="grayscale">Dark Color Scheme</Button>,
    )
    const buttonElement = getByText('Dark Color Scheme')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveStyle('--button-scheme: #475467')
  })
})
