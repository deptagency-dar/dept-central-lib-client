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
    variant: {
      control: 'select',
      description: 'Type of radio: "button" or "check".',
      options: ['button', 'check'],
      table: {
        defaultValue: { summary: 'button' },
        type: { summary: `"button" | "check"` },
      },
    },
    checked: {
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
} satisfies Meta<typeof Radio>

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    children: 'Default Radio',
    variant: 'button',
    checked: false,
    disabled: false,
  },
}

/**
 * This is a list o radio with different variants.
 * Just adding the **variant** in one of these values **button**, **check**.
 */
export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Radio checked>Radio Button</Radio>
<Radio variant="check" checked>Radio Check</Radio>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3">
      <Radio checked onChange={() => {}}>Radio Button</Radio>
      <Radio variant="check" checked onChange={() => {}}>
        Radio Check
      </Radio>
    </div>
  ),
}

/**
 * This is a list o radio with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Radio colorScheme="primary" checked>Primary Radio</Radio>
<Radio colorScheme="grayscale" checked>GrayScale Radio</Radio>
<Radio colorScheme="warning" checked>Warning Radio</Radio>
<Radio colorScheme="error" checked>Error Radio</Radio>
<Radio colorScheme="success" checked>Success Radio</Radio>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3 grid-rows-2">
      <Radio colorScheme="primary" checked onChange={() => {}}>
        Primary Radio
      </Radio>
      <Radio colorScheme="grayscale" checked onChange={() => {}}>
        GrayScale Radio
      </Radio>
      <Radio colorScheme="warning" checked onChange={() => {}}>
        Warning Radio
      </Radio>
      <Radio colorScheme="error" checked onChange={() => {}}>
        Error Radio
      </Radio>
      <Radio colorScheme="success" checked onChange={() => {}}>
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
