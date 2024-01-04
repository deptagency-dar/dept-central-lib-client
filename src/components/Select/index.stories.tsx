// Select .stories.tsx
import { StoryObj, Meta } from '@storybook/react'
import { Select } from '.'

export default {
  title: 'Components/Select ',
  component: Select,
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
    disabled: {
      control: 'boolean',
      description: 'If `true`, the Select  will be disabled.',
      if: { arg: 'busy', truthy: false },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the Select  .',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the Select  .',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Event triggered when the Select  value changes.',
      action: 'changed',
    },
  },
} as Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Field label',
    placeholder: 'Choose...',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
    ],
    disabled: false,
  },
}

/**
 * This is an example of a Select without a label.
 */

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  placeholder="Search anything..."
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    label: '',
  },
}

/**
 * This is an example of a disabled Select .
 * Just adding the **disabled** prop.
 * **Note:** The disabled state is only visual.
 */

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  label="SearchInput with Error" 
  placeholder="Search anything..." 
  disabled
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    disabled: true,
  },
}
