import { useState, useRef, useMemo } from 'react'
import {
  cn,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Tag,
  Icon,
  SlidePanel,
  InputField,
  SelectField,
  FormRow,
  Modal,
  Toaster,
  type ToasterHandle,
} from '@opswat/blue-line'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ActiveJob {
  id: number
  name: string
  type: string
  status: 'Running'
  detections: number
  filesProcessed: number
  filesTotal: number
  storageUnit: string
  elapsedTime: string
  startTime: string
  progress: number
  workflow: string
  partition: string
  priority: string
}

interface UpcomingJob {
  id: number
  name: string
  frequency: string
  storageUnit: string
  startsIn: string
  workflow: string
  partition: string
  priority: string
}

interface PastJob {
  id: number
  name: string
  type: string
  status: 'Completed' | 'Stopped' | 'Cancelled'
  detections: number
  filesProcessed: number
  filesTotal: number
  storageUnit: string
  duration: string
  date: string
  workflow: string
  partition: string
  priority: string
}

interface ProcessedFile {
  name: string
  verdict: string
  detections: number
  fileType: string
  scanDate: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

// ---------------------------------------------------------------------------
// Data generation (matches index.html exactly)
// ---------------------------------------------------------------------------

const JOB_NAMES = [
  'Scheduled File Scan', 'On-Demand Security Scan', 'Cloud Compliance Check',
  'Real-Time File Monitor', 'Deep Scan Analysis', 'DLP Content Scan',
  'Weekly Archive Audit', 'Quick Vulnerability Scan', 'Malware Detection Run',
  'Data Classification Job', 'Sandbox Analysis Job', 'Integrity Verification',
]
const JOB_TYPES = ['Scheduled File Scan', 'Real-Time Scan', 'On-Demand Scan']
const STORAGE_UNITS = [
  'Amazon S3 – Production Bucket', 'Azure Blob – Dev Storage', 'Google Cloud – Archive',
  'Amazon S3 – Staging', 'Azure Blob – Marketing', 'Google Cloud – Analytics',
  'Amazon S3 – Backups', 'Azure Blob – HR Files',
]
const WORKFLOWS = ['Default Workflow', 'Quick Scan', 'Deep Scan', 'Compliance Workflow', 'Custom Workflow']
const PARTITIONS = ['All Partitions', 'Partition A', 'Partition B', 'Partition C']
const PRIORITIES = ['High', 'Medium', 'Low']
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly']
const ELAPSED_TIMES = ['00:12:45', '00:34:22', '01:08:33', '02:34:12', '03:45:10', '05:12:45']
const DURATIONS = ['00:32:18', '00:45:12', '01:05:44', '01:23:45', '02:10:30', '03:15:22']
const STARTS_IN = ['2h 15m', '6h 22m', '12h 30m', '18h 45m', '1d 8h', '2d 14h', '4d 2h', '7d 12h']
const DATES = [
  'Jan 15, 2025', 'Jan 14, 2025', 'Jan 13, 2025', 'Jan 12, 2025', 'Jan 11, 2025',
  'Jan 10, 2025', 'Jan 09, 2025', 'Jan 08, 2025', 'Jan 07, 2025', 'Jan 06, 2025',
  'Dec 28, 2024', 'Dec 27, 2024', 'Dec 20, 2024', 'Dec 15, 2024', 'Dec 10, 2024',
]

function generateJobs() {
  const active: ActiveJob[] = []
  const upcoming: UpcomingJob[] = []
  const past: PastJob[] = []
  let id = 1

  // Generate 5 active jobs
  for (let i = 0; i < 5; i++) {
    const pct = rand(10, 95)
    const total = rand(500, 10000)
    active.push({
      id: id++, name: JOB_NAMES[i % JOB_NAMES.length], type: pick(JOB_TYPES),
      status: 'Running', detections: rand(0, 3), filesProcessed: Math.round(total * pct / 100),
      filesTotal: total, storageUnit: STORAGE_UNITS[i % STORAGE_UNITS.length],
      elapsedTime: pick(ELAPSED_TIMES), startTime: DATES[0] + ' 0' + (8 + i) + ':00',
      progress: pct, workflow: pick(WORKFLOWS), partition: pick(PARTITIONS), priority: pick(PRIORITIES),
    })
  }

  // Generate 8 upcoming jobs
  for (let i = 0; i < 8; i++) {
    upcoming.push({
      id: id++, name: JOB_NAMES[(i + 5) % JOB_NAMES.length], frequency: pick(FREQUENCIES),
      storageUnit: STORAGE_UNITS[i % STORAGE_UNITS.length], startsIn: STARTS_IN[i % STARTS_IN.length],
      workflow: pick(WORKFLOWS), partition: pick(PARTITIONS), priority: pick(PRIORITIES),
    })
  }

  // Generate 25 past jobs
  for (let i = 0; i < 25; i++) {
    const statusLabel = i % 7 === 0 ? 'Stopped' as const : 'Completed' as const
    past.push({
      id: id++, name: JOB_NAMES[i % JOB_NAMES.length], type: pick(JOB_TYPES),
      status: statusLabel, detections: statusLabel === 'Stopped' ? rand(1, 8) : rand(0, 4),
      filesProcessed: rand(500, 50000), filesTotal: rand(500, 50000),
      storageUnit: STORAGE_UNITS[i % STORAGE_UNITS.length], duration: pick(DURATIONS),
      date: DATES[i % DATES.length], workflow: pick(WORKFLOWS),
      partition: pick(PARTITIONS), priority: pick(PRIORITIES),
    })
  }

  return { active, upcoming, past }
}

// Processed files for detail view
const FILE_NAMES = ['document_report_2026.pdf', 'user_data_export.csv', 'config_backup.json', 'application_logs.zip', 'financial_statement_q4.xlsx', 'employee_records.docx', 'system_image_v2.iso', 'database_dump.sql', 'analytics_dashboard.html', 'security_audit.pdf', 'network_traffic.pcap', 'firmware_update.bin', 'email_archive.mbox', 'codebase_snapshot.tar.gz', 'customer_feedback.csv']
const VERDICTS = ['No Threat', 'No Threat', 'No Threat', 'Detected', 'No Threat', 'No Threat', 'Suspicious', 'No Threat', 'No Threat', 'No Threat', 'Detected', 'No Threat', 'No Threat', 'No Threat', 'Benign']
const FILE_TYPES = ['PDF', 'CSV', 'JSON', 'ZIP', 'XLSX', 'DOCX', 'ISO', 'SQL', 'HTML', 'PDF', 'PCAP', 'BIN', 'MBOX', 'TAR.GZ', 'CSV']

function generateProcessedFiles(): ProcessedFile[] {
  const files: ProcessedFile[] = []
  for (let i = 0; i < 35; i++) {
    files.push({
      name: FILE_NAMES[i % FILE_NAMES.length],
      verdict: VERDICTS[i % VERDICTS.length],
      detections: VERDICTS[i % VERDICTS.length] === 'Detected' ? rand(1, 5) : 0,
      fileType: FILE_TYPES[i % FILE_TYPES.length],
      scanDate: `Feb ${String(24 - Math.floor(i / 8)).padStart(2, '0')}, 2026 ${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`,
    })
  }
  return files
}

// Generate once
const INITIAL_DATA = generateJobs()
const PROCESSED_FILES = generateProcessedFiles()

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function SearchBox({ value, onChange, placeholder = 'Search jobs' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="audit-search">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function FilterBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button className="audit-filter-btn" onClick={onClick} title="Advanced Filters">
      <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
        <path d="M4.75 7.15V2H3.25V7.15C2.52 7.45 2 8.16 2 9C2 9.84 2.52 10.55 3.25 10.85V14H4.75V10.85C5.48 10.55 6 9.84 6 9C6 8.16 5.48 7.45 4.75 7.15Z" />
        <path d="M10 5C10 4.16 9.48 3.45 8.75 3.15V2H7.25V3.15C6.52 3.45 6 4.16 6 5C6 5.84 6.52 6.55 7.25 6.85V14H8.75V6.85C9.48 6.55 10 5.84 10 5Z" />
        <path d="M14 11C14 10.16 13.48 9.45 12.75 9.15V2H11.25V9.15C10.52 9.45 10 10.16 10 11C10 11.84 10.52 12.55 11.25 12.85V14H12.75V12.85C13.48 12.55 14 11.84 14 11Z" />
      </svg>
    </button>
  )
}

function Pagination({ page, totalPages, pageSize, total, onPageChange, onPageSizeChange }: {
  page: number; totalPages: number; pageSize: number; total: number
  onPageChange: (p: number) => void; onPageSizeChange: (s: number) => void
}) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  return (
    <div className="audit-pagination">
      <div className="audit-pagination-left">
        <select className="select-field" value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
          {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span>items per page</span>
        <span style={{ marginLeft: 8, color: 'var(--text-muted)' }}>|</span>
        <span style={{ marginLeft: 8 }}>{total === 0 ? '0 items' : `${start}-${end} of ${total} items`}</span>
      </div>
      <div className="audit-pagination-right">
        <div className="flex items-center">
          <button className="audit-page-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous">
            <Icon name="chevron-left" size="sm" />
          </button>
          <select className="audit-page-select" value={page} onChange={e => onPageChange(Number(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => <option key={i + 1} value={i + 1}>Page {i + 1}</option>)}
          </select>
          <button className="audit-page-btn" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next">
            <Icon name="chevron-right" size="sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="users-empty-state">
      <div className="users-empty-icon">
        <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 6V4.75H8.75V11.25H10V10H14V14H10V12.75H8C7.59 12.75 7.25 12.41 7.25 12V8.75H6.25L4 11L1 8L4 5L6.25 7.25H7.25V4C7.25 3.59 7.59 3.25 8 3.25H10V2H14V6H10Z" />
        </svg>
      </div>
      <p className="users-empty-title">{title}</p>
      <p className="users-empty-desc">{description}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type DetailJob = (ActiveJob | PastJob) & { source: 'active' | 'past' }

export function JobsPage() {
  const [activeJobs, setActiveJobs] = useState<ActiveJob[]>(INITIAL_DATA.active)
  const [upcomingJobs, setUpcomingJobs] = useState<UpcomingJob[]>(INITIAL_DATA.upcoming)
  const [pastJobs, setPastJobs] = useState<PastJob[]>(INITIAL_DATA.past)

  // Search state
  const [activeSearch, setActiveSearch] = useState('')
  const [upcomingSearch, setUpcomingSearch] = useState('')
  const [pastSearch, setPastSearch] = useState('')

  // Pagination
  const [pastPage, setPastPage] = useState(1)
  const [pastPageSize, setPastPageSize] = useState(10)

  // Detail view
  const [detailJob, setDetailJob] = useState<DetailJob | null>(null)
  const [pfSearch, setPfSearch] = useState('')
  const [pfPage, setPfPage] = useState(1)
  const [pfPageSize, setPfPageSize] = useState(10)

  // New Job panel
  const [newJobOpen, setNewJobOpen] = useState(false)
  const [jobForm, setJobForm] = useState({ name: '', workflow: 'Default Workflow', partition: 'All Partitions', storageUnit: STORAGE_UNITS[0], priority: 'Medium', scanType: 'scan-now' as 'scan-now' | 'schedule-scan', frequency: 'Once' })

  // Cancel modal
  const [cancelOpen, setCancelOpen] = useState(false)

  // Job Details panel
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false)

  const toasterRef = useRef<ToasterHandle | null>(null)

  // ---- Filtering ----

  const filteredActive = useMemo(() => {
    if (!activeSearch) return activeJobs
    const q = activeSearch.toLowerCase()
    return activeJobs.filter(j => j.name.toLowerCase().includes(q) || j.type.toLowerCase().includes(q) || j.storageUnit.toLowerCase().includes(q))
  }, [activeJobs, activeSearch])

  const filteredUpcoming = useMemo(() => {
    if (!upcomingSearch) return upcomingJobs
    const q = upcomingSearch.toLowerCase()
    return upcomingJobs.filter(j => j.name.toLowerCase().includes(q) || j.frequency.toLowerCase().includes(q) || j.storageUnit.toLowerCase().includes(q))
  }, [upcomingJobs, upcomingSearch])

  const filteredPast = useMemo(() => {
    if (!pastSearch) return pastJobs
    const q = pastSearch.toLowerCase()
    return pastJobs.filter(j => j.name.toLowerCase().includes(q) || j.type.toLowerCase().includes(q) || j.status.toLowerCase().includes(q) || j.storageUnit.toLowerCase().includes(q))
  }, [pastJobs, pastSearch])

  const pastTotalPages = Math.max(1, Math.ceil(filteredPast.length / pastPageSize))
  const pagedPast = filteredPast.slice((pastPage - 1) * pastPageSize, pastPage * pastPageSize)

  // Processed files
  const filteredPf = useMemo(() => {
    if (!pfSearch) return PROCESSED_FILES
    const q = pfSearch.toLowerCase()
    return PROCESSED_FILES.filter(f => f.name.toLowerCase().includes(q) || f.fileType.toLowerCase().includes(q) || f.verdict.toLowerCase().includes(q))
  }, [pfSearch])
  const pfTotalPages = Math.max(1, Math.ceil(filteredPf.length / pfPageSize))
  const pagedPf = filteredPf.slice((pfPage - 1) * pfPageSize, pfPage * pfPageSize)

  // ---- Actions ----

  function openDetail(job: ActiveJob | PastJob, source: 'active' | 'past') {
    setDetailJob({ ...job, source })
    setPfSearch('')
    setPfPage(1)
  }

  function handleCreateJob() {
    if (!jobForm.name.trim()) { toasterRef.current?.show('error', 'Scan Name is required'); return }
    if (jobForm.scanType === 'schedule-scan') {
      setUpcomingJobs(prev => [...prev, {
        id: Date.now(), name: jobForm.name, frequency: jobForm.frequency,
        storageUnit: jobForm.storageUnit, startsIn: '24h 0m',
        workflow: jobForm.workflow, partition: jobForm.partition, priority: jobForm.priority,
      }])
      toasterRef.current?.show('success', `Scheduled job created: ${jobForm.name}`)
    } else {
      setActiveJobs(prev => [...prev, {
        id: Date.now(), name: jobForm.name, type: 'Scheduled File Scan', status: 'Running',
        detections: 0, filesProcessed: 0, filesTotal: 1000, storageUnit: jobForm.storageUnit,
        elapsedTime: '00:00:00', startTime: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        progress: 0, workflow: jobForm.workflow, partition: jobForm.partition, priority: jobForm.priority,
      }])
      toasterRef.current?.show('success', `Job started: ${jobForm.name}`)
    }
    setNewJobOpen(false)
    setJobForm({ name: '', workflow: 'Default Workflow', partition: 'All Partitions', storageUnit: STORAGE_UNITS[0], priority: 'Medium', scanType: 'scan-now', frequency: 'Once' })
  }

  function handleCancelJob() {
    if (!detailJob || detailJob.source !== 'active') return
    setActiveJobs(prev => prev.filter(j => j.id !== detailJob.id))
    setPastJobs(prev => [{
      id: detailJob.id, name: detailJob.name, type: (detailJob as ActiveJob).type,
      status: 'Cancelled', detections: detailJob.detections,
      filesProcessed: (detailJob as ActiveJob).filesProcessed, filesTotal: (detailJob as ActiveJob).filesTotal,
      storageUnit: detailJob.storageUnit, duration: (detailJob as ActiveJob).elapsedTime,
      date: (detailJob as ActiveJob).startTime, workflow: detailJob.workflow,
      partition: detailJob.partition, priority: detailJob.priority,
    }, ...prev])
    setCancelOpen(false)
    setDetailJob(null)
    toasterRef.current?.show('success', 'Job cancelled')
  }

  // ---- Detail view ----
  if (detailJob) {
    const isActive = detailJob.source === 'active'
    const aj = detailJob as ActiveJob
    const pj = detailJob as unknown as PastJob
    const threats = detailJob.detections || 0
    const filesProcessed = isActive ? aj.filesProcessed : pj.filesProcessed
    const clean = filesProcessed - threats
    const statusTag = detailJob.status === 'Running' ? 'accent' : detailJob.status === 'Completed' ? 'success' : 'caution'

    return (
      <div className="page-view" id="jobDetailView">
        {/* Header */}
        <div className="page-header">
          <nav className="breadcrumb">
            <a className="breadcrumb-item" onClick={() => setDetailJob(null)} style={{ cursor: 'pointer' }}>Jobs</a>
          </nav>
          <div className="page-title-row">
            <h1 className="page-title">{detailJob.name}</h1>
            <div className="page-header-actions">
              <Button variant="outline" onClick={() => setDetailsPanelOpen(true)}>Job Details</Button>
              {isActive && <Button variant="outline" onClick={() => setCancelOpen(true)}>Cancel Job</Button>}
              {!isActive && pj.status === 'Completed' && <Button variant="primary">View Report</Button>}
            </div>
          </div>
        </div>

        {/* Status banner */}
        {!isActive && pj.status === 'Completed' && (
          <div className="job-completed-banner">
            <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.78 5.28l-4.25 4.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06L7 8.94l3.72-3.72a.75.75 0 111.06 1.06z" /></svg>
            Job completed successfully on {pj.date}
          </div>
        )}
        {!isActive && pj.status === 'Stopped' && (
          <div className="job-stopped-banner">
            <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg>
            Job was stopped on {pj.date}
          </div>
        )}

        {/* Job Info Grid */}
        <Card style={{ marginBottom: 12 }}>
          <div className="job-info-grid">
            <div className="job-info-item">
              <span className="job-info-label">Storage Unit</span>
              <span className="job-info-value">{detailJob.storageUnit}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Scan Type</span>
              <span className="job-info-value">{isActive ? aj.type : pj.type}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Status</span>
              <span className="job-info-value"><Tag variant={statusTag}>{detailJob.status}</Tag></span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Workflow</span>
              <span className="job-info-value">{detailJob.workflow}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Partition</span>
              <span className="job-info-value">{detailJob.partition}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Started</span>
              <span className="job-info-value">{isActive ? aj.startTime : pj.date}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Priority</span>
              <span className="job-info-value">{detailJob.priority}</span>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="job-summary-row">
          <div className="job-summary-stat">
            <span className="job-summary-stat-label">Files Processed</span>
            <span className="job-summary-stat-value">{filesProcessed.toLocaleString()}</span>
          </div>
          <div className="job-summary-stat">
            <span className="job-summary-stat-label">Threats Detected</span>
            <span className={cn('job-summary-stat-value', threats > 0 && 'alert')}>{threats}</span>
          </div>
          <div className="job-summary-stat">
            <span className="job-summary-stat-label">Clean Files</span>
            <span className="job-summary-stat-value success">{clean.toLocaleString()}</span>
          </div>
        </div>

        {/* Processed Files Table */}
        <Card>
          <CardHeader>
            <CardTitle
              title="Processed Files"
              count={String(PROCESSED_FILES.length)}
              actions={
                <div className="flex items-center gap-2">
                  <SearchBox value={pfSearch} onChange={v => { setPfSearch(v); setPfPage(1) }} placeholder="Search files" />
                  <FilterBtn />
                </div>
              }
            />
          </CardHeader>
          <div className="table-scroll">
            <table className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 900 }}>
              <thead>
                <tr>
                  <th style={{ width: '27%' }}>File Name <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '15%' }}>Verdict <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '12%' }}>Detections <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '12%' }}>File Type <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '18%' }}>Scan Date <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th className="col-action"></th>
                </tr>
              </thead>
              <tbody>
                {pagedPf.map((f, i) => {
                  const verdictClass = f.verdict === 'Detected' ? 'verdict-detected' : f.verdict === 'Suspicious' ? 'verdict-warn' : f.verdict === 'Benign' ? 'verdict-completed' : 'verdict-neutral'
                  return (
                    <tr key={i}>
                      <td>{f.name}</td>
                      <td><span className={`verdict ${verdictClass}`}><span className="verdict-dot"></span><span className="verdict-text">{f.verdict}</span></span></td>
                      <td><span className={cn('jobs-detections', f.detections === 0 && 'none')}>{f.detections > 0 ? f.detections : '—'}</span></td>
                      <td><span className="tag-keyword">{f.fileType}</span></td>
                      <td>{f.scanDate}</td>
                      <td className="col-action">
                        <div className="row-action-btn" onClick={e => {
                          const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                          if (menu) menu.classList.toggle('open')
                        }}>
                          <Icon name="action" size="sm" />
                          <div className="row-action-menu">
                            <button className="row-action-menu-item" onClick={ev => { ev.stopPropagation(); toasterRef.current?.show('info', 'Re-scan queued') }}>
                              <Icon name="refresh" size="sm" />Re-scan
                            </button>
                            <button className="row-action-menu-item danger" onClick={ev => { ev.stopPropagation(); toasterRef.current?.show('info', 'File deleted') }}>
                              <Icon name="close" size="sm" />Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredPf.length > pfPageSize && (
            <Pagination
              page={pfPage} totalPages={pfTotalPages} pageSize={pfPageSize} total={filteredPf.length}
              onPageChange={setPfPage} onPageSizeChange={s => { setPfPageSize(s); setPfPage(1) }}
            />
          )}
        </Card>

        {/* Cancel Job Modal */}
        <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel Job">
          <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 20 }}>
            Are you sure you want to cancel this job? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCancelOpen(false)}>No, Keep Running</Button>
            <Button variant="danger" onClick={handleCancelJob}>Yes, Cancel Job</Button>
          </div>
        </Modal>

        {/* Job Details Panel */}
        <SlidePanel open={detailsPanelOpen} onClose={() => setDetailsPanelOpen(false)} title="Job Details">
          <div className="flex flex-col gap-4">
            <FormRow label="Job Name"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{detailJob.name}</span></FormRow>
            <FormRow label="Job Type"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{isActive ? aj.type : pj.type}</span></FormRow>
            <FormRow label="Status"><Tag variant={statusTag}>{detailJob.status}</Tag></FormRow>
            <FormRow label="Storage Unit"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{detailJob.storageUnit}</span></FormRow>
            <FormRow label="Workflow"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{detailJob.workflow}</span></FormRow>
            <FormRow label="Partition"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{detailJob.partition}</span></FormRow>
            <FormRow label="Priority"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{detailJob.priority}</span></FormRow>
            <FormRow label="Started"><span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{isActive ? aj.startTime : pj.date}</span></FormRow>
          </div>
        </SlidePanel>

        <Toaster ref={toasterRef} />
      </div>
    )
  }

  // ---- List view ----
  return (
    <div className="page-view">
      <div className="page-title-row" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Jobs</h1>
        <Button variant="primary" onClick={() => setNewJobOpen(true)}>New Job</Button>
      </div>

      {/* Active Jobs */}
      <Card style={{ marginBottom: 12 }}>
        <CardHeader>
          <CardTitle
            title="Active Jobs"
            count={String(activeJobs.length)}
            actions={
              <div className="flex items-center gap-2">
                <SearchBox value={activeSearch} onChange={setActiveSearch} />
                <FilterBtn />
              </div>
            }
          />
        </CardHeader>
        {activeJobs.length === 0 ? (
          <EmptyState title="No Active Jobs" description="Active and running jobs will appear here." />
        ) : (
          <div className="table-scroll">
            <table className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 1100 }}>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Job Name <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '9%' }}>Status <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '12%' }}>Job Type <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '10%' }}>Detections <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '13%' }}>Files Processed <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '17%' }}>Storage Unit <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '10%' }}>Elapsed Time <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th style={{ width: '10%' }}>Start Time <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th className="col-action"></th>
                </tr>
              </thead>
              <tbody>
                {filteredActive.map((j, i) => {
                  const pct = Math.round((j.filesProcessed / j.filesTotal) * 100)
                  return (
                    <tr key={j.id} className="jobs-row-with-progress" style={{ cursor: 'pointer' }} onClick={() => openDetail(j, 'active')}>
                      <td>{j.name}</td>
                      <td><Tag variant="success">Running</Tag></td>
                      <td>{j.type}</td>
                      <td><span className={cn('jobs-detections', j.detections === 0 && 'none')}>{j.detections > 0 ? j.detections : '—'}</span></td>
                      <td>{j.filesProcessed.toLocaleString()} / {j.filesTotal.toLocaleString()}</td>
                      <td>{j.storageUnit}</td>
                      <td className="jobs-elapsed">{j.elapsedTime}</td>
                      <td>{j.startTime}<span className="jobs-progress-fill" style={{ width: `${pct}%` }}></span></td>
                      <td className="col-action" onClick={e => e.stopPropagation()}>
                        <div className="row-action-btn" onClick={e => {
                          const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                          if (menu) menu.classList.toggle('open')
                        }}>
                          <Icon name="action" size="sm" />
                          <div className="row-action-menu">
                            <button className="row-action-menu-item" onClick={() => toasterRef.current?.show('info', 'Pause job')}>Pause</button>
                            <button className="row-action-menu-item danger" onClick={() => toasterRef.current?.show('info', 'Cancel job')}>Cancel</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Upcoming Jobs */}
      <Card style={{ marginBottom: 12 }}>
        <CardHeader>
          <CardTitle
            title="Upcoming Jobs"
            count={String(upcomingJobs.length)}
            actions={
              <div className="flex items-center gap-2">
                <SearchBox value={upcomingSearch} onChange={setUpcomingSearch} />
                <FilterBtn />
              </div>
            }
          />
        </CardHeader>
        {upcomingJobs.length === 0 ? (
          <EmptyState title="No Upcoming Jobs" description="Scheduled jobs will appear here when configured." />
        ) : (
          <div className="table-scroll">
            <table className="data-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Job Name <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th>Frequency <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th>Storage Unit <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th>Starts In <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                  <th className="col-action"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUpcoming.map(j => (
                  <tr key={j.id}>
                    <td>{j.name}</td>
                    <td>{j.frequency}</td>
                    <td>{j.storageUnit}</td>
                    <td>{j.startsIn}</td>
                    <td className="col-action">
                      <div className="row-action-btn" onClick={e => {
                        const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                        if (menu) menu.classList.toggle('open')
                      }}>
                        <Icon name="action" size="sm" />
                        <div className="row-action-menu">
                          <button className="row-action-menu-item" onClick={() => toasterRef.current?.show('info', 'Edit job')}>Edit</button>
                          <button className="row-action-menu-item danger" onClick={() => toasterRef.current?.show('info', 'Delete job')}>Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Past Jobs */}
      <Card>
        <CardHeader>
          <CardTitle
            title="Past Jobs"
            count={String(pastJobs.length)}
            actions={
              <div className="flex items-center gap-2">
                <SearchBox value={pastSearch} onChange={v => { setPastSearch(v); setPastPage(1) }} />
                <FilterBtn />
              </div>
            }
          />
        </CardHeader>
        <div className="table-scroll">
          <table className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 1100 }}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Job Name <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '9%' }}>Status <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '12%' }}>Job Type <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '10%' }}>Detections <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '13%' }}>Files Processed <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '17%' }}>Storage Unit <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '10%' }}>Duration <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th style={{ width: '10%' }}>Date <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-action"></th>
              </tr>
            </thead>
            <tbody>
              {pagedPast.map(j => {
                const statusTag = j.status === 'Completed' ? 'success' : j.status === 'Stopped' ? 'caution' : 'neutral'
                return (
                  <tr key={j.id} style={{ cursor: 'pointer' }} onClick={() => openDetail(j, 'past')}>
                    <td>{j.name}</td>
                    <td><Tag variant={statusTag}>{j.status}</Tag></td>
                    <td>{j.type}</td>
                    <td><span className={cn('jobs-detections', j.detections === 0 && 'none')}>{j.detections > 0 ? j.detections : '—'}</span></td>
                    <td>{j.filesProcessed.toLocaleString()} / {j.filesTotal.toLocaleString()}</td>
                    <td>{j.storageUnit}</td>
                    <td className="jobs-elapsed">{j.duration}</td>
                    <td>{j.date}</td>
                    <td className="col-action" onClick={e => e.stopPropagation()}>
                      <div className="row-action-btn" onClick={e => {
                        const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                        if (menu) menu.classList.toggle('open')
                      }}>
                        <Icon name="action" size="sm" />
                        <div className="row-action-menu">
                          <button className="row-action-menu-item" onClick={() => toasterRef.current?.show('info', 'View report')}>View Report</button>
                          <button className="row-action-menu-item danger" onClick={() => toasterRef.current?.show('info', 'Delete job')}>Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredPast.length > pastPageSize && (
          <Pagination
            page={pastPage} totalPages={pastTotalPages} pageSize={pastPageSize} total={filteredPast.length}
            onPageChange={setPastPage} onPageSizeChange={s => { setPastPageSize(s); setPastPage(1) }}
          />
        )}
      </Card>

      {/* New Job Panel */}
      <SlidePanel open={newJobOpen} onClose={() => setNewJobOpen(false)} title="New Job">
        <div className="flex flex-col gap-4">
          <FormRow label="Scan Name *">
            <InputField value={jobForm.name} onChange={e => setJobForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter scan name" />
          </FormRow>
          <FormRow label="Scan Type">
            <SelectField value={jobForm.scanType} onChange={e => setJobForm(f => ({ ...f, scanType: e.target.value as 'scan-now' | 'schedule-scan' }))}>
              <option value="scan-now">Scan Now</option>
              <option value="schedule-scan">Schedule Scan</option>
            </SelectField>
          </FormRow>
          {jobForm.scanType === 'schedule-scan' && (
            <FormRow label="Frequency">
              <SelectField value={jobForm.frequency} onChange={e => setJobForm(f => ({ ...f, frequency: e.target.value }))}>
                <option value="Once">Once</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </SelectField>
            </FormRow>
          )}
          <FormRow label="Storage Unit">
            <SelectField value={jobForm.storageUnit} onChange={e => setJobForm(f => ({ ...f, storageUnit: e.target.value }))}>
              {STORAGE_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </SelectField>
          </FormRow>
          <FormRow label="Workflow">
            <SelectField value={jobForm.workflow} onChange={e => setJobForm(f => ({ ...f, workflow: e.target.value }))}>
              {WORKFLOWS.map(w => <option key={w} value={w}>{w}</option>)}
            </SelectField>
          </FormRow>
          <FormRow label="Partition">
            <SelectField value={jobForm.partition} onChange={e => setJobForm(f => ({ ...f, partition: e.target.value }))}>
              {PARTITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </SelectField>
          </FormRow>
          <FormRow label="Priority">
            <SelectField value={jobForm.priority} onChange={e => setJobForm(f => ({ ...f, priority: e.target.value }))}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </SelectField>
          </FormRow>
        </div>
        <div className="flex justify-end gap-2 mt-auto pt-5">
          <Button variant="outline" onClick={() => setNewJobOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateJob}>{jobForm.scanType === 'schedule-scan' ? 'Schedule' : 'Start Scan'}</Button>
        </div>
      </SlidePanel>

      <Toaster ref={toasterRef} />
    </div>
  )
}
