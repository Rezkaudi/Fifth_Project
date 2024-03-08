/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      keyframes: {
        'open-sidbar': {
          '0%': { width: '0px' },
          '80%': { width: '280px' },
          '100%': { width: '256px' },
        },
        'close-sidbar': {
          '0%': { width: '256px' },
          '100%': { width: '0px' },
        }
      },
      animation: {

      },
      colors: {
        "c1": "#006C84",
        "c2": "#6EB5C0",
        "c3": "#737373",
        "c4": "#FFFFFF",
        "c5": "#E2E8E4"
      },
      backgroundImage: {
        'trash': "url('../../assets/images/icon\ _trash.svg')"
      }
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
}