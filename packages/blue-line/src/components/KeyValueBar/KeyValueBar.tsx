import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface KeyValueBarItem {
  label: string
  value: ReactNode
}

export interface KeyValueBarProps {
  items: KeyValueBarItem[]
  className?: string
}

export function KeyValueBar({ items, className }: KeyValueBarProps) {
  return (
    <div className={cn('flex items-center px-5 py-4 gap-5', className)}>
      {items.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && <div className="w-px self-stretch bg-[var(--border-200)]" />}
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <span className="text-paragraph font-regular text-[var(--text-subtle)] leading-[16px]">
              {item.label}
            </span>
            <span className="text-paragraph font-regular text-[var(--text-strong)] leading-[16px] truncate">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
