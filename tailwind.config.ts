/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#b7c2ce",
          200: "#99aab5",
          300: "#72767d",
          400: "#565c61",
          500: "#40444b",
          600: "#36393f",
          700: "#32353b",
          800: "#2e3338",
          900: "#202225",
        },
        white: "#f1f1f1",
      },
      fontFamily: {
        sans: ["Nunito"],
      },
    },
  },
  plugins: [],
};
