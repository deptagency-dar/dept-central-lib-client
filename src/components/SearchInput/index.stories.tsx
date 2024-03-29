// SearchInput.stories.tsx
import { StoryObj, Meta } from '@storybook/react'
import { SearchInput } from '.'
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
  },
} as Meta<typeof SearchInput>

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

/**
 * This is an example of a search input with an placeholder.
 * Just adding the **placeholder** prop with an placeholder.
 */
export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  label="SearchInput with Error" 
  placeholder="Search anything..." 
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Search anything...',
  },
}

/**
 * This is an example of a disabled search input.
 * Just adding the **disabled** prop with an placeholder.
 *  */

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SearchInput 
  label="SearchInput with Error" 
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
