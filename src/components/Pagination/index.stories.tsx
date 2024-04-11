import { StoryObj, Meta } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Pagination } from './index';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        disable: false,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page number.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items.',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Function called when the page is changed.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as Meta<typeof Pagination>;

const Template: StoryObj<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  useEffect(() => {
    setCurrentPage(args.currentPage);
  }, [args.currentPage]);

  return <Pagination
    {...args}
    currentPage={currentPage}
    onPageChange={(page) => {
      args.onPageChange(page);
      setCurrentPage(page);
    }}
  />;
};

export const Default: StoryObj<typeof Pagination> = {
  render: Template,
  args: {
    totalItems: 50,
    itemsPerPage: 10,
    currentPage: 1,
  },
  decorators: [
    (Pagination) => (
      <div style={{ width: '900px' }}>
        <Pagination />
      </div>
    ),
  ],
};

export const MiddlePage: StoryObj<typeof Pagination> = {
  render: Template,
  args: {
    totalItems: 150,
    itemsPerPage: 10,
    currentPage: 8,
  },
};

export const LastPage: StoryObj<typeof Pagination> = {
  render: Template,
  args: {
    totalItems: 150,
    itemsPerPage: 10,
    currentPage: 15,
  },
};
