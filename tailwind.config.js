/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cgreen: "#06ac80",
        cgray: "#696a80",
        cdarkgray: "#313247",
        cslate: "#f3f3f5",
        cdarkslate: "#a8a9ae",
        cwhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
