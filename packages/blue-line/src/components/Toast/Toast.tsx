import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface ToastProps {
  visible: boolean
  children: ReactNode
  className?: string
}

export function Toast({ visible, children, className }: ToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 px-5 py-3 rounded text-label text-[var(--text-on-fill)] font-sans shadow-toast z-[1000]',
        'bg-[#1b2a4a] dark:bg-[var(--color-neutral-800)]',
        'transition-all duration-250',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0 pointer-events-none',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  )
}
