import { motion } from 'framer-motion'
import { FlameIcon, ChartIcon, GearIcon } from './icons'

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
  const handleNav = (key: typeof active) => {
    if (typeof window.__playSound === 'function') {
      window.__playSound('pageSwitch')
    }
    onNavigate(key)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="bg-[#0F0A1A] max-w-md mx-auto">
        <div className="flex items-center justify-around h-12 px-2">
          {items.map((item) => {
            const isActive = active === item.key
            return (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className="relative flex flex-col items-center gap-0.5 py-1.5 px-5 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <motion.div
                  className="flex flex-col items-center gap-0.5"
                  animate={
                    isActive
                      ? { rotateX: -4, translateZ: 4, scale: 1.05 }
                      : { rotateX: 0, translateZ: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ perspective: 300 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bar"
                      className="absolute -top-px w-5 h-[2px]"
                      style={{ background: '#FF9F43' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  <div className="relative">
                    <item.icon active={isActive} />
                  </div>

                  <motion.span
                    className="text-[9px] font-sans font-medium tracking-widest uppercase"
                    animate={
                      isActive
                        ? { color: '#FF9F43', opacity: 1 }
                        : { color: '#6B5F85', opacity: 0.6 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>

                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 w-[3px] h-[3px]"
                    style={{ background: '#FF9F43', boxShadow: '0 0 6px #FF9F43' }}
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
