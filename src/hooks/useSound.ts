import { useCallback, useRef } from 'react'

type SoundType = 'tap' | 'toggle' | 'pageSwitch'

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.06) {
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export function useSound() {
  const enabled = useRef(true)

  const play = useCallback((type: SoundType) => {
    if (!enabled.current) return
    try {
      switch (type) {
        case 'tap':
          playTone(800, 0.03, 'sine')
          break
        case 'toggle':
          playTone(600, 0.04, 'sine', 0.05)
          setTimeout(() => playTone(900, 0.04, 'sine', 0.04), 30)
          break
        case 'pageSwitch':
          playTone(300, 0.06, 'sine', 0.04)
          setTimeout(() => playTone(800, 0.04, 'sine', 0.03), 40)
          setTimeout(() => playTone(1200, 0.04, 'sine', 0.02), 80)
          break
      }
    } catch {
      // audio context may be blocked by browser
    }
  }, [])

  const toggle = useCallback(() => {
    enabled.current = !enabled.current
    return enabled.current
  }, [])

  return { play, toggle, isEnabled: enabled.current }
}
