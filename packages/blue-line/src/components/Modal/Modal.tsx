import { type ReactNode, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: number
  className?: string
}

export function Modal({ open, onClose, title, children, footer, width = 480, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[2000] flex items-center justify-center bg-[var(--overlay-heavy)] transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      aria-hidden={!open}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'bg-[var(--surface-card)] rounded-modal shadow-modal max-h-[90vh] overflow-y-auto p-6 font-sans',
          className,
        )}
        style={{ width }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-h4 font-medium text-[var(--text-strong)] m-0">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center cursor-pointer text-[var(--text-muted)] border-none bg-transparent rounded hover:text-[var(--text-strong)] hover:bg-[var(--hover-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2"
            aria-label="Close dialog"
          >
            <Icon name="close" size="md" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-[var(--border-200)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
