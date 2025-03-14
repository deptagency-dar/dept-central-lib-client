import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { SearchSelect } from '.'

const OPTIONS = [
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

const OPTIONS_WITHOUT_PICTURE = OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}))

const onSelectedMock = jest.fn()

describe('SearchSelect', () => {
  it('renders correctly', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('filters one option based on search term', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Smith' },
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.queryByText('Marie Curie')).not.toBeInTheDocument()
  })

  it('filters multiple options based on search term', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('John Travolta')).toBeInTheDocument()
    expect(screen.queryByText('Marie Curie')).not.toBeInTheDocument()
  })

  it('calls onSelected when an option is clicked', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    })
    fireEvent.click(screen.getByText('John Smith'))

    expect(onSelectedMock).toHaveBeenCalledWith({
      value: '1',
      label: 'John Smith',
      picture: 'https://placehold.co/50',
    })
  })

  it('closes the dropdown when clicking outside', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    })
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument()
  })

  it('does not display options if none match the search', () => {
    render(
      <SearchSelect
        options={OPTIONS}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Tom' },
    })

    expect(screen.queryByText('John Smith')).not.toBeInTheDocument()
    expect(screen.queryByText('Marie Curie')).not.toBeInTheDocument()
  })

  it('does not render image if option does not have a picture', () => {
    render(
      <SearchSelect
        options={OPTIONS_WITHOUT_PICTURE}
        placeholder="Search..."
        onSelected={onSelectedMock}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Marie' },
    })

    expect(screen.getByText('Marie Curie')).toBeInTheDocument()

    const imageElement = screen.queryByRole('img')
    expect(imageElement).not.toBeInTheDocument()
  })
})
