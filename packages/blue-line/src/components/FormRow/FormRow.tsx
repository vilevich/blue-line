import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

export interface FormRowProps {
  label: string
  help?: string
  alignTop?: boolean
  children: ReactNode
  className?: string
}

export function FormRow({ label, help, alignTop, children, className }: FormRowProps) {
  return (
    <div
      className={cn(
        'form-row-layout flex gap-3',
        alignTop ? 'items-start' : 'items-center',
        className,
      )}
    >
      <div className="form-row-label w-[266px] shrink-0 flex items-center gap-1 min-h-8 text-label text-[var(--text-strong)] dark:text-[var(--text-subtle)]">
        {label}
        {help && (
          <Tooltip content={help} position="top">
            <span className="inline-flex items-center justify-center min-w-6 min-h-6 text-[var(--text-muted)] cursor-help">
              <Icon name="help" size="md" />
            </span>
          </Tooltip>
        )}
      </div>
      <div className="form-row-value flex-1 flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}
