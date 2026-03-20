import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TabItem {
  id: string
  label: string
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab?: string
  onTabChange?: (id: string) => void
  children?: ReactNode
  className?: string
}

export interface TabPanelProps {
  id: string
  activeTab: string
  children: ReactNode
  className?: string
}

export function Tabs({ tabs, activeTab: controlledActive, onTabChange, children, className }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? '')
  const active = controlledActive ?? internalActive

  function handleTabClick(id: string) {
    if (!controlledActive) setInternalActive(id)
    onTabChange?.(id)
  }

  return (
    <>
      <div
        className={cn('flex w-fit rounded bg-[var(--tab-bg)] mb-3 font-sans', className)}
        role="tablist"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'px-3 py-2 text-label font-regular rounded border-none cursor-pointer font-sans whitespace-nowrap transition-colors duration-150',
              active === tab.id
                ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)]'
                : 'bg-transparent text-[var(--tab-text)] hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children}
    </>
  )
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (id !== activeTab) return null
  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      className={className}
    >
      {children}
    </div>
  )
}
