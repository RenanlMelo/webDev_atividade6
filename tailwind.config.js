/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#FFD700",
          DEFAULT: "#FFA500",
          dark: "#FF8C00",
        },
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
      },
    },
  },
  plugins: [],
};
