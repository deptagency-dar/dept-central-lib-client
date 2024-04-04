// Select .stories.tsx
import { StoryObj, Meta } from '@storybook/react';
import { Select } from '.';

export default {
  title: 'Components/Select',
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
      description: 'If `true`, the Select will be disabled.',
      if: { arg: 'busy', truthy: false },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the text field.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the Select.',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the Select.',
      table: {
        type: { summary: 'string' },
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Add asterisk after label to indicates the textfield is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'Event triggered when the Select value changes.',
      action: 'changed',
    },
    hint: {
      control: 'text',
      description: 'Hint text displayed below the Select.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

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
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

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
};

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
};

export const WithHint: Story = {
  args: {
    ...Default.args,
    hint: 'This is a helpful hint for the select.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};
