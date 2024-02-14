import { StoryObj, Meta } from '@storybook/react'
import { UserInfo } from '.'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://placehold.co/100x100?text=JD',
}

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
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
    user: {
      control: 'select',
      description: 'User to display',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'User' },
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
} satisfies Meta<typeof UserInfo>

type Story = StoryObj<typeof UserInfo>

export const Default: Story = {
  args: {
    type: 'normal',
    user,
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
        code: `<UserInfo user={user} type="normal" />`,
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
        code: `<UserInfo user={user} type="normal" />`,
      },
    },
  },
  args: {
    ...Default.args,
    onLogout: () => alert('Logging user out'),
  }
}

/**
 * image only
 */
export const Image: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UserInfo user={user} type="image" />`,
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
        code: `<UserInfo user={user} type="compact" />`,
      },
    },
  },
  args: {
    ...Default.args,
    type: 'compact'
  }
}
