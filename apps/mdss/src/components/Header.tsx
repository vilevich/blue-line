import { useState } from 'react'

interface HeaderProps {
  onToggleSidebar: () => void
  onToggleTheme: () => void
  dark: boolean
}

export function Header({ onToggleSidebar, onToggleTheme, dark }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-[56px] pl-3 pr-5 bg-[var(--surface-bg)] border-b border-[var(--border-card)] font-sans">
      {/* Left: toggle + product name */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded cursor-pointer border-none bg-transparent text-[var(--text-strong)] hover:bg-[var(--hover-subtle)]"
        >
          {/* view/sidebar-right */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 1.5V10.5H1.5V1.5H6ZM7.5 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H7.5V0Z" />
            <path d="M11 0H9V12H11C11.55 12 12 11.55 12 11V1C12 0.45 11.55 0 11 0Z" />
          </svg>
        </button>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] font-normal text-[var(--text-strong)] uppercase tracking-[1px] leading-[10px]">
            METADEFENDER
          </span>
          <span className="text-[16px] font-medium text-[var(--text-strong)] leading-[16px]">
            Storage Security
          </span>
        </div>
      </div>

      {/* Right: actions + avatar */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          {/* Help */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded cursor-pointer border-none bg-transparent text-[var(--text-strong)] hover:bg-[var(--hover-subtle)]"
          >
            {/* base/help */}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
              <path d="M13.46 4.32L13.35 4.08C12.2 1.6 9.68 0 6.97 0C3.09 0 0 3.1 0 7.03C0 9.76 1.59 12.28 4.12 13.34L4.37 13.44L4.4 13.46C6.98 14.56 9.97 13.96 11.96 11.95L12.14 11.76C13.99 9.75 14.52 6.85 13.46 4.32ZM7 11.25C6.59 11.25 6.25 10.91 6.25 10.5C6.25 10.09 6.59 9.75 7 9.75C7.41 9.75 7.75 10.09 7.75 10.5C7.75 10.91 7.41 11.25 7 11.25ZM7.74 8.4C7.67 8.74 7.36 9 7 9C6.59 9 6.25 8.66 6.25 8.25V7.75C6.25 7.34 6.59 7 7 7C7.69 7 8.25 6.44 8.25 5.75C8.25 5.06 7.69 4.5 7 4.5C6.31 4.5 5.75 5.06 5.75 5.75C5.75 6.16 5.41 6.5 5 6.5C4.59 6.5 4.25 6.16 4.25 5.75C4.25 4.23 5.48 3 7 3C8.52 3 9.75 4.23 9.75 5.75C9.75 7.01 8.9 8.08 7.74 8.4Z" />
            </svg>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setNotifOpen(!notifOpen); setAvatarOpen(false) }}
              className="w-8 h-8 flex items-center justify-center rounded cursor-pointer border-none bg-transparent text-[var(--text-strong)] hover:bg-[var(--hover-subtle)]"
            >
              {/* event/notification */}
              <svg width="16" height="16" viewBox="0 0 13.51 14" fill="currentColor">
                <path d="M7.62496 12.13C7.13496 12.62 6.34496 12.62 5.85496 12.13C5.56496 11.84 5.08496 11.84 4.79496 12.13C4.50496 12.42 4.50496 12.9 4.79496 13.19C5.33496 13.73 6.03496 13.99 6.73496 13.99C7.43496 13.99 8.14496 13.72 8.67496 13.19C8.96496 12.9 8.96496 12.42 8.67496 12.13C8.38496 11.84 7.90496 11.84 7.61496 12.13H7.62496Z" />
                <path d="M13.165 9.63C12.355 9.07 11.495 7.17 11.495 4.75C11.495 2.13 9.36496 0 6.74496 0C4.12496 0 1.99496 2.13 1.99496 4.75C1.99496 7.17 1.13496 9.07 0.324961 9.63C0.0549608 9.82 -0.0650392 10.16 0.0349607 10.47C0.134961 10.78 0.424961 11 0.754961 11H12.755C13.085 11 13.375 10.79 13.475 10.47C13.575 10.16 13.455 9.82 13.185 9.63H13.165Z" />
              </svg>
            </button>
            {/* Red dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--color-red-700)]" />
            {notifOpen && (
              <div className="absolute right-0 top-10 w-80 bg-[var(--surface-card)] border border-[var(--border-card)] rounded shadow-dropdown z-50">
                <div className="flex items-center justify-between px-4 h-12 border-b border-[var(--border-card)]">
                  <span className="text-[14px] font-medium text-[var(--text-strong)]">Notifications</span>
                  <button type="button" className="text-[12px] text-[var(--primary)] bg-transparent border-none cursor-pointer font-sans">Mark all read</button>
                </div>
                <div className="p-4 text-[14px] text-[var(--text-muted)] text-center">No new notifications</div>
              </div>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setAvatarOpen(!avatarOpen); setNotifOpen(false) }}
            className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--text-on-fill)] flex items-center justify-center text-[12px] font-medium cursor-pointer border-none overflow-hidden"
          >
            EV
          </button>
          {avatarOpen && (
            <div className="absolute right-0 top-10 w-56 bg-[var(--surface-card)] border border-[var(--border-card)] rounded shadow-dropdown z-50 py-1">
              <div className="px-4 py-3 border-b border-[var(--border-card)]">
                <div className="text-[14px] font-medium text-[var(--text-strong)]">Elvijs Vilevics</div>
                <div className="text-[12px] text-[var(--text-muted)]">admin@opswat.com</div>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-[var(--text-subtle)] bg-transparent border-none cursor-pointer font-sans hover:bg-[var(--hover-subtle)] text-left"
              >
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
