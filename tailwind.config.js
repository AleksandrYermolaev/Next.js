/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      orange: '#F48024',
      darkblue: '#3F4A59',
      white: '#FFFFFF',
      red: '#FF0000',
      blue: '#0000FF',
      lightgray: '#484A4E',
      gray: '#797A7A',
      deepgray: '#2C2F33',
    },
    extend: {
      spacing: {
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        9.5: '2.375rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.font-title-xl': {
          fontFamily: 'var(--font-lato)',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: '150%',
        },
        '.font-title': {
          fontFamily: 'var(--font-lato)',
          fontSize: '1.5rem',
          fontWeight: 700,
          lineHeight: '150%',
        },
        '.font-main': {
          fontFamily: 'var(--font-raleway)',
          fontSize: '1.2rem',
          fontWeight: 400,
          lineHeight: '120%',
        },
        '.font-secondary': {
          fontFamily: 'var(--font-raleway)',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: '100%',
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.translate-50': {
          transform: 'translate(-50%, -50%)',
        },
      });
    }),
  ],
};
