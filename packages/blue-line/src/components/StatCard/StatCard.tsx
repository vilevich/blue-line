import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface StatCardLegendItem {
  color: string
  label: string
  value: string | number
}

export interface StatCardProps {
  label: string
  value: string | number
  trend?: 'up' | 'down'
  trendText?: string
  legend?: StatCardLegendItem[]
  headerAction?: ReactNode
  className?: string
  children?: ReactNode
}

export interface StatCardRowProps {
  children: ReactNode
  columns?: number
  className?: string
}

export function StatCard({ label, value, trend, trendText, legend, headerAction, className, children }: StatCardProps) {
  return (
    <div className={cn('bg-[var(--surface-card)] border border-[var(--border-card)] rounded shadow-card overflow-hidden flex flex-col font-sans', className)}>
      {headerAction && (
        <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border-card)]">
          <h3 className="text-label font-medium text-[var(--text-strong)] m-0">{label}</h3>
          {headerAction}
        </div>
      )}
      <div className="p-5 flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-0.5">
          {!headerAction && <div className="text-label font-regular text-[var(--text-subtle)] leading-[16px]">{label}</div>}
          <div className="flex items-center gap-1.5">
            <span className="text-h3 font-medium leading-[23px] text-[var(--text-strong)]">{value}</span>
            {trend && (
              <>
                <span className={cn('w-4 h-4 flex items-center justify-center', trend === 'up' ? 'text-[var(--ds-success-text)]' : 'text-[var(--ds-alert-text)]')}>
                  <Icon name={trend === 'up' ? 'chevron-up' : 'chevron-down'} size="md" />
                </span>
                {trendText && (
                  <span className={cn('text-label font-regular leading-[16px]', trend === 'up' ? 'text-[var(--ds-success-text)]' : 'text-[var(--ds-alert-text)]')}>
                    {trendText}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        {legend && legend.length > 0 && (
          <div className="flex flex-col gap-3">
            {legend.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-[4px] shrink-0" style={{ background: item.color }} />
                <span className="flex-1 text-label font-regular text-[var(--text-strong)] leading-[16px] truncate">{item.label}</span>
                <span className="text-label font-regular text-[var(--text-subtle)] leading-[16px] tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export function StatCardRow({ children, columns = 3, className }: StatCardRowProps) {
  return (
    <div
      className={cn('grid gap-3 mb-3', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  )
}
