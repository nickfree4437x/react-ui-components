/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- ensure this is set
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

