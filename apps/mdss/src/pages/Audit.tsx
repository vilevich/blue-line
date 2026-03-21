import { Fragment, useState, useRef, useCallback } from 'react'
import {
  cn,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Icon,
  InputField,
  SelectField,
  SlidePanel,
  Tag,
  Toaster,
  type ToasterHandle,
  type TagVariant,
} from '@opswat/blue-line'

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

interface AuditRow {
  id: number
  user: string | null
  initials: string | null
  avatarColors: [string, string] | null
  level: 'info' | 'warn' | 'error'
  category: string
  type: string
  date: string
  details: string
  highlight?: boolean
}

const USERS = [
  { name: 'Alex Johnson',  initials: 'A', colors: ['#c17a5a', '#a8624a'] as [string, string] },
  { name: 'Emily Johnson', initials: 'E', colors: ['#6b8faa', '#4a6f8a'] as [string, string] },
  { name: 'Irene Miller',  initials: 'I', colors: ['#8a7faa', '#6a5f8a'] as [string, string] },
  { name: 'Sophia Davis',  initials: 'S', colors: ['#7aaa6b', '#5a8a4a'] as [string, string] },
  { name: 'Michael Chen',  initials: 'M', colors: ['#aa8a6b', '#8a6a4a'] as [string, string] },
  { name: 'Sarah Wilson',  initials: 'S', colors: ['#6b7aaa', '#4a5a8a'] as [string, string] },
  { name: 'David Brown',   initials: 'D', colors: ['#aa6b8a', '#8a4a6a'] as [string, string] },
  null, // System
]

