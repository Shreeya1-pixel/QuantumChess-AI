/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          primary: '#6366f1',
          secondary: '#a855f7',
          accent: '#06b6d4',
          dark: '#0f172a',
          darker: '#020617',
          light: '#f8fafc'
        },
        chess: {
          light: '#f0d9b5',
          dark: '#b58863'
        }
      },
      animation: {
        'quantum-pulse': 'quantum-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'arrow-fade': 'arrow-fade 0.5s ease-in-out',
        'move-highlight': 'move-highlight 1s ease-in-out'
      },
      keyframes: {
        'quantum-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'arrow-fade': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'move-highlight': {
          '0%': { backgroundColor: 'rgba(99, 102, 241, 0.3)' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    },
  },
  plugins: [],
}
