import { useState, useEffect, useCallback } from 'react'
import type { Habit } from '../types/habit'

const STORAGE_KEY = 'habitnudge_data'
const TODAY = new Date().toISOString().split('T')[0]

const DEFAULT_HABITS: Habit[] = [
  { id: '1', name: 'Drink water', emoji: '💧', streak: 5, completed: false, completedDates: [], createdAt: '2026-06-28', dailyTarget: 1, currentCount: 0 },
  { id: '2', name: 'Read 10 pages', emoji: '📖', streak: 12, completed: false, completedDates: [], createdAt: '2026-06-20', dailyTarget: 1, currentCount: 0 },
  { id: '3', name: 'Meditate', emoji: '🧘', streak: 3, completed: false, completedDates: [], createdAt: '2026-06-29', dailyTarget: 1, currentCount: 0 },
]

function load(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_HABITS
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return DEFAULT_HABITS

    return parsed.map((h: Habit) => ({
      ...h,
      completed: h.completedDates?.includes(TODAY) ?? false,
      currentCount: h.completedDates?.includes(TODAY) ? h.dailyTarget : 0,
    }))
  } catch {
    return DEFAULT_HABITS
  }
}

function save(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(load)
  const [milestone, setMilestone] = useState<number | null>(null)

  useEffect(() => { save(habits) }, [habits])

  const toggleHabit = useCallback((id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h
      const wasComplete = h.completed
      const newCompleted = !wasComplete
      const newStreak = newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
      const newDates = newCompleted
        ? [...h.completedDates, TODAY]
        : h.completedDates.filter(d => d !== TODAY)

      if (newCompleted && [3, 7, 14, 30, 60, 100].includes(newStreak)) {
        setMilestone(newStreak)
      }

      return {
        ...h,
        completed: newCompleted,
        streak: newStreak,
        completedDates: newDates,
        currentCount: newCompleted ? h.dailyTarget : 0,
      }
    }))
  }, [])

  const addHabit = useCallback((name: string, emoji: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      emoji,
      streak: 0,
      completed: false,
      completedDates: [],
      createdAt: TODAY,
      dailyTarget: 1,
      currentCount: 0,
    }
    setHabits(prev => [...prev, newHabit])
  }, [])

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }, [])

  const dismissMilestone = useCallback(() => {
    setMilestone(null)
  }, [])

  const overallStreak = Math.max(...habits.map(h => h.streak), 0)
  const completedToday = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const progress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0

  return {
    habits,
    toggleHabit,
    addHabit,
    deleteHabit,
    milestone,
    dismissMilestone,
    overallStreak,
    completedToday,
    totalHabits,
    progress,
  }
}
