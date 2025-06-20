/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-white': '#FFFFFF',
        'custom-light-pink': '#E7CBCB',
        'custom-dusty-rose': '#C88EA7',
        'custom-muted-purple': '#99627A',
        'custom-deep-burgundy': '#643843',
      },
    },
  },
  plugins: [],
};
