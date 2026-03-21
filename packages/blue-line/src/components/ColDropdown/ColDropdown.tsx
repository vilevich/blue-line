import { useState, useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Checkbox } from '../Checkbox'

// ─── Icons ───────────────────────────────────────────────────────────────────

const SortAscIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M12.8001 6.73977L8.55007 2.23977C8.41007 2.09977 8.22007 2.00977 8.01007 2.00977C7.80007 2.00977 7.61006 2.09977 7.47006 2.23977L3.21006 6.73977C2.92006 7.03977 2.94006 7.51977 3.24006 7.79977C3.54006 8.08977 4.02006 8.06977 4.30006 7.76977L7.26007 4.63977V12.7498C7.26007 13.1598 7.60007 13.4998 8.01007 13.4998C8.42006 13.4998 8.76007 13.1598 8.76007 12.7498V4.63977L11.7201 7.76977C11.8701 7.92977 12.0701 8.00977 12.2601 8.00977C12.4401 8.00977 12.6301 7.93977 12.7701 7.79977C13.0701 7.51977 13.0901 7.03977 12.8001 6.73977Z" />
  </svg>
)

const SortDescIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M12.76 7.96C12.46 7.67 11.98 7.69 11.7 7.99L8.74004 11.12V3C8.74004 2.59 8.40004 2.25 7.99004 2.25C7.58004 2.25 7.24004 2.59 7.24004 3V11.11L4.28005 7.98C4.00005 7.68 3.52005 7.66 3.22005 7.95C2.92005 8.23 2.90005 8.71 3.19005 9.01L7.44004 13.51C7.50004 13.57 7.57004 13.62 7.65004 13.66C7.66005 13.66 7.67004 13.68 7.69004 13.68C7.78005 13.72 7.88004 13.74 7.98004 13.74C8.08004 13.74 8.18004 13.72 8.27004 13.68C8.28005 13.68 8.29004 13.66 8.31004 13.66C8.39004 13.62 8.46004 13.58 8.52004 13.51L12.77 9.01C13.06 8.71 13.04 8.23 12.74 7.95L12.76 7.96Z" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M13.9998 11L12.2998 8.45C12.1098 8.17 11.7998 8 11.4698 8H10.0098V3.72C10.6098 3.37 11.0098 2.74 11.0098 2H4.99977C4.99977 2.74 5.39977 3.38 5.99977 3.72V8H4.53977C4.20977 8 3.88977 8.17 3.70977 8.45L2.00977 11H7.25977V14L8.00977 15L8.75977 14V11H14.0098H13.9998Z" />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M13 4H11V3C11 2.45 10.55 2 10 2C9.45 2 9 2.45 9 3V4H7V3C7 2.45 6.55 2 6 2C5.45 2 5 2.45 5 3V4H3C2.45 4 2 4.45 2 5V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V5C14 4.45 13.55 4 13 4ZM12.5 12.5H3.5V8H12.5V12.5Z" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M5.75043 12.9999C5.56043 12.9999 5.37043 12.9299 5.22043 12.7799C4.93043 12.4899 4.93043 12.0099 5.22043 11.7199L8.94043 7.99994L5.22043 4.27994C4.93043 3.98994 4.93043 3.50994 5.22043 3.21994C5.51043 2.92994 5.99043 2.92994 6.28043 3.21994L10.5304 7.46994C10.8204 7.75994 10.8204 8.23994 10.5304 8.52994L6.28043 12.7799C6.13043 12.9299 5.94043 12.9999 5.75043 12.9999Z" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M10.2496 12.9999C10.0596 12.9999 9.86957 12.9299 9.71957 12.7799L5.46957 8.52994C5.17957 8.23994 5.17957 7.75994 5.46957 7.46994L9.71957 3.21994C10.0096 2.92994 10.4896 2.92994 10.7796 3.21994C11.0696 3.50994 11.0696 3.98994 10.7796 4.27994L7.05957 7.99994L10.7796 11.7199C11.0696 12.0099 11.0696 12.4899 10.7796 12.7799C10.6296 12.9299 10.4396 12.9999 10.2496 12.9999Z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 text-[var(--primary)]" fill="none">
    <path d="M6.74957 11.7501C6.48957 11.7501 6.23957 11.6501 6.03957 11.4601L3.28957 8.71006C2.89957 8.32006 2.89957 7.69006 3.28957 7.30006C3.67957 6.91006 4.30957 6.91006 4.69957 7.30006L6.73957 9.34006L11.7896 4.29006C12.1796 3.90006 12.8096 3.90006 13.1996 4.29006C13.5896 4.68006 13.5896 5.31006 13.1996 5.70006L7.44957 11.4501C7.24957 11.6501 6.99957 11.7401 6.73957 11.7401L6.74957 11.7501Z" fill="currentColor" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M14.7 13.3L11.1 9.7C11.7 8.8 12 7.7 12 6.5C12 3.5 9.5 1 6.5 1C3.5 1 1 3.5 1 6.5C1 9.5 3.5 12 6.5 12C7.7 12 8.8 11.7 9.7 11.1L13.3 14.7C13.5 14.9 13.7 15 14 15C14.3 15 14.5 14.9 14.7 14.7C15.1 14.3 15.1 13.7 14.7 13.3ZM6.5 10C4.6 10 3 8.4 3 6.5C3 4.6 4.6 3 6.5 3C8.4 3 10 4.6 10 6.5C10 8.4 8.4 10 6.5 10Z" />
  </svg>
)

const FilterIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M3.835 8.77C3.635 8.77 3.455 8.7 3.315 8.56C3.175 8.42 3.105 8.25 3.105 8.05C3.105 7.85 3.175 7.68 3.315 7.54C3.455 7.4 3.625 7.33 3.825 7.33H12.155C12.355 7.33 12.535 7.4 12.675 7.54C12.815 7.68 12.885 7.85 12.885 8.05C12.885 8.25 12.815 8.42 12.675 8.56C12.535 8.7 12.365 8.77 12.165 8.77H3.835Z" />
    <path d="M1.715 5.44C1.515 5.44 1.345 5.37 1.205 5.23C1.065 5.09 0.994995 4.92 0.994995 4.72C0.994995 4.52 1.065 4.35 1.205 4.21C1.345 4.07 1.515 4 1.715 4H14.275C14.475 4 14.645 4.07 14.785 4.21C14.925 4.35 14.995 4.52 14.995 4.72C14.995 4.92 14.925 5.09 14.785 5.23C14.645 5.37 14.475 5.44 14.275 5.44H1.715Z" />
    <path d="M5.515 12.09C5.315 12.09 5.14499 12.02 5.00499 11.88C4.86499 11.74 4.795 11.57 4.795 11.37C4.795 11.17 4.86499 11 5.00499 10.86C5.14499 10.72 5.315 10.65 5.515 10.65H10.475C10.675 10.65 10.845 10.72 10.985 10.86C11.125 11 11.195 11.17 11.195 11.37C11.195 11.57 11.125 11.74 10.985 11.88C10.845 12.02 10.675 12.09 10.475 12.09H5.515Z" />
  </svg>
)

// ─── Constants ───────────────────────────────────────────────────────────────

const DATE_RANGES = ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last 365 Days'] as const
const COMPLEX_THRESHOLD = 6

// ─── Styles ──────────────────────────────────────────────────────────────────

const dropdownCls = 'absolute top-full left-0 z-[100] w-[250px] bg-[var(--surface-card)] border border-[var(--border-card)] rounded-[4px] shadow-[1px_3px_4px_0_rgba(12,18,29,0.04),2px_2px_4px_0_rgba(12,18,29,0.04)] py-2 px-1 mt-1 font-normal'
const sectionTitleCls = 'px-2 pt-2 text-paragraph font-regular text-[var(--text-subtle)] leading-4 h-8 flex items-center'
const itemCls = 'flex items-center gap-2 px-2 py-2 text-paragraph font-regular text-[var(--text-strong)] cursor-pointer whitespace-nowrap rounded-[4px] leading-4 hover:bg-[var(--surface-hover)]'
const itemActiveCls = 'text-[var(--primary)]'
const itemDisabledCls = 'opacity-35 pointer-events-none'
const dividerCls = 'h-px bg-[var(--border-200)] mx-2 my-2'
const footerCls = 'flex justify-between items-start px-2'
const btnResetCls = 'h-8 px-3 text-paragraph font-medium text-[var(--text-strong)] bg-[var(--surface-card)] border border-[var(--border-card)] rounded-[4px] cursor-pointer hover:bg-[var(--surface-hover)] box-border'
const btnApplyCls = 'h-8 px-3 text-paragraph font-medium text-white bg-[var(--primary)] border-none rounded-[4px] cursor-pointer hover:bg-[var(--color-blue-900)]'
const searchCls = 'flex items-center gap-2 mx-1 px-2 h-8 border border-[var(--border-200)] rounded-[4px]'
const searchInputCls = 'border-none outline-none bg-transparent text-paragraph font-regular text-[var(--text-strong)] w-full leading-4 placeholder:text-[var(--text-muted)]'
const scrollCls = 'max-h-48 overflow-y-auto [scrollbar-width:thin]'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ColFilterConfig {
  label: string
  options: string[]
}

