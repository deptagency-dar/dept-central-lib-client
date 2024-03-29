// radio.spec.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // Para tener acceso a las expectativas adicionales

import { SearchInput } from '.'

const placeholder = 'Search...'

describe('SearchInput component', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} />,
    )

    const searchInput = getByPlaceholderText(placeholder) as HTMLInputElement

    expect(searchInput).toBeInTheDocument()
    expect(searchInput).not.toBeDisabled()
  })

  it('renders as disabled when the "disabled" prop is true', () => {
    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} disabled />,
    )

    const searchInput = getByPlaceholderText(placeholder) as HTMLInputElement

    expect(searchInput).toBeDisabled()
  })

  it('triggers onChange handler when clicked', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} onChange={handleChange} />,
    )

    const searchInput = getByPlaceholderText(placeholder) as HTMLInputElement
    fireEvent.input(searchInput, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('updates when value prop changes', () => {
    const { getByPlaceholderText, rerender } = render(
      <SearchInput placeholder={placeholder} />,
    )
    const searchInput = getByPlaceholderText(placeholder) as HTMLInputElement

    expect(searchInput.value).toBe('')

    rerender(<SearchInput placeholder={placeholder} value="test" />)

    expect(searchInput.value).toBe('test')
  })
})
