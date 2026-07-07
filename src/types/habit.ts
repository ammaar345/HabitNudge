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

export const MOTIVATIONAL_QUOTES = [
  { text: 'Small steps lead to big changes.', author: '— Lao Tzu' },
  { text: 'The secret of getting ahead is getting started.', author: '— Mark Twain' },
  { text: 'Success is the sum of small efforts repeated daily.', author: '— Robert Collier' },
  { text: 'You don\'t have to be extreme, just consistent.', author: '— Unknown' },
  { text: 'Believe in your infinite potential.', author: '— Unknown' },
  { text: 'Every streak starts with day one.', author: '— Unknown' },
  { text: 'Be stronger than your strongest excuse.', author: '— Unknown' },
  { text: 'Discipline is doing what needs to be done.', author: '— Unknown' },
  { text: 'Your habits shape your future.', author: '— Unknown' },
  { text: 'Progress, not perfection.', author: '— Unknown' },
  { text: 'The best time to start was yesterday. The next best time is now.', author: '— Unknown' },
  { text: 'Push yourself because no one else is going to do it for you.', author: '— Unknown' },
]
