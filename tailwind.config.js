/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotifyColor': '#1DB954',
        'spotifyColorHover': '#1ED760',
        'hsdColor': '#E60028', 
      }
    },
  },
  plugins: [],
}
