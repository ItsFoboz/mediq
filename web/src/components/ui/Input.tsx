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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : '')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#0F172A] font-sans select-none"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center pointer-events-none text-[#94A3B8]">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!error}
            className={cn(
              'block font-sans text-sm text-[#0F172A] placeholder:text-[#94A3B8]',
              'bg-white',
              'border rounded-lg',
              'py-2',
              leftIcon ? 'pl-10' : 'pl-3',
              rightIcon ? 'pr-10' : 'pr-3',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#1A6BCC]/20 focus:border-[#1A6BCC]',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F7F9FC]',
              error
                ? 'border-[#DC2626] focus:ring-red-200 focus:border-[#DC2626]'
                : 'border-[#E2E8F0]',
              fullWidth ? 'w-full' : '',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 flex items-center pointer-events-none text-[#94A3B8]">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p id={errorId} className="text-xs text-[#DC2626] font-sans mt-0.5 flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="flex-shrink-0"
            >
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            {error}
          </p>
        )}

        {/* Hint */}
        {hint && !error && (
          <p id={hintId} className="text-xs text-[#94A3B8] font-sans mt-0.5">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
export { Input }
export type { InputProps }
