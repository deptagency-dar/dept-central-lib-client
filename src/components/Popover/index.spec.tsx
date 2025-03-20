import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { PopOver } from '.'
import { Button } from '../Button'

describe('PopOver component', () => {
  test('renders the trigger button', () => {
    const { getByText } = render(
      <PopOver
        isOpen={false}
        setOpen={() => {}}
        content={<div>Popover Content</div>}
        trigger={<Button>Show</Button>}
      />,
    )
    expect(getByText('Show')).toBeInTheDocument()
  })

  test('displays popover content when opened', () => {
    const { getByText } = render(
      <PopOver
        isOpen={true}
        setOpen={() => {}}
        content={<div>Popover Content</div>}
        trigger={<Button>Show</Button>}
      />,
    )
    expect(getByText('Popover Content')).toBeInTheDocument()
  })

  test('hides popover content when closed', () => {
    const { queryByText } = render(
      <PopOver
        isOpen={false}
        setOpen={() => {}}
        content={<div>Popover Content</div>}
        trigger={<Button>Show</Button>}
      />,
    )
    expect(queryByText('Popover Content')).not.toBeInTheDocument()
  })

  test('calls setOpen function when trigger is clicked', () => {
    const setOpenMock = jest.fn()
    const { getByText } = render(
      <PopOver
        isOpen={false}
        setOpen={setOpenMock}
        content={<div>Popover Content</div>}
        trigger={<Button>Show</Button>}
      />,
    )

    fireEvent.click(getByText('Show'))
    expect(setOpenMock).toHaveBeenCalledWith(true)
  })
})
