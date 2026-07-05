import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon, BellIcon, ChevronIcon } from '../components/icons'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="px-4 pt-4 pb-20">
      <h1 className="font-satoshi font-bold text-[11px] tracking-[0.1em] text-neon-green mb-3">
        SETTINGS
      </h1>

      {/* Pro Banner */}
      <div
        className="p-2.5 mb-2 border border-[rgba(255,45,85,0.15)]"
        style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.03) 0%, rgba(255,45,85,0.02) 100%)' }}
      >
        <div className="px-1.5 py-0.5 bg-[rgba(255,45,85,0.1)] border border-[rgba(255,45,85,0.15)] inline-block mb-1">
          <span className="text-[#FF2D55] text-[7px] font-mono font-bold uppercase tracking-widest">Pro</span>
        </div>
        <h3 className="font-satoshi font-bold text-xs text-text-primary mb-px">
          Unlock Everything
        </h3>
        <p className="text-text-secondary text-[10px] mb-2 font-satoshi">
          Unlimited habits, AI nudges, advanced analytics.
        </p>
        <motion.button
          className="px-3 py-1.5 text-[10px] font-satoshi font-semibold"
          style={{
            background: 'rgba(57,255,20,0.08)',
            border: '1px solid rgba(57,255,20,0.2)',
            color: '#39FF14',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Upgrade to Pro
        </motion.button>
      </div>

      {/* Account */}
      <div className="bg-surface p-2.5 mb-2 border border-[rgba(255,255,255,0.04)]">
        <h3 className="font-satoshi font-bold text-[8px] text-text-muted mb-2 tracking-widest">
          ACCOUNT
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 border border-[rgba(255,255,255,0.04)] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 0 }}>
            <UserIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-[10px] font-satoshi font-medium">Guest User</p>
            <p className="text-text-muted text-[8px] font-satoshi">Sign in to sync across devices</p>
          </div>
          <ChevronIcon />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-surface p-2.5 mb-2 border border-[rgba(255,255,255,0.04)]">
        <h3 className="font-satoshi font-bold text-[8px] text-text-muted mb-1 tracking-widest">
          PREFERENCES
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
      <div className="bg-surface p-2.5 border border-[rgba(255,255,255,0.04)]">
        <h3 className="font-satoshi font-bold text-[8px] text-text-muted mb-1 tracking-widest">
          ABOUT
        </h3>
        <StaticRow label="Version" value="v0.0.1" />
        <StaticRow label="Build" value="2026.07" />
      </div>
    </div>
  )
}

function ToggleRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
      <div className="flex items-center gap-1.5">
        <BellIcon />
        <span className="text-text-primary font-satoshi text-[10px]">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className="relative transition-colors duration-150"
        style={{
          width: 30,
          height: 16,
          backgroundColor: value ? 'rgba(57,255,20,0.3)' : 'rgba(255,255,255,0.06)',
          borderRadius: 0,
        }}
      >
        <motion.div
          className="absolute top-[2px] bg-white"
          animate={{ left: value ? 'calc(100% - 14px)' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: 12, height: 12, borderRadius: 0 }}
        />
      </button>
    </div>
  )
}

function StaticRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
      <span className="text-text-primary font-satoshi text-[10px]">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-text-muted font-mono text-[9px]">{value}</span>
        <ChevronIcon />
      </div>
    </div>
  )
}
