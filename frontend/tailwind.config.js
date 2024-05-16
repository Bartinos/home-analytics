/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "creamy-yellow-background": "#FEFDED",
        "website-background": "#E7E5C5",
        "primary-button": "#A1C398",
        "off-black-text": "#465143",
        "input-label-on-creamy-yellow":"#F6F5E0",
      }
    },
  },
  plugins: [],
}

