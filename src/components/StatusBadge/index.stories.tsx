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
    type: 'APPROVED',
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
        code: ` <StatusBadge type="APPROVED" /> `,
      },
    },
  },
  render: () => <StatusBadge type="APPROVED" />,
}

export const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <StatusBadge type="PENDING" /> `,
      },
    },
  },
  render: () => <StatusBadge type="PENDING" />,
}

export const Denied: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <StatusBadge type="DENIED" /> `,
      },
    },
  },
  render: () => <StatusBadge type="DENIED" />,
}
