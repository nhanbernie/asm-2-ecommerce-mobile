/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#007AFF",
          dark: "#0A84FF",
        },
        background: {
          light: "#FFFFFF",
          dark: "#000000",
        },
        surface: {
          light: "#F2F2F7",
          dark: "#1C1C1E",
        },
        text: {
          light: "#000000",
          dark: "#FFFFFF",
        },
        "text-secondary": {
          light: "#8E8E93",
          dark: "#8E8E93",
        },
        border: {
          light: "#C6C6C8",
          dark: "#38383A",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1C1C1E",
        },
      },
    },
  },
  plugins: [],
};
