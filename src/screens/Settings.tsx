import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon, BellIcon, ChevronIcon, SparkleIcon } from '../components/icons'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="px-4 pt-4 pb-20">
      <h1 className="font-sans font-bold text-xs tracking-[0.08em] text-amber mb-4">
        SETTINGS
      </h1>

      {/* Pro Banner */}
      <div
        className="p-3 mb-3 border shadow-card"
        style={{
          borderColor: 'rgba(255,217,61,0.15)',
          background: 'linear-gradient(135deg, rgba(255,159,67,0.04) 0%, rgba(108,92,231,0.03) 100%)',
        }}
      >
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[rgba(255,217,61,0.1)] border border-[rgba(255,217,61,0.15)] inline-block mb-2">
          <SparkleIcon />
          <span className="text-[#FFD93D] text-[10px] font-mono font-bold uppercase tracking-widest">Pro</span>
        </div>
        <h3 className="font-sans font-bold text-base text-text-primary mb-1">
          Unlock Everything
        </h3>
        <p className="text-text-secondary text-sm mb-3 font-sans leading-relaxed">
          Unlimited habits, AI nudges, advanced analytics, custom themes, and more.
        </p>
        <motion.button
          className="px-4 py-2 text-sm font-sans font-semibold"
          style={{
            background: 'linear-gradient(135deg, rgba(255,159,67,0.1) 0%, rgba(108,92,231,0.08) 100%)',
            border: '1px solid rgba(255,159,67,0.2)',
            color: '#FF9F43',
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ boxShadow: '0 4px 20px rgba(255,159,67,0.1)' }}
        >
          Upgrade to Pro &rarr;
        </motion.button>
      </div>

      {/* Account */}
      <div className="bg-surface p-3 mb-3 border border-border-subtle shadow-card">
        <h3 className="font-sans font-bold text-xs text-text-muted mb-2 tracking-wider uppercase">
          Account
        </h3>
        <div className="flex items-center gap-3 py-1">
          <div className="w-9 h-9 border border-border-subtle flex items-center justify-center flex-shrink-0 bg-[#1A1528]">
            <UserIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-sm font-sans font-medium">Guest User</p>
            <p className="text-text-muted text-xs font-sans mt-0.5">Sign in to sync across devices</p>
          </div>
          <ChevronIcon />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-surface p-3 mb-3 border border-border-subtle shadow-card">
        <h3 className="font-sans font-bold text-xs text-text-muted mb-2 tracking-wider uppercase">
          Preferences
        </h3>
        <ToggleRow
          label="Push Notifications"
          value={notifications}
          onToggle={() => setNotifications(!notifications)}
        />
        <StaticRow label="Reminder Time" value="8:00 PM" />
        <StaticRow label="Data Export" value="CSV / JSON" />
      </div>

      {/* About */}
      <div className="bg-surface p-3 border border-border-subtle shadow-card">
        <h3 className="font-sans font-bold text-xs text-text-muted mb-2 tracking-wider uppercase">
          About
        </h3>
        <StaticRow label="Version" value="v0.0.2" />
        <StaticRow label="Build" value="2026.07" />
      </div>
    </div>
  )
}

function ToggleRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
      <div className="flex items-center gap-2">
        <BellIcon />
        <span className="text-text-primary font-sans text-sm">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className="relative transition-colors duration-150"
        style={{
          width: 36,
          height: 20,
          backgroundColor: value ? 'rgba(255,159,67,0.3)' : 'rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          className="absolute top-[2px] bg-white"
          animate={{ left: value ? 'calc(100% - 18px)' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: 16, height: 16 }}
        />
      </button>
    </div>
  )
}

function StaticRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
      <span className="text-text-primary font-sans text-sm">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-text-muted font-mono text-xs">{value}</span>
        <ChevronIcon />
      </div>
    </div>
  )
}
