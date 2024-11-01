import { StoryObj, Meta } from '@storybook/react'
import { Avatar } from '.'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://placehold.co/100x100?text=JD',
}

export default {
  title: 'Components/Avatar',
  component: Avatar,
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
    type: {
      control: 'select',
      description: 'Type of preview: "image", "normal" or "compact".',
      options: ['normal', 'compact', 'image'],
      table: {
        defaultValue: { type: 'normal' },
        type: { summary: `"normal" | "compact" | "image"` },
      },
    },
    status: {
      control: 'select',
      description: 'Type of status: "online", "company" or "verified".',
      options: ['default', 'online', 'company', 'verified'],
      table: {
        defaultValue: { type: 'default' },
        type: { summary: `"online" | "company" | "verified"` },
      },
    },
    user: {
      control: 'select',
      description: 'User to display',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'User' },
      },
    },
    imageWidth: {
      control: 'text',
      description: 'Width of the avatar image',
      table: {
        defaultValue: { summary: '63px' },
        type: { summary: 'string' },
      },
    },
    onLogout: {
      description: 'Event triggered when the checkbox changes its state.',
      action: 'clicked',
    },
  },
  args: {
    type: 'normal',
    user,
  }
} satisfies Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    type: 'normal',
    user,
    imageWidth: '63px',
    onLogout: () => alert('Logging user out'),
  },
}

/**
 * With **normal** type (without onLogout property)
 */
export const Normal: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Avatar user={user} type="normal" />`,
      },
    },
  },
  args: {
    ...Default.args,
    onLogout: undefined,
  }
}

/**
 * With **normal** type (with onLogout property)
 */
export const NormalWithLogoutAction: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Avatar user={user} type="normal" />`,
      },
    },
  },
  args: {
    ...Default.args,
    onLogout: () => alert('Logging user out'),
  }
}

/**
 * With **normal** type (with imageWidth property)
 */
export const NormalWithImageWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Avatar user={user} type="normal" imageWidth="40px" />`,
      },
    },
  },
  args: {
    ...Default.args,
    imageWidth: '40px'
  }
}

/**
 * image only
 */
export const Image: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Avatar user={user} type="image" />`,
      },
    },
  },
  args: {
    ...Default.args,
    type: 'image'
  }
}

/**
 * compact mode
 */
export const Compact: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Avatar user={user} type="compact" />`,
      },
    },
  },
  args: {
    ...Default.args,
    type: 'compact',

  }
}
