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
        "dark-primary": "#0D1117",
        "dark-secondary": "#161B22",
        "dark-tertiary": "#21262D",
        "light-primary": "#C6CDD5",
        "light-secondary": "#DEE3E9",
        "light-tertiary": "#ECF2F8",
      }
    },
  },
  plugins: [],
}