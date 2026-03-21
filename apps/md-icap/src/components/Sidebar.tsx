import { cn } from '@opswat/blue-line'

export type PageId = 'overview' | 'history' | 'workflow-management' | 'user-management' | 'inventory' | 'settings'

const navIcons: Record<string, React.ReactNode> = {
  overview: (
    <svg width="16" height="16" viewBox="0 0 14.5 10.5" fill="currentColor">
      <path d="M6.5 4.5V0.5H13.5C14.05 0.5 14.5 0.9 14.5 1.39V4.5H6.5Z" />
      <path d="M0.5 9.61V6.5H7.5V10.5H1.36C0.88 10.5 0.5 10.1 0.5 9.61Z" />
      <path d="M5 2.5C5 1.12 3.88 0 2.5 0C1.12 0 0 1.12 0 2.5C0 3.88 1.12 5 2.5 5C3.88 5 5 3.88 5 2.5Z" />
      <path d="M9.5 6.5H14.5V9.5C14.5 10.05 14.05 10.5 13.5 10.5H9.5V6.5Z" />
    </svg>
  ),
  history: (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM9.53 9.53C9.24 9.82 8.76 9.82 8.47 9.53L6.47 7.53C6.33 7.39 6.25 7.2 6.25 7V4C6.25 3.59 6.59 3.25 7 3.25C7.41 3.25 7.75 3.59 7.75 4V6.69L9.53 8.47C9.82 8.76 9.82 9.24 9.53 9.53Z" />
    </svg>
  ),
  'workflow-management': (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="currentColor">
      <path d="M8 12H12V8H10.75V6C10.75 5.59 10.41 5.25 10 5.25H6.75V4H8V0H4V4H5.25V5.25H2C1.59 5.25 1.25 5.59 1.25 6V8H0V12H4V8H2.75V6.75H9.25V8H8V12Z" />
    </svg>
  ),
  'user-management': (
    <svg width="16" height="16" viewBox="0 0 14 11" fill="currentColor">
      <path d="M12 3C12 4.57 10.8 5.85 9.27 5.98C9.18 6 9.09 6 9 6C9.03 5.97 9.06 5.93 9.08 5.89C9.66 5.07 10 4.08 10 3C10 1.92 9.63 0.83 9 0C10.66 0 12 1.34 12 3Z" />
      <path d="M14 9.64V11H12V9.64C12 8.71 11.64 7.92 11.05 7.28C12.58 7.69 14 8.51 14 9.64Z" />
      <path d="M8 3C8 3.89 7.62 4.69 7 5.22C6.47 5.71 5.77 6 5 6C4.23 6 3.53 5.71 3 5.22C2.38 4.69 2 3.89 2 3C2 1.34 3.34 0 5 0C5.77 0 6.47 0.29 7 0.77C7.62 1.31 8 2.11 8 3Z" />
      <path d="M10 9.64V11H0V9.64C0 8.6 1.2 7.82 2.59 7.38C3.39 7.13 4.26 7 4.99 7C5.6 7 6.3 7.09 6.99 7.27C7.12 7.3 7.26 7.34 7.39 7.38C8.78 7.82 9.98 8.6 9.98 9.64H10Z" />
    </svg>
  ),
  inventory: (
    <svg width="16" height="16" viewBox="0 0 12 13.68" fill="currentColor">
      <path d="M11.5 3.05L11.25 2.9L6.5 0.13C6.35 0.04 6.17 0 6 0C5.83 0 5.65 0.04 5.5 0.13L0.75 2.9L0.5 3.05C0.19 3.23 0 3.56 0 3.91V9.77C0 10.12 0.19 10.45 0.5 10.63L5.25 13.4L5.5 13.55C5.65 13.64 5.83 13.68 6 13.68C6.17 13.68 6.35 13.64 6.5 13.55L6.75 13.4L11.5 10.63C11.81 10.45 12 10.12 12 9.77V3.91C12 3.56 11.81 3.23 11.5 3.05ZM10.5 5.09L6.75 7.27V11.66L6 12.1L5.25 11.66V7.27L1.5 5.09V4.2L2.23 3.77L6 5.97L9.77 3.77L10.5 4.2V5.09Z" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 12.96 14" fill="currentColor">
      <path d="M11.7 7.46C11.71 7.31 11.72 7.16 11.72 7C11.72 6.84 11.71 6.69 11.7 6.54C11.69 6.4 11.67 6.25 11.65 6.11L12.61 5.26C12.97 4.95 13.05 4.42 12.82 4.01L12.24 3.01C12 2.6 11.51 2.41 11.06 2.56L9.82 2.97C9.59 2.78 9.35 2.61 9.09 2.46C8.82 2.32 8.55 2.19 8.27 2.08L8.03 0.81C7.94 0.34 7.53 0 7.05 0H5.9C5.42 0 5.01 0.34 4.92 0.81L4.68 2.08C4.4 2.19 4.13 2.32 3.86 2.46C3.6 2.61 3.36 2.78 3.13 2.97L1.89 2.56C1.44 2.41 0.95 2.6 0.71 3.01L0.13 4.01C-0.11 4.42 -0.02 4.95 0.34 5.26L1.3 6.11C1.28 6.25 1.26 6.4 1.25 6.54C1.24 6.69 1.23 6.84 1.23 7C1.23 7.16 1.24 7.31 1.25 7.46C1.26 7.6 1.28 7.75 1.3 7.89L0.34 8.74C-0.02 9.05 -0.1 9.58 0.13 9.99L0.71 10.99C0.95 11.4 1.44 11.59 1.89 11.44L3.13 11.03C3.36 11.22 3.6 11.39 3.86 11.54C4.13 11.68 4.4 11.81 4.68 11.92L4.92 13.19C5.01 13.66 5.42 14 5.9 14H7.05C7.53 14 7.94 13.66 8.03 13.19L8.27 11.92C8.55 11.81 8.82 11.68 9.09 11.54C9.35 11.39 9.59 11.22 9.82 11.03L11.06 11.44C11.51 11.59 12 11.4 12.24 10.99L12.82 9.99C13.06 9.58 12.97 9.05 12.61 8.74L11.65 7.89C11.67 7.75 11.69 7.6 11.7 7.46ZM7.06 9.94C4.94 10.34 3.13 8.53 3.53 6.41C3.75 5.23 4.71 4.27 5.89 4.05C8.01 3.65 9.82 5.46 9.42 7.58C9.2 8.76 8.24 9.72 7.06 9.94Z" />
    </svg>
  ),
}

