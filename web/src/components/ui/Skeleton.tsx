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

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
  rounded = 'rounded-md',
}) => {
  const style: React.CSSProperties = {}
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn('animate-pulse bg-[#E2E8F0]', rounded, className)}
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
      className={cn(
        'bg-white rounded-card p-4 shadow-[var(--shadow-card)] flex gap-4',
        className
      )}
      aria-hidden="true"
    >
      {/* Doctor photo placeholder */}
      <Skeleton width={80} height={80} rounded="rounded-xl" className="flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Name */}
        <Skeleton height={18} width="70%" rounded="rounded" />

        {/* Specialty */}
        <Skeleton height={14} width="45%" rounded="rounded" />

        {/* Stars row */}
        <div className="flex items-center gap-2">
          <Skeleton height={14} width={80} rounded="rounded" />
          <Skeleton height={14} width={36} rounded="rounded" />
        </div>

        {/* Badges row */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton height={22} width={72} rounded="rounded-full" />
          <Skeleton height={22} width={88} rounded="rounded-full" />
        </div>

        {/* Location + price */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <Skeleton height={13} width="50%" rounded="rounded" />
          <Skeleton height={13} width={56} rounded="rounded" />
        </div>
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
