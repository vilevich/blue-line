import React, { useState } from 'react'
import { cn } from '@opswat/blue-line'
import { Header } from './components/Header'
import { Sidebar, type PageId } from './components/Sidebar'
import { DashboardPage } from './pages/Dashboard'
import { ReportsPage } from './pages/Reports'
import { InventoryPage } from './pages/Inventory'
import { WorkflowsPage } from './pages/Workflows'
import { JobsPage } from './pages/Jobs'
import { UsersPage } from './pages/Users'
import { SettingsPage } from './pages/Settings'
import { AuditPage } from './pages/Audit'

const pages: Record<PageId, () => React.ReactNode> = {
  dashboard: DashboardPage,
  reports: ReportsPage,
  inventory: InventoryPage,
  workflows: WorkflowsPage,
  jobs: JobsPage,
  users: UsersPage,
  settings: SettingsPage,
  audit: AuditPage,
}

export function App() {
  const [dark, setDark] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState<PageId>('dashboard')

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  const PageComponent = pages[activePage]

  return (
    <div className="min-h-screen bg-[var(--surface-bg)]">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleTheme={toggleTheme}
        dark={dark}
      />
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
      />
      <main
        className={cn(
          'pt-[60px] min-h-screen transition-[margin-left] duration-200',
          sidebarCollapsed ? 'ml-14' : 'ml-[244px]',
        )}
      >
        <div className="p-5">
          <PageComponent />
        </div>
      </main>
    </div>
  )
}
