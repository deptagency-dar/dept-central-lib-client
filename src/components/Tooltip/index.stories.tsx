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
} as Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: <button>Tooltip Button</button>,
    textComponent: (
      <div className="flex flex-col">
        <span className="text-white">Tooltip Text</span>
      </div>
    ),
  },
}
