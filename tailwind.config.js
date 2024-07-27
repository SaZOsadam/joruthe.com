module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
      ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0066cc',
          dark: '#004c99',
        },
        secondary: {
          light: '#ffd699',
          DEFAULT: '#ffaa00',
          dark: '#cc8800',
        }, 
        success: {
          light: '#0d3a4e',
          DEFAULT: '#737373',
          dark: '#113647',
        },
        neutral: {
          light: '#f4f4f4',
          DEFAULT: '#737373',
          dark: '#404040',
        },
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

