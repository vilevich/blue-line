import { useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@opswat/blue-line'

/* ===== SIDEBAR NAV DATA ===== */
interface NavGroup {
  title: string
  items: { id: string; label: string }[]
}

const NAV: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'tokens', label: 'Design Tokens' },
      { id: 'icons', label: 'Icons' },
    ],
  },
  {
    title: 'General',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'forms', label: 'Forms' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { id: 'tags', label: 'Tags' },
      { id: 'badges', label: 'Badges' },
      { id: 'chips', label: 'Chips' },
      { id: 'scan-status', label: 'Scan Status' },
      { id: 'verdicts', label: 'Verdicts' },
      { id: 'severities', label: 'Severities' },
    ],
  },
  {
    title: 'Data Containers',
    items: [
      { id: 'cards', label: 'Cards' },
      { id: 'tables', label: 'Tables' },
      { id: 'pagination', label: 'Pagination' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { id: 'toasts', label: 'Toasts' },
      { id: 'banners', label: 'Banners' },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { id: 'modals', label: 'Modals' },
      { id: 'slide-panels', label: 'Slide Panels' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { id: 'page-header', label: 'Page Header' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
]

/* ===== HEADER ===== */
function Header() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  )

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('bl-theme', next ? 'dark' : 'light')
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[var(--ds-header-h)] flex items-center justify-between px-6 bg-[var(--surface-card)] border-b border-[var(--border-200)]"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-3 text-[15px] font-semibold tracking-tight text-[var(--text-strong)]">
        Blue Line
        <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)] px-2 py-0.5 rounded-full">
          v3.0
        </span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/vilevich/blue-line"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-[var(--text-subtle)] hover:text-[var(--text-strong)] px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center border border-[var(--border-200)] rounded-md text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors cursor-pointer"
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 110-8 4 4 0 010 8zm0-12a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm-8-5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2A.5.5 0 010 8zm13 0a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2A.5.5 0 0113 8z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 0a6 6 0 000 12A6 6 0 1010.89 2.75a5 5 0 01-4.14 8.5A5 5 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

/* ===== SIDEBAR ===== */
function Sidebar({
  activePage,
  onNavigate,
  search,
  onSearch,
}: {
  activePage: string
  onNavigate: (id: string) => void
  search: string
  onSearch: (q: string) => void
}) {
  const q = search.toLowerCase().trim()

  return (
    <nav className="docs-sidebar fixed top-[var(--ds-header-h)] left-0 bottom-0 w-[var(--ds-sidebar-w)] overflow-y-auto overflow-x-hidden bg-[var(--surface-bg)] py-4">
      <div className="px-3 pb-4">
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-8 px-3 text-[13px] border border-[var(--border-200)] rounded-md bg-[var(--surface-card)] text-[var(--text-strong)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-neutral-500)] transition-colors"
          style={{ fontFamily: 'var(--ds-font)' }}
        />
      </div>
      {NAV.map((group) => {
        const visible = group.items.filter(
          (item) => !q || item.label.toLowerCase().includes(q),
        )
        if (visible.length === 0) return null
        return (
          <div key={group.title} className="mb-1">
            <h4 className="text-[13px] font-medium text-[var(--text-strong)] px-4 pt-2 pb-1">
              {group.title}
            </h4>
            {visible.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'block w-full text-left px-4 py-1.5 text-[13px] transition-colors cursor-pointer border-none bg-transparent',
                  activePage === item.id
                    ? 'text-[var(--text-strong)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]',
                )}
                style={{ fontFamily: 'var(--ds-font)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )
      })}
      <div className="px-4 pt-4 mt-3 text-[12px] text-[var(--text-muted)]">
        Blue Line v3.0
        <br />
        <a
          href="https://github.com/vilevich/blue-line"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-subtle)] font-medium hover:text-[var(--text-strong)] no-underline"
        >
          View on GitHub
        </a>
      </div>
    </nav>
  )
}

/* ===== DOCS LAYOUT ===== */
export function DocsLayout({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState('overview')
  const [search, setSearch] = useState('')
  const mainRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: track which section is visible
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivePage(entry.target.getAttribute('data-section') || '')
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function handleNavigate(id: string) {
    setActivePage(id)
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)]">
      <Header />
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        search={search}
        onSearch={setSearch}
      />
      <main
        ref={mainRef}
        className="ml-[var(--ds-sidebar-w)] mt-[var(--ds-header-h)] max-w-[900px] px-12 py-10 pb-20"
      >
        {children}
      </main>
    </div>
  )
}
