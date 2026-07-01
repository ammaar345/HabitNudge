import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="px-5 pt-6 pb-24">
      <h1 className="font-orbitron font-bold text-2xl text-text-primary mb-6">SETTINGS</h1>

      {/* Pro Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-5 mb-6 border border-neon-pink/30 bg-gradient-to-r from-neon-pink/10 to-transparent"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-neon-pink/20 rounded-full blur-2xl" />
        <h3 className="font-orbitron font-bold text-neon-pink text-lg mb-1">Unlock Unlimited Habits</h3>
        <p className="text-text-secondary text-sm mb-3">Remove limits and unlock premium/reminder features.</p>
        <button className="px-4 py-2 rounded-full bg-neon-pink text-white font-inter font-semibold text-sm">
          Upgrade to Pro — $7/mo
        </button>
      </motion.div>

      {/* Options */}
      <div className="space-y-4">
        <ToggleRow label="Push Notifications" value={notifications} onToggle={() => setNotifications(!notifications)} />
        <StaticRow label="Email Reminders" value="Daily at 8:00 PM" />
        <StaticRow label="Data Export" value="CSV / JSON" />
        <StaticRow label="Version" value="v0.0.1" />
      </div>
    </div>
  )
}

function ToggleRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-subtle">
      <span className="text-text-primary font-inter text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-neon-cyan' : 'bg-border-subtle'}`}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
          animate={{ left: value ? 'calc(100% - 22px)' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )
}

function StaticRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-subtle">
      <span className="text-text-primary font-inter text-sm">{label}</span>
      <span className="text-text-muted font-mono text-xs">{value}</span>
    </div>
  )
}
