import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Toggle, type ToggleProps } from '../Toggle'

export interface ToggleRowProps extends ToggleProps {
  label?: string
  children?: ReactNode
}

export function ToggleRow({ label, children, className, ...toggleProps }: ToggleRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Toggle {...toggleProps} />
      {label && <span className="text-label text-[var(--text-strong)]">{label}</span>}
      {children}
    </div>
  )
}
