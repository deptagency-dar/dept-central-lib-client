// Card.stories.tsx
import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Card, CardBody, CardFooter, CardHeader } from '.'

export default {
  title: 'Components/Card',
  component: Card,
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
    children: {
      control: 'object',
      description: 'Content of the Card (CardBody, CardFooter or CardHeader)',
      table: {
        type: { summary: 'JSX.Element' },
      },
    },
    className: {
      control: 'text',
      description: `Custom CSS class for the Card.`,
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      description: 'Array of additional CSS styles for the Card.',
      control: 'object',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
  }
} as Meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h4>Title</h4>
      </CardHeader>
      <CardBody>
        <p>this is a test</p>
      </CardBody>
    </Card>
  ),
}

export const WithCustomStyles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates a card with custom styles applied.',
      },
    },
  },
  render: () => (
    <Card>
      <CardHeader style={{ backgroundColor: '#f0f0f0', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', padding: '0.5rem' }}>
        <h3>Custom Header</h3>
      </CardHeader>
      <CardBody style={{ backgroundColor: '#e0e0e0', padding: '1rem' }}>
        <p>Custom Body</p>
      </CardBody>
      <CardFooter style={{ backgroundColor: '#d0d0d0', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem', padding: '0.5rem' }}>
        <p>Custom Footer</p>
      </CardFooter>
    </Card>
  ),
}

export const WithoutFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3>This is the header</h3>
      </CardHeader>
      <CardBody>
        <p>This is the body</p>
      </CardBody>
    </Card>
  ),
}

export const WithoutHeader: Story = {
  render: () => (
    <Card>
      <CardBody>
        <p>This is the body</p>
      </CardBody>
      <CardFooter>
        <p>This is the footer</p>
      </CardFooter>
    </Card>
  ),
}
