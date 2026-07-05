/* eslint-disable react/no-unknown-property */
/* Sharp, engineered SVG icons — 1px stroke, square caps, geometric precision */

interface IconProps {
  active?: boolean
  className?: string
}

export function FlameIcon({ active, className }: IconProps) {
  const color = active ? '#39FF14' : '#555555'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <path d="M8 1.5C5.5 4 3.5 6.2 3.5 9C3.5 12.5 6.2 15 8 15C9.8 15 12.5 12.5 12.5 9C12.5 6.2 10.5 4 8 1.5Z" />
      <path d="M8 11.5C9.2 11.5 10 10.5 10 9.5" />
      <path d="M8 9.5V6.5" />
    </svg>
  )
}

export function FlameSmall({ active, className }: IconProps) {
  const color = active ? '#39FF14' : '#555555'
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <path d="M8 1.5C5.5 4 3.5 6.2 3.5 9C3.5 12.5 6.2 15 8 15C9.8 15 12.5 12.5 12.5 9C12.5 6.2 10.5 4 8 1.5Z" />
    </svg>
  )
}

export function ChartIcon({ active, className }: IconProps) {
  const color = active ? '#39FF14' : '#555555'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1} strokeLinecap="square" className={className}>
      <rect x="1" y="1" width="14" height="14" />
      <path d="M4 12V7" />
      <path d="M8 12V4" />
      <path d="M12 12V9" />
    </svg>
  )
}

export function GearIcon({ active, className }: IconProps) {
  const color = active ? '#39FF14' : '#555555'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1} strokeLinecap="square" className={className}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1V3" />
      <path d="M8 13V15" />
      <path d="M2.2 2.2L3.5 3.5" />
      <path d="M12.5 12.5L13.8 13.8" />
      <path d="M1 8H3" />
      <path d="M13 8H15" />
      <path d="M2.2 13.8L3.5 12.5" />
      <path d="M12.5 3.5L13.8 2.2" />
    </svg>
  )
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#39FF14" strokeWidth={1.5} strokeLinecap="square" className={className}>
      <path d="M1.5 5L4 7.5L8.5 2" />
    </svg>
  )
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="square" className={className}>
      <path d="M7 2V12" />
      <path d="M2 7H12" />
    </svg>
  )
}

export function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#555555" strokeWidth={1} strokeLinecap="square" className={className}>
      <path d="M2.5 2L7 5L2.5 8" />
    </svg>
  )
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#555555" strokeWidth={1} strokeLinecap="square" className={className}>
      <circle cx="7" cy="4.5" r="2.5" />
      <path d="M1 13C1 10 3.5 8 7 8C10.5 8 13 10 13 13" />
    </svg>
  )
}

export function BellIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#555555" strokeWidth={1} strokeLinecap="square" className={className}>
      <path d="M2.5 10H11.5L10.5 5C10.5 2.8 8.7 1 7 1C5.3 1 3.5 2.8 3.5 5L2.5 10Z" />
      <path d="M5.5 10V10.5C5.5 11.2 6.1 11.8 7 11.8C7.9 11.8 8.5 11.2 8.5 10.5V10" />
    </svg>
  )
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#555555" strokeWidth={1.2} strokeLinecap="square" className={className}>
      <path d="M2 2L8 8" />
      <path d="M8 2L2 8" />
    </svg>
  )
}

/* Atmosphere elements */
export function CornerBracket({ className, rotation = 0 }: { className?: string; rotation?: number }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#39FF14" strokeWidth={1} strokeLinecap="square" className={className} style={{ transform: `rotate(${rotation}deg)` }}>
      <path d="M2 2H6M2 2V6" />
    </svg>
  )
}

export function ScanlineOverlay({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className={className} preserveAspectRatio="none">
      <defs>
        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="2" height="2">
          <line x1="0" y1="1" x2="2" y2="1" stroke="rgba(57,255,20,0.02)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#scanlines)" />
    </svg>
  )
}

export function GridOverlay({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className={className} preserveAspectRatio="none">
      <defs>
        <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M20 0V20M0 20H20" stroke="rgba(57,255,20,0.015)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  )
}

export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className={className} preserveAspectRatio="none">
      <defs>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
        </filter>
      </defs>
      <rect width="100" height="100" filter="url(#noise)" />
    </svg>
  )
}