/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0F0A1A',
        surface: '#1A1528',
        'surface-elevated': '#251F35',
        'border-subtle': 'rgba(255,255,255,0.05)',
        'border-active': 'rgba(255,159,67,0.25)',
        'amber': '#FF9F43',
        'coral': '#FF6B6B',
        'mint': '#00D2A0',
        'purple-accent': '#6C5CE7',
        'gold': '#FFD93D',
        'text-primary': '#F5F0FF',
        'text-secondary': '#9B8FB5',
        'text-muted': '#6B5F85',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '26px'],
        xl: ['22px', '30px'],
        '2xl': ['28px', '36px'],
        '3xl': ['36px', '44px'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        'glow-amber': '0 0 20px rgba(255,159,67,0.15)',
        'glow-coral': '0 0 20px rgba(255,107,107,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(6px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
