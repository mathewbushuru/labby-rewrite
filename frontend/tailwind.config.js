/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#627BF6",
        primaryLight: "#8A9DF8",
        primaryDark: "#5974E9",
        primaryBlack: "#353535",
        primaryWhite: "#ECEDF3",
        white: "#FFFFFF",
        gray: "#666666",
        lighterGray: "#D9D9D9",
        lightGray: "#EEEEEE",
        darkGray: "#909090",
        textGray: "6F6F6F",
        task1: "#5976E1",
        task2: "#c4b5fd",
        task3: "#CF6973",
        task4: "#0369a1",
        task5: "#ECCC4C",
      },
    },
  },
  plugins: [],
};
