import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { DatePicker } from '.'
import { colors } from '../../constants'

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    colorScheme: 'primary',
    colorShade: 600,
    disabled: false,
    isRange: false,
    showFooter: false,
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      description: 'Color of the datepicker.',
      options: Object.keys(colors),
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    colorShade: {
      control: 'select',
      description: 'Shade of the color (25 to 900).',
      options: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
      table: {
        defaultValue: { summary: 600 },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates whether the datepicker is disabled.',
      if: { arg: 'busy', truthy: false },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    endDate: {
      control: 'date',
      description: 'End date selected in the DatePicker.',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
    config: {
      control: 'object',
      description: 'Internationalization config',
    },
    isRange: {
      control: 'boolean',
      description: 'Indicates if the DatePicker is being used in range mode.',
    },
    isRequired: {
      control: 'boolean',
      description: 'Add asterisk after label to indicates the textfield is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the DatePicker  .',
      table: {
        type: { summary: 'string' },
      },
    },
    maxDate: {
      control: 'date',
      description: 'Maximum allowed date to select in the DatePicker.',
    },
    minDate: {
      control: 'date',
      description: 'Minimum allowed date to select in the DatePicker.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Indicates whether to show a footer in the DatePicker.',
    },
    startDate: {
      control: 'date',
      description: 'Start date selected in the DatePicker.',
    },
  },
  decorators: [(Story) => <div className="pb-[22rem]">{Story()}</div>],
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
} as Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    onChange: console.log,
  },
}

export const WithEndDate: Story = {
  args: {
    ...Default,
    endDate: new Date('2024-02-28'),
  },
}

export const GrayScaleColorScheme: Story = {
  args: {
    ...Default,
    colorScheme: 'grayscale',
  },
}

export const RangeDatePicker: Story = {
  args: {
    ...Default,
    startDate: new Date('02-20-2024'),
    endDate: new Date('02-26-2024'),
    isRange: true,
  },
}

export const WithMaxMinDates: Story = {
  args: {
    ...Default,
    maxDate: new Date(),
    minDate: new Date(new Date().setDate(new Date().getDate() - 10)),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithFooter: Story = {
  args: {
    ...Default,
    showFooter: true,
  },
}

export const WithInternationalization: Story = {
  args: {
    ...Default,
    showFooter: true,
    isRange: true,
    config: {
      language: 'es',
      footer: {
        cancel: 'Cancelar',
        apply: 'Aplicar',
      },
    },
  },
}
