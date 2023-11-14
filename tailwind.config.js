/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff595f",
        "primary-dark": "#f15359",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
