import React from 'react'

type ClassValue = string | undefined | null | false | Record<string, boolean>

function cn(...classes: ClassValue[]): string {
  const result: string[] = []
  for (const cls of classes) {
    if (!cls) continue
    if (typeof cls === 'string') {
      result.push(cls)
    } else if (typeof cls === 'object') {
      for (const [key, val] of Object.entries(cls)) {
        if (val) result.push(key)
      }
    }
  }
  return result.join(' ')
}

// ─── Base Skeleton ────────────────────────────────────────────────────────────

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: string
}

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, var(--bg-elevated, #EEF2F8) 0%, #E8EDF4 50%, var(--bg-elevated, #EEF2F8) 100%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
}

// Inject shimmer keyframes once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-shimmer-style')) {
  const style = document.createElement('style')
  style.id = 'skeleton-shimmer-style'
  style.textContent = `@keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`
  document.head.appendChild(style)
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
  rounded = 'rounded-md',
}) => {
  const style: React.CSSProperties = { ...shimmerStyle }
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(rounded, className)}
      style={style}
      aria-hidden="true"
    />
  )
}

// ─── SkeletonText ─────────────────────────────────────────────────────────────

interface SkeletonTextProps {
  lines?: number
  /** Last line shorter (typical paragraph look) */
  lastLineShort?: boolean
  className?: string
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineShort = true,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={
            lastLineShort && i === lines - 1
              ? '65%'
              : '100%'
          }
          rounded="rounded"
        />
      ))}
    </div>
  )
}

// ─── SkeletonAvatar ───────────────────────────────────────────────────────────

interface SkeletonAvatarProps {
  size?: number
  className?: string
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 48,
  className,
}) => {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="rounded-full"
      className={cn('flex-shrink-0', className)}
    />
  )
}

// ─── SkeletonCard ─────────────────────────────────────────────────────────────
// Matches the approximate shape of a DoctorCard

interface SkeletonCardProps {
  className?: string
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div
      className={cn('bg-white border border-[#E2E8F0] rounded-xl overflow-hidden', className)}
      style={{ boxShadow: 'var(--shadow-card)' }}
      aria-hidden="true"
    >
      <div className="p-5 pr-10">
        <div className="flex gap-4">
          {/* Left: photo */}
          <Skeleton width={72} height={72} rounded="rounded-full" className="flex-shrink-0" />

          {/* Middle: info */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <Skeleton height={16} width="60%" rounded="rounded" />
            <Skeleton height={13} width="40%" rounded="rounded" />
            {/* Badges */}
            <div className="flex gap-1.5 flex-wrap mt-1">
              <Skeleton height={20} width={100} rounded="rounded-full" />
              <Skeleton height={20} width={52} rounded="rounded-full" />
            </div>
            {/* Stars */}
            <Skeleton height={13} width={100} rounded="rounded" />
            {/* Location */}
            <Skeleton height={13} width="55%" rounded="rounded" />
          </div>

          {/* Right: price (hidden on mobile) */}
          <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 min-w-[80px]">
            <Skeleton height={24} width={48} rounded="rounded" />
            <Skeleton height={11} width={32} rounded="rounded" />
          </div>
        </div>
      </div>
      {/* CTA row */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <Skeleton height={13} width={72} rounded="rounded" className="sm:hidden" />
        <Skeleton height={36} width={140} rounded="rounded-lg" className="ml-auto" />
      </div>
    </div>
  )
}

// ─── SkeletonList ─────────────────────────────────────────────────────────────

interface SkeletonListProps {
  count?: number
  className?: string
  itemClassName?: string
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  count = 4,
  className,
  itemClassName,
}) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} aria-label="Loading…" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} className={itemClassName} />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonList }
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonListProps,
}
export default Skeleton
