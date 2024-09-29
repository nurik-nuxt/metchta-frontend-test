/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/app/**/*.{js,vue,ts}',
    './src/features/**/*.{js,vue,ts}',
    './src/shared/**/*.{js,vue,ts}',
    './src/widgets/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      'primary-dark': 'var(--color-primary-dark)',
      'primary-light': 'var(--color-primary-light)',
      'dark-text': 'var(--color-dark-text)'
    },
    // fontFamily: {
    //   sans: ['Montserrat', 'sans-serif'],
    // },
    extend: {
      spacing: {
        tabbar: 'var(--height-tabbar)',
      },
      boxShadow: {
        header: 'var(--shadow-header)',
      },
      borderRadius: {},
    },
  },
  plugins: [
    require('tailwindcss-safe-area'),
    require('@neojp/tailwindcss-line-clamp-utilities'),
  ],
  variants: {
    lineClamp: ['responsive'],
  },
};
