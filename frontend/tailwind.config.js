/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B1110',
        forest: '#10201A',
        brand: '#164A35',
        emerald: '#22A06B',
        sage: '#8BC7A8',
        sand: '#E7D7B5',
        gold: '#D9A441',
        terra: '#C96B4B',
        cloud: '#F3F1EA',
        mist: '#A9B4AE',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.24)',
        glow: '0 0 40px rgba(34, 160, 107, 0.12)',
      },
    },
  },
  plugins: [],
}