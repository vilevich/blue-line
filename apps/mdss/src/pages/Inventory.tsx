import { useState, useMemo, useRef, useCallback } from 'react'
import {
  cn,
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  DataTable,
  type DataTableColumn,
  Tabs,
  TabPanel,
  Button,
  Tag,
  SectionTitle,
  Pagination,
  Icon,
  InputField,
  Breadcrumb,
  type BreadcrumbItem,
  type TagVariant,
} from '@opswat/blue-line'

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVIDERS = [
  { name: 'Amazon S3', cls: 'aws', label: 'aws' },
  { name: 'SharePoint', cls: 'sharepoint', label: 'SP' },
  { name: 'Azure Blob', cls: 'azure', label: 'Az' },
  { name: 'Google Cloud', cls: 'gcloud', label: 'GC' },
  { name: 'Alibaba Cloud', cls: 'alibaba', label: 'Ali' },
  { name: 'Box', cls: 'box', label: 'Bx' },
]

const GROUP_NAMES = ['Default Group', 'Production', 'Development', 'Staging', 'QA', 'Compliance']

const STATUSES = [
  { s: 'Operational', tag: 'success' as const, w: 55 },
  { s: 'Issues Found', tag: 'alert' as const, w: 18 },
  { s: 'Pending', tag: 'warn' as const, w: 10 },
  { s: 'Error', tag: 'alert' as const, w: 7 },
  { s: 'Testing', tag: 'accent' as const, w: 10 },
]

const UNIT_NAMES = [
  'production-assets','staging-uploads','dev-test-bucket','backup-archive-01','media-content',
  'log-storage','customer-data','shared-documents','temp-processing','compliance-vault',
  'team-documents','hr-policies','finance-reports','marketing-assets','engineering-wiki',
  'legal-contracts','shared-workspace','executive-briefs','training-materials','data-lake-raw',
  'analytics-output','ml-models','ci-artifacts','container-registry','secrets-backup',
  'cdn-origin','email-archive','audit-logs','disaster-recovery','user-uploads',
  'vendor-exchange','api-cache','session-store','config-backups','release-binaries',
  'scan-quarantine','threat-samples','dlp-exports','soc-evidence','pentest-reports',
]

const JOB_TYPES = ['Scheduled', 'Real-Time', 'On-Demand']
const JOB_STATUSES = [
  { s: 'Completed', tag: 'success' as const },
  { s: 'In Progress', tag: 'accent' as const },
  { s: 'Failed', tag: 'alert' as const },
  { s: 'Queued', tag: 'warn' as const },
]
const JOB_NAMES = [
  'Scheduled File Scan','Real-Time Scan','Weekly Deep Scan','On-Demand Scan',
  'Compliance Check','Backup Verification','New Files Scan','Monthly Full Scan',
  'Quarantine Review','Malware Sweep','Permission Audit','DLP Content Scan',
  'Incremental Scan','Daily Quick Scan','Threat Hunt','Archive Validation',
]

// ─── Integration Grid Data ───────────────────────────────────────────────────

interface IntegrationCard {
  name: string
  type: string
  color: string
  label: string
  fontSize?: string
  letterSpacing?: string
}

const RECOMMENDED_INTEGRATIONS: IntegrationCard[] = [
  { name: 'Amazon EFS', type: 'EC2 File Systems', color: '#232f3e', label: 'aws', fontSize: '16px', letterSpacing: '-0.5px' },
  { name: 'SharePoint', type: 'On-Premises', color: '#038387', label: 'SP', fontSize: '14px' },
]

const ADDITIONAL_INTEGRATIONS: IntegrationCard[] = [
  { name: 'Alibaba Cloud', type: 'Object Storage', color: '#ff6a00', label: 'Ali', fontSize: '12px' },
  { name: 'Amazon S3', type: 'Object Storage', color: '#232f3e', label: 'aws', fontSize: '14px', letterSpacing: '-0.5px' },
  { name: 'Azure Blob', type: 'Object Storage', color: '#0078d4', label: 'AB' },
  { name: 'Azure Files', type: 'Network-Attached Storage', color: '#0078d4', label: 'AF' },
  { name: 'Box', type: 'Object Storage', color: '#0061d5', label: 'BOX', fontSize: '10px' },
  { name: 'Cubbit', type: 'Object Storage', color: '#00b4d8', label: 'CB', fontSize: '10px' },
  { name: 'Dell Isilon', type: 'Network-Attached Storage', color: '#007db8', label: 'EMC', fontSize: '9px' },
  { name: 'FTP', type: 'Network-Attached Storage', color: '#6b7a90', label: 'FTP', fontSize: '10px' },
  { name: 'Google Cloud', type: 'Object Storage', color: '#4285f4', label: 'GCS', fontSize: '10px' },
  { name: 'NetApp', type: 'Network-Attached Storage', color: '#0067c5', label: 'NA', fontSize: '10px' },
  { name: 'NFS', type: 'Network-Attached Storage', color: '#4a5568', label: 'NFS', fontSize: '10px' },
  { name: 'NFS with SISL', type: 'Network-Attached Storage', color: '#4a5568', label: 'SISL', fontSize: '8px' },
  { name: 'One Drive', type: 'Object Storage', color: '#0078d4', label: 'OD', fontSize: '10px' },
  { name: 'OPSWAT MFT', type: 'Object Storage', color: '#1d6bfc', label: 'MFT', fontSize: '9px' },
  { name: 'Oracle', type: 'Object Storage', color: '#c74634', label: 'OCI', fontSize: '10px' },
  { name: 'S3 Compatible', type: 'Object Storage', color: '#e25d33', label: 'S3', fontSize: '10px' },
  { name: 'SFTP', type: 'Network-Attached Storage', color: '#4a5568', label: 'SFTP', fontSize: '9px' },
  { name: 'SharePoint', type: 'Object Storage', color: '#038387', label: 'SP', fontSize: '12px' },
  { name: 'SharePoint On-Prem', type: 'Object Storage', color: '#038387', label: 'SP+', fontSize: '8px' },
  { name: 'SMB Compatible', type: 'Network-Attached Storage', color: '#4a5568', label: 'SMB', fontSize: '9px' },
]

// ─── Types ────────────────────────────────────────────────────────────────────

// TagVariant imported from @opswat/blue-line

interface UnitData {
  name: string
  status: string
  statusTag: TagVariant
  clientId: string
  group: string
  groups: number // extra groups count
  files: number
  lastScanned: string
}

