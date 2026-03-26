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

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  clickable?: boolean
  padding?: boolean
  children?: React.ReactNode
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hoverable = false,
      clickable = false,
      padding = true,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick

    return (
      <div
        ref={ref}
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                  e.preventDefault()
                  onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
                }
              }
            : undefined
        }
        className={cn(
          'bg-white rounded-card',
          'shadow-[var(--shadow-card)]',
          padding ? 'p-6' : '',
          hoverable
            ? 'transition-shadow duration-200 hover:shadow-md'
            : '',
          isInteractive
            ? 'cursor-pointer transition-shadow duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6BCC]/50 focus-visible:ring-offset-2 active:scale-[0.995]'
            : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// ─── CardHeader ──────────────────────────────────────────────────────────────

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  /** Add a bottom border divider */
  divided?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, divided = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-4',
        divided ? 'pb-4 mb-4 border-b border-[#E2E8F0]' : 'mb-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

// ─── CardBody ────────────────────────────────────────────────────────────────

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('text-[#0F172A]', className)} {...props}>
      {children}
    </div>
  )
)

CardBody.displayName = 'CardBody'

// ─── CardFooter ──────────────────────────────────────────────────────────────

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  /** Add a top border divider */
  divided?: boolean
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, divided = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3',
        divided ? 'pt-4 mt-4 border-t border-[#E2E8F0]' : 'mt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardBody, CardFooter }
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps }
export default Card
