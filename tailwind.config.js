import { theme } from './src/constants'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        maison: ['Maison Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: theme.colors,
    },
  },
  plugins: [],
}
