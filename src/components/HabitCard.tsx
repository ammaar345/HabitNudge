import { motion } from 'framer-motion'
import { CheckIcon, FlameSmall } from './icons'
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onToggle(habit.id)}
      className={`
        flex items-center gap-2.5 p-2 rounded-lg cursor-pointer select-none
        ${isCompleted
          ? 'bg-surface-elevated border border-[rgba(57,255,20,0.06)]'
          : 'bg-surface border border-[rgba(255,255,255,0.04)]'
        }
      `}
    >
      {/* Sharp square checkbox */}
      <motion.div
        className="relative w-[18px] h-[18px] flex items-center justify-center flex-shrink-0"
        style={{
          border: '1px solid',
          borderColor: isCompleted ? '#39FF14' : 'rgba(255,255,255,0.08)',
          borderRadius: 2,
        }}
        animate={{
          scale: isCompleted ? [1, 1.2, 1] : 1,
          backgroundColor: isCompleted
            ? 'rgba(57,255,20,0.1)'
            : 'transparent',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            <CheckIcon />
          </motion.div>
        )}

        {/* Expanding glow ring on complete */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              border: '1px solid rgba(57,255,20,0.3)',
              borderRadius: 2,
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className="text-sm leading-none opacity-60 font-satoshi">{habit.emoji}</span>
        <span
          className={`text-sm font-satoshi font-medium truncate leading-tight ${
            isCompleted ? 'text-text-muted' : 'text-text-primary'
          }`}
          style={isCompleted ? { textDecoration: 'line-through', textDecorationColor: 'rgba(85,85,85,0.5)' } : {}}
        >
          {habit.name}
        </span>
      </div>

      {/* Streak */}
      {habit.streak > 0 && (
        <motion.div
          className="flex items-center gap-1 flex-shrink-0"
          key={`${habit.id}-${habit.streak}`}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <FlameSmall active />
          <span className="text-neon-green font-mono text-[9px] font-bold leading-none">{habit.streak}</span>
        </motion.div>
      )}
    </motion.div>
  )
}
