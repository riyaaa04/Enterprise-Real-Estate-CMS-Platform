/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F6EFCF',
          200: '#ECCF8E',
          300: '#E1B855',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#9B6D08',
          700: '#7B5306',
          800: '#583A04',
          900: '#382302',
        },
        obsidian: {
          950: '#07090C',
          900: '#0B0F15',
          850: '#10151C',
          800: '#151C26',
          700: '#1E2736',
          600: '#2C384B',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ECCF8E 0%, #D4AF37 50%, #B8860B 100%)',
        'gold-hover': 'linear-gradient(135deg, #F6EFCF 0%, #E1B855 50%, #9B6D08 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(22, 28, 38, 0.75) 0%, rgba(11, 15, 21, 0.85) 100%)',
        'radial-luxury': 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.15) 0%, rgba(11, 15, 21, 0) 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.5)',
        'luxury-card': '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
