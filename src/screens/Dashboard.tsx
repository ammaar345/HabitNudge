import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StreakRing from '../components/StreakRing'
import HabitCard from '../components/HabitCard'
import type { Habit } from '../types/habit'

interface DashboardProps {
  habits: Habit[]
  toggleHabit: (id: string) => void
  addHabit: (name: string, emoji: string) => void
  overallStreak: number
  completedToday: number
  totalHabits: number
  progress: number
}

const EMOJIS = ['💧', '📖', '🧘', '🏃', '💪', '🥗', '🎸', '🎨', '💻', '🛏️']

export default function Dashboard(props: DashboardProps) {
  const { habits, toggleHabit, addHabit, overallStreak, completedToday, totalHabits, progress } = props
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('💧')

  const handleAdd = () => {
    if (!newName.trim()) return
    addHabit(newName.trim(), newEmoji)
    setNewName('')
    setIsAdding(false)
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric'
  })

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-2">
        <h1 className="font-orbitron font-bold text-xl tracking-wider text-neon-cyan">
          HABITNUDGE
        </h1>
        <p className="text-text-secondary text-sm font-inter mt-1">{today}</p>
      </header>

      {/* Streak Ring */}
      <StreakRing streak={overallStreak} progress={progress} completedToday={completedToday} totalHabits={totalHabits} />

      {/* Habit List */}
      <div className="px-4 mt-4 space-y-3">
        {habits.map((habit, i) => (
          <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} index={i} />
        ))}
      </div>

      {/* Add Button */}
      <motion.button
        onClick={() => setIsAdding(true)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6 text-void" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
        </svg>
      </motion.button>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
            <motion.div
              className="relative bg-surface-elevated rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-md mx-auto border border-border-subtle"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
            >
              <h3 className="font-orbitron font-bold text-xl text-text-primary mb-4">New Habit</h3>
              <div className="flex gap-3 mb-4 flex-wrap">
                {EMOJIS.map(e => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`text-2xl p-2 rounded-lg transition ${newEmoji === e ? 'bg-neon-cyan/20 border border-neon-cyan' : 'border border-border-subtle'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                placeholder="Habit name..."
                className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-neon-cyan focus:outline-none transition"
                autoFocus
              />
              <button
                onClick={handleAdd}
                disabled={!newName.trim()}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-void font-inter font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Habit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
