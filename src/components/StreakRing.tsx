import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StreakRingProps {
  streak: number
  progress: number
  completedToday: number
  totalHabits: number
}

export default function StreakRing({ streak, progress, completedToday, totalHabits }: StreakRingProps) {
  const [animatedStreak, setAnimatedStreak] = useState(0)

  const size = 110
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (streak === 0) { setAnimatedStreak(0); return }
    const duration = 600
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setAnimatedStreak(Math.round(eased * streak))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [streak])

  const hasProgress = progress > 0

  return (
    <div className="flex flex-col items-center pt-5 pb-3">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
          {/* Progress arc */}
          {hasProgress && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="square"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9F43" />
              <stop offset="40%" stopColor="#FF6B6B" />
              <stop offset="80%" stopColor="#6C5CE7" />
              <stop offset="100%" stopColor="#00D2A0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow ring when streak active */}
        {streak > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                'inset 0 0 6px rgba(255,159,67,0.04)',
                'inset 0 0 16px rgba(255,159,67,0.12)',
                'inset 0 0 6px rgba(255,159,67,0.04)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-mono text-3xl font-bold leading-none"
            style={{ color: '#F5F0FF' }}
            key={animatedStreak}
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {animatedStreak}
          </motion.span>
          {streak > 0 && (
            <span className="text-xs text-text-muted mt-0.5 uppercase tracking-[0.12em] font-sans">
              {streak === 1 ? 'day' : 'days'}
            </span>
          )}
          {streak === 0 && (
            <span className="text-xs text-text-muted mt-0.5 font-sans">start</span>
          )}
        </div>
      </motion.div>

      {/* Progress row */}
      <motion.div
        className="mt-2.5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border-subtle shadow-card">
          <motion.span
            className="font-mono text-sm font-bold text-amber"
            key={completedToday}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {completedToday}
          </motion.span>
          <span className="text-text-muted text-xs">/</span>
          <span className="font-mono text-sm text-text-muted">{totalHabits}</span>
          <span className="text-text-muted text-xs ml-0.5 font-sans">done</span>
        </div>
      </motion.div>
    </div>
  )
}
