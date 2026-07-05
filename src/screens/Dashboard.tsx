import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StreakRing from '../components/StreakRing'
import HabitCard from '../components/HabitCard'
import { PlusIcon, FlameIcon } from '../components/icons'
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
    setNewEmoji('💧')
    setIsAdding(false)
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  const openAdd = () => {
    if (typeof window.__playSound === 'function') window.__playSound('tap')
    setIsAdding(true)
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="px-4 pt-4 pb-0 flex items-center justify-between">
        <div>
          <h1 className="font-satoshi font-bold text-[11px] tracking-[0.1em] text-[#39FF14]">
            HABITNUDGE
          </h1>
          <p className="text-text-secondary text-[10px] font-satoshi mt-px">{today}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-surface border border-[rgba(255,255,255,0.04)]">
          <span className="font-mono text-[10px] text-neon-green font-bold">{completedToday}</span>
          <span className="text-text-muted text-[8px]">/</span>
          <span className="font-mono text-[10px] text-text-muted">{totalHabits}</span>
        </div>
      </header>

      {/* Streak Ring */}
      <StreakRing
        streak={overallStreak}
        progress={progress}
        completedToday={completedToday}
        totalHabits={totalHabits}
      />

      {/* Habit List */}
      <div className="px-4 space-y-1">
        {habits.length === 0 ? (
          <EmptyState onAdd={openAdd} />
        ) : (
          habits.map((habit, i) => (
            <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} index={i} />
          ))
        )}
      </div>

      {/* FAB */}
      <motion.button
        onClick={openAdd}
        className="fixed bottom-14 right-4 w-10 h-10 flex items-center justify-center z-50"
        style={{
          background: 'rgba(57,255,20,0.1)',
          border: '1px solid rgba(57,255,20,0.15)',
          borderRadius: 0,
        }}
        animate={{
          boxShadow: [
            '0 0 0px rgba(57,255,20,0)',
            '0 0 14px rgba(57,255,20,0.15)',
            '0 0 0px rgba(57,255,20,0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileTap={{ scale: 0.85, backgroundColor: 'rgba(57,255,20,0.2)' }}
        whileHover={{ scale: 1.05 }}
      >
        <PlusIcon />
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
            <div className="absolute inset-0 bg-[#000000]/90" onClick={() => setIsAdding(false)} />
            <motion.div
              className="relative p-4 w-full max-w-md mx-auto"
              style={{
                background: '#0A0A0A',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h3 className="font-satoshi font-bold text-xs text-text-primary mb-3 tracking-wider">
                NEW HABIT
              </h3>

              <div className="flex gap-1.5 mb-3 flex-wrap">
                {EMOJIS.map(e => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`text-sm w-7 h-7 flex items-center justify-center transition-all duration-150 ${
                      newEmoji === e
                        ? 'bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.3)]'
                        : 'border border-[rgba(255,255,255,0.04)]'
                    }`}
                    style={{ borderRadius: 0 }}
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
                className="w-full bg-[#000000] border border-[rgba(255,255,255,0.04)] px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-[rgba(57,255,20,0.3)] focus:outline-none transition font-satoshi text-xs"
                autoFocus
              />

              <button
                onClick={handleAdd}
                disabled={!newName.trim()}
                className="w-full mt-3 py-2 bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.2)] text-neon-green font-satoshi font-semibold text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                style={{ borderRadius: 0 }}
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

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <FlameIcon className="mb-3" />
      <p className="text-text-muted text-xs font-satoshi mb-2">No habits yet</p>
      <motion.button
        onClick={onAdd}
        className="px-3 py-1.5 text-neon-green text-xs font-satoshi font-medium"
        style={{
          border: '1px solid rgba(57,255,20,0.15)',
          background: 'rgba(57,255,20,0.05)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        Create first habit
      </motion.button>
    </motion.div>
  )
}
