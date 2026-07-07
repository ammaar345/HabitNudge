import { motion, AnimatePresence } from 'framer-motion'
import { MILESTONES } from '../types/habit'
import { useEffect, useRef, useCallback } from 'react'

interface MilestoneModalProps {
  streak: number | null
  onDismiss: () => void
}

export default function MilestoneModal({ streak, onDismiss }: MilestoneModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  const runConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#FF9F43', '#FF6B6B', '#6C5CE7', '#00D2A0', '#FFD93D']
    const particles: {
      x: number; y: number; vx: number; vy: number
      size: number; color: string; rotation: number; rotationSpeed: number
      gravity: number; opacity: number
    }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2 - 20,
        vx: (Math.random() - 0.5) * 12,
        vy: -3 - Math.random() * 8,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        gravity: 0.1 + Math.random() * 0.06,
        opacity: 1,
      })
    }

    let frame = 0
    const maxFrames = 120

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      for (const p of particles) {
        p.x += p.vx
        p.vy += p.gravity
        p.y += p.vy
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        p.opacity = Math.max(0, 1 - frame / maxFrames)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.5)
        ctx.restore()
      }

      if (frame < maxFrames) {
        animFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (streak) {
      runConfetti()
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [streak, runConfetti])

  if (!streak) return null
  const milestone = MILESTONES.find(m => m.streak === streak)
  if (!milestone) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#0F0A1A]/95"
          onClick={onDismiss}
        />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        <motion.div
          className="relative z-20 flex flex-col items-center text-center max-w-[260px]"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          {/* Celebration icon */}
          <motion.div
            className="w-14 h-14 flex items-center justify-center mb-4 shadow-glow-amber"
            style={{
              border: '1px solid rgba(255,159,67,0.15)',
              background: 'linear-gradient(135deg, rgba(255,159,67,0.08) 0%, rgba(108,92,231,0.05) 100%)',
            }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(255,159,67,0)',
                '0 0 20px rgba(255,159,67,0.2)',
                '0 0 0px rgba(255,159,67,0)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.svg
              width="26" height="26" viewBox="0 0 16 16" fill="none"
              stroke="#FF9F43" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M8 2C6 5 3 6.5 3 10.5C3 13 5.2 15 8 15C10.8 15 13 13 13 10.5C13 6.5 10 5 8 2Z" />
            </motion.svg>
          </motion.div>

          {/* Streak number */}
          <motion.h2
            className="font-sans font-bold text-2xl tracking-tight text-text-primary mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
          >
            {streak} Day Streak
          </motion.h2>

          {/* Milestone badge */}
          <motion.div
            className="px-3 py-1"
            style={{
              border: '1px solid rgba(255,217,61,0.2)',
              background: 'rgba(255,217,61,0.08)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <span className="text-[#FFD93D] font-mono text-xs font-bold uppercase tracking-wider">
              {milestone.message}
            </span>
          </motion.div>

          <motion.button
            onClick={onDismiss}
            className="mt-4 px-6 py-2.5 text-sm font-sans font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(255,159,67,0.1) 0%, rgba(108,92,231,0.08) 100%)',
              border: '1px solid rgba(255,159,67,0.2)',
              color: '#FF9F43',
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ boxShadow: '0 4px 20px rgba(255,159,67,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Keep going &rarr;
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
