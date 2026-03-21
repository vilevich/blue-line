import React, { useState, lazy, Suspense } from 'react'
import { cn } from '@opswat/blue-line'
import { Header } from './components/Header'
import { Sidebar, type PageId } from './components/Sidebar'

const pages: Record<PageId, React.LazyExoticComponent<() => React.ReactElement>> = {
  dashboard: lazy(() => import('./pages/Dashboard').then(m => ({ default: m.DashboardPage }))),
  reports: lazy(() => import('./pages/Reports').then(m => ({ default: m.ReportsPage }))),
  inventory: lazy(() => import('./pages/Inventory').then(m => ({ default: m.InventoryPage }))),
  workflows: lazy(() => import('./pages/Workflows').then(m => ({ default: m.WorkflowsPage }))),
  jobs: lazy(() => import('./pages/Jobs').then(m => ({ default: m.JobsPage }))),
  users: lazy(() => import('./pages/Users').then(m => ({ default: m.UsersPage }))),
  settings: lazy(() => import('./pages/Settings').then(m => ({ default: m.SettingsPage }))),
  audit: lazy(() => import('./pages/Audit').then(m => ({ default: m.AuditPage }))),
}

const allPageIds = Object.keys(pages) as PageId[]

export function App() {
  const [dark, setDark] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState<PageId>('dashboard')
  const [visited, setVisited] = useState<Set<PageId>>(new Set(['dashboard']))

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  function navigate(page: PageId) {
    if (page === activePage) {
      window.dispatchEvent(new CustomEvent('nav-reset', { detail: page }))
      return
    }
    setActivePage(page)
    setVisited(prev => {
      if (prev.has(page)) return prev
      const next = new Set(prev)
      next.add(page)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)]">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleTheme={toggleTheme}
        dark={dark}
      />
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
      />
      <main
        className={cn(
          'pt-[56px] flex flex-col h-screen transition-[margin-left] duration-200',
          sidebarCollapsed ? 'ml-14' : 'ml-[244px]',
        )}
      >
        <Suspense fallback={<div className="p-5">Loading...</div>}>
          {allPageIds.map(id => {
            if (!visited.has(id)) return null
            const PageComponent = pages[id]
            return (
              <div key={id} className="p-5 flex-1 flex flex-col min-h-0" style={{ display: id === activePage ? 'flex' : 'none' }}>
                <PageComponent />
              </div>
            )
          })}
        </Suspense>
      </main>
    </div>
  )
}
