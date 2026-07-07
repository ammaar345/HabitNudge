import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Habit } from '../types/habit'

interface StatsProps {
  habits: Habit[]
}

function useCountUp(target: number, duration = 600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target === 0) { setCount(0); return }
    const start = performance.now()
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  return count
}

export default function Stats({ habits }: StatsProps) {
  const totalCompletions = useMemo(
    () => habits.reduce((acc, h) => acc + h.completedDates.length, 0),
    [habits]
  )

  const bestStreak = useMemo(
    () => Math.max(...habits.map(h => h.streak), 0),
    [habits]
  )

  const avgStreak = useMemo(
    () => habits.length > 0 ? Math.round(habits.reduce((acc, h) => acc + h.streak, 0) / habits.length) : 0,
    [habits]
  )

  const animatedTotal = useCountUp(totalCompletions)
  const animatedBest = useCountUp(bestStreak)
  const animatedAvg = useCountUp(avgStreak)

  const weeklyData = useMemo(() => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    return days.map((day, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      const dateStr = date.toISOString().split('T')[0]
      return { day, completed: habits.filter(h => h.completedDates.includes(dateStr)).length }
    })
  }, [habits])

  const maxWeekly = Math.max(...weeklyData.map(d => d.completed), 1)

  const heatMap = useMemo(() => {
    const days: { date: string; count: number }[] = []
    for (let i = 27; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const count = habits.filter(h => h.completedDates.includes(dateStr)).length
      days.push({ date: dateStr, count })
    }
    return days
  }, [habits])

  const maxHeat = Math.max(...heatMap.map(d => d.count), 1)

  return (
    <div className="px-4 pt-4 pb-20">
      <motion.h1
        className="font-sans font-bold text-xs tracking-[0.08em] text-amber mb-4"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        STATISTICS
      </motion.h1>

      {/* Summary cards */}
      <motion.div
        className="grid grid-cols-3 gap-2 mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <StatCard label="Total" value={animatedTotal} color="#FF9F43" />
        <StatCard label="Best" value={`${animatedBest}d`} color="#FF6B6B" />
        <StatCard label="Avg" value={`${animatedAvg}d`} color="#6C5CE7" />
      </motion.div>

      {/* Heat Map */}
      <motion.div
        className="bg-surface p-3 mb-3 border border-border-subtle shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <h3 className="font-sans font-bold text-xs text-text-muted mb-3 tracking-wider uppercase">
          Last 4 Weeks
        </h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-7 gap-[3px]">
            {heatMap.map((day, i) => {
              const intensity = day.count / maxHeat
              const bgColor =
                intensity === 0 ? '#1A1528'
                : intensity < 0.33 ? 'rgba(255,159,67,0.12)'
                : intensity < 0.66 ? 'rgba(255,159,67,0.3)'
                : intensity < 1 ? 'rgba(255,159,67,0.55)'
                : '#FF9F43'
              return (
                <motion.div
                  key={day.date}
                  className="w-3 h-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.012, duration: 0.2 }}
                  style={{ backgroundColor: bgColor }}
                  title={`${day.date}: ${day.count}`}
                />
              )
            })}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 mt-2">
          <span className="text-text-muted text-xs font-sans">Less</span>
          {[0.12, 0.3, 0.55, 1].map((op, i) => (
            <div key={i} className="w-2 h-2" style={{ backgroundColor: `rgba(255,159,67,${op})` }} />
          ))}
          <span className="text-text-muted text-xs font-sans">More</span>
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        className="bg-surface p-3 mb-3 border border-border-subtle shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <h3 className="font-sans font-bold text-xs text-text-muted mb-3 tracking-wider uppercase">
          This Week
        </h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {weeklyData.map((d, i) => {
            const height = maxWeekly > 0 ? (d.completed / maxWeekly) * 100 : 0
            const isToday = i === 6

            const barColors = ['#FF9F43', '#FF6B6B', '#6C5CE7', '#00D2A0', '#FFD93D', '#FF9F43', '#FF6B6B']

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex justify-center">
                  <motion.div
                    className="w-full max-w-[18px]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: `${Math.max(height, 4)}%`,
                      transformOrigin: 'bottom',
                      backgroundColor: barColors[i],
                      opacity: isToday ? 1 : 0.5,
                    }}
                  />
                </div>
                <span className={`text-[10px] font-mono ${isToday ? 'text-amber font-bold' : 'text-text-muted'}`}>
                  {d.day}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Habit Performance */}
      <motion.div
        className="bg-surface p-3 border border-border-subtle shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
      >
        <h3 className="font-sans font-bold text-xs text-text-muted mb-3 tracking-wider uppercase">
          Habits
        </h3>
        {habits.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-6 font-sans">No habits yet. Start building your streak!</p>
        ) : (
          <div className="space-y-3">
            {habits.map((habit, i) => {
              const barColor = ['#FF9F43', '#FF6B6B', '#6C5CE7', '#00D2A0', '#FFD93D'][i % 5]
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm leading-none opacity-70">{habit.emoji}</span>
                    <span className="text-text-primary text-sm font-sans flex-1 truncate">{habit.name}</span>
                    <span className="text-amber font-mono text-xs font-bold">{habit.streak}d</span>
                  </div>
                  <div className="w-full h-[3px] bg-[rgba(255,255,255,0.03)] overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: barColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((habit.streak / 30) * 100, 100)}%` }}
                      transition={{ delay: 0.25 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <motion.div
      className="bg-surface p-3 flex flex-col items-center border border-border-subtle shadow-card"
      whileHover={{ borderColor: 'rgba(255,159,67,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="font-mono text-lg font-bold" style={{ color }}>{value}</span>
      <span className="text-text-muted text-xs mt-1 uppercase tracking-wider font-sans">{label}</span>
    </motion.div>
  )
}
