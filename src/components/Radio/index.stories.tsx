import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Radio } from '.'
import { colors } from '../../constants'

export default {
  title: 'Components/Radio',
  component: Radio,
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
    children: {
      control: 'object',
      description: 'Content of the radio (text, HTML elements, etc.).',
      if: { arg: 'label', truthy: false },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    colorScheme: {
      control: 'select',
      description: 'Color of the button.',
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
    defaultChecked: {
      control: 'boolean',
      description: 'Indicates whether the radio is checked or not.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates whether the radio is disabled or not.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'Event triggered when the radio changes its state.',
      action: 'clicked',
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Radio>

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    children: 'Default Radio',
  },
}

/**
 * This is a list o radio with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Radio colorScheme="primary" defaultChecked>Primary Radio</Radio>
<Radio colorScheme="grayscale" defaultChecked>GrayScale Radio</Radio>
<Radio colorScheme="warning" defaultChecked>Warning Radio</Radio>
<Radio colorScheme="error" defaultChecked>Error Radio</Radio>
<Radio colorScheme="success" defaultChecked>Success Radio</Radio>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3 grid-rows-2">
      <Radio colorScheme="primary" defaultChecked>
        Primary Radio
      </Radio>
      <Radio colorScheme="grayscale" defaultChecked>
        GrayScale Radio
      </Radio>
      <Radio colorScheme="warning" defaultChecked>
        Warning Radio
      </Radio>
      <Radio colorScheme="error" defaultChecked>
        Error Radio
      </Radio>
      <Radio colorScheme="success" defaultChecked>
        Success Radio
      </Radio>
    </div>
  ),
}

/**
 * This is a disabled radio.
 * Just adding the **disabled** prop in true.
 * The disabled state add **.disabled** class,
 * that contain **opacity: .5** and **cursor: not-allowed**.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Radio',
    disabled: true,
  },
}

/**
 * This is a defaultChecked radio.
 * Just adding the **defaultChecked** prop in true.
 */
export const DefaultChecked: Story = {
  args: {
    ...Default.args,
    children: 'Default Checked Radio',
    defaultChecked: true
  },
}