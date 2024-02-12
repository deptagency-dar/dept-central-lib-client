import { colors } from './src/constants'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        maison: ['Maison Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors,
    },
  },
  plugins: [],
}
