/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#031B4E',
          deepBlue: '#041E42',
          royalBlue: '#0B5ED7',
          lightBlue: '#E8F1FF',
          green: '#16A34A',
          emerald: '#10B981',
          lightGreen: '#EAF8F0',
          accent: '#22C55E',
          gold: '#F59E0B',
          darkBg: '#020C24'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(11, 94, 215, 0.35)',
        'glow-green': '0 0 25px rgba(22, 163, 74, 0.35)',
        'premium': '0 20px 40px -15px rgba(3, 27, 78, 0.12)',
        'card-hover': '0 22px 45px -10px rgba(4, 30, 66, 0.18)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
