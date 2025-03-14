import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { SearchSelect } from '.'

const OPTIONS = [
  {
    value: '1',
    label: 'John Smith',
    picture: 'https://placehold.co/50',
  },
  {
    value: '2',
    label: 'John Travolta',
    picture: 'https://placehold.co/50',
  },
  {
    value: '3',
    label: 'Marie Curie',
    picture: 'https://placehold.co/50',
  },
  {
    value: '4',
    label: 'Anna Taylor',
    picture: 'https://placehold.co/50',
  },
  {
    value: '5',
    label: 'Peter Wilson',
    picture: 'https://placehold.co/50',
  },
  {
    value: '6',
    label: 'Laura Moore',
    picture: 'https://placehold.co/50',
  },
  {
    value: '7',
    label: 'James Miller',
    picture: 'https://placehold.co/50',
  },
  {
    value: '8',
    label: 'Sophia Davis',
    picture: 'https://placehold.co/50',
  },
  {
    value: '9',
    label: 'Elon Musk',
    picture: 'https://placehold.co/50',
  },
  {
    value: '10',
    label: 'Elvis Presley',
    picture: 'https://placehold.co/50',
  },
]

export default {
  title: 'Components/SearchSelect',
  component: SearchSelect,
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
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} as Meta<typeof SearchSelect>

type Story = StoryObj<typeof SearchSelect>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const OPTIONS = ${JSON.stringify(OPTIONS)} 

<SearchSelect options={OPTIONS} placeholder="Search anything..." onSelected={(option) => console.log(option)} />`,
      },
    },
  },
  args: {
    disabled: false,
    options: OPTIONS,
    placeholder: 'Search...',
  },
}

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `const OPTIONS = ${JSON.stringify(OPTIONS)} 

<SearchSelect options={OPTIONS} placeholder="Search anything..." disabled onSelected={(option) => console.log(option)} />`,
      },
    },
  },
  args: {
    ...Default.args,
    placeholder: 'Search...',
    disabled: true,
    options: OPTIONS,
  },
}
