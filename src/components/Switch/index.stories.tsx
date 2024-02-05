// Switch.stories.tsx

import { Meta, StoryObj } from '@storybook/react'
import { Switch } from '.'
import { colors } from '../../constants'
import React from 'react'

export default {
  title: 'Components/Switch',
  component: Switch,
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
  argTypes: {
    colorScheme: {
      control: 'select',
      description: 'Color of the switch.',
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
    leftOption: {
      control: 'text',
      description: 'Text for the left option of the switch.',
      table: {
        type: { summary: 'string' },
      },
    },
    rightOption: {
      control: 'text',
      description: 'Text for the right option of the switch.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Event triggered when the switch changes its state.',
      action: 'clicked',
    },
    selectedOption: {
      control: 'text',
      description: 'Text for the default selected option of the switch.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Switch>

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    leftOption: 'Left',
    rightOption: 'Right',
  },
}

/**
 * This is a list o switch with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Switch
  colorScheme="primary"
  leftOption="Left"
  rightOption="Right"
/>
<Switch
  colorScheme="grayscale"
  leftOption="Left"
  rightOption="Right"
/>
<Switch
  colorScheme="warning"
  leftOption="Left"
  rightOption="Right"
/>
<Switch
  colorScheme="error"
  leftOption="Left"
  rightOption="Right"
/>
<Switch
  colorScheme="success"
  leftOption="Left"
  rightOption="Right"
/>
      `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-2 grid-rows-3">
      <Switch colorScheme="primary" leftOption="Left" rightOption="Right" />
      <Switch colorScheme="grayscale" leftOption="Left" rightOption="Right" />
      <Switch colorScheme="warning" leftOption="Left" rightOption="Right" />
      <Switch colorScheme="error" leftOption="Left" rightOption="Right" />
      <Switch colorScheme="success" leftOption="Left" rightOption="Right" />
    </div>
  ),
}

export const ControlledSwitch: Story = {
  args: {
    ...Default.args,
    onChange: console.log,
  },
  parameters: {
    docs: {
      source: {
        code: `<Switch
  leftOption="Left"
  rightOption="Right"
  onChange={(option) => setSelectedOption(option)}
  colorScheme="primary"
  colorShade={600}
/>`,
      },
    },
  },
}
