import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Max visible items before truncation (default: 4, set 0 to disable) */
  maxItems?: number
  className?: string
}

/* ── Chevron separator ── */
function Separator() {
  return (
    <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-muted)]" aria-hidden="true">
      <Icon name="chevron-right" size="md" />
    </span>
  )
}

/* ── Single breadcrumb link / text ── */
function BreadcrumbLink({ item }: { item: BreadcrumbItem }) {
  const base = 'flex items-center gap-1 text-note font-regular leading-[14px] whitespace-nowrap outline-none rounded-sm'

  if (item.onClick) {
    return (
      <a
        onClick={item.onClick}
        className={cn(
          base,
          'text-[var(--text-muted)] no-underline cursor-pointer',
          'hover:text-[var(--primary)]',
          'focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1',
          'transition-colors duration-150',
        )}
        tabIndex={0}
        role="link"
      >
        {item.label}
      </a>
    )
  }

  return (
    <span className={cn(base, 'text-[var(--text-muted)]')}>
      {item.label}
    </span>
  )
}

/* ── Truncated "..." button with dropdown ── */
function TruncatedItems({ items }: { items: BreadcrumbItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'flex items-center text-paragraph font-medium leading-[16px] text-[var(--text-muted)]',
          'cursor-pointer bg-transparent border-none p-0 outline-none rounded-sm',
          'hover:text-[var(--primary)]',
          'focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1',
          'transition-colors duration-150',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Show hidden breadcrumb pages"
      >
        ...
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-full left-0 mt-1 z-50',
            'min-w-[140px] py-2 px-1 rounded',
            'bg-[var(--surface-card)] border border-[var(--border-card)]',
            'shadow-[1px_3px_4px_-2px_rgba(12,18,29,0.04),2px_2px_4px_0_rgba(12,18,29,0.04)]',
          )}
          role="menu"
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setOpen(false)
                item.onClick?.()
              }}
              className={cn(
                'flex items-center w-full px-2 py-2 rounded text-paragraph font-regular leading-[16px]',
                'text-[var(--text-strong)] bg-transparent border-none cursor-pointer text-left',
                'hover:bg-[var(--surface-hover)]',
                'focus-visible:bg-[var(--surface-hover)] outline-none',
                'transition-colors duration-150',
              )}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main component ── */
export function Breadcrumb({ items, maxItems = 4, className }: BreadcrumbProps) {
  const shouldTruncate = maxItems > 0 && items.length > maxItems

  // Build visible items: first + "..." + last (maxItems - 2) items
  let visibleItems: (BreadcrumbItem | 'truncated')[]
  let hiddenItems: BreadcrumbItem[] = []

  if (shouldTruncate) {
    const tailCount = maxItems - 2 // first + "..." = 2 slots, rest are tail
    hiddenItems = items.slice(1, items.length - tailCount)
    visibleItems = [items[0], 'truncated' as const, ...items.slice(items.length - tailCount)]
  } else {
    visibleItems = items
  }

  return (
    <nav className={cn('flex items-center gap-1 font-sans', className)} aria-label="Breadcrumb">
      {visibleItems.map((item, i) => (
        <span key={i} className="contents">
          {i > 0 && <Separator />}
          {item === 'truncated' ? (
            <TruncatedItems items={hiddenItems} />
          ) : (
            <BreadcrumbLink item={item} />
          )}
        </span>
      ))}
    </nav>
  )
}
