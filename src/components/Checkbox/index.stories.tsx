import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Checkbox } from '.'
import { colors } from '../../constants'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
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
      description: 'Content of the checkbox (text, HTML elements, etc.).',
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
      description: 'Type of checkbox: "check" or "toggle".',
      options: ['check', 'toggle'],
      table: {
        defaultValue: { summary: 'check' },
        type: { summary: `"check" | "toggle"` },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Indicates whether the checkbox is checked or not.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates whether the checkbox is disabled or not.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'Event triggered when the checkbox changes its state.',
      action: 'clicked',
    },
  },
  args: {
    disabled: false,
    defaultChecked: false,
  }
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    children: 'Default Checkbox',
    variant: 'check',
  },
}

/**
 * This is a list o checkbox with different variants.
 * Just adding the **variant** in one of these values **check**, **toggle**.
 */
export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Checkbox>Checkbox Check</Checkbox>
<Checkbox variant="toggle">Checkbox Toggle</Checkbox>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3">
      <Checkbox>Checkbox Button</Checkbox>
      <Checkbox variant="toggle">Checkbox Check</Checkbox>
    </div>
  ),
}

/**
 * This is a list o checkbox with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Checkbox colorScheme="primary" defaultChecked>Primary Checkbox</Checkbox>
<Checkbox colorScheme="grayscale" defaultChecked>GrayScale Checkbox</Checkbox>
<Checkbox colorScheme="warning" defaultChecked>Warning Checkbox</Checkbox>
<Checkbox colorScheme="error" defaultChecked>Error Checkbox</Checkbox>
<Checkbox colorScheme="success" defaultChecked>Success Checkbox</Checkbox>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3 grid-rows-2">
      <Checkbox colorScheme="primary" defaultChecked>
        Primary Checkbox
      </Checkbox>
      <Checkbox colorScheme="grayscale" defaultChecked>
        GrayScale Checkbox
      </Checkbox>
      <Checkbox colorScheme="warning" defaultChecked>
        Warning Checkbox
      </Checkbox>
      <Checkbox colorScheme="error" defaultChecked>
        Error Checkbox
      </Checkbox>
      <Checkbox colorScheme="success" defaultChecked>
        Success Checkbox
      </Checkbox>
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
    children: 'Disabled Checkbox',
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
    children: 'Default Checked Checkbox',
    defaultChecked: true
  },
}
