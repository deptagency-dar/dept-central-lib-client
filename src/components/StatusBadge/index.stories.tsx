// TextField.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { StatusBadge } from '.'

export default {
  title: 'Components/StatusBadge',
  component: StatusBadge,
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
} as Meta<typeof StatusBadge>

type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {
  args: {
    type: 'approved',
  },
}

/**
 * This is a list o button with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Approved: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <StatusBadge type="approved" /> `,
      },
    },
  },
  render: () => <StatusBadge type="approved" />,
}

export const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <StatusBadge type="pending" /> `,
      },
    },
  },
  render: () => <StatusBadge type="pending" />,
}

export const Denied: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <StatusBadge type="denied" /> `,
      },
    },
  },
  render: () => <StatusBadge type="denied" />,
}
