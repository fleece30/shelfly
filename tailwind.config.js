/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./helpers/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1B26",
        green: "#BADC58",
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};
