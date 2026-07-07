import { useEffect, useRef } from 'react'

const COLORS = [
  { r: 255, g: 159, b: 67 },   // amber
  { r: 108, g: 92, b: 231 },   // purple
  { r: 255, g: 107, b: 107 },  // coral
  { r: 0, g: 210, b: 160 },    // mint
]

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: { r: number; g: number; b: number }
  alpha: number
  alphaSpeed: number
  pulsePhase: number
}

export default function AmbientGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const orbs: Orb[] = []
    const orbCount = Math.min(12, Math.floor(window.innerWidth / 80))

    for (let i = 0; i < orbCount; i++) {
      const color = COLORS[i % COLORS.length]
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 40 + Math.random() * 100,
        color,
        alpha: 0.03 + Math.random() * 0.04,
        alphaSpeed: 0.002 + Math.random() * 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let lastTime = 0

    const animate = (time: number) => {
      if (!ctx || !canvas) return
      const dt = lastTime ? Math.min(time - lastTime, 50) : 16
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const orb of orbs) {
        orb.x += orb.vx * dt * 0.06
        orb.y += orb.vy * dt * 0.06
        orb.pulsePhase += orb.alphaSpeed * dt * 0.06

        // Wrap around edges
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const pulse = 1 + Math.sin(orb.pulsePhase) * 0.15
        const currentAlpha = orb.alpha * (0.5 + Math.sin(orb.pulsePhase * 0.7) * 0.5)

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius * pulse
        )
        gradient.addColorStop(0, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},${currentAlpha})`)
        gradient.addColorStop(0.4, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},${currentAlpha * 0.3})`)
        gradient.addColorStop(1, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(
          orb.x - orb.radius * pulse,
          orb.y - orb.radius * pulse,
          orb.radius * 2 * pulse,
          orb.radius * 2 * pulse
        )
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
