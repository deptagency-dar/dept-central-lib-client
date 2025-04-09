import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { SearchInput, SearchInputProps } from '.'
import { colors } from '../../constants'

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        disable: false,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If `true`, the SearchInput will be disabled.',
      if: { arg: 'busy', truthy: false },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the SearchInput.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Event triggered when the SearchInput value changes.',
      action: 'changed',
    },
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
    selectOptions: {
      description:
        'An array of options for the search input. If provided, the input will display a list of options below it, allowing the user to select from them.',
      control: 'array',
      table: {
        type: {
          summary: '{ value: string; label: string; picture?: string}[]',
        },
      },
    },
    onClickSelect: {
      description:
        'If `selectOptions` is provided, this function is triggered when an option is selected from the list. The selected option is passed as an argument to the function.',
      action: 'optionSelected',
    },
  },
} as Meta<typeof SearchInput>

type Story = StoryObj<SearchInputProps>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput placeholder="Search anything..." />`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Search anything...',
  },
}

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput disabled />`,
      },
    },
  },
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const WithSelectOptions: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  placeholder="Search..." 
  selectOptions={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  onClickSelect={(option) => console.log(option)} 
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Search...',
    autoComplete: 'off',
    selectOptions: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2', picture: 'https://placehold.co/50' },
      { value: '3', label: 'Option 3', picture: 'https://placehold.co/50' },
    ],
  },
}

export const WithSelectOptionsWithoutMatches: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  placeholder="Search..." 
  selectOptions={[]}
  onClickSelect={(option) => console.log(option)} 
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Search...',
    autoComplete: 'off',
    selectOptions: [],
  },
}
