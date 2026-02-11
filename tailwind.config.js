/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00e5ff',
          50: '#e6fbff',
        },
        glass: 'rgba(255,255,255,0.04)',
        card: 'rgba(13,14,23,0.5)'
      },
      boxShadow: {
        glass: '0 6px 20px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      backdropBlur: {
        xs: '4px',
        md: '8px'
      }
    }
  },
  plugins: [],
}
