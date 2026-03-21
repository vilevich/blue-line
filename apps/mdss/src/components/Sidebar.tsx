import { cn } from '@opswat/blue-line'

export type PageId = 'dashboard' | 'reports' | 'inventory' | 'workflows' | 'jobs' | 'users' | 'settings' | 'audit'

/* ── Nav icon SVGs from Figma (exact paths) ── */

const navIcons: Record<string, React.ReactNode> = {
  /* view/dashboard — viewBox 0 0 14.5 10.5 */
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 14.5 10.5" fill="currentColor">
      <path d="M6.5 4.5V0.5H13.5C14.05 0.5 14.5 0.9 14.5 1.39V4.5H6.5Z" />
      <path d="M0.5 9.61V6.5H7.5V10.5H1.36C0.88 10.5 0.5 10.1 0.5 9.61Z" />
      <path d="M5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5C3.88071 5 5 3.88071 5 2.5Z" />
      <path d="M9.5 6.5H14.5V9.5C14.5 10.05 14.05 10.5 13.5 10.5H9.5V6.5Z" />
    </svg>
  ),
  /* view/detail-small — viewBox 0 0 12 12 */
  reports: (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="currentColor">
      <path d="M3 0V3H0V1C0 0.45 0.45 0 1 0H3Z" />
      <path d="M3 7.5V4.5H0V7.5H3Z" />
      <path d="M3 9V12H1C0.45 12 0 11.55 0 11V9H3Z" />
      <path d="M12 1V3H4.5V0H11C11.55 0 12 0.45 12 1Z" />
      <path d="M4.5 12V9H12V11C12 11.55 11.55 12 11 12H4.5Z" />
      <path d="M12 7.5V4.5H4.5V7.5H12Z" />
    </svg>
  ),
  /* objects/box — viewBox 0 0 12 13.68 */
  inventory: (
    <svg width="16" height="16" viewBox="0 0 12 13.68" fill="currentColor">
      <path d="M11.5 3.05L11.25 2.9L6.5 0.13C6.35 0.04 6.17 0 6 0C5.83 0 5.65 0.04 5.5 0.13L0.75 2.9L0.5 3.05C0.19 3.23 0 3.56 0 3.91V9.77C0 10.12 0.19 10.45 0.5 10.63L5.25 13.4L5.5 13.55C5.65 13.64 5.83 13.68 6 13.68C6.17 13.68 6.35 13.64 6.5 13.55L6.75 13.4L11.5 10.63C11.81 10.45 12 10.12 12 9.77V3.91C12 3.56 11.81 3.23 11.5 3.05ZM10.5 5.09L6.75 7.27V11.66L6 12.1L5.25 11.66V7.27L1.5 5.09V4.2L2.23 3.77L6 5.97L9.77 3.77L10.5 4.2V5.09Z" />
    </svg>
  ),
  /* data/chart-flow — viewBox 0 0 12 12 */
  workflows: (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="currentColor">
      <path d="M8 12H12V8H10.75V6C10.75 5.59 10.41 5.25 10 5.25H6.75V4H8V0H4V4H5.25V5.25H2C1.59 5.25 1.25 5.59 1.25 6V8H0V12H4V8H2.75V6.75H9.25V8H8V12Z" />
    </svg>
  ),
  /* data/chart-decision — viewBox 0 0 13 12 */
  jobs: (
    <svg width="16" height="16" viewBox="0 0 13 12" fill="currentColor">
      <path d="M9 4V2.75H7.75V9.25H9V8H13V12H9V10.75H7C6.59 10.75 6.25 10.41 6.25 10V6.75H5.25L3 9L0 6L3 3L5.25 5.25H6.25V2C6.25 1.59 6.59 1.25 7 1.25H9V0H13V4H9Z" />
    </svg>
  ),
  /* users/group-alt — viewBox 0 0 14 11 */
  users: (
    <svg width="16" height="16" viewBox="0 0 14 11" fill="currentColor">
      <path d="M12 3C12 4.57 10.8 5.85 9.27 5.98C9.18 6 9.09 6 9 6C9.03 5.97 9.06 5.93 9.08 5.89C9.66 5.07 10 4.08 10 3C10 1.92 9.63 0.83 9 0C10.66 0 12 1.34 12 3Z" />
      <path d="M14 9.64V11H12V9.64C12 8.71 11.64 7.92 11.05 7.28C12.58 7.69 14 8.51 14 9.64Z" />
      <path d="M8 3C8 3.89 7.62 4.69 7 5.22C6.47 5.71 5.77 6 5 6C4.23 6 3.53 5.71 3 5.22C2.38 4.69 2 3.89 2 3C2 1.34 3.34 0 5 0C5.77 0 6.47 0.29 7 0.77C7.62 1.31 8 2.11 8 3Z" />
      <path d="M10 9.64V11H0V9.64C0 8.6 1.2 7.82 2.59 7.38C3.39 7.13 4.26 7 4.99 7C5.6 7 6.3 7.09 6.99 7.27C7.12 7.3 7.26 7.34 7.39 7.38C8.78 7.82 9.98 8.6 9.98 9.64H10Z" />
    </svg>
  ),
  /* base/settings — viewBox 0 0 12.96 14 */
  settings: (
    <svg width="16" height="16" viewBox="0 0 12.96 14" fill="currentColor">
      <path d="M11.7039 7.46C11.7139 7.31 11.7239 7.16 11.7239 7C11.7239 6.84 11.7139 6.69 11.7039 6.54C11.6939 6.4 11.6739 6.25 11.6539 6.11L12.6139 5.26C12.9739 4.95 13.0539 4.42 12.8239 4.01L12.2439 3.01C12.0039 2.6 11.5139 2.41 11.0639 2.56L9.82395 2.97C9.59395 2.78 9.35395 2.61 9.09395 2.46C8.82395 2.32 8.55395 2.19 8.27395 2.08L8.03395 0.81C7.94395 0.34 7.53395 0 7.05395 0H5.90395C5.42395 0 5.01395 0.34 4.92395 0.81L4.68395 2.08C4.40395 2.19 4.13395 2.32 3.86395 2.46C3.60395 2.61 3.36395 2.78 3.13395 2.97L1.89395 2.56C1.44395 2.41 0.953948 2.6 0.713948 3.01L0.133947 4.01C-0.106053 4.42 -0.0160526 4.95 0.343947 5.26L1.30395 6.11C1.28395 6.25 1.26395 6.4 1.25395 6.54C1.24395 6.69 1.23395 6.84 1.23395 7C1.23395 7.16 1.24395 7.31 1.25395 7.46C1.26395 7.6 1.28395 7.75 1.30395 7.89L0.343947 8.74C-0.0160526 9.05 -0.0960526 9.58 0.133947 9.99L0.713948 10.99C0.953948 11.4 1.44395 11.59 1.89395 11.44L3.13395 11.03C3.36395 11.22 3.60395 11.39 3.86395 11.54C4.13395 11.68 4.40395 11.81 4.68395 11.92L4.92395 13.19C5.01395 13.66 5.42395 14 5.90395 14H7.05395C7.53395 14 7.94395 13.66 8.03395 13.19L8.27395 11.92C8.55395 11.81 8.82395 11.68 9.09395 11.54C9.35395 11.39 9.59395 11.22 9.82395 11.03L11.0639 11.44C11.5139 11.59 12.0039 11.4 12.2439 10.99L12.8239 9.99C13.0639 9.58 12.9739 9.05 12.6139 8.74L11.6539 7.89C11.6739 7.75 11.6939 7.6 11.7039 7.46ZM7.06395 9.94C4.94395 10.34 3.13395 8.53 3.53395 6.41C3.75395 5.23 4.71395 4.27 5.89395 4.05C8.01395 3.65 9.82395 5.46 9.42395 7.58C9.20395 8.76 8.24395 9.72 7.06395 9.94Z" />
    </svg>
  ),
  /* base/info — audit */
  audit: (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="currentColor">
      <path d="M11 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H11C11.55 12 12 11.55 12 11V1C12 0.45 11.55 0 11 0ZM6 2C6.41 2 6.75 2.34 6.75 2.75C6.75 3.16 6.41 3.5 6 3.5C5.59 3.5 5.25 3.16 5.25 2.75C5.25 2.34 5.59 2 6 2ZM7.25 10H4.75C4.34 10 4 9.66 4 9.25C4 8.84 4.34 8.5 4.75 8.5H5.25V5.5H4.75C4.34 5.5 4 5.16 4 4.75C4 4.34 4.34 4 4.75 4H6C6.41 4 6.75 6.34 6.75 4.75V8.5H7.25C7.66 8.5 8 8.84 8 9.25C8 9.66 7.66 10 7.25 10Z" />
    </svg>
  ),
}

interface NavItem {
  id: PageId
  label: string
}

/* Flat list of items + dividers matching Figma nav structure */
const navList: (NavItem | 'divider')[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  'divider',
  { id: 'inventory', label: 'Inventory' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'jobs', label: 'Jobs' },
  'divider',
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' },
  'divider',
  { id: 'audit', label: 'Audit' },
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
      {/* Nav items — flat list with 8px gap */}
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
                <span className="whitespace-nowrap">{navItem.label}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer: OPSWAT wordmark + tagline */}
      {!collapsed && (
        <div className="px-5 py-5 flex flex-col gap-2">
          {/* OPSWAT. wordmark */}
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
          {/* Tagline */}
          <span className="text-[10px] text-[var(--text-muted)] leading-[1.3]">
            Protecting the World's Critical Infrastructure
          </span>
        </div>
      )}
    </nav>
  )
}
