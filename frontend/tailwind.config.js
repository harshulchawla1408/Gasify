/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
        },
        accent: {
          DEFAULT: '#22c55e', // green-500
          light: '#bbf7d0',   // green-100
        },
        neutral: {
          50: '#f9fafb',      // gray-50
          100: '#f3f4f6',     // gray-100
        },
      },
      fontFamily: {
        sans: [
          'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif',
        ],
      },
      letterSpacing: {
        wide: '.025em',
      },
    },
  },
  plugins: [],
} 