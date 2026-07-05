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

  const size = 88
  const strokeWidth = 5
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
    <div className="flex flex-col items-center pt-4 pb-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Subtle grid bg behind ring */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57,255,20,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57,255,20,1) 1px, transparent 1px)
            `,
            backgroundSize: '6px 6px',
          }}
        />

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
              <stop offset="0%" stopColor="#39FF14" />
              <stop offset="100%" stopColor="#39FF14" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing glow ring when streak active */}
        {streak > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                'inset 0 0 4px rgba(57,255,20,0.04)',
                'inset 0 0 12px rgba(57,255,20,0.12)',
                'inset 0 0 4px rgba(57,255,20,0.04)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Center number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-mono text-2xl font-bold leading-none"
            style={{ color: '#F0F0F0' }}
            key={animatedStreak}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {animatedStreak}
          </motion.span>
          {streak > 0 && (
            <span className="text-[7px] text-text-muted mt-px uppercase tracking-[0.15em] font-satoshi">
              {streak === 1 ? 'day' : 'days'}
            </span>
          )}
        </div>
      </div>

      {/* Progress row */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className="flex items-center gap-1 px-1.5 py-0.5" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
          <motion.span
            className="font-mono text-[10px] text-neon-green font-bold"
            key={completedToday}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {completedToday}
          </motion.span>
          <span className="text-text-muted text-[8px]">/</span>
          <span className="font-mono text-[10px] text-text-muted">{totalHabits}</span>
          <span className="text-text-muted text-[8px] ml-0.5 font-satoshi">done</span>
        </div>
      </div>
    </div>
  )
}
