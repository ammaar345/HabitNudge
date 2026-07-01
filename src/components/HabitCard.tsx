import { motion } from 'framer-motion'
import type { Habit } from '../types/habit'

interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => void
  index: number
}

export default function HabitCard({ habit, onToggle, index }: HabitCardProps) {
  const isCompleted = habit.completed

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      whileTap={{ scale: 0.97 }}
      className={`
        flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer
        ${isCompleted
          ? 'bg-surface border-neon-green/25'
          : 'bg-surface border-border-subtle hover:border-border-active'
        }
      `}
      onClick={() => onToggle(habit.id)}
    >
      {/* Checkbox */}
      <div
        className={`
          w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
          transition-all duration-200
          ${isCompleted ? 'bg-neon-green border-neon-green' : 'border-border-active'}
        `}
      >
        {isCompleted && (
          <svg className="w-4 h-4 text-void" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
            <path d="M5 13l5 5L19 7" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className={`block truncate text-sm ${isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
          {habit.emoji} {habit.name}
        </span>
      </div>

      {/* Streak */}
      {habit.streak > 0 && (
        <span className="text-neon-green font-mono text-xs font-bold flex-shrink-0">
          {habit.streak}
        </span>
      )}
    </motion.div>
  )
}
