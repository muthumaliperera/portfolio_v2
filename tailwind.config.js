/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'buljirya': ['Buljirya', 'serif'],
        'agdasima': ['Agdasima', 'sans-serif'],
        'afacad': ['Afacad', 'sans-serif'],
      },
    },
  },
  plugins: [],
}