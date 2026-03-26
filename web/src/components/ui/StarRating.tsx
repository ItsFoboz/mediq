import React, { useState, useCallback } from 'react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  count?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

const sizeMap: Record<NonNullable<StarRatingProps['size']>, number> = {
  sm: 12,
  md: 16,
  lg: 20,
}

const STAR_COLOR = '#F59E0B'
const STAR_EMPTY_COLOR = '#E2E8F0'

interface StarProps {
  fill: number   // 0 = empty, 0.5 = half, 1 = full
  size: number
  index: number
  interactive: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

const Star: React.FC<StarProps> = ({
  fill,
  size,
  index,
  interactive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const gradientId = `star-grad-${index}-${Math.round(fill * 10)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{
        cursor: interactive ? 'pointer' : 'default',
        flexShrink: 0,
        display: 'block',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fill * 100}%`} stopColor={STAR_COLOR} />
          <stop offset={`${fill * 100}%`} stopColor={STAR_EMPTY_COLOR} />
        </linearGradient>
      </defs>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  showCount = false,
  count,
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const px = sizeMap[size]

  const displayRating = hoverRating !== null ? hoverRating : rating

  const getFill = useCallback(
    (starIndex: number): number => {
      const value = displayRating
      if (value >= starIndex + 1) return 1
      if (value <= starIndex) return 0
      return value - starIndex
    },
    [displayRating]
  )

  const handleMouseEnter = (i: number) => {
    if (!interactive) return
    setHoverIndex(i)
    setHoverRating(i + 1)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setHoverIndex(null)
    setHoverRating(null)
  }

  const handleClick = (i: number) => {
    if (!interactive || !onChange) return
    onChange(i + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (!interactive || !onChange) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(i + 1)
    }
  }

  const textSize =
    size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      role={interactive ? 'radiogroup' : undefined}
      aria-label={interactive ? 'Star rating' : `${displayRating.toFixed(1)} out of 5 stars`}
    >
      {/* Stars */}
      <span
        className="flex items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? Math.round(rating) === i + 1 : undefined}
            aria-label={interactive ? `${i + 1} star` : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={interactive ? (e) => handleKeyDown(e, i) : undefined}
            className={interactive && hoverIndex === i ? 'scale-110 transition-transform' : ''}
            style={{ display: 'flex' }}
          >
            <Star
              fill={getFill(i)}
              size={px}
              index={i}
              interactive={interactive}
              onMouseEnter={() => handleMouseEnter(i)}
              onClick={() => handleClick(i)}
            />
          </span>
        ))}
      </span>

      {/* Numeric rating */}
      {showCount && (
        <span className={`font-sans font-medium text-[#0F172A] ${textSize}`}>
          {displayRating.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {count !== undefined && (
        <span className={`font-sans text-[#94A3B8] ${textSize}`}>
          ({count.toLocaleString()})
        </span>
      )}
    </span>
  )
}

export default StarRating
export { StarRating }
export type { StarRatingProps }
