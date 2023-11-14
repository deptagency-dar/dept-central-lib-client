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
    checked: {
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
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    children: 'Default Checkbox',
    variant: 'check',
    checked: false,
    disabled: false,
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
        code: `<Checkbox checked>Checkbox Check</Checkbox>
<Checkbox variant="toggle" checked>Checkbox Toggle</Checkbox>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3">
      <Checkbox checked onChange={() => {}}>Checkbox Button</Checkbox>
      <Checkbox variant="toggle" checked onChange={() => {}}>
        Checkbox Check
      </Checkbox>
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
        code: `<Checkbox colorScheme="primary" checked>Primary Checkbox</Checkbox>
<Checkbox colorScheme="grayscale" checked>GrayScale Checkbox</Checkbox>
<Checkbox colorScheme="warning" checked>Warning Checkbox</Checkbox>
<Checkbox colorScheme="error" checked>Error Checkbox</Checkbox>
<Checkbox colorScheme="success" checked>Success Checkbox</Checkbox>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3 grid-rows-2">
      <Checkbox colorScheme="primary" checked onChange={() => {}}>
        Primary Checkbox
      </Checkbox>
      <Checkbox colorScheme="grayscale" checked onChange={() => {}}>
        GrayScale Checkbox
      </Checkbox>
      <Checkbox colorScheme="warning" checked onChange={() => {}}>
        Warning Checkbox
      </Checkbox>
      <Checkbox colorScheme="error" checked onChange={() => {}}>
        Error Checkbox
      </Checkbox>
      <Checkbox colorScheme="success" checked onChange={() => {}}>
        Success Checkbox
      </Checkbox>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Checkbox',
    disabled: true,
  },
}
