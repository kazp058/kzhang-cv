/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(33.33%)' },
        },
      },
      animation: {
        'slide-left': 'slideLeft 0.5s ease-in-out forwards',
        'slide-right': 'slideRight 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};