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
    startDate: new Date(),
    isRange: false,
    showShortcuts: false,
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
    configs: {
      control: 'object',
      description: 'Additional configurations for the DatePicker.',
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
    displayFormat: {
      control: 'text',
      description: 'Display format of the selected date.',
    },
    endDate: {
      control: 'date',
      description: 'End date selected in the DatePicker.',
    },
    i18n: {
      control: 'text',
      description: 'Internationalization language you must used with configs',
    },
    isRange: {
      control: 'boolean',
      description: 'Indicates if the DatePicker is being used in range mode.',
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
    showShortcuts: {
      control: 'boolean',
      description: 'Indicates whether to show shortcuts in the DatePicker.',
    },
    startDate: {
      control: 'date',
      description: 'Start date selected in the DatePicker.',
    },
  },
  decorators: [(Story) => <div className="pb-[26rem]">{Story()}</div>],
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
    endDate: new Date('2024-02-28'),
    isRange: true,
  },
}

export const WithMaxMinDates: Story = {
  args: {
    ...Default,
    maxDate: new Date('2024-02-28'),
    minDate: new Date('2022-01-01'),
  },
}

export const WithCustomDisplayFormat: Story = {
  args: {
    ...Default,
    displayFormat: 'MM/DD/YYYY',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
}

export const WithShortcutsAndFooter: Story = {
  args: {
    ...Default,
    showShortcuts: true,
    showFooter: true,
  },
}

export const WithInternationalization: Story = {
  args: {
    ...Default,
    showShortcuts: true,
    showFooter: true,
    isRange: true,
    i18n: 'es',
    configs: {
      shortcuts: {
        today: 'Hoy',
        yesterday: 'Ayer',
        past: (period) => `Los últimos ${period} días`,
        currentMonth: 'Este mes',
        pastMonth: 'Mes pasado',
      },
      footer: {
        cancel: 'Cancelar',
        apply: 'Aplicar',
      },
    },
  },
}
