// TextField.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Chip } from '.'

export default {
  title: 'Components/Chip',
  component: Chip,
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
} as Meta<typeof Chip>

type Story = StoryObj<typeof Chip>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Chip" /> `,
      },
    },
  },
  render: () => (
    <Chip label="Default Chip" onClick={() => alert('Chip Clicked!')} />
  ),
}

export const Suggested: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Suggested Chip" suggested /> `,
      },
    },
  },
  render: () => <Chip label="Suggested Chip" suggested />,
}

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Disabled Chip" disabled /> `,
      },
    },
  },
  render: () => <Chip label="Disabled Chip" disabled />,
}

export const DefaultSmall: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Chip" size="small" /> `,
      },
    },
  },
  render: () => <Chip label="Default Chip" size="small" />,
}

export const DefaultLarge: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Chip" size="large" /> `,
      },
    },
  },
  render: () => <Chip label="Default Chip" size="large" />,
}
