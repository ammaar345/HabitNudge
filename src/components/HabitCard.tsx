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
      initial={{ opacity: 0, y: 8, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onToggle(habit.id)}
      className={`
        flex items-center gap-3 p-3 cursor-pointer select-none shadow-card
        ${isCompleted
          ? 'bg-[#1A1528] border border-[rgba(0,210,160,0.08)]'
          : 'bg-surface border border-border-subtle'
        }
      `}
      style={{ transformStyle: 'preserve-3d', perspective: 600 }}
      whileHover={{
        y: -2,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        borderColor: isCompleted ? 'rgba(0,210,160,0.2)' : 'rgba(255,159,67,0.15)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox */}
      <motion.div
        className="relative w-[20px] h-[20px] flex items-center justify-center flex-shrink-0"
        style={{
          border: '1.5px solid',
          borderColor: isCompleted ? '#00D2A0' : 'rgba(255,255,255,0.1)',
        }}
        animate={{
          scale: isCompleted ? [1, 1.2, 1] : 1,
          backgroundColor: isCompleted
            ? 'rgba(0,210,160,0.12)'
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
            <CheckIcon color="#00D2A0" />
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              border: '1px solid rgba(0,210,160,0.3)',
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex items-center gap-2.5">
        <span className="text-lg leading-none opacity-70">{habit.emoji}</span>
        <span
          className={`text-sm font-sans font-medium truncate leading-tight ${
            isCompleted ? 'text-text-muted' : 'text-text-primary'
          }`}
          style={isCompleted ? { textDecoration: 'line-through', textDecorationColor: 'rgba(107,95,133,0.5)' } : {}}
        >
          {habit.name}
        </span>
      </div>

      {/* Streak badge */}
      {habit.streak > 0 && (
        <motion.div
          className="flex items-center gap-1 flex-shrink-0 px-1.5 py-0.5"
          style={{
            background: 'rgba(255,159,67,0.06)',
            border: '1px solid rgba(255,159,67,0.1)',
          }}
          key={`${habit.id}-${habit.streak}`}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <FlameSmall active />
          <span className="text-amber font-mono text-xs font-bold leading-none">{habit.streak}</span>
        </motion.div>
      )}
    </motion.div>
  )
}
