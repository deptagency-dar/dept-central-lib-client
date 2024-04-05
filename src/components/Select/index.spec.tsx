import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Select } from '.'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
]

describe('Select', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={() => {}}
      />,
    )

    const selectLabel = getByText('Select label')
    const selectPlaceholder = getByText('Choose...')

    expect(selectLabel).toBeInTheDocument()
    expect(selectPlaceholder).toBeInTheDocument()
  })

  it('is disabled when disabled prop is passed', () => {
    const { getByTestId } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={() => {}}
        disabled
      />,
    )

    const select = getByTestId('select')

    expect(select).toBeDisabled()
  })

  it('renders options correctly', () => {
    const { getByText } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={() => {}}
      />,
    )

    const select = getByText('Select label')
    fireEvent.click(select)

    options.forEach((option) => {
      const optionElement = getByText(option.label)
      expect(optionElement).toBeInTheDocument()
    })
  })

  it('trigger onChange when an option is selected', () => {
    const onChange = jest.fn()

    const { getByText } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={onChange}
      />,
    )

    const select = getByText('Select label')
    fireEvent.click(select)

    const option = getByText('Option 1')
    fireEvent.click(option)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('displays hint text when the hint prop is provided', () => {
    const hintMessage = "This is a hint";

    const { getByText } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={() => {}}
        hint={hintMessage}
      />,
    );

    expect(getByText(hintMessage)).toBeInTheDocument();
  });

  it('does not display hint text when the hint prop is not provided', () => {
    const { queryByText } = render(
      <Select
        label="Select label"
        placeholder="Choose..."
        options={options}
        onChange={() => {}}
      />,
    );

    const hintMessage = "This is a hint";
    expect(queryByText(hintMessage)).not.toBeInTheDocument();
  });
})
