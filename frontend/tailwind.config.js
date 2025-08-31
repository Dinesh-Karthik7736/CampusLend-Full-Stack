/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8A2BE2', // A vibrant BlueViolet
          light: '#9370DB',   // MediumPurple
          dark: '#4B0082',    // Indigo
        },
        secondary: '#FF8C00', // DarkOrange for accents
        background: '#F8F7FF', // A very light lavender background
        surface: '#FFFFFF', // For cards and surfaces
        text_primary: '#1E1E1E',
        text_secondary: '#555555',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
