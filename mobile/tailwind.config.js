/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2e7d32",
        background: "#F5F5F5",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
}