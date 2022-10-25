/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{jsx, js}"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "blue": "#392A94",
      "green": {
        100: "#A0B4B1",
        200: "#3D5245"
      },
      "purple": {
        100: "#E7E1F1",
        200: "#E6B3F8",
        300: "#C57EDE",
        400: "#9B77D6",
      },
      "red": "#E87D73",
      "yellow": "#F1D571",
      "off-white": "#F1EFFA",
    },
    extend: {
      fontFamily: {
        'pacifico': ["Pacifico"],
        'cabin': ["Cabin"],
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 2px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