const LEVELS: AuditRow['level'][] = ['warn', 'info', 'error', 'warn', 'info', 'warn']
const CATEGORIES = ['Settings', 'Scan Activity', 'Authentication', 'Scan Activity', 'Settings', 'Authentication', 'Settings']
const TYPES = [
  'Workflow Technologies refreshed',
  'File Discovery Failed',
  'Logged In',
  'Scan Profile Updated',
  'API Key Rotated',
  'Password Changed',
  'Configuration Updated',
  'License Renewed',
  'User Role Modified',
  'Scan Engine Updated',
]
const DETAILS = [
  'Scanning modules for Workflow have been updated. New values applied.',
  'Unable to discover files in the configured storage path.',
  'User authentication session initiated from 192.168.1.45.',
  'Scan profile "Default Cloud" settings modified by administrator.',
  'API key rotation completed successfully for all services.',
  'Password change request processed for user account.',
  'System configuration backup created automatically.',
  'License validation check completed with renewed status.',
  'User role permissions updated in access control system.',
  'MetaDefender Core scan engine definitions updated to latest.',
  'Workflow engine restarted after configuration changes.',
  'File quarantine policy updated for blocked file types.',
  'SMTP notification settings verified and connection tested.',
  'Data retention policy applied to audit records older than 30 days.',
  'SSL certificate renewed for API endpoint connections.',
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const FIGMA_DATES = [
  'August 15, 2025 16:00:00',
  'November 30, 2025 14:30:00',
  'July 10, 2025 09:15:00',
  'May 27, 2025 11:45:00',
  'June 01, 2025 08:00:00',
  'July 15, 2025 10:30:00',
  'August 01, 2025 12:00:00',
  'September 05, 2025 13:15:00',
  'October 10, 2025 15:45:00',
  'September 20, 2025 17:00:00',
  'March 12, 2025 09:30:00',
  'April 18, 2025 14:00:00',
  'December 05, 2025 11:15:00',
  'February 22, 2025 16:45:00',
  'January 08, 2025 10:00:00',
]

function formatDate(index: number): string {
  return FIGMA_DATES[index % FIGMA_DATES.length]
}

function generateAuditData(count: number, startId = 1): AuditRow[] {
  const rows: AuditRow[] = []
  for (let i = 0; i < count; i++) {
    const u = USERS[i % USERS.length]
    rows.push({
      id: startId + i,
      user: u ? u.name : 'System',
      initials: u ? u.initials : null,
      avatarColors: u ? u.colors : null,
      level: LEVELS[i % LEVELS.length],
      category: CATEGORIES[i % CATEGORIES.length],
      type: TYPES[i % TYPES.length],
      date: formatDate(i),
      details: DETAILS[i % DETAILS.length],
    })
  }
  return rows
}

const LEVEL_VARIANT: Record<AuditRow['level'], TagVariant> = {
  info: 'accent',
  warn: 'warn',
  error: 'alert',
}
const LEVEL_LABEL: Record<AuditRow['level'], string> = {
  info: 'Info',
  warn: 'Warning',
  error: 'Error',
}

const TOTAL_RECORDS = 1256
const PAGE_SIZE_OPTIONS = [10, 25, 50]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AuditPage() {
  const [allRows] = useState(() => generateAuditData(50))
  const [rows, setRows] = useState<AuditRow[]>(allRows)
  const [search, setSearch] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Advanced filters
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterTimeFormat, setFilterTimeFormat] = useState('local')

  const toasterRef = useRef<ToasterHandle | null>(null)
  const nextId = useRef(51)

  const totalPages = Math.ceil(TOTAL_RECORDS / pageSize)
  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, TOTAL_RECORDS)

  // Filter rows by search
  const filteredRows = rows.filter(row => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      (row.user?.toLowerCase().includes(q)) ||
      row.level.includes(q) ||
      row.category.toLowerCase().includes(q) ||
      row.type.toLowerCase().includes(q) ||
      row.date.toLowerCase().includes(q) ||
      row.details.toLowerCase().includes(q)
    )
  })

  function toggleRow(id: number) {
    setExpandedRows(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function copyRowDetails(row: AuditRow) {
    const text = [row.user, LEVEL_LABEL[row.level], row.category, row.type, row.date, row.details].join(' | ')
    navigator.clipboard.writeText(text)
    toasterRef.current?.show('success', 'Description copied')
  }

  const refreshLog = useCallback(() => {
    const count = 3 + Math.floor(Math.random() * 3) // 3-5 new rows
    const newRows = generateAuditData(count, nextId.current).map(r => ({ ...r, highlight: true }))
    nextId.current += count
    setRows(prev => [...newRows, ...prev])
    toasterRef.current?.show('info', `${count} new events added`)

    // Remove highlight after 2 seconds
    setTimeout(() => {
      setRows(prev => prev.map(r => r.highlight ? { ...r, highlight: false } : r))
    }, 2000)
  }, [])

  function applyFilters() {
    setFiltersOpen(false)
    toasterRef.current?.show('info', 'Filters applied')
  }

  function revertFilters() {
    setFilterCategory('all')
    setFilterLevel('all')
    setFilterTimeFormat('local')
  }

  return (
    <div className="page-view table-page">
      <div className="page-title-row">
        <h1 className="page-title">Audit</h1>
        <Button variant="outline" onClick={refreshLog}>Refresh</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle
            title="System Events Log"
            count={TOTAL_RECORDS.toLocaleString()}
            actions={
              <>
                <div className="audit-search">
                  <svg className="audit-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for Files or Hash"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="audit-filter-btn" onClick={() => setFiltersOpen(true)}>
                  <Icon name="filter" size="sm" />
                </button>
              </>
            }
          />
        </CardHeader>

        <div className="audit-table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th className="col-expand"></th>
                <th className="col-user">User <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-level">Level <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-category">Category <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-type">Type <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-date">Date <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th>Details</th>
                <th className="col-copy"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => {
                const isExpanded = expandedRows.has(row.id)
                return (
                  <Fragment key={row.id}>
                    <tr
                      style={row.highlight ? { backgroundColor: '#f0f7ff', transition: 'background-color 2s' } : undefined}
                    >
                      <td className="col-expand">
                        <button
                          type="button"
                          className={cn('expand-btn', isExpanded && 'open')}
                          onClick={() => toggleRow(row.id)}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          aria-expanded={isExpanded}
                        >
                          <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size="sm" />
                        </button>
                      </td>
                      <td className="col-user">
                        <div className="audit-user">
                          {row.avatarColors ? (
                            <span
                              className="audit-avatar"
                              style={{ background: `linear-gradient(135deg, ${row.avatarColors[0]}, ${row.avatarColors[1]})` }}
                            >
                              {row.initials}
                            </span>
                          ) : null}
                          {row.user}
                        </div>
                      </td>
                      <td className="col-level">
                        <Tag variant={LEVEL_VARIANT[row.level]}>{LEVEL_LABEL[row.level]}</Tag>
                      </td>
                      <td className="col-category">
                        <Tag keyword>{row.category}</Tag>
                      </td>
                      <td className="col-type">{row.type}</td>
                      <td className="col-date">{row.date}</td>
                      <td>{row.details}</td>
                      <td className="col-copy">
                        <button
                          className="copy-btn"
                          onClick={() => copyRowDetails(row)}
                          aria-label="Copy details"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="audit-expanded-row">
                        <td />
                        <td colSpan={7}>
                          {row.details}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="audit-pagination">
          <div className="audit-pagination-left">
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
              className="select-field"
            >
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span>items per page</span>
          </div>
          <div className="audit-pagination-right">
            <span>{rangeStart}-{rangeEnd} of {filteredRows.length} items</span>
            <div className="flex items-center">
              <button
                className="audit-page-btn"
                disabled={page <= 1}
                onClick={() => setPage(1)}
                aria-label="First page"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 10L4 6L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="2" x2="3" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <button
                className="audit-page-btn"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <select
                className="audit-page-select"
                value={page}
                onChange={e => setPage(Number(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                ))}
              </select>
              <button
                className="audit-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                <Icon name="chevron-right" size="sm" />
              </button>
              <button
                className="audit-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage(totalPages)}
                aria-label="Last page"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="9" y1="2" x2="9" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Filters Panel */}
      <SlidePanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Advanced Filters"
      >
        <div className="flex flex-col gap-5">
          <div className="form-row">
            <div className="form-label">Category</div>
            <div className="form-value">
              <SelectField value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="scan">Scan Activity</option>
                <option value="settings">Settings</option>
                <option value="auth">Authentication</option>
              </SelectField>
            </div>
          </div>
          <div className="form-row">
            <div className="form-label">Level</div>
            <div className="form-value">
              <SelectField value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
                <option value="all">All Levels</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </SelectField>
            </div>
          </div>
          <div className="form-row">
            <div className="form-label">Time Format</div>
            <div className="form-value">
              <SelectField value={filterTimeFormat} onChange={e => setFilterTimeFormat(e.target.value)}>
                <option value="local">Local</option>
                <option value="utc">UTC</option>
              </SelectField>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border-card)' }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
            {TOTAL_RECORDS.toLocaleString()} files meet the filter criteria
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={revertFilters}>Revert</Button>
            <Button variant="primary" onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      </SlidePanel>

      <Toaster ref={toasterRef} />
    </div>
  )
}
