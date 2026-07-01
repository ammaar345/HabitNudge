import { motion } from 'framer-motion'

interface BottomNavProps {
  active: 'dashboard' | 'stats' | 'settings'
  onNavigate: (screen: 'dashboard' | 'stats' | 'settings') => void
}

const items = [
  { key: 'dashboard' as const, label: 'Habits', icon: FlameIcon },
  { key: 'stats' as const, label: 'Stats', icon: ChartIcon },
  { key: 'settings' as const, label: 'Settings', icon: GearIcon },
]

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-border-subtle z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4 pb-2">
        {items.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className="relative flex flex-col items-center gap-1 py-2 px-4 min-w-[60px]"
          >
            <item.icon color={active === item.key ? '#00F0FF' : '#4A4A55'} />
            <span
              className={`text-[10px] font-medium tracking-wider uppercase ${
                active === item.key ? 'text-neon-cyan' : 'text-text-muted'
              }`}
            >
              {item.label}
            </span>
            {active === item.key && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-neon-cyan"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

function FlameIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 2c0 4.418-2.686 8-6 8 0 5.523 3.134 10 7.5 10S20 15.523 20 10c-3.314 0-6-3.582-6-8z" />
      <path d="M12 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  )
}

function ChartIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 17V10M12 17V7M16 17V13" />
    </svg>
  )
}

function GearIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
      <path d="M19.07 4.93L20.5 3.5M4.93 4.93L3.5 3.5M4.93 19.07L3.5 20.5M19.07 19.07l1.43 1.43" />
    </svg>
  )
}
