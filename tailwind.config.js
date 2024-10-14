import { nextui } from '@nextui-org/react'
import {
  themes,
  defaultLayout as layout,
} from './src/6-shared/themes/themeSettings'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      minHeight: {
        fit: 'fit-content',
      },
      maxHeight: {
        'svh-80px': 'calc(100svh - 80px)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      themes,
      layout,
      addCommonColors: true,
    }),
  ],
}
