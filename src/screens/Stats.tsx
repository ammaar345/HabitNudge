import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Habit } from '../types/habit'

interface StatsProps {
 habits: Habit[]
}

export default function Stats({ habits }: StatsProps) {
 const totalCompletions = useMemo(() =>
   habits.reduce((acc, h) => acc + h.completedDates.length, 0),
   [habits]
 )

 const bestStreak = useMemo(() =>
   Math.max(...habits.map(h => h.streak), 0),
   [habits]
 )

 const weeklyData = useMemo(() => {
   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
   return days.map((day, i) => ({
     day,
     completed: habits.filter(h => {
       const date = new Date()
       date.setDate(date.getDate() - (6 - i))
       return h.completedDates.includes(date.toISOString().split('T')[0])
     }).length,
   }))
 }, [habits])

 const maxWeekly = Math.max(...weeklyData.map(d => d.completed), 1)

 return (
   <div className="px-5 pt-6 pb-24">
     <h1 className="font-orbitron font-bold text-2xl text-text-primary mb-6">STATS</h1>

     {/* Summary Cards */}
     <div className="grid grid-cols-2 gap-3 mb-6">
       <StatCard label="Total Completions" value={totalCompletions} color="text-neon-green" />
       <StatCard label="Best Streak" value={bestStreak} color="text-neon-cyan" suffix=" days" />
     </div>

     {/* Weekly Chart */}
     <div className="bg-surface rounded-2xl p-5 border border-border-subtle mb-6">
       <h3 className="font-orbitron font-bold text-sm text-text-secondary mb-4 tracking-wider">THIS WEEK</h3>
       <div className="flex items-end justify-between gap-2 h-48">
         {weeklyData.map((d, i) => (
           <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
             <motion.div
               className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-neon-green/60 to-neon-green"
               initial={{ height: 0 }}
               animate={{ height: `${(d.completed / maxWeekly) * 100}%` }}
               transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
             />
             <span className="text-text-muted text-xs font-mono">{d.day}</span>
           </div>
         ))}
       </div>
     </div>

     {/* Habit Performance */}
     <div className="bg-surface rounded-2xl p-5 border border-border-subtle">
       <h3 className="font-orbitron font-bold text-sm text-text-secondary mb-4 tracking-wider">HABIT PERFORMANCE</h3>
       <div className="space-y-4">
         {habits.map((habit, i) => (
           <motion.div
             key={habit.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.08 }}
           >
             <div className="flex items-center gap-3 mb-1">
               <span className="text-lg">{habit.emoji}</span>
               <span className="text-text-primary text-sm flex-1">{habit.name}</span>
               <span className="text-neon-green font-mono text-sm">{habit.streak}</span>
             </div>
             <div className="w-full h-2 bg-border-subtle/50 rounded-full overflow-hidden">
               <motion.div
                 className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min((habit.streak / 30) * 100, 100)}%` }}
                 transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
               />
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </div>
 )
}

function StatCard({ label, value, color, suffix = '' }: { label: string; value: number; color: string; suffix?: string }) {
 return (
   <div className="bg-surface rounded-2xl p-4 border border-border-subtle flex flex-col">
     <span className={`font-mono text-3xl font-bold ${color}`}>{value}</span>
     <span className="text-text-muted text-xs mt-1 uppercase tracking-wider">{label}{suffix}</span>
   </div>
 )
}
