export interface Habit {
  id: string
  name: string
  emoji: string
  streak: number
  completed: boolean
  completedDates: string[]
  createdAt: string
  dailyTarget: number
  currentCount: number
}
export interface Milestone {
  streak: number
  message: string
}
export const MILESTONES: Milestone[] = [
  { streak: 3, message: 'Building momentum!' },
  { streak: 7, message: 'One week strong!' },
  { streak: 14, message: 'Two weeks unstoppable!' },
  { streak: 30, message: 'Full month champion!' },
  { streak: 60, message: 'Two month legend!' },
  { streak: 100, message: 'Century club!' },
]
