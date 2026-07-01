/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#0E0E12',
        'surface-elevated': '#1A1A23',
        'border-subtle': '#2A2A35',
        'border-active': '#3D3D4D',
        'neon-green': '#39FF14',
        'neon-cyan': '#00F0FF',
        'neon-pink': '#FF007F',
        'neon-amber': '#FFB800',
        'neon-red': '#FF3333',
        'text-primary': '#F0F0F0',
        'text-secondary': '#8B8B99',
        'text-muted': '#4A4A55',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'ring-fill': 'ringFill 600ms ease-out forwards',
        'confetti-fall': 'confettiFall 2s ease-out forwards',
        'slide-up': 'slideUp 300ms ease-out forwards',
        'ripple': 'ripple 600ms ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        ringFill: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: 'var(--target-offset, 0)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
