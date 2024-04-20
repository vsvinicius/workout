/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#1C1C1E',
          light: '#2C2C2E',
        },
        paper: {
          DEFAULT: '#2C2C2E',
          light: '#AFB1B2',
          dark: '#11161B',
        },
        primary: {
          DEFAULT: '#7C4DFF',
          dark: '#6515DD',
          light: '#E0E3FF',
        },
        success: {
          DEFAULT: '#5CB85C',
          light: '#1ABCA6',
        },
        white: {
          DEFAULT: '#F8F8FF',
          light: 'rgb(255,255,255,0.1)',
        },
        black: {
          DEFAULT: '#1C1C1E',
        },
      },
    },
  },
};
