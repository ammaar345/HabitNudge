import { useEffect, useRef, useCallback } from 'react'

interface MatrixRainProps {
  density?: number
  speed?: number
  intensity?: number
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

export default function MatrixRain({ density = 0.3, speed = 1, intensity = 1 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const flashEndRef = useRef(0)

  const flash = useCallback(() => {
    flashEndRef.current = performance.now() + 300
  }, [])

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

    const cols = Math.floor(canvas.width / 14)
    const drops: { y: number; speed: number; chars: string[] }[] = []

    for (let i = 0; i < cols; i++) {
      if (Math.random() > density) {
        drops.push({ y: -999, speed: 0, chars: [] })
        continue
      }
      const charCount = 3 + Math.floor(Math.random() * 8)
      const chars: string[] = []
      for (let j = 0; j < charCount; j++) {
        chars.push(CHARS[Math.floor(Math.random() * CHARS.length)])
      }
      drops.push({
        y: -charCount * 14,
        speed: (0.5 + Math.random() * 1.5) * speed,
        chars,
      })
    }

    let lastTime = 0

    const animate = (time: number) => {
      if (!ctx || !canvas) return
      const dt = Math.min(time - lastTime, 50)
      lastTime = time

      const flashActive = time < flashEndRef.current
      const baseAlpha = flashActive ? 0.15 : 0.02 * intensity

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        if (drop.speed === 0) continue

        drop.y += drop.speed * dt * 0.06

        const x = i * 14
        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * 14
          if (charY < -14 || charY > canvas.height + 14) continue

          const isLead = j === 0
          const alpha = isLead
            ? Math.min(baseAlpha * 4, 0.5)
            : baseAlpha * Math.max(0.3, 1 - j / drop.chars.length)

          ctx.font = '11px "JetBrains Mono", monospace'
          ctx.fillStyle = `rgba(57,255,20,${alpha})`
          ctx.fillText(drop.chars[j], x, charY)
        }

        if (drop.y > canvas.height + 20) {
          drop.y = -drop.chars.length * 14
          drop.speed = (0.5 + Math.random() * 1.5) * speed
          for (let j = 0; j < drop.chars.length; j++) {
            drop.chars[j] = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.__matrixFlash = flash

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      delete window.__matrixFlash
    }
  }, [density, speed, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  )
}

declare global {
  interface Window {
    __matrixFlash?: () => void
  }
}
