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

interface BadgeProps {
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  blue:   'bg-[#1A6BCC]/10 text-[#1A6BCC]',
  green:  'bg-[#0D9E6E]/10 text-[#0D9E6E]',
  yellow: 'bg-amber-100 text-amber-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
  purple: 'bg-purple-100 text-purple-700',
}

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  size = 'md',
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'rounded-full font-medium font-sans',
        'whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
export { Badge }
export type { BadgeProps }
