// TextField.stories.tsx
import { StoryObj, Meta } from '@storybook/react'
import { colors } from '../../constants'
import { TextField } from '.'
import { useState } from 'react'
import React from 'react'

export default {
  title: 'Components/TextField',
  component: TextField,
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
      description: 'Color of the input.',
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
    label: {
      control: 'text',
      description: 'Label for the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Value of the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Event triggered when the text field value changes.',
      action: 'changed',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof TextField>

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Field Label',
  },
}

/**
 * This is a list o button with different colors.
 * Just adding the **colorScheme** prop.
 */
export const Colors: Story = {
  parameters: {
    docs: {
      source: {
        code: ` <TextField colorScheme="primary" label="Primary Field" />
<TextField colorScheme="grayscale" label="GrayScale Field" />
<TextField colorScheme="warning" label="Warning Field" />
<TextField colorScheme="error" label="Error Field" />
<TextField colorScheme="success" label="Success Field" />
          `,
      },
    },
  },
  render: () => (
    <div className="grid gap-4 grid-cols-2 grid-rows-3">
      <TextField colorScheme="primary" label="Primary Field" />
      <TextField colorScheme="grayscale" label="GrayScale Field" />
      <TextField colorScheme="warning" label="Warning Field" />
      <TextField colorScheme="error" label="Error Field" />
      <TextField colorScheme="success" label="Success Field" />
    </div>
  ),
}

/**
 * This is an example of a text field with an error message.
 * Just adding the **error** prop with an error message.
 */
export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TextField 
  label="Text Field with Error" 
  error="This is an error message" 
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    error: 'This is an error message',
  },
}

/**
 * This is an example of a text field with an placeholder.
 * Just adding the **placeholder** prop with an placeholder.
 */
export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TextField 
  label="Text Field with Error" 
  placeholder="Enter text here" 
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Enter text here',
  },
}

export const ControlledInput: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TextField
  label="Controlled Input"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('')
    return (
      <TextField
        label="Controlled Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}
