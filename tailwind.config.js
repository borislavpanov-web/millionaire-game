/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
      sm: { max: "639px" },
    },
    extend: {
      colors: {
        "white-custom": "#ffffff",
        "black-custom": "#000000",
      },
    },
    fontFamily: {
      custom: [
        "Poppins",
        "Bebas Neue",
        "system-ui",
        "Avenir",
        "Helvetica",
        "sans-serif",
      ],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
      "extra-bold": 800,
    },
  },
  plugins: [],
};