interface JobData {
  name: string
  status: string
  statusTag: TagVariant
  type: string
  files: number
  detections: number
  date: string
  storageUnit: string
}

interface DonutData {
  verdicts: { clean: number; suspicious: number; malicious: number }
  fileTypes: { documents: number; images: number; archives: number; other: number }
  scanStatus: { scanned: number; pending: number; failed: number }
}

interface AccountData {
  name: string
  provider: string
  providerClass: string
  providerLabel: string
  status: string
  statusTag: TagVariant
  totalUnits: number
  operational: number
  issues: number
  pending: number
  group: string
  units: UnitData[]
  jobs: JobData[]
  donutData: DonutData
}

interface GroupData {
  name: string
  status: string
  statusTag: TagVariant
  storageUnits: number
  providers: string[]
  extraProviders: number
  totalUnits: number
  operational: number
  errors: number
  testing: number
  units: GroupUnitData[]
  jobs: JobData[]
}

interface GroupUnitData {
  name: string
  provider: string
  providerName: string
  providerLabel: string
  status: string
  statusTag: TagVariant
  account: string
  groups: string
  extraGroups: number
  clientId: string
  lastJob: string
}

interface FlatUnit {
  name: string
  provider: string
  providerClass: string
  providerLabel: string
  status: string
  statusTag: TagVariant
  account: string
  group: string
  groups: number
  clientId: string
  lastScanned: string
}

