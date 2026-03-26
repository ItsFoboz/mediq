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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#1A6BCC] text-white hover:bg-[#155BA8] active:bg-[#1254A0] border-transparent',
  secondary:
    'bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F7F9FC] active:bg-[#EEF2F7]',
  ghost:
    'bg-transparent text-[#1A6BCC] hover:bg-[#1A6BCC]/10 active:bg-[#1A6BCC]/20 border-transparent',
  danger:
    'bg-[#DC2626] text-white hover:bg-red-700 active:bg-red-800 border-transparent',
  outline:
    'bg-transparent border-2 border-[#1A6BCC] text-[#1A6BCC] hover:bg-[#1A6BCC] hover:text-white active:bg-[#155BA8] active:text-white',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2',
  lg: 'px-6 py-3 text-base font-semibold rounded-lg gap-2.5',
}

const Spinner: React.FC<{ size: NonNullable<ButtonProps['size']> }> = ({ size }) => {
  const dim = size === 'sm' ? 14 : size === 'md' ? 16 : 20
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="0"
        opacity="0.3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center',
          'font-sans font-medium',
          'transition-all duration-150 ease-out',
          'active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50 focus-visible:ring-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
          'select-none',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={size} />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export { Button }
export type { ButtonProps }
