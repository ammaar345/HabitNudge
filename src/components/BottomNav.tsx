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
    if (typeof window.__matrixFlash === 'function') {
      window.__matrixFlash()
    }
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
      {/* Top border line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="bg-[#000000] max-w-md mx-auto">
        <div className="flex items-center justify-around h-11 px-2">
          {items.map((item) => {
            const isActive = active === item.key
            return (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className="relative flex flex-col items-center gap-0.5 py-1.5 px-4 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* 3D perspective effect on active */}
                <motion.div
                  className="flex flex-col items-center gap-0.5"
                  animate={
                    isActive
                      ? {
                          rotateX: -4,
                          translateZ: 4,
                          scale: 1.05,
                        }
                      : { rotateX: 0, translateZ: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ perspective: 300 }}
                >
                  {/* Active indicator - thin line */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-bar"
                      className="absolute -top-px w-4 h-[1.5px]"
                      style={{ background: '#39FF14' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  <div className="relative">
                    <item.icon active={isActive} />

                    {/* Matrix characters on active icon */}
                    {isActive && (
                      <motion.span
                        className="absolute -top-2 -right-2 text-[6px] font-mono leading-none"
                        style={{ color: 'rgba(57,255,20,0.3)' }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        01
                      </motion.span>
                    )}
                  </div>

                  <motion.span
                    className="text-[8px] font-satoshi font-medium tracking-widest uppercase"
                    animate={
                      isActive
                        ? { color: '#39FF14', opacity: 1 }
                        : { color: '#555555', opacity: 0.6 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>

                {/* Subtle matrix green dot on active */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 w-[2px] h-[2px] rounded-full"
                    style={{ background: '#39FF14', boxShadow: '0 0 4px #39FF14' }}
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