interface NavItem {
  id: PageId
  label: string
  expandable?: boolean
}

const navList: (NavItem | 'divider')[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'History', expandable: true },
  'divider',
  { id: 'workflow-management', label: 'Workflow Management' },
  { id: 'user-management', label: 'User Management' },
  { id: 'inventory', label: 'Inventory', expandable: true },
  'divider',
  { id: 'settings', label: 'Settings' },
]

interface SidebarProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
  collapsed: boolean
}

export function Sidebar({ activePage, onNavigate, collapsed }: SidebarProps) {
  return (
    <nav
      className={cn(
        'fixed top-[56px] left-0 bottom-0 z-10 flex flex-col justify-between bg-[var(--surface-bg)] border-r border-[var(--border-card)] font-sans transition-[width] duration-200 overflow-hidden',
        collapsed ? 'w-14' : 'w-[244px]',
      )}
    >
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {navList.map((item, i) => {
          if (item === 'divider') {
            return <div key={`div-${i}`} className="h-px bg-[var(--border-card)]" />
          }
          const navItem = item as NavItem
          const isActive = activePage === navItem.id
          return (
            <button
              key={navItem.id}
              type="button"
              onClick={() => onNavigate(navItem.id)}
              className={cn(
                'flex items-center gap-2 w-full h-10 px-3 border-none cursor-pointer font-sans text-[14px] leading-[16px] rounded transition-colors duration-150',
                isActive
                  ? 'bg-[var(--color-blue-100)] text-[var(--text-strong)] font-normal'
                  : 'bg-transparent text-[var(--text-subtle)] hover:bg-[var(--hover-subtle)] hover:text-[var(--text-strong)]',
              )}
            >
              <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                {navIcons[navItem.id]}
              </span>
              {!collapsed && (
                <>
                  <span className="whitespace-nowrap flex-1 text-left">{navItem.label}</span>
                  {navItem.expandable && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className="shrink-0 opacity-50">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>

      {!collapsed && (
        <div className="px-5 py-5 flex flex-col gap-2">
          <svg width="114" height="18" viewBox="0 0 113.583 17.6861" fill="var(--text-strong)">
            <path d="M8.80497 0C6.6676 0 4.76362 0.719826 3.3731 1.90643V4.27473C4.55725 2.9874 6.48826 1.85484 8.83199 1.85484C12.6424 1.85484 15.5782 4.84224 15.5782 8.85902V14.3941C16.841 13.0551 17.6394 11.1241 17.6394 8.85902C17.637 3.75882 13.6988 0 8.80497 0Z" />
            <path d="M2.08578 8.70424V3.16674C0.823009 4.50567 0 6.43667 0 8.70424C0 13.802 3.94062 17.5608 8.83199 17.5608C10.9694 17.5608 12.8733 16.841 14.2909 15.6544V13.2861C13.0797 14.5734 11.1241 15.706 8.80743 15.706C4.99702 15.706 2.08578 12.694 2.08578 8.70179V8.70424Z" />
            <path d="M29.3974 0.282524H23.4226V17.2758H25.4322V2.03418H29.3728C31.6134 2.03418 32.773 3.4247 32.773 5.22795C32.773 7.0312 31.6134 8.39469 29.3728 8.39469H26.695V10.1464H29.3974C32.7459 10.1464 34.8293 8.08514 34.8293 5.20338C34.8293 2.32162 32.7459 0.282524 29.3974 0.282524Z" />
            <path d="M49.2258 3.99221L50.6949 2.88422C49.6655 1.23574 47.7075 0 45.4424 0C44.7717 0 44.1551 0.103183 43.5876 0.282526V2.18896C44.1551 1.95802 44.8233 1.85484 45.3908 1.85484C46.9361 1.85484 48.3266 2.62626 49.2282 3.99221H49.2258Z" />
            <path d="M46.9336 8.08514L45.0542 7.18352C43.5089 6.43667 42.3248 5.87162 42.3248 4.06837V0.8746C41.089 1.62145 40.239 2.85719 40.239 4.45408C40.239 6.8494 42.0939 8.03355 44.0765 8.98677L45.9829 9.88839C47.6559 10.6868 48.8155 11.3035 48.8155 13.1338V16.61C50.1028 15.787 50.9013 14.4997 50.9013 12.8242C50.9013 10.5321 49.4346 9.27175 46.9361 8.0876L46.9336 8.08514Z" />
            <path d="M40.6517 12.7972L39.158 13.9052C40.4699 16.1457 42.7375 17.5608 45.3638 17.5608C46.1622 17.5608 46.882 17.4306 47.5527 17.1997V15.3203C46.882 15.5512 46.1106 15.706 45.3908 15.706C43.2018 15.706 41.6836 14.367 40.6542 12.7972H40.6517Z" />
            <path d="M54.8173 0.282524L61.281 17.5608H62.0008L62.7207 15.8091L57.0309 0.282524H54.8173Z" />
            <path d="M73.69 11.4583L74.771 14.1115L79.9228 0.282524H77.7338L73.69 11.4583Z" />
            <path d="M67.0224 0L62.4652 11.4067L63.4159 14.0329L67.3811 4.09294L72.7638 17.5608H73.5107L74.1028 15.9123L67.7423 0H67.0224Z" />
            <path d="M86.0548 12.1658L88.7572 5.8839L87.7033 3.38539L81.7285 17.4183H83.8388L85.281 13.969H92.2335L91.4621 12.1658H86.0548Z" />
            <path d="M89.0914 0.142492L88.3715 1.76394L95.0661 17.4183H97.2035L89.8407 0.142492H89.0914Z" />
            <path d="M112.241 0.282524H98.2599V2.08577H112.241V0.282524Z" />
            <path d="M106.242 3.34608H104.232V17.2758H106.242V3.34608Z" />
            <path d="M112.263 14.9788C111.536 14.9788 110.934 15.5856 110.934 16.3349C110.934 17.0842 111.536 17.6861 112.263 17.6861C112.991 17.6861 113.583 17.0793 113.583 16.3349C113.583 15.5905 112.993 14.9788 112.263 14.9788Z" />
          </svg>
          <span className="text-[10px] text-[var(--text-muted)] leading-[1.3]">
            Trust no file. Trust no device.™
          </span>
        </div>
      )}
    </nav>
  )
}
