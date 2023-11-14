import React from 'react'
import {
  Title,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks'
import type { Preview } from '@storybook/react'
import '../globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      sort: 'requiredFirst',
    },
    docs: {
      controls: {
        sort: 'requiredFirst',
      },
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
      source: {
        language: 'tsx',
      },
    },
  },
}

export default preview
