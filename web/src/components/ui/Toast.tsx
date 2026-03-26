import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { create } from 'zustand'

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
    return id
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

// ─── useToast hook ───────────────────────────────────────────────────────────

export function useToast() {
  const addToast = useToastStore((s) => s.addToast)

  const toast = {
    success: (message: string, duration = 4000) =>
      addToast({ type: 'success', message, duration }),
    error: (message: string, duration = 5000) =>
      addToast({ type: 'error', message, duration }),
    info: (message: string, duration = 4000) =>
      addToast({ type: 'info', message, duration }),
    warning: (message: string, duration = 4000) =>
      addToast({ type: 'warning', message, duration }),
  }

  return { toast }
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-3a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

const variantStyles: Record<ToastType, { container: string; icon: string }> = {
  success: {
    container: 'border-[#0D9E6E]/30 bg-white',
    icon: 'text-[#0D9E6E]',
  },
  error: {
    container: 'border-red-200 bg-white',
    icon: 'text-[#DC2626]',
  },
  info: {
    container: 'border-[#1A6BCC]/30 bg-white',
    icon: 'text-[#1A6BCC]',
  },
  warning: {
    container: 'border-amber-200 bg-white',
    icon: 'text-amber-600',
  },
}

// ─── ToastItem ────────────────────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const removeToast = useToastStore((s) => s.removeToast)

  const dismiss = useCallback(() => removeToast(toast.id), [removeToast, toast.id])

  useEffect(() => {
    const duration = toast.duration ?? 4000
    const timer = setTimeout(dismiss, duration)
    return () => clearTimeout(timer)
  }, [dismiss, toast.duration])

  const styles = variantStyles[toast.type]

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`
        flex items-start gap-3 w-full max-w-sm
        px-4 py-3.5 rounded-xl border shadow-lg
        font-sans text-sm text-[#0F172A]
        ${styles.container}
      `}
      role="alert"
      aria-live="assertive"
    >
      <span className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
        {icons[toast.type]}
      </span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="
          flex-shrink-0 mt-0.5 text-[#94A3B8] hover:text-[#64748B]
          transition-colors focus-visible:outline-none
          focus-visible:ring-1 focus-visible:ring-[#1A6BCC]/50 rounded
        "
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </motion.li>
  )
}

// ─── ToastContainer ───────────────────────────────────────────────────────────

const ToastContainer: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts)

  return createPortal(
    <ul
      aria-label="Notifications"
      className="
        fixed bottom-4 right-4 z-[200]
        flex flex-col-reverse gap-2
        w-full max-w-sm pointer-events-none
      "
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        ))}
      </AnimatePresence>
    </ul>,
    document.body
  )
}

export default ToastContainer
export { ToastContainer }
