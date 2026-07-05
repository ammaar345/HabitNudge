import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHabits } from './hooks/useHabits'
import { useSound } from './hooks/useSound'
import Dashboard from './screens/Dashboard'
import Stats from './screens/Stats'
import Settings from './screens/Settings'
import BottomNav from './components/BottomNav'
import MilestoneModal from './components/MilestoneModal'
import MatrixRain from './components/MatrixRain'
import { ScanlineOverlay, GridOverlay, NoiseOverlay } from './components/icons'

const SCREEN_ORDER = ['dashboard', 'stats', 'settings'] as const
type Screen = (typeof SCREEN_ORDER)[number]

const pageVariants = {
  enter: (dir: number) => ({
    x: dir * 30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: -dir * 30,
    opacity: 0,
  }),
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [navDir, setNavDir] = useState(0)
  const sound = useSound()

  // Expose sound globally so MatrixRain and other components can trigger it
  useEffect(() => {
    window.__playSound = sound.play
    return () => { delete window.__playSound }
  }, [sound.play])

  const navigate = useCallback(
    (next: Screen) => {
      setNavDir(SCREEN_ORDER.indexOf(next) - SCREEN_ORDER.indexOf(screen))
      setScreen(next)
    },
    [screen]
  )

  const {
    habits,
    toggleHabit,
    addHabit,
    milestone,
    dismissMilestone,
    overallStreak,
    completedToday,
    totalHabits,
    progress,
  } = useHabits()

  const handleToggle = useCallback(
    (id: string) => {
      if (typeof window.__playSound === 'function') {
        window.__playSound('toggle')
      }
      toggleHabit(id)
    },
    [toggleHabit]
  )

  return (
    <div className="min-h-dvh bg-void text-text-primary max-w-md mx-auto relative overflow-hidden">
      {/* Matrix rain background */}
      <MatrixRain density={0.25} speed={0.8} intensity={1} />

      {/* Atmosphere overlays - layered for depth */}
      <NoiseOverlay className="absolute inset-0 pointer-events-none z-5" />
      <GridOverlay className="absolute inset-0 pointer-events-none z-5" />
      <ScanlineOverlay className="absolute inset-0 pointer-events-none z-5" />

      {/* Content layer */}
      <div className="relative z-10">
        <AnimatePresence mode="popLayout" custom={navDir}>
          <motion.div
            key={screen}
            custom={navDir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {screen === 'dashboard' && (
              <Dashboard
                habits={habits}
                toggleHabit={handleToggle}
                addHabit={addHabit}
                overallStreak={overallStreak}
                completedToday={completedToday}
                totalHabits={totalHabits}
                progress={progress}
              />
            )}
            {screen === 'stats' && <Stats habits={habits} />}
            {screen === 'settings' && <Settings />}
          </motion.div>
        </AnimatePresence>

        <BottomNav active={screen} onNavigate={navigate} />
        <MilestoneModal streak={milestone} onDismiss={dismissMilestone} />
      </div>
    </div>
  )
}

declare global {
  interface Window {
    __playSound?: (type: 'tap' | 'toggle' | 'pageSwitch') => void
  }
}