// ─── Data Generation ──────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)]
}
function pickWeighted<T extends { w: number }>(arr: T[]): T {
  const total = arr.reduce((s, i) => s + i.w, 0)
  let r = Math.random() * total, acc = 0
  for (const item of arr) {
    acc += item.w
    if (r < acc) return item
  }
  return arr[arr.length - 1]
}
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}
function fmtDate(d: Date) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m} ${ampm}`
}
function randomDate(daysBack: number) {
  const d = new Date()
  d.setDate(d.getDate() - rand(0, daysBack))
  d.setHours(rand(0, 23), rand(0, 59))
  return d
}

function generateAccountsData(): AccountData[] {
  const acctDefs = [
    { name: 'AWS Production', prov: 0, unitCount: rand(8, 14) },
    { name: 'SharePoint Corporate', prov: 1, unitCount: rand(6, 10) },
    { name: 'Azure Data Platform', prov: 2, unitCount: rand(5, 9) },
    { name: 'GCP Analytics', prov: 3, unitCount: rand(3, 7) },
    { name: 'Alibaba Cloud OSS', prov: 4, unitCount: rand(2, 5) },
    { name: 'Box Enterprise', prov: 5, unitCount: rand(2, 4) },
  ]
  const usedNames: Record<string, boolean> = {}
  return acctDefs.map(acctDef => {
    const prov = PROVIDERS[acctDef.prov]
    const units: UnitData[] = []
    let opCount = 0, issCount = 0, pendCount = 0
    for (let i = 0; i < acctDef.unitCount; i++) {
      let uName: string
      do { uName = pick(UNIT_NAMES) } while (usedNames[uName])
      usedNames[uName] = true
      const st = pickWeighted(STATUSES)
      if (st.s === 'Operational') opCount++
      else if (st.s === 'Issues Found' || st.s === 'Error') issCount++
      else pendCount++
      const grp = pick(GROUP_NAMES)
      const extraGroups = Math.random() < 0.3 ? rand(1, 3) : 0
      const fileCount = st.s === 'Pending' ? 0 : (st.s === 'Error' ? rand(0, 50) : rand(0, 120000))
      const lastDate = st.s === 'Pending' ? 'Never' : fmtDate(randomDate(st.s === 'Error' ? 30 : 14))
      units.push({
        name: uName,
        status: st.s,
        statusTag: st.tag,
        clientId: uuid(),
        group: grp,
        groups: extraGroups,
        files: fileCount,
        lastScanned: lastDate,
      })
    }
    let acctStatus = 'Operational', acctTag: TagVariant = 'success'
    if (issCount > 0) { acctStatus = 'Issues Found'; acctTag = 'alert' }
    if (units.some(u => u.status === 'Error')) { acctStatus = 'Error'; acctTag = 'alert' }

    const jobs: JobData[] = []
    const jobCount = rand(3, 12)
    for (let j = 0; j < jobCount; j++) {
      const jst = j === 0 && Math.random() < 0.4 ? JOB_STATUSES[1] : pick(JOB_STATUSES)
      const jFiles = jst.s === 'Failed' ? 0 : rand(50, 50000)
      const jDet = jst.s === 'Completed' ? rand(0, Math.ceil(jFiles * 0.03)) : 0
      const targetUnit = units.length ? pick(units).name : uName!
      jobs.push({
        name: pick(JOB_NAMES),
        status: jst.s,
        statusTag: jst.tag,
        type: pick(JOB_TYPES),
        files: jFiles,
        detections: jDet,
        date: fmtDate(randomDate(60)),
        storageUnit: targetUnit,
      })
    }
    jobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const totalFiles = units.reduce((s, u) => s + u.files, 0)
    const cleanPct = totalFiles > 0 ? rand(55, 95) : 0
    const suspPct = totalFiles > 0 ? rand(3, Math.max(4, 100 - cleanPct - 5)) : 0
    const malPct = Math.max(0, 100 - cleanPct - suspPct)

    return {
      name: acctDef.name,
      provider: prov.name,
      providerClass: prov.cls,
      providerLabel: prov.label,
      status: acctStatus,
      statusTag: acctTag,
      totalUnits: units.length,
      operational: opCount,
      issues: issCount,
      pending: pendCount,
      group: pick(GROUP_NAMES),
      units,
      jobs,
      donutData: {
        verdicts: { clean: cleanPct, suspicious: suspPct, malicious: malPct },
        fileTypes: { documents: rand(20, 55), images: rand(10, 30), archives: rand(10, 25), other: rand(5, 15) },
        scanStatus: { scanned: rand(60, 95), pending: rand(3, 20), failed: rand(1, 10) },
      },
    }
  })
}

function deriveGroupsData(accounts: AccountData[]): GroupData[] {
  const groupMap: Record<string, {
    name: string
    provs: Record<string, boolean>
    units: GroupUnitData[]
    opCount: number
    errCount: number
    testCount: number
  }> = {}

  accounts.forEach(acct => {
    acct.units.forEach(u => {
      const gName = u.group
      if (!groupMap[gName]) {
        groupMap[gName] = { name: gName, provs: {}, units: [], opCount: 0, errCount: 0, testCount: 0 }
      }
      const g = groupMap[gName]
      g.units.push({
        name: u.name,
        provider: acct.providerClass,
        providerName: acct.provider,
        providerLabel: acct.providerLabel,
        status: u.status,
        statusTag: u.statusTag,
        account: acct.name,
        groups: gName,
        extraGroups: u.groups,
        clientId: u.clientId,
        lastJob: u.lastScanned,
      })
      g.provs[acct.providerClass] = true
      if (u.status === 'Operational') g.opCount++
      else if (u.status === 'Error' || u.status === 'Issues Found') g.errCount++
      else if (u.status === 'Testing') g.testCount++
    })
  })

  return Object.keys(groupMap).map(key => {
    const g = groupMap[key]
    let status = 'Operational', statusTag: TagVariant = 'success'
    if (g.errCount > 0) { status = 'Issues Found'; statusTag = 'alert' }
    const provKeys = Object.keys(g.provs)
    const jobs: JobData[] = []
    g.units.slice(0, Math.min(g.units.length, 5)).forEach(u => {
      const jst = pick(JOB_STATUSES)
      jobs.push({
        name: pick(JOB_NAMES),
        status: jst.s,
        statusTag: jst.tag,
        type: pick(JOB_TYPES),
        files: rand(100, 15000),
        detections: rand(0, 12),
        date: fmtDate(randomDate(30)),
        storageUnit: u.name,
      })
    })
    return {
      name: key,
      status,
      statusTag,
      storageUnits: g.units.length,
      providers: provKeys,
      extraProviders: Math.max(0, provKeys.length - 3),
      totalUnits: g.units.length,
      operational: g.opCount,
      errors: g.errCount,
      testing: g.testCount,
      units: g.units,
      jobs,
    }
  })
}

function deriveFlatUnits(accounts: AccountData[]): FlatUnit[] {
  const flat: FlatUnit[] = []
  accounts.forEach(acct => {
    acct.units.forEach(u => {
      flat.push({
        name: u.name,
        provider: acct.provider,
        providerClass: acct.providerClass,
        providerLabel: acct.providerLabel,
        status: u.status,
        statusTag: u.statusTag,
        account: acct.name,
        group: u.group,
        groups: u.groups,
        clientId: u.clientId,
        lastScanned: u.lastScanned,
      })
    })
  })
  return flat
}

// ─── Provider Icon Component ──────────────────────────────────────────────────

function ProviderIcon({ cls, label }: { cls: string; label: string }) {
  return (
    <span className={`inv-provider-icon ${cls}`}>
      <span style={{
        fontSize: cls === 'aws' ? '8px' : '8px',
        letterSpacing: cls === 'aws' ? '-0.5px' : undefined,
      }}>
        {label}
      </span>
    </span>
  )
}

// ─── Integration Card Component ───────────────────────────────────────────────

function IntegrationCardItem({ card }: { card: IntegrationCard }) {
  return (
    <div className="grid-card">
      <div
        className="grid-card-icon"
        style={{ backgroundColor: card.color }}
      >
        <span style={{
          fontSize: card.fontSize || '12px',
          fontWeight: 700,
          letterSpacing: card.letterSpacing,
        }}>
          {card.label}
        </span>
      </div>
      <div className="grid-card-name">{card.name}</div>
      <div className="grid-card-type">{card.type}</div>
    </div>
  )
}

// ─── Donut Chart Component ────────────────────────────────────────────────────

function DonutChart({ title, segments }: {
  title: string
  segments: { pct: number; color: string; label: string }[]
}) {
  const r = 15.9155
  const total = segments.reduce((s, seg) => s + seg.pct, 0)
  let offset = 0

  return (
    <div className="acct-donut-item">
      <svg className="acct-donut-svg" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} fill="none" stroke="var(--border-card)" strokeWidth="3" />
        {total > 0 && segments.map((seg, i) => {
          if (seg.pct <= 0) return null
          const dashArray = `${seg.pct}, ${100 - seg.pct}`
          const dashOffset = `-${offset}`
          offset += seg.pct
          return (
            <circle
              key={i}
              cx="18" cy="18" r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="3"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          )
        })}
        {total > 0 ? (
          <text x="18" y="18" textAnchor="middle" dominantBaseline="central"
            fill="var(--text-strong)" fontSize="8" fontWeight="500">
            {total}%
          </text>
        ) : (
          <text x="18" y="18" textAnchor="middle" dominantBaseline="central"
            fill="var(--text-muted)" fontSize="6">
            N/A
          </text>
        )}
      </svg>
      <div className="acct-donut-labels">
        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-strong)', marginBottom: '4px' }}>
          {title}
        </div>
        {segments.map((seg, i) => (
          <div key={i} className="acct-donut-label-row">
            <span className="acct-donut-dot" style={{ background: seg.color }} />
            {seg.label}
            <span>{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Client ID Cell ───────────────────────────────────────────────────────────

function ClientIdCell({ clientId }: { clientId: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(clientId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <div className="acct-client-id">
      <span className="acct-client-id-text" title={clientId}>{clientId}</span>
      <svg
        className="acct-copy-btn"
        onClick={handleCopy}
        viewBox="0 0 16 16"
        fill="currentColor"
        style={copied ? { color: 'var(--color-green-800)' } : undefined}
      >
        <path d="M13 2H6C5.44772 2 5 2.44772 5 3V10C5 10.5523 5.44772 11 6 11H13C13.5523 11 14 10.5523 14 10V3C14 2.44772 13.5523 2 13 2Z" />
        <path d="M11 12.5V14H3C2.45 14 2 13.55 2 13V5H3.5V12.5H11Z" />
      </svg>
    </div>
  )
}

// ─── Row Action Menu ──────────────────────────────────────────────────────────

function RowActionMenu({ items }: {
  items: { label: string; danger?: boolean; onClick?: () => void }[]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <Button variant="icon" aria-label="Row actions" onClick={toggle}>
        <Icon name="action" size="md" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <div className="row-action-menu open">
            {items.map((item, i) => (
              <div
                key={i}
                className={cn('row-action-menu-item', item.danger && 'danger')}
                onClick={e => { e.stopPropagation(); setOpen(false); item.onClick?.() }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Actions Dropdown ─────────────────────────────────────────────────────────

function ActionsDropdown({ items }: {
  items: { label: string; danger?: boolean; onClick?: () => void }[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="acct-actions-wrap">
      <Button variant="outline" onClick={e => { e.stopPropagation(); setOpen(!open) }}>
        Actions
        <Icon name="chevron-down" size="md" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />
          <div className={cn('acct-actions-menu', open && 'open')}>
            {items.map((item, i) => (
              <div
                key={i}
                className={cn('row-action-menu-item', item.danger && 'danger')}
                onClick={() => { setOpen(false); item.onClick?.() }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Overview Stats Row ───────────────────────────────────────────────────────

function OverviewStatsRow({ stats }: {
  stats: { label: string; value: number; color: string }[]
}) {
  return (
    <div className="acct-overview-row">
      {stats.map((stat, i) => (
        <div key={i} className={`acct-overview-stat ${stat.color}`}>
          <span className="acct-overview-stat-label">{stat.label}</span>
          <span className="acct-overview-stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACCOUNTS TAB
// ═══════════════════════════════════════════════════════════════════════════════

function AccountsTab({ accounts, onOpenAccount }: {
  accounts: AccountData[]
  onOpenAccount: (index: number) => void
}) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return accounts
    const s = search.toLowerCase()
    return accounts.filter(a =>
      a.name.toLowerCase().includes(s) || a.provider.toLowerCase().includes(s)
    )
  }, [accounts, search])

  const accountColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    { key: 'name', header: 'Name', width: '220px' },
    {
      key: 'status', header: 'Status', width: '130px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    {
      key: 'provider', header: 'Provider', width: '180px',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <ProviderIcon cls={row._providerClass as string} label={row._providerLabel as string} />
          {row.provider as string}
        </div>
      ),
    },
    { key: 'storageUnits', header: 'Storage Units', width: '140px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: (row) => (
        <RowActionMenu items={[
          { label: 'Create Job' },
          { label: 'Account Settings' },
          { label: 'Delete Account', danger: true },
        ]} />
      ),
    },
  ], [])

  const tableData = useMemo(() =>
    filtered.map((a, i) => {
      // Determine worst status from units
      const statusMap: Record<string, number> = { Error: 4, 'Issues Found': 3, Pending: 2, Testing: 1, Operational: 0 }
      let worstStatus = 'Operational', worstTag: TagVariant = 'success', worstScore = 0
      a.units.forEach(u => {
        const score = statusMap[u.status] || 0
        if (score > worstScore) { worstScore = score; worstStatus = u.status; worstTag = u.statusTag }
      })
      if (a.units.length === 0) { worstStatus = 'No Units'; worstTag = 'neutral' }

      return {
        _index: i,
        name: a.name,
        status: worstStatus,
        _statusTag: worstTag,
        provider: a.provider,
        _providerClass: a.providerClass,
        _providerLabel: a.providerLabel,
        storageUnits: a.units.length,
      } as Record<string, unknown>
    }),
  [filtered])

  return (
    <div className="flex flex-col gap-5">
      {/* Accounts table */}
      <Card>
        <CardHeader>
          <CardTitle title="Accounts" count={String(filtered.length)} />
          <div className="flex items-center gap-2">
            <InputField
              type="search"
              placeholder="Search for Files or Hash"
              value={search}
              onChange={e => setSearch(e.target.value)}
              clearable
              onClear={() => setSearch('')}
              className="w-60"
            />
            <Button variant="menu" icon="filter">Provider <Icon name="chevron-down" size="md" /></Button>
            <Button variant="menu" icon="filter">Status <Icon name="chevron-down" size="md" /></Button>
          </div>
        </CardHeader>
        <DataTable
          columns={accountColumns}
          data={tableData}
          rowKey={(row) => row._index as number}
          onRowClick={(row) => {
            const origIdx = accounts.indexOf(filtered[row._index as number])
            onOpenAccount(origIdx >= 0 ? origIdx : row._index as number)
          }}
        />
      </Card>

      {/* Recommended Integrations */}
      <div>
        <SectionTitle
          title="Recommended integrations"
          description="Enhance your storage capabilities and security with recommended integrations."
        />
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {RECOMMENDED_INTEGRATIONS.map(c => (
            <IntegrationCardItem key={c.name} card={c} />
          ))}
        </div>
      </div>

      {/* Additional Integrations */}
      <div>
        <SectionTitle
          title="Additional Integrations"
          description="Select the type of storage you would like to secure."
        />
        <div className="cards-grid">
          {ADDITIONAL_INTEGRATIONS.map(c => (
            <IntegrationCardItem key={c.name} card={c} />
          ))}
        </div>
      </div>

      {/* Product Promos */}
      <div>
        <SectionTitle
          title="Recommended Integrations"
          description="Add connectors to your MetaDefender Core engine for expanded, centralized security."
        />
        <div className="flex gap-8 flex-wrap">
          <div className="inv-promo" style={{ flex: 1, minWidth: '280px' }}>
            <div className="inv-promo-img">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M16 4L6 9v7c0 6.6 4.4 12.7 10 14 5.6-1.3 10-7.4 10-14V9l-10-5z" stroke="#fff" strokeWidth="2" />
                <path d="M12 16l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="inv-promo-content">
              <div className="inv-promo-title">MetaDefender Software Supply Chain</div>
              <div className="inv-promo-desc">Secure Amazon ECR and prevent supply chain attacks.</div>
              <a className="inv-promo-link" href="#">Learn More</a>
            </div>
          </div>
          <div className="inv-promo" style={{ flex: 1, minWidth: '280px' }}>
            <div className="inv-promo-img">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M4 10h8v12H4zM14 6h8v16h-8zM24 14h4v8h-4z" stroke="#fff" strokeWidth="1.5" />
                <path d="M12 16h2M22 18h2" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="inv-promo-content">
              <div className="inv-promo-title">MetaDefender Managed File Transfer</div>
              <div className="inv-promo-desc">Secure file transfers between productivity tools and internal and external users.</div>
              <a className="inv-promo-link" href="#">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACCOUNT DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════════════════

function AccountDetailView({ account, onBack }: {
  account: AccountData
  onBack: () => void
}) {
  const [detailTab, setDetailTab] = useState('units')
  const [unitsSearch, setUnitsSearch] = useState('')
  const [unitsPage, setUnitsPage] = useState(1)
  const [unitsPageSize, setUnitsPageSize] = useState(10)
  const [jobsSearch, setJobsSearch] = useState('')
  const [jobsPage, setJobsPage] = useState(1)
  const [jobsPageSize, setJobsPageSize] = useState(10)

  const DETAIL_TABS = [
    { id: 'units', label: 'Units' },
    { id: 'jobs', label: 'Jobs' },
  ]

  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Inventory', onClick: onBack },
    { label: 'Accounts', onClick: onBack },
  ]

  // Units columns
  const unitColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    {
      key: 'name', header: 'Storage Unit', width: '200px',
      render: (row) => (
        <div className="flex items-center gap-2">
          <ProviderIcon cls={account.providerClass} label={account.providerLabel} />
          {row.name as string}
        </div>
      ),
    },
    {
      key: 'status', header: 'Status', width: '130px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    {
      key: 'group', header: 'Group', width: '160px',
      render: (row) => (
        <span>
          <span className="tag tag-keyword">{row.group as string}</span>
          {(row._groups as number) > 0 && (
            <span className="count-more"> +{row._groups as number}</span>
          )}
        </span>
      ),
    },
    {
      key: 'clientId', header: 'Storage ClientID', width: '220px',
      render: (row) => <ClientIdCell clientId={row.clientId as string} />,
    },
    { key: 'lastScanned', header: 'Last Scanned', width: '180px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[
          { label: 'Create Job' },
          { label: 'Edit Unit' },
          { label: 'Delete Unit', danger: true },
        ]} />
      ),
    },
  ], [account.providerClass, account.providerLabel])

  const filteredUnits = useMemo(() => {
    if (!unitsSearch) return account.units
    const s = unitsSearch.toLowerCase()
    return account.units.filter(u =>
      u.name.toLowerCase().includes(s) || u.clientId.toLowerCase().includes(s)
    )
  }, [account.units, unitsSearch])

  const unitsTotalPages = Math.max(1, Math.ceil(filteredUnits.length / unitsPageSize))
  const unitsSlice = filteredUnits.slice((unitsPage - 1) * unitsPageSize, unitsPage * unitsPageSize)

  const unitsTableData = useMemo(() =>
    unitsSlice.map((u, i) => ({
      _index: i,
      name: u.name,
      status: u.status,
      _statusTag: u.statusTag,
      group: u.group,
      _groups: u.groups,
      clientId: u.clientId,
      lastScanned: u.lastScanned,
    } as Record<string, unknown>)),
  [unitsSlice])

  // Jobs columns
  const jobColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    { key: 'name', header: 'Job Name', width: '180px' },
    {
      key: 'status', header: 'Status', width: '120px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    {
      key: 'files', header: 'Files Processed', width: '140px',
      render: (row) => <span>{(row.files as number).toLocaleString()}</span>,
    },
    {
      key: 'detections', header: 'Detections', width: '120px',
      render: (row) => {
        const det = row.detections as number
        const color = det > 0 ? 'var(--color-red-600)' : 'var(--color-green-600)'
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />
            {det}
          </span>
        )
      },
    },
    { key: 'storageUnit', header: 'Storage Unit', width: '160px' },
    { key: 'date', header: 'Date & Time', width: '200px' },
    { key: 'type', header: 'Job Type', width: '120px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[
          { label: 'View Details' },
          { label: 'Re-run' },
        ]} />
      ),
    },
  ], [])

  const filteredJobs = useMemo(() => {
    if (!jobsSearch) return account.jobs
    const s = jobsSearch.toLowerCase()
    return account.jobs.filter(j => j.name.toLowerCase().includes(s))
  }, [account.jobs, jobsSearch])

  const jobsTotalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPageSize))
  const jobsSlice = filteredJobs.slice((jobsPage - 1) * jobsPageSize, jobsPage * jobsPageSize)

  const jobsTableData = useMemo(() =>
    jobsSlice.map((j, i) => ({
      _index: i,
      name: j.name,
      status: j.status,
      _statusTag: j.statusTag,
      files: j.files,
      detections: j.detections,
      storageUnit: j.storageUnit,
      date: j.date,
      type: j.type,
    } as Record<string, unknown>)),
  [jobsSlice])

  const d = account.donutData

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb={<Breadcrumb items={breadcrumb} />}
        title={account.name}
        actions={
          <>
            <Button variant="icon" aria-label="Refresh">
              <Icon name="refresh" size="md" />
            </Button>
            <ActionsDropdown items={[
              { label: 'Create Job' },
              { label: 'Account Settings' },
              { label: 'Delete Account', danger: true },
            ]} />
            <Button variant="primary" icon="add">Add Units</Button>
          </>
        }
      />

      <Tabs tabs={DETAIL_TABS} activeTab={detailTab} onTabChange={setDetailTab}>
        <TabPanel id="units" activeTab={detailTab}>
          <div className="flex flex-col gap-4">
            <OverviewStatsRow stats={[
              { label: 'Total Units', value: account.totalUnits, color: 'blue' },
              { label: 'Operational', value: account.operational, color: 'green' },
              { label: 'Issues Found', value: account.issues, color: 'red' },
              { label: 'Pending', value: account.pending, color: 'yellow' },
            ]} />

            {/* Group Settings Link */}
            <Card>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[var(--text-subtle)]">Group:</span>
                  <span className="text-[14px] font-medium text-[var(--text-strong)]">{account.group}</span>
                </div>
                <a className="acct-settings-link">Group Settings</a>
              </div>
            </Card>

            {/* Storage Units Table */}
            <Card>
              <CardHeader>
                <CardTitle title="Storage Units" count={String(filteredUnits.length)} />
                <div className="flex items-center gap-2">
                  <InputField
                    type="search"
                    placeholder="Search for Files or Hash"
                    value={unitsSearch}
                    onChange={e => { setUnitsSearch(e.target.value); setUnitsPage(1) }}
                    clearable
                    onClear={() => { setUnitsSearch(''); setUnitsPage(1) }}
                    className="w-60"
                  />
                  <Button variant="menu" icon="filter">Status <Icon name="chevron-down" size="md" /></Button>
                  <Button variant="menu" icon="filter">Group <Icon name="chevron-down" size="md" /></Button>
                </div>
              </CardHeader>
              <DataTable
                columns={unitColumns}
                data={unitsTableData}
                rowKey={(_, i) => i}
              />
              {filteredUnits.length > 10 && (
                <Pagination
                  page={unitsPage}
                  totalPages={unitsTotalPages}
                  pageSize={unitsPageSize}
                  pageSizeOptions={[10, 25, 50]}
                  onPageChange={setUnitsPage}
                  onPageSizeChange={s => { setUnitsPageSize(s); setUnitsPage(1) }}
                />
              )}
            </Card>
          </div>
        </TabPanel>

        <TabPanel id="jobs" activeTab={detailTab}>
          <div className="flex flex-col gap-4">
            {/* Latest Job Summary */}
            <Card>
              <div className="p-5">
                <div className="text-[14px] font-medium text-[var(--text-strong)] mb-1">Latest Job Summary</div>
                {account.jobs.length > 0 ? (
                  <>
                    <div className="text-[12px] text-[var(--text-subtle)]">
                      {account.jobs[0].type} · {account.jobs[0].date}
                    </div>
                    <a className="acct-settings-link mt-2 inline-block">View Details</a>
                  </>
                ) : (
                  <div className="text-[12px] text-[var(--text-subtle)]">No jobs found</div>
                )}
              </div>
            </Card>

            {/* Donut Charts Row */}
            <Card>
              <div className="acct-donut-row">
                <DonutChart title="Verdicts" segments={[
                  { pct: d.verdicts.clean, color: 'var(--color-green-800)', label: 'Clean' },
                  { pct: d.verdicts.suspicious, color: 'var(--color-yellow-700)', label: 'Suspicious' },
                  { pct: d.verdicts.malicious, color: 'var(--color-red-700)', label: 'Malicious' },
                ]} />
                <DonutChart title="File Types" segments={[
                  { pct: d.fileTypes.documents, color: 'var(--color-blue-700)', label: 'Documents' },
                  { pct: d.fileTypes.images, color: 'var(--color-green-800)', label: 'Images' },
                  { pct: d.fileTypes.archives, color: 'var(--color-yellow-700)', label: 'Archives' },
                  { pct: d.fileTypes.other, color: 'var(--text-muted)', label: 'Other' },
                ]} />
                <DonutChart title="Scan Status" segments={[
                  { pct: d.scanStatus.scanned, color: 'var(--color-green-800)', label: 'Scanned' },
                  { pct: d.scanStatus.pending, color: 'var(--color-yellow-700)', label: 'Pending' },
                  { pct: d.scanStatus.failed, color: 'var(--color-red-700)', label: 'Failed' },
                ]} />
              </div>
            </Card>

            {/* Jobs Table */}
            <Card>
              <CardHeader>
                <CardTitle title="Jobs" count={String(filteredJobs.length)} />
                <div className="flex items-center gap-2">
                  <InputField
                    type="search"
                    placeholder="Search jobs"
                    value={jobsSearch}
                    onChange={e => { setJobsSearch(e.target.value); setJobsPage(1) }}
                    clearable
                    onClear={() => { setJobsSearch(''); setJobsPage(1) }}
                    className="w-60"
                  />
                </div>
              </CardHeader>
              <DataTable
                columns={jobColumns}
                data={jobsTableData}
                rowKey={(_, i) => i}
              />
              {filteredJobs.length > 10 && (
                <Pagination
                  page={jobsPage}
                  totalPages={jobsTotalPages}
                  pageSize={jobsPageSize}
                  pageSizeOptions={[10, 25, 50]}
                  onPageChange={setJobsPage}
                  onPageSizeChange={s => { setJobsPageSize(s); setJobsPage(1) }}
                />
              )}
            </Card>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// GROUPS TAB
// ═══════════════════════════════════════════════════════════════════════════════

function GroupsTab({ groups, onOpenGroup }: {
  groups: GroupData[]
  onOpenGroup: (index: number) => void
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    if (!search) return groups
    const s = search.toLowerCase()
    return groups.filter(g => g.name.toLowerCase().includes(s))
  }, [groups, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize)

  const groupColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    { key: 'name', header: 'Name', width: '200px' },
    {
      key: 'status', header: 'Status', width: '130px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    {
      key: 'storageUnits', header: 'Storage Units', width: '130px',
    },
    {
      key: 'providers', header: 'Providers', width: '200px',
      render: (row) => {
        const provs = row._providers as string[]
        const extra = row._extraProviders as number
        return (
          <div className="flex items-center gap-1">
            {provs.slice(0, 3).map(p => (
              <ProviderIcon key={p} cls={p} label={
                ({ aws: 'aws', sharepoint: 'SP', azure: 'Az', gcloud: 'GC', alibaba: 'Ali', box: 'Bx' } as Record<string, string>)[p] || p
              } />
            ))}
            {extra > 0 && <span className="count-more">+{extra} more</span>}
          </div>
        )
      },
    },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[
          { label: 'Create Job' },
          { label: 'Group Settings' },
          { label: 'Delete Group', danger: true },
        ]} />
      ),
    },
  ], [])

  const tableData = useMemo(() =>
    slice.map((g, i) => ({
      _index: (page - 1) * pageSize + i,
      name: g.name,
      status: g.status,
      _statusTag: g.statusTag,
      storageUnits: g.storageUnits,
      _providers: g.providers,
      _extraProviders: g.extraProviders,
    } as Record<string, unknown>)),
  [slice, page, pageSize])

  return (
    <Card>
      <CardHeader>
        <CardTitle title="Groups" count={String(filtered.length)} />
        <div className="flex items-center gap-2">
          <InputField
            type="search"
            placeholder="Search groups"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            clearable
            onClear={() => { setSearch(''); setPage(1) }}
            className="w-60"
          />
          <Button variant="menu" icon="filter">Provider <Icon name="chevron-down" size="md" /></Button>
          <Button variant="menu" icon="filter">Status <Icon name="chevron-down" size="md" /></Button>
        </div>
      </CardHeader>
      <DataTable
        columns={groupColumns}
        data={tableData}
        rowKey={(row) => row._index as number}
        onRowClick={(row) => onOpenGroup(row._index as number)}
      />
      {filtered.length > 10 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50]}
          onPageChange={setPage}
          onPageSizeChange={s => { setPageSize(s); setPage(1) }}
        />
      )}
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// GROUP DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════════════════

function GroupDetailView({ group, onBack }: {
  group: GroupData
  onBack: () => void
}) {
  const [detailTab, setDetailTab] = useState('units')
  const [unitsSearch, setUnitsSearch] = useState('')
  const [unitsPage, setUnitsPage] = useState(1)
  const [unitsPageSize, setUnitsPageSize] = useState(10)
  const [jobsSearch, setJobsSearch] = useState('')
  const [jobsPage, setJobsPage] = useState(1)
  const [jobsPageSize, setJobsPageSize] = useState(10)

  const DETAIL_TABS = [
    { id: 'units', label: 'Units' },
    { id: 'jobs', label: 'Jobs' },
  ]

  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Inventory', onClick: onBack },
    { label: 'Groups', onClick: onBack },
  ]

  // Units
  const unitColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    { key: 'name', header: 'Storage Unit', width: '160px' },
    {
      key: 'provider', header: 'Provider', width: '140px',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <ProviderIcon cls={row._provCls as string} label={row._provLabel as string} />
          {row.providerName as string}
        </div>
      ),
    },
    {
      key: 'status', header: 'Status', width: '120px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    { key: 'account', header: 'Account', width: '160px' },
    {
      key: 'groups', header: 'Groups', width: '140px',
      render: (row) => (
        <span>
          <span className="tag tag-keyword">{row.groups as string}</span>
          {(row._extraGroups as number) > 0 && (
            <span className="count-more"> +{row._extraGroups as number} more</span>
          )}
        </span>
      ),
    },
    {
      key: 'clientId', header: 'Storage ClientID', width: '200px',
      render: (row) => <ClientIdCell clientId={row.clientId as string} />,
    },
    { key: 'lastJob', header: 'Last Job', width: '180px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[
          { label: 'Create Job' },
          { label: 'View Last Job Report' },
          { label: 'Remove Unit', danger: true },
        ]} />
      ),
    },
  ], [])

  const filteredUnits = useMemo(() => {
    if (!unitsSearch) return group.units
    const s = unitsSearch.toLowerCase()
    return group.units.filter(u =>
      u.name.toLowerCase().includes(s) || u.clientId.toLowerCase().includes(s)
    )
  }, [group.units, unitsSearch])

  const unitsTotalPages = Math.max(1, Math.ceil(filteredUnits.length / unitsPageSize))
  const unitsSlice = filteredUnits.slice((unitsPage - 1) * unitsPageSize, unitsPage * unitsPageSize)

  const unitsTableData = useMemo(() =>
    unitsSlice.map((u, i) => ({
      _index: i,
      name: u.name,
      _provCls: u.provider,
      _provLabel: u.providerLabel,
      providerName: u.providerName,
      status: u.status,
      _statusTag: u.statusTag,
      account: u.account,
      groups: u.groups,
      _extraGroups: u.extraGroups,
      clientId: u.clientId,
      lastJob: u.lastJob,
    } as Record<string, unknown>)),
  [unitsSlice])

  // Jobs
  const jobColumns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    { key: 'name', header: 'Job Name', width: '180px' },
    {
      key: 'status', header: 'Status', width: '120px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    { key: 'type', header: 'Type', width: '120px' },
    {
      key: 'files', header: 'Files', width: '120px',
      render: (row) => <span>{(row.files as number).toLocaleString()}</span>,
    },
    { key: 'detections', header: 'Detections', width: '100px' },
    { key: 'date', header: 'Date', width: '200px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[{ label: 'View Report' }]} />
      ),
    },
  ], [])

  const filteredJobs = useMemo(() => {
    if (!jobsSearch) return group.jobs
    const s = jobsSearch.toLowerCase()
    return group.jobs.filter(j => j.name.toLowerCase().includes(s))
  }, [group.jobs, jobsSearch])

  const jobsTotalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPageSize))
  const jobsSlice = filteredJobs.slice((jobsPage - 1) * jobsPageSize, jobsPage * jobsPageSize)

  const jobsTableData = useMemo(() =>
    jobsSlice.map((j, i) => ({
      _index: i,
      name: j.name,
      status: j.status,
      _statusTag: j.statusTag,
      type: j.type,
      files: j.files,
      detections: j.detections,
      date: j.date,
    } as Record<string, unknown>)),
  [jobsSlice])

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb={<Breadcrumb items={breadcrumb} />}
        title={group.name}
        actions={
          <>
            <Button variant="icon" aria-label="Refresh">
              <Icon name="refresh" size="md" />
            </Button>
            <ActionsDropdown items={[
              { label: 'Create Job' },
              { label: 'Group Settings' },
              { label: 'Delete Group', danger: true },
            ]} />
            <Button variant="primary" icon="add">Add Units</Button>
          </>
        }
      />

      <Tabs tabs={DETAIL_TABS} activeTab={detailTab} onTabChange={setDetailTab}>
        <TabPanel id="units" activeTab={detailTab}>
          <div className="flex flex-col gap-4">
            <OverviewStatsRow stats={[
              { label: 'Total Units', value: group.totalUnits, color: 'blue' },
              { label: 'Operational', value: group.operational, color: 'green' },
              { label: 'Errors', value: group.errors, color: 'red' },
              { label: 'Testing', value: group.testing, color: 'yellow' },
            ]} />

            <Card>
              <CardHeader>
                <CardTitle title="Storage Units" count={String(filteredUnits.length)} />
                <div className="flex items-center gap-2">
                  <InputField
                    type="search"
                    placeholder="Search for Files or Hash"
                    value={unitsSearch}
                    onChange={e => { setUnitsSearch(e.target.value); setUnitsPage(1) }}
                    clearable
                    onClear={() => { setUnitsSearch(''); setUnitsPage(1) }}
                    className="w-60"
                  />
                  <Button variant="menu" icon="filter">Status <Icon name="chevron-down" size="md" /></Button>
                  <Button variant="menu" icon="filter">Group <Icon name="chevron-down" size="md" /></Button>
                </div>
              </CardHeader>
              <DataTable
                columns={unitColumns}
                data={unitsTableData}
                rowKey={(_, i) => i}
              />
              {filteredUnits.length > 10 && (
                <Pagination
                  page={unitsPage}
                  totalPages={unitsTotalPages}
                  pageSize={unitsPageSize}
                  pageSizeOptions={[10, 25, 50]}
                  onPageChange={setUnitsPage}
                  onPageSizeChange={s => { setUnitsPageSize(s); setUnitsPage(1) }}
                />
              )}
            </Card>
          </div>
        </TabPanel>

        <TabPanel id="jobs" activeTab={detailTab}>
          <Card>
            <CardHeader>
              <CardTitle title="Jobs" count={String(filteredJobs.length)} />
              <div className="flex items-center gap-2">
                <InputField
                  type="search"
                  placeholder="Search jobs"
                  value={jobsSearch}
                  onChange={e => { setJobsSearch(e.target.value); setJobsPage(1) }}
                  clearable
                  onClear={() => { setJobsSearch(''); setJobsPage(1) }}
                  className="w-60"
                />
              </div>
            </CardHeader>
            <DataTable
              columns={jobColumns}
              data={jobsTableData}
              rowKey={(_, i) => i}
            />
            {filteredJobs.length > 10 && (
              <Pagination
                page={jobsPage}
                totalPages={jobsTotalPages}
                pageSize={jobsPageSize}
                pageSizeOptions={[10, 25, 50]}
                onPageChange={setJobsPage}
                onPageSizeChange={s => { setJobsPageSize(s); setJobsPage(1) }}
              />
            )}
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// UNITS TAB (ALL UNITS — flat across all accounts)
// ═══════════════════════════════════════════════════════════════════════════════

function UnitsTab({ flatUnits }: { flatUnits: FlatUnit[] }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    if (!search) return flatUnits
    const s = search.toLowerCase()
    return flatUnits.filter(u =>
      u.name.toLowerCase().includes(s) ||
      u.clientId.toLowerCase().includes(s) ||
      u.account.toLowerCase().includes(s) ||
      u.provider.toLowerCase().includes(s)
    )
  }, [flatUnits, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize)

  const columns: DataTableColumn<Record<string, unknown>>[] = useMemo(() => [
    {
      key: 'name', header: 'Storage Unit', width: '180px',
      render: (row) => (
        <div className="flex items-center gap-2">
          <ProviderIcon cls={row._provCls as string} label={row._provLabel as string} />
          {row.name as string}
        </div>
      ),
    },
    { key: 'provider', header: 'Provider', width: '120px' },
    {
      key: 'status', header: 'Status', width: '120px',
      render: (row) => <Tag variant={row._statusTag as TagVariant}>{row.status as string}</Tag>,
    },
    { key: 'account', header: 'Account', width: '160px' },
    {
      key: 'groups', header: 'Groups', width: '150px',
      render: (row) => (
        <span>
          <span className="tag tag-keyword">{row.group as string}</span>
          {(row._groupsExtra as number) > 0 && (
            <span className="count-more"> +{row._groupsExtra as number}</span>
          )}
        </span>
      ),
    },
    {
      key: 'clientId', header: 'Storage ClientID', width: '220px',
      render: (row) => <ClientIdCell clientId={row.clientId as string} />,
    },
    { key: 'lastScanned', header: 'Last Job', width: '180px' },
    {
      key: 'actions', header: '', width: '48px', align: 'center',
      render: () => (
        <RowActionMenu items={[
          { label: 'Create Job' },
          { label: 'Unit Settings' },
          { label: 'Delete Unit', danger: true },
        ]} />
      ),
    },
  ], [])

  const tableData = useMemo(() =>
    slice.map((u, i) => ({
      _index: i,
      name: u.name,
      _provCls: u.providerClass,
      _provLabel: u.providerLabel,
      provider: u.provider,
      status: u.status,
      _statusTag: u.statusTag,
      account: u.account,
      group: u.group,
      _groupsExtra: u.groups,
      clientId: u.clientId,
      lastScanned: u.lastScanned,
    } as Record<string, unknown>)),
  [slice])

  return (
    <Card>
      <CardHeader>
        <CardTitle title="Storage Units" count={String(filtered.length)} />
        <div className="flex items-center gap-2">
          <InputField
            type="search"
            placeholder="Search units"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            clearable
            onClear={() => { setSearch(''); setPage(1) }}
            className="w-60"
          />
          <Button variant="menu" icon="filter">Status <Icon name="chevron-down" size="md" /></Button>
          <Button variant="menu" icon="filter">Group <Icon name="chevron-down" size="md" /></Button>
          <Button variant="menu" icon="filter">Provider <Icon name="chevron-down" size="md" /></Button>
        </div>
      </CardHeader>
      <DataTable
        columns={columns}
        data={tableData}
        rowKey={(_, i) => i}
      />
      {filtered.length > 10 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50]}
          onPageChange={setPage}
          onPageSizeChange={s => { setPageSize(s); setPage(1) }}
        />
      )}
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

type ViewState =
  | { view: 'list' }
  | { view: 'accountDetail'; index: number }
  | { view: 'groupDetail'; index: number }

const TAB_LIST = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'groups', label: 'Groups' },
  { id: 'units', label: 'Units' },
]

export function InventoryPage() {
  const [activeTab, setActiveTab] = useState('accounts')
  const [viewState, setViewState] = useState<ViewState>({ view: 'list' })

  // Generate data once
  const [accountsData] = useState(() => generateAccountsData())
  const groupsData = useMemo(() => deriveGroupsData(accountsData), [accountsData])
  const flatUnits = useMemo(() => deriveFlatUnits(accountsData), [accountsData])

  const openAccountDetail = useCallback((index: number) => {
    setViewState({ view: 'accountDetail', index })
  }, [])

  const openGroupDetail = useCallback((index: number) => {
    setViewState({ view: 'groupDetail', index })
  }, [])

  const backToList = useCallback(() => {
    setViewState({ view: 'list' })
  }, [])

  // Account detail view
  if (viewState.view === 'accountDetail') {
    const acct = accountsData[viewState.index]
    if (!acct) { setViewState({ view: 'list' }); return null }
    return (
      <div className="flex flex-col gap-5 font-sans">
        <AccountDetailView account={acct} onBack={backToList} />
      </div>
    )
  }

  // Group detail view
  if (viewState.view === 'groupDetail') {
    const grp = groupsData[viewState.index]
    if (!grp) { setViewState({ view: 'list' }); return null }
    return (
      <div className="flex flex-col gap-5 font-sans">
        <GroupDetailView group={grp} onBack={backToList} />
      </div>
    )
  }

  // List view
  return (
    <div className={cn('flex flex-col gap-5 font-sans')}>
      <PageHeader
        title="Inventory"
        actions={
          <>
            <Button variant="icon" aria-label="Refresh">
              <Icon name="refresh" size="md" />
            </Button>
            <Button variant="outline">
              Add New
              <Icon name="chevron-down" size="md" />
            </Button>
          </>
        }
      />

      <Tabs tabs={TAB_LIST} activeTab={activeTab} onTabChange={setActiveTab}>
        <TabPanel id="accounts" activeTab={activeTab}>
          <AccountsTab accounts={accountsData} onOpenAccount={openAccountDetail} />
        </TabPanel>

        <TabPanel id="groups" activeTab={activeTab}>
          <GroupsTab groups={groupsData} onOpenGroup={openGroupDetail} />
        </TabPanel>

        <TabPanel id="units" activeTab={activeTab}>
          <UnitsTab flatUnits={flatUnits} />
        </TabPanel>
      </Tabs>
    </div>
  )
}
