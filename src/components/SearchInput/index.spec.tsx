// radio.spec.tsx
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For additional expectations

import { SearchInput } from '.'

const placeholder = 'Search...'

const SELECT_OPTIONS = [
  {
    value: '1',
    label: 'John Smith',
    picture: 'https://placehold.co/50',
  },
  {
    value: '2',
    label: 'John Travolta',
    picture: 'https://placehold.co/50',
  },
  {
    value: '3',
    label: 'Marie Curie',
    picture: 'https://placehold.co/50',
  },
]

const SELECT_OPTIONS_WITHOUT_PICTURE = SELECT_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}))

const onSelectedMock = jest.fn()

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

  it('triggers onChange handler when clicked', async () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchInput
        placeholder={placeholder}
        onChange={handleChange}
        debounce={0}
      />,
    )

    const searchInput = getByPlaceholderText(placeholder) as HTMLInputElement
    fireEvent.input(searchInput, { target: { value: 'test' } })
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
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

  it('calls onClickSelect when an option is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchInput
        selectOptions={SELECT_OPTIONS}
        placeholder="Search..."
        onClickSelect={onSelectedMock}
      />,
    )

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    })
    fireEvent.click(getByText('John Smith'))

    expect(onSelectedMock).toHaveBeenCalledWith({
      value: '1',
      label: 'John Smith',
      picture: 'https://placehold.co/50',
    })
  })

  it('closes the dropdown when clicking outside', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <SearchInput
        selectOptions={SELECT_OPTIONS}
        placeholder="Search..."
        onClickSelect={onSelectedMock}
      />,
    )

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    })
    expect(getByText('John Smith')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(queryByText('John Smith')).not.toBeInTheDocument()
  })

  it('does not render image if option does not have a picture', () => {
    const { getByPlaceholderText, getByText, queryByRole } = render(
      <SearchInput
        selectOptions={SELECT_OPTIONS_WITHOUT_PICTURE}
        placeholder="Search..."
        onClickSelect={onSelectedMock}
      />,
    )

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'Marie' },
    })

    expect(getByText('Marie Curie')).toBeInTheDocument()

    const imageElement = queryByRole('img')
    expect(imageElement).not.toBeInTheDocument()
  })
})
