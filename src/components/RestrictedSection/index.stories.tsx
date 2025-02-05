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
    lines: {
      control: 'number',
      description: 'Number of skeleton lines shown when access is denied.',
      table: {
        defaultValue: { summary: 4 },
        type: { summary: 'number' },
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
    lines: 4,
    text: "You don't have access",
    children: (
      <div className="p-4">
        <p>This is the restricted content.</p>
      </div>
    ),
  }
} as Meta<typeof RestrictedSection>;

type Story = StoryObj<typeof RestrictedSection>;

export const Default: Story = {
  args: {
    hasAccess: false
  },
  decorators: [
    (RestrictedSection) => (
      <div style={{ width: '500px' }}>
        <RestrictedSection />
      </div>
    ),
  ],
};

/**
 * **With Access** - When the user has access and sees the content.
 */
export const WithAccess: Story = {
  args: {
    hasAccess: true,
  },
  decorators: [
    (RestrictedSection) => (
      <div style={{ width: '500px' }}>
        <RestrictedSection />
      </div>
    ),
  ],
};

/**
 * **With Custom Text** - A custom message when access is denied.
 */
export const WithCustomText: Story = {
  args: {
    hasAccess: false,
    text: 'You need to be a member to access',
  },
  decorators: [
    (RestrictedSection) => (
      <div style={{ width: '500px' }}>
        <RestrictedSection />
      </div>
    ),
  ],
};

/**
 * **Custom Skeleton Lines** - Showing a specific number of skeleton placeholders.
 */
export const CustomSkeletonLines: Story = {
  args: {
    hasAccess: false,
    lines: 7,
  },
  decorators: [
    (RestrictedSection) => (
      <div style={{ width: '500px' }}>
        <RestrictedSection />
      </div>
    ),
  ],
};
