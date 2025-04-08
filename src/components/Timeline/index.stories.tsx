// TextField.stories.tsx
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Timeline, TimelineProps } from '.'
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'

export default {
  title: 'Components/Timeline',
  component: Timeline,
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
} as Meta<typeof Timeline>

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    items: [
      {
        icon: <CheckIcon className="text-white bg-success-500 p-2" />,
        title: 'Alert Created',
        subtitle: 'John Snow',
        caption: 'Friday June 13, 2024',
      },
      {
        icon: <ClockIcon className="text-white bg-grayscale-300 p-2" />,
        title: 'Reminder',
        cta: {
          label: 'Make a reminder',
          url: 'https://central.ar.deptagency.com',
        },
      },
      {
        icon: <ClockIcon className="text-white bg-grayscale-300 p-2" />,
        title: 'Reminder',
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithOnlyTitle: Story = {
  args: {
    items: [
      {
        icon: <CheckIcon className="text-white bg-success-500 p-2" />,
        title: 'This is the title',
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithSubtitleAndCaption: Story = {
  args: {
    items: [
      {
        icon: <ClockIcon className="text-white bg-grayscale-300 p-2" />,
        title: 'This is the title',
        subtitle: 'John Snow',
        caption: 'Friday June 13, 2024',
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithCTA: Story = {
  args: {
    items: [
      {
        icon: <ClockIcon className="text-white bg-grayscale-300 p-2" />,
        title: 'Only CTA',
        cta: {
          label: 'CTA Label',
          url: 'https://central.ar.deptagency.com',
        },
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithEmojiAsIcon: Story = {
  args: {
    items: [
      {
        icon: <span data-testid="icon">🔥</span>,
        title: 'Emoji as Icon',
        cta: {
          label: 'CTA Label',
          url: 'https://central.ar.deptagency.com',
        },
      },
    ],
  } satisfies TimelineProps,
}
