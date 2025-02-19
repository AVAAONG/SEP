import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto'],
      mono: ['Roboto Mono'],
    },
    // extend: {
    //   // plugins: [require('@tailwindcss/forms')],
    //   colors: {
    //     primary: {
    //       1: '#2fc122',
    //       light: '#23a217',
    //       dark: '#1d8015',
    //     },
    //     accent: {
    //       light: '#000',
    //       dark: '#fff',
    //     },
    //     secondary: {
    //       dark: '#062e05',
    //       light: '#f2fdf0',
    //       1: '#f2fdf0',
    //       2: '#dffcdc',
    //     },
    //     dark: '#040901',
    //     light: '#EBECEF',
    //   },
    // },
  },
  plugins: [
    heroui({
      layout: {
        radius: {
          small: "6px", // rounded-small
          medium: "6px", // rounded-medium
          large: "14px", // rounded-large
        },
      }
    }),
  ],
};
