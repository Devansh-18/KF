/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      keyframes: {
        'slide-in-left': {
          '0%': { left:'50vw', opacity: '0' },
          '50%': { left:'25vw', opacity: '1' },
          '100%': { left:'0vw', opacity: '1' },
        },
        'slide-in-right': {
          '0%': {left:'60vw', opacity: '0' },
          '50%' : {left : '75vw', opacity: '1'},
          '100%' : {left : '100vw', opacity: '1'},
        },
        'zoom-in-out': {
          '0%': { transform: 'scale(1) ', opacity: '1' },
          '100%': { transform: 'scale(1.2)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 1.5s ease-out forwards, zoom-in-out 1.5s ease-in-out forwards 1.5s',
        'slide-in-right': 'slide-in-right 1.5s ease-out forwards, zoom-in-out 1.5s ease-in-out forwards 1.5s',
      },
    
    },
  },
  plugins: [],
}

