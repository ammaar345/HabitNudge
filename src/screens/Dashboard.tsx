import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StreakRing from '../components/StreakRing'
import HabitCard from '../components/HabitCard'
import { PlusIcon, FlameIcon } from '../components/icons'
import type { Habit } from '../types/habit'
import { MOTIVATIONAL_QUOTES } from '../types/habit'

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

  const quote = useMemo(
    () => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],
    []
  )

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

  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className="px-4 pt-4 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between mb-1">
        <div>
          <h1 className="font-sans font-bold text-xs tracking-[0.08em] text-amber">
            HABITNUDGE
          </h1>
          <p className="text-text-secondary text-sm mt-0.5 font-sans">{today}</p>
        </div>
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface border border-border-subtle shadow-card"
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-mono text-sm font-bold text-amber">{completedToday}</span>
          <span className="text-text-muted text-xs">/</span>
          <span className="font-mono text-sm text-text-muted">{totalHabits}</span>
        </motion.div>
      </header>

      {/* Daily quote */}
      <motion.div
        className="mb-4 p-3 bg-surface border border-border-subtle shadow-card"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-text-secondary text-sm italic leading-relaxed">
          &ldquo;{quote.text}&rdquo;
          <span className="text-text-muted text-xs block mt-1 not-italic">{quote.author}</span>
        </p>
      </motion.div>

      {/* Streak Ring */}
      <StreakRing
        streak={overallStreak}
        progress={progress}
        completedToday={completedToday}
        totalHabits={totalHabits}
      />

      {/* Progress summary */}
      {totalHabits > 0 && (
        <motion.div
          className="flex items-center justify-center gap-3 mb-3 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="text-text-muted font-sans">
            <span className="text-amber font-semibold">{completionRate}%</span> today
          </span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted font-sans">
            <span className="text-mint font-semibold">{overallStreak}</span> day streak
          </span>
        </motion.div>
      )}

      {/* Habit List */}
      <div className="space-y-2">
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
        className="fixed bottom-16 right-4 w-11 h-11 flex items-center justify-center z-50 shadow-glow-amber"
        style={{
          background: 'linear-gradient(135deg, rgba(255,159,67,0.15) 0%, rgba(108,92,231,0.1) 100%)',
          border: '1px solid rgba(255,159,67,0.2)',
        }}
        animate={{
          boxShadow: [
            '0 0 0px rgba(255,159,67,0)',
            '0 0 16px rgba(255,159,67,0.15)',
            '0 0 0px rgba(255,159,67,0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileTap={{ scale: 0.85 }}
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
            <div className="absolute inset-0 bg-[#0F0A1A]/90" onClick={() => setIsAdding(false)} />
            <motion.div
              className="relative p-5 w-full max-w-md mx-auto"
              style={{
                background: 'linear-gradient(180deg, #1A1528 0%, #0F0A1A 100%)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h3 className="font-sans font-bold text-base text-text-primary mb-4 tracking-wide">
                New Habit
              </h3>

              <div className="flex gap-2 mb-3 flex-wrap">
                {EMOJIS.map(e => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`text-base w-8 h-8 flex items-center justify-center transition-all duration-150 ${
                      newEmoji === e
                        ? 'bg-[rgba(255,159,67,0.1)] border border-[rgba(255,159,67,0.3)]'
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
                placeholder="habit name..."
                className="w-full bg-[#0F0A1A] border border-[rgba(255,255,255,0.06)] px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:border-[rgba(255,159,67,0.3)] focus:outline-none transition font-sans text-sm"
                autoFocus
              />

              <button
                onClick={handleAdd}
                disabled={!newName.trim()}
                className="w-full mt-3 py-2.5 bg-amber/10 border border-amber/20 text-amber font-sans font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
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
  const seedQuote = useMemo(
    () => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center px-6"
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center mb-4 bg-surface border border-border-subtle shadow-card"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlameIcon active />
      </motion.div>
      <p className="text-text-secondary text-base font-sans font-medium mb-1">Start your streak</p>
      <p className="text-text-muted text-sm font-sans mb-4 leading-relaxed">
        &ldquo;{seedQuote.text}&rdquo;
      </p>
      <motion.button
        onClick={onAdd}
        className="px-4 py-2 text-amber text-sm font-sans font-medium shadow-card"
        style={{
          border: '1px solid rgba(255,159,67,0.2)',
          background: 'rgba(255,159,67,0.08)',
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{
          background: 'rgba(255,159,67,0.12)',
          boxShadow: '0 4px 20px rgba(255,159,67,0.1)',
        }}
      >
        Create first habit
      </motion.button>
    </motion.div>
  )
}
