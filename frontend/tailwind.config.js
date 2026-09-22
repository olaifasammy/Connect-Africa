/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "The Scholar" Core Tokens
        parchment: '#FDF6E3',
        paper: '#FFFFFF',
        ink: '#121619',
        stone: '#78716C',
        emerald: {
          DEFAULT: '#064E3B',
          900: '#064E3B',
          700: '#047857',
          100: '#D1FAE5',
        },
        gold: {
          DEFAULT: '#C9A86A',
          savanna: '#C9A86A',
        },
        clay: '#A1624D',

        // Semantic CSS Variable Extensions
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        'text-main': 'var(--text-primary)',
        'text-muted': 'var(--text-secondary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },

        // Backward Compatibility Palette Mappings
        forest: 'var(--bg-surface)',
        brand: '#064E3B',
        sage: '#047857',
        sand: '#FDF6E3',
        terra: '#A1624D',
        cloud: '#FDF6E3',
        mist: '#78716C',
      },
      fontFamily: {
        serif: ['Lora', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        scholar: '0 4px 20px -2px rgba(18, 22, 25, 0.05)',
        'node-glow': '0 0 15px rgba(209, 250, 229, 0.8)',
        glow: '0 0 30px rgba(6, 78, 59, 0.12)',
        soft: '0 10px 30px rgba(18, 22, 25, 0.08)',
      },
    },
  },
  plugins: [],
}
