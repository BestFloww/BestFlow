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
      "gray": {
        100: "#C7B0D2",
        200: "#374151",
      },
      "green": {
        100: "#A0B4B1",
        200: "#3D5245",
        300: "#C9D2D1"
      },
      "purple": {
        100: "#E7E1F1",
        200: "#E6B3F8",
        300: "#C57EDE",
        400: "#A954D1",
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
      boxShadow: {
        "inner-lg": "inset 1px 1px 10px 3px rgb(0, 0, 0, 0.2)",
      }
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