export interface ColDropdownProps {
  /** Column identifier */
  col: string
  /** Current sort column */
  sortCol: string | null
  /** Current sort direction */
  sortDir: 'asc' | 'desc'
  /** Currently pinned columns */
  pinnedCols: string[]
  /** Column that is always pinned (first content column) */
  fixedPin?: string
  /** Max user-controllable pins */
  maxPins?: number
  /** Sort callback — called on Apply */
  onSort: (col: string, dir: 'asc' | 'desc') => void
  /** Pin toggle callback */
  onTogglePin: (col: string) => void
  /** Close callback */
  onClose: () => void
  /** Filter config — if provided, shows checkbox filter section */
  filter?: ColFilterConfig
  /** Filter callback — called on Apply with selected options */
  onFilter?: (col: string, selected: string[]) => void
  /** Whether this column has time-based content (shows date range picker) */
  hasDateFilter?: boolean
  /** Date range callback — called on Apply with selected range */
  onDateRange?: (col: string, range: string) => void
  /** Search placeholder for complex filters */
  searchPlaceholder?: string
  /** Additional className */
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ColDropdown({
  col,
  sortCol,
  sortDir,
  pinnedCols,
  fixedPin,
  maxPins = 2,
  onSort,
  onTogglePin,
  onClose,
  filter,
  onFilter,
  hasDateFilter,
  onDateRange,
  searchPlaceholder = 'Search...',
  className,
}: ColDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [subView, setSubView] = useState<'main' | 'date'>('main')
  const [dateRange, setDateRange] = useState('All Time')
  const [pendingSort, setPendingSort] = useState<'asc' | 'desc' | null>(
    sortCol === col ? sortDir : null
  )
  const [checkedFilters, setCheckedFilters] = useState<Set<string>>(
    () => new Set(filter ? filter.options : [])
  )
  const [filterSearch, setFilterSearch] = useState('')

  const isComplex = filter ? filter.options.length > COMPLEX_THRESHOLD : false
  const isPinned = pinnedCols.includes(col)
  const isFixedPin = col === fixedPin
  const userPins = pinnedCols.filter(c => c !== fixedPin).length
  const canPin = !isPinned && userPins < maxPins

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function toggleFilter(opt: string) {
    setCheckedFilters(prev => {
      const next = new Set(prev)
      if (next.has(opt)) next.delete(opt)
      else next.add(opt)
      return next
    })
  }

  function handleReset() {
    setPendingSort(null)
    setDateRange('All Time')
    setFilterSearch('')
    if (filter) setCheckedFilters(new Set(filter.options))
  }

  function handleApply() {
    if (pendingSort) onSort(col, pendingSort)
    if (onFilter && filter) onFilter(col, Array.from(checkedFilters))
    if (onDateRange && hasDateFilter) onDateRange(col, dateRange)
    onClose()
  }

  // ── Date sub-view ──

  if (subView === 'date') {
    return (
      <div ref={ref} className={cn(dropdownCls, className)} role="menu">
        <div className={itemCls} role="menuitem" onClick={() => setSubView('main')}>
          <ChevronLeftIcon /> Back
        </div>
        <div className={dividerCls} />
        {DATE_RANGES.map(range => (
          <div
            key={range}
            className={cn(itemCls, dateRange === range && itemActiveCls)}
            role="menuitem"
            onClick={() => { setDateRange(range); setSubView('main') }}
          >
            <span className="flex-1">{range}</span>
            {dateRange === range && <CheckIcon />}
          </div>
        ))}
        <div className={itemCls} role="menuitem">
          <span className="flex-1">Custom</span>
          <ChevronRightIcon />
        </div>
      </div>
    )
  }

  // ── Main view ──

  const filteredOptions = filter
    ? (filterSearch
        ? filter.options.filter(o => o.toLowerCase().includes(filterSearch.toLowerCase()))
        : filter.options)
    : []

  return (
    <div ref={ref} className={cn(dropdownCls, className)} role="menu">
      <div className={sectionTitleCls}>Sorting</div>
      <div
        className={cn(itemCls, pendingSort === 'asc' && itemActiveCls)}
        role="menuitem"
        onClick={() => setPendingSort(pendingSort === 'asc' ? null : 'asc')}
      >
        <SortAscIcon /> <span>Ascending</span>
      </div>
      <div
        className={cn(itemCls, pendingSort === 'desc' && itemActiveCls)}
        role="menuitem"
        onClick={() => setPendingSort(pendingSort === 'desc' ? null : 'desc')}
      >
        <SortDescIcon /> <span>Descending</span>
      </div>
      <div className={dividerCls} />
      <div
        className={cn(itemCls, isFixedPin && itemDisabledCls, !isPinned && !canPin && itemDisabledCls)}
        role="menuitem"
        aria-disabled={isFixedPin || (!isPinned && !canPin)}
        onClick={() => { if (!isFixedPin && (isPinned || canPin)) { onTogglePin(col); onClose() } }}
      >
        <PinIcon />
        <span>
          {isFixedPin
            ? `Pinned (${userPins}/${maxPins})`
            : isPinned
              ? 'Unpin Column'
              : 'Pin Column'}
        </span>
      </div>

      {/* Simple checkbox filter (≤ threshold) */}
      {filter && !isComplex && <>
        <div className={sectionTitleCls}>{filter.label}</div>
        {filter.options.map(opt => (
          <div key={opt} className={itemCls} role="menuitemcheckbox" aria-checked={checkedFilters.has(opt)} onClick={() => toggleFilter(opt)}>
            <Checkbox checked={checkedFilters.has(opt)} className="pointer-events-none" />
            <span>{opt}</span>
          </div>
        ))}
      </>}

      {/* Complex checkbox filter (> threshold, with search) */}
      {filter && isComplex && <>
        <div className={dividerCls} />
        <div className={searchCls}>
          <SearchIcon />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            className={searchInputCls}
          />
        </div>
        <div className={scrollCls}>
          {filteredOptions.map(opt => (
            <div key={opt} className={itemCls} role="menuitemcheckbox" aria-checked={checkedFilters.has(opt)} onClick={() => toggleFilter(opt)}>
              <Checkbox checked={checkedFilters.has(opt)} className="pointer-events-none" />
              <span>{opt}</span>
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="px-2 py-2 text-paragraph text-[var(--text-muted)]">No results</div>
          )}
        </div>
      </>}

      {/* Date range picker */}
      {hasDateFilter && <>
        <div className={dividerCls} />
        <div className={itemCls} role="menuitem" onClick={() => setSubView('date')}>
          <CalendarIcon /> <span className="flex-1">{dateRange}</span>
          <ChevronRightIcon />
        </div>
      </>}

      <div className={dividerCls} />
      <div className={footerCls}>
        <button type="button" className={btnResetCls} onClick={handleReset}>Reset</button>
        <button type="button" className={btnApplyCls} onClick={handleApply}>Apply</button>
      </div>
    </div>
  )
}

// ─── ColHeader (trigger + dropdown) ──────────────────────────────────────────

export interface ColHeaderProps {
  /** Column header label */
  children: ReactNode
  /** Column identifier */
  col: string
  /** Current sort column */
  sortCol: string | null
  /** Current sort direction */
  sortDir: 'asc' | 'desc'
  /** Currently pinned columns */
  pinnedCols: string[]
  /** Column that is always pinned */
  fixedPin?: string
  /** Max user-controllable pins */
  maxPins?: number
  /** Sort callback */
  onSort: (col: string, dir: 'asc' | 'desc') => void
  /** Pin toggle callback */
  onTogglePin: (col: string) => void
  /** Filter config */
  filter?: ColFilterConfig
  /** Filter callback — called on Apply with selected options */
  onFilter?: (col: string, selected: string[]) => void
  /** Whether this column has time-based content */
  hasDateFilter?: boolean
  /** Date range callback — called on Apply with selected range */
  onDateRange?: (col: string, range: string) => void
  /** Search placeholder */
  searchPlaceholder?: string
  /** Additional className */
  className?: string
}

export function ColHeader({
  children,
  col,
  sortCol,
  sortDir,
  pinnedCols,
  fixedPin,
  maxPins,
  onSort,
  onTogglePin,
  filter,
  onFilter,
  hasDateFilter,
  onDateRange,
  searchPlaceholder,
  className,
}: ColHeaderProps) {
  const [open, setOpen] = useState(false)
  const isSorted = sortCol === col

  return (
    <>
      <span className={className}>{children}</span>
      <button
        type="button"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 transition-opacity duration-150 shrink-0 hover:opacity-100 bg-transparent border-none p-0',
          isSorted && 'opacity-100',
        )}
        aria-label="Column options"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={e => { e.stopPropagation(); setOpen(!open) }}
      >
        <FilterIcon />
      </button>
      {open && (
        <ColDropdown
          col={col}
          sortCol={sortCol}
          sortDir={sortDir}
          pinnedCols={pinnedCols}
          fixedPin={fixedPin}
          maxPins={maxPins}
          onSort={onSort}
          onTogglePin={onTogglePin}
          onClose={() => setOpen(false)}
          filter={filter}
          onFilter={onFilter}
          hasDateFilter={hasDateFilter}
          onDateRange={onDateRange}
          searchPlaceholder={searchPlaceholder}
        />
      )}
    </>
  )
}
