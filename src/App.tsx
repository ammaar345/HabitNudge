import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHabits } from './hooks/useHabits'
import Dashboard from './screens/Dashboard'
import Stats from './screens/Stats'
import Settings from './screens/Settings'
import BottomNav from './components/BottomNav'
import MilestoneModal from './components/MilestoneModal'

export default function App() {
  const [screen, setScreen] = useState<'dashboard' | 'stats' | 'settings'>('dashboard')

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

  return (
    <div className="min-h-screen bg-void text-text-primary max-w-md mx-auto relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {screen === 'dashboard' && (
            <Dashboard
              habits={habits}
              toggleHabit={toggleHabit}
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

      <BottomNav active={screen} onNavigate={setScreen} />
      <MilestoneModal streak={milestone} onDismiss={dismissMilestone} />
    </div>
  )
}
