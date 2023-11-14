import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import { colors } from '../../constants'
import { Button } from '.'

export default {
  title: 'Components/Button',
  component: Button,
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
      description: 'Content of the button (text, HTML elements, etc.).',
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
    disabled: {
      control: 'boolean',
      description: 'Indicates whether the button is disabled.',
      if: { arg: 'busy', truthy: false },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function triggered when the button is clicked.',
    },
    type: {
      control: 'radio',
      description: 'Type of the button (e.g., "button" or "submit").',
      options: ['button', 'submit', 'reset'],
      table: {
        defaultValue: { summary: 'button' },
        type: { summary: `"button" | "submit" | "reset"` },
      },
    },
    variant: {
      control: 'select',
      description: 'Visual style variant of the button.',
      options: ['solid', 'outline', 'link'],
      table: {
        defaultValue: { summary: 'solid' },
        type: { summary: `"solid" | "outline" | "link"` },
      },
    },
  },
  args: {
    colorScheme: 'primary',
    colorShade: 600,
    disabled: false,
    type: 'button',
    variant: 'solid',
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: `Default Button`,
  },
}

/**
 * This is a list o button with different variants.
 * Just adding the **variant** in one of these values **solid**, **outline**, **link**, **icon** and **unstyled**. For works with icons also we can use other variants not only **icon**, this variant allows us to show the icon alone without borders or background. Icons can be added using props **iconLeft**, **iconRight** and also with **children**
 */
export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button>Solid Button</Button>
<Button variant="outline">
  Outline Button
</Button>
<Button variant="link">
  Link Button
</Button>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3">
      <Button>Solid Button</Button>
      <Button variant="outline">
        Outline Button
      </Button>
      <Button variant="link">
        Link Button
      </Button>
    </div>
  ),
}

/**
 * This is a list o button with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button colorScheme="primary">Primary Button</Button>
<Button colorScheme="grayscale">GrayScale Button</Button>
<Button colorScheme="warning">Warning Button</Button>
<Button colorScheme="error">Error Button</Button>
<Button colorScheme="success">Success Button</Button>
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-3 grid-rows-2">
      <Button colorScheme="primary">Primary Button</Button>
      <Button colorScheme="grayscale">GrayScale Button</Button>
      <Button colorScheme="warning">Warning Button</Button>
      <Button colorScheme="error">Error Button</Button>
      <Button colorScheme="success">Success Button</Button>
    </div>
  ),
}

/**
 * This is a disabled button.
 * Just adding the **disabled** prop in true.
 * The disabled state add **.disabled** class,
 * that contain **opacity: .5** and **cursor: not-allowed**.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Button',
    disabled: true,
  },
}
