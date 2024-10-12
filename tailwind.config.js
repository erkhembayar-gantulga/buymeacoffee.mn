/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: colors.green,
      secondary: colors.gray,
      // ... other custom colors
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      // ... other font families
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      // ... other custom sizes
    },
    extend: {
      spacing: {
        // Custom spacing values
      },
      borderRadius: {
        // Custom border radius values
      },
      // ... other theme extensions
    },
  },
  plugins: [
    // ... any plugins you're using
  ],
}
