import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: string
  position?: TooltipPosition
  maxWidth?: number
  children: ReactNode
  className?: string
}

const positionStyles: Record<TooltipPosition, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left:   'right-full top-1/2 -translate-y-1/2 mr-1',
  right:  'left-full top-1/2 -translate-y-1/2 ml-1',
}

export function Tooltip({ content, position = 'top', maxWidth, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={visible ? id : undefined}
    >
      {children}
      {visible && (
        <span
          id={id}
          className={cn(
            'absolute z-[10000] pointer-events-none',
            'bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[6px]',
            'px-3 py-2 text-label text-[var(--text-subtle)] leading-[1.4] shadow-dropdown',
            positionStyles[position],
          )}
          style={maxWidth ? { maxWidth } : undefined}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  )
}
