/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        "shantel-sans": ["Shantell Sans", "cursive"]
      },
      colors: {
        "darkBg": "#0D1117",
        "darkSurface": "#161B22",
        "darkHighlight": "#21262D",
        "lightHover": "#B9BBBE",
        "lightBg": "#C8C9CB",
        "lightSurface": "#DCDCDC",
        "lightHighlight": "#F0F0F0",
        "bluePrimary": "#0077B5",
        "blueSecondary": "#0083CA",
      }
    },
  },
  plugins: [],
}