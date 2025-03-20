import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { PopOver, PopOverProps } from '.'
import { Button } from '../Button'

export default {
  title: 'Components/Popover',
  component: PopOver,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof PopOver>

const Content = () => {
  return (
    <div className="border-[1px] rounded-sm p-4">
      <p>This is a popover.</p>
      <p>It can be used to display additional information.</p>
    </div>
  )
}

const Template = (args: PopOverProps) => {
  const [{ isOpen }, updateArgs] = useArgs()

  const setOpen = (value: boolean) => {
    updateArgs({ isOpen: value })
  }

  return (
    <PopOver
      {...args}
      isOpen={isOpen}
      setOpen={setOpen}
      content={<Content />}
      trigger={<Button>{isOpen ? 'Close' : 'Show'}</Button>}
    />
  )
}

export const Default: StoryObj<typeof PopOver> = {
  args: {
    placement: 'bottom-start',
  },
  render: Template,
}
