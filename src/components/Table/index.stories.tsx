// TextField.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { Table } from '.'

export default {
  title: 'Components/Table',
  component: Table,
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
  type: {
    control: 'text',
    description: 'Type of value to show.',
    table: {
      type: { summary: 'string' },
    },
  },
} as Meta<typeof Table>

type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    head: {
      headers: ['Type', 'Date', 'Used days', 'Description', 'Status'],
    },
    body: {
      bodyComponent: [
        [
          'Vacation',
          '06/01/2024 - 13/01/2024',
          '6 days',
          'Family trip 🏔️👨‍👩‍👦',
          'APPROVED',
        ],
      ],
    },
  },
}

export const WithRowProps: Story = {
  args: {
    head: {
      headers: ['Type', 'Date', 'Used days', 'Description', 'Status'],
    },
    body: {
      bodyComponent: [
        [
          'Vacation',
          '06/01/2024 - 13/01/2024',
          '6 days',
          'Family trip 🏔️👨‍👩‍👦',
          'APPROVED',
        ],
        [
          'Sick Leave',
          '15/02/2024 - 16/02/2024',
          '2 days',
          'Flu recovery 🤒',
          'PENDING',
        ],
      ],
    },
    rowProps: {
      onClick: () => {
        alert('Row clicked!')
      },
    },
  },
}
