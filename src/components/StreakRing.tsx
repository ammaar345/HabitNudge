import { motion } from 'framer-motion'

interface StreakRingProps {
  streak: number
  progress: number
  completedToday: number
  totalHabits: number
}

export default function StreakRing({ streak, progress, completedToday, totalHabits }: StreakRingProps) {
  const size = 160
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center py-5">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full opacity-15 blur-xl"
          style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.25), transparent 70%)' }}
        />
        <svg width={size} height={size} className="transform -rotate-90 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2A2A35"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#sg)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39FF14" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={streak}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-mono text-5xl font-bold text-white leading-none"
          >
            {streak}
          </motion.span>
          <span className="text-xs text-text-secondary mt-0.5 uppercase tracking-widest">Streak</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-mono text-base text-neon-green font-bold">{completedToday}</span>
        <span className="text-text-muted text-sm">/ {totalHabits}</span>
        <span className="text-text-muted text-sm">done</span>
      </div>
    </div>
  )
}
