// TextField.stories.tsx
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
        icon: CheckIcon,
        iconColorScheme: 'success',
        iconColorShade: 500,
        title: 'Alert Created',
        subtitle: 'John Snow',
        caption: 'Friday June 13, 2024',
      },
      {
        icon: ClockIcon,
        title: 'Reminder',
        cta: {
          label: 'Make a reminder',
          url: 'https://central.ar.deptagency.com',
        },
      },
      {
        icon: ClockIcon,
        title: 'Reminder',
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithOnlyTitle: Story = {
  args: {
    items: [
      {
        icon: CheckIcon,
        title: 'This is the title',
      },
    ],
  } satisfies TimelineProps,
}

export const TimelineItemWithSubtitleAndCaption: Story = {
  args: {
    items: [
      {
        icon: ClockIcon,
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
        icon: ClockIcon,
        title: 'Only CTA',
        cta: {
          label: 'CTA Label',
          url: 'https://central.ar.deptagency.com',
        },
      },
    ],
  } satisfies TimelineProps,
}
