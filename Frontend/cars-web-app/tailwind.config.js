/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'; // Import the plugin function

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050102',
          100: '#0a0502',
          200: '#0c0809',
        },
        primary: '#f5b804',
        secondary: '#1887d4',
        tertiary: '#cb551b'
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1.5',
          borderRadius: '0.375rem', // Rounded corners
          borderWidth: '1px',
          borderColor: 'transparent',
          transition: 'all 0.2s ease-in-out',
        },
        '.btn-primary': {
          backgroundColor: '#1d4ed8',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2563eb',
          },
          '&:focus': {
            outline: '2px solid #2563eb',
            outlineOffset: '2px',
          },
        },
        '.btn-secondary': {
          backgroundColor: '#9333ea',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#a855f7',
          },
          '&:focus': {
            outline: '2px solid #a855f7',
            outlineOffset: '2px',
          },
        },
        '.btn-danger': {
          backgroundColor: '#dc2626',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#ef4444',
          },
          '&:focus': {
            outline: '2px solid #ef4444',
            outlineOffset: '2px',
          },
        },
        '.btn-success': {
          backgroundColor: '#16a34a',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#22c55e',
          },
          '&:focus': {
            outline: '2px solid #22c55e',
            outlineOffset: '2px',
          },
        },
        '.btn-navbar': {
          backgroundColor: '#f5b804',
          color: '#050102',
          width: '32vw',
          margin: '2 auto 2 auto',
          borderTopLeftRadius: '10px',
          borderBottomRightRadius: '25px',
          borderTopRightRadius: '5px',
          borderBottomLeftRadius: '10px',
          '&:hover': {
            backgroundColor: '#a18d0d',
          },
          '&:focus': {
            outline: '2px solid #f5b804',
            outlineOffset: '2px',
          },
        },
      });
    }),
  ],
};
