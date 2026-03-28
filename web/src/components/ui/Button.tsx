import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Spinner: React.FC<{ size: NonNullable<ButtonProps['size']> }> = ({ size }) => {
  const dim = size === 'sm' ? 14 : size === 'md' ? 16 : 20
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        strokeDasharray="31.4 31.4" strokeDashoffset="0" opacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, fullWidth = false,
     children, className = '', disabled, style, ...props }, ref) => {
    const isDisabled = disabled || isLoading

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1,
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.4 : 1,
      transition: 'all 150ms ease-out',
      whiteSpace: 'nowrap' as const,
      userSelect: 'none' as const,
      textDecoration: 'none',
      ...(fullWidth ? { width: '100%' } : {}),
    }

    const sizes: Record<NonNullable<ButtonProps['size']>, React.CSSProperties> = {
      sm: { height: '36px', padding: '0 16px', fontSize: '13px', borderRadius: 'var(--radius-md)' },
      md: { height: '44px', padding: '0 24px', fontSize: '15px', borderRadius: 'var(--radius-md)' },
      lg: { height: '52px', padding: '0 32px', fontSize: '16px', borderRadius: 'var(--radius-md)' },
    }

    const variants: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
      primary: { background: 'var(--accent-primary)', color: 'var(--text-inverse)', border: 'none' },
      secondary: { background: 'transparent', border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)' },
      ghost: { background: 'transparent', border: 'none', color: 'var(--text-secondary)' },
      danger: { background: 'var(--danger)', color: 'var(--text-inverse)', border: 'none' },
      outline: { background: 'transparent', border: '2px solid var(--accent-primary)', color: 'var(--accent-primary)' },
    }

    // Tailwind classes for hover/active/focus (CSS-in-JS can't do pseudo-classes cleanly)
    const hoverClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'hover:bg-[#155BB0] hover:-translate-y-px hover:shadow-md active:scale-[0.97]',
      secondary: 'hover:border-[#1A6BCC] hover:text-[#1A6BCC] hover:bg-[#EBF3FF] active:scale-[0.97]',
      ghost: 'hover:text-[#1A6BCC] hover:bg-[#EBF3FF] active:scale-[0.97]',
      danger: 'hover:bg-red-700 active:scale-[0.97]',
      outline: 'hover:bg-[#1A6BCC] hover:text-white active:scale-[0.97]',
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
        className={`select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50 focus-visible:ring-offset-2 ${!isDisabled ? hoverClasses[variant] : ''} transition-all duration-150 ease-out ${className}`}
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
