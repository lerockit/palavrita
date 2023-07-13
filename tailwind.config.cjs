/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '.5rem',
    },
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        DEFAULT: '1px 5px 3px rgba(0, 0, 0, .25)',
      },
      dropShadow: {
        DEFAULT: '1px 5px 2px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms',
        'fade-out': 'fade-out 600ms forwards',
      },
    },
  },
  plugins: [],
}
