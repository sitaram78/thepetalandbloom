/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: {
          50: '#F9F7F2',
          100: '#F4F1EA',
          200: '#EBE7DE',
        },
        ink: {
          DEFAULT: '#3C473E',
          light: '#5A665D',
          dark: '#2A322B',
        },
        forest: {
          DEFAULT: '#2A3D31',
          dark: '#1A261E',
          light: '#4B5F53',
        },
        charcoal: {
          DEFAULT: '#1C1E1B',
          light: '#2D2F2C',
        },
        rose: {
          DEFAULT: '#BFA3A3',
          light: '#DBCBCA',
          dark: '#A48A8A',
        },
        sage: {
          DEFAULT: '#A3B18A',
          light: '#D1D8C8',
          dark: '#8A9A84',
        },
        silk: {
          DEFAULT: '#F2E8DF',
          light: '#F9F5F2',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          light: '#FDF5E6',
          dark: '#D4C4A1',
        },
        brown: {
          300: '#8a7560',
          400: '#6f5d4c',
          500: '#5a4a3c',
          600: '#4a3d31',
          700: '#3a3027',
          800: '#2d251f',
          900: '#1f1a15',
        },
        gold: {
          200: '#f0e6d0',
          300: '#e6d5b0',
          400: '#d4bf90',
          500: '#c4a96e',
          600: '#b0965a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.5s ease-out forwards',
        'gentle-zoom': 'gentleZoom 8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleZoom: {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
