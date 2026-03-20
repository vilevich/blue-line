import { type ReactNode, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface SlidePanelProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: number
  className?: string
}

export function SlidePanel({ open, onClose, title, children, footer, width = 400, className }: SlidePanelProps) {
  useEffect(() => {
    if (!open) return
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[2000] bg-[var(--overlay-medium)] transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-panel-title"
        className={cn(
          'fixed top-0 bottom-0 z-[2001] flex flex-col bg-[var(--surface-card)] font-sans transition-all duration-250',
          open ? 'right-0 shadow-panel' : 'right-[-400px] shadow-none',
          className,
        )}
        style={{ width }}
      >
        <div className="flex items-center justify-between px-6 h-14 min-h-14 border-b border-[var(--border-200)]">
          <h2 id="slide-panel-title" className="text-label font-medium leading-[16px] text-[var(--text-strong)] m-0">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center cursor-pointer text-[var(--text-muted)] border-none bg-transparent rounded hover:text-[var(--text-strong)] hover:bg-[var(--hover-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2"
            aria-label="Close panel"
          >
            <Icon name="close" size="md" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-2 px-6 py-4 border-t border-[var(--border-200)]">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
