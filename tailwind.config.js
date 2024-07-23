/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "slide-from-top": "bounceInDown 1s forwards",
      },
      keyframes: {
        bounceInDown: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, -3000px, 0) scaleY(3)",
            animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          },
          "60%": {
            opacity: "1",
            transform: "translate3d(0, 25px, 0) scaleY(.9)",
            animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          },
          "75%": {
            transform: "translate3d(0, -10px, 0) scaleY(.95)",
            animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          },
          "90%": {
            transform: "translate3d(0, 5px, 0) scaleY(.985)",
            animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          },
          to: {
            transform: "translateZ(0)",
            animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          },
        },
      },
      colors: {
        c1: "#006C84",
        c2: "#6EB5C0",
        c3: "#737373",
        c4: "#FFFFFF",
        c5: "#E2E8E4",
        blue1: "#6EB5C0",
        gray1: "#E2E8E4",
        input: "#7C838A",
        placeholder: "#B0BAC3",
        buttom: "#006C84",
        ice: "#E2E8E4",
        item: "#737373",
        sun: "#FFCCBB",
        red1: "#ff2c2c",
      },
      borderRadius: {
        large: "60px",
      },

      backgroundImage: {
        trash: "url('../../assets/images/icon _trash.svg')",
      },
      backgroundColor: {
        c1: "#006C84",
        c2: "#6EB5C0",
        c3: "#737373",
        c4: "#FFFFFF",
        c5: "#E2E8E4",
        blue1: "#6EB5C0",
        gray1: "#E2E8E4",
        input: "#7C838A",
        placeholder: "#B0BAC3",
        buttom1: "#006C84",
        ice: "#E2E8E4",
        item: "#737373",
        sun: "#FFCCBB",
        red1: "#ff2c2c",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
