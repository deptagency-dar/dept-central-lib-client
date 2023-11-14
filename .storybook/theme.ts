// .storybook/theme.js

import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  // Brand
  brandTitle: 'DEPT UI - React',
  // Color
  colorPrimary: '#A28DFC',
  colorSecondary: '#704FFB',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',

  // Text colors
  textColor: '#2B1F61',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#704FFB',
  barBg: 'ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#2B1F61',
  inputTextColor: '#2B1F61',
  inputBorderRadius: 2,
})
