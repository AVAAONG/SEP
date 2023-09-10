/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      mono: ['Roboto Mono'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      plugins: [require('@tailwindcss/forms')],

      colors: {
        primary: {
          1: '#2fc122',
          light: '#23a217',
          dark: '#1d8015',
        },
        accent: {
          light: "#000",
          dark: "#fff",
        },
        secondary: {
          dark: '#062e05',
          light: '#f2fdf0',
          1: '#f2fdf0',
          2: '#dffcdc',
        },
        dark: '#040901',
        light: '#EBECEF',
      }
    },
  },
};
