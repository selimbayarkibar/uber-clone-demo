/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files inside the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan components if you have a separate folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
