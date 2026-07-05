/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        surface: '#0A0A0A',
        'surface-elevated': '#111111',
        'border-subtle': 'rgba(255,255,255,0.04)',
        'border-active': 'rgba(57,255,20,0.2)',
        'neon-green': '#39FF14',
        'neon-cyan': '#00F0FF',
        'neon-red': '#FF2D55',
        'text-primary': '#F0F0F0',
        'text-secondary': '#888888',
        'text-muted': '#555555',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
