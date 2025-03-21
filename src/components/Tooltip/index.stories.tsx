// TextField.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Tooltip } from '.'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        disable: false,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  type: {
    control: 'text',
    description: 'Type of value to show.',
    table: {
      type: { summary: 'string' },
    },
  },
  decorators: (Story) => (
    <div className="grid items-center min-h-48">
      <Story />
    </div>
  ),
} as Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: <button>Tooltip Button</button>,
    textComponent: 'This is a tooltip',
  },
}

export const CustomContent: Story = {
  args: {
    children: <button>Tooltip Button</button>,
    textComponent: (
      <div className="flex flex-col text-white">
        <span className="font-semibold">This is a tooltip</span>
        <span>
          Tooltips are used to describe or identify an element. In most
          scenarios, tooltips help the user understand the meaning, function or
          alt-text of an element.
        </span>
      </div>
    ),
  },
}
