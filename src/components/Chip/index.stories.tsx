// TextField.stories.tsx
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Chip } from '.'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

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
  args: {
    label: 'Default Chip',
    variant: 'default',
  },
}

export const DefaultWithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Chip" /> `,
      },
    },
  },
  args: {
    label: 'Default Chip',
    variant: 'default',
    icon: <XCircleIcon className="w-4 h-4" />,
  },
}

export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Primary Chip" type="primary" /> `,
      },
    },
  },
  args: {
    label: 'Primary Chip',
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Primary Chip" type="primary" /> `,
      },
    },
  },
  args: {
    label: 'Primary Chip',
    variant: 'primary',
    icon: <PlusCircleIcon className="w-4 h-4" />,
  },
}

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Disabled Chip" type="disabled" /> `,
      },
    },
  },
  args: {
    label: 'Disabled Chip',
    variant: 'disabled',
  },
}

export const DefaultSmall: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Small Chip" size="small" /> `,
      },
    },
  },
  args: {
    label: 'Default Small Chip',
    size: 'small',
    icon: <XCircleIcon className="w-3 h-3" />,
  },
}

export const DefaultLarge: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <Chip label="Default Large Chip" size="large" /> `,
      },
    },
  },
  args: {
    label: 'Default Large Chip',
    size: 'large',
    icon: <XCircleIcon className="w-5 h-5" />,
  },
}
