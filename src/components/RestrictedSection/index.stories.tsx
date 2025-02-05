import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RestrictedSection } from '.';

export default {
  title: 'Components/RestrictedSection',
  component: RestrictedSection,
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
    hasAccess: {
      control: 'boolean',
      description: 'Determines if the user has access to the content.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    text: {
      control: 'text',
      description: 'Text to display when the user doesn’t have access.',
      table: {
        defaultValue: { summary: "You don't have access" },
        type: { summary: 'string' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the restricted section.',
      table: {
        defaultValue: { summary: '75px' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Content that will be displayed when the user has access.',
      table: {
        defaultValue: { summary: 'JSX content' },
      },
    },
  },
  args: {
    hasAccess: false,
    minHeight: "75px",
    text: "You don't have access",
    children: (
      <div className="p-4">
        <p>This is the restricted content.</p>
      </div>
    ),
  }
} as Meta<typeof RestrictedSection>;

type Story = StoryObj<typeof RestrictedSection>;

const globalDecorator = (Story: React.ComponentType) => (
  <div style={{ width: '500px' }}>
    <Story />
  </div>
);

export const Default: Story = {
  args: {
    hasAccess: false
  },
  decorators: [globalDecorator],
};

/**
 * **With Access** - When the user has access and sees the content.
 */
export const WithAccess: Story = {
  args: {
    hasAccess: true,
  },
  decorators: [globalDecorator],
};

/**
 * **With Custom Text** - A custom message when access is denied.
 */
export const WithCustomText: Story = {
  args: {
    hasAccess: false,
    text: 'You need to be a member to access',
  },
  decorators: [globalDecorator],
};

/**
 * **With Custom Min Height** - Setting a custom minimum height for the restricted section.
 */
export const WithCustomMinHeight: Story = {
  args: {
    hasAccess: false,
    minHeight: '250px',
  },
  decorators: [globalDecorator],
};
