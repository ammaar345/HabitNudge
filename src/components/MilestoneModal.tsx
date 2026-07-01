import { motion, AnimatePresence } from 'framer-motion'
import { MILESTONES } from '../types/habit'

interface MilestoneModalProps {
  streak: number | null
  onDismiss: () => void
}

export default function MilestoneModal({ streak, onDismiss }: MilestoneModalProps) {
  if (!streak) return null

  const milestone = MILESTONES.find(m => m.streak === streak)
  if (!milestone) return null

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#39FF14', '#00F0FF', '#FF007F'][i % 3],
    size: Math.random() * 6 + 2,
    delay: Math.random() * 0.3,
    duration: 1.5 + Math.random() * 1,
  }))

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-void/95 backdrop-blur-sm"
          onClick={onDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Confetti particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: `${p.x}%`,
              top: -10,
            }}
            animate={{
              y: ['100vh'],
              x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
              rotate: [0, 720],
              opacity: [1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Modal content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="mb-4 text-8xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            🔥
          </motion.div>

          <motion.h2
            className="font-orbitron font-bold text-4xl md:text-5xl text-text-primary mb-2"
            style={{ textShadow: '0 0 30px rgba(57, 255, 20, 0.5)' }}
          >
            {streak} DAY STREAK!
          </motion.h2>

          <p className="text-text-secondary text-lg mb-8 font-inter">
            {milestone.message}
          </p>

          <motion.button
            onClick={onDismiss}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-green to-neon-cyan text-void font-inter font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Keep the fire alive
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
