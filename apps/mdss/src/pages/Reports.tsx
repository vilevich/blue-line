import { useState, useRef, useEffect, useCallback } from 'react'
import {
  PageHeader,
  Breadcrumb,
  type BreadcrumbItem,
  Button,
  Tag,
  Checkbox,
  Tabs,
  TabPanel,
  Modal,
  Pagination,
  Card,
  CardHeader,
  CardTitle,
  KeyValueBar,
  ColHeader,
} from '@opswat/blue-line'
import type { TagVariant, ColFilterConfig } from '@opswat/blue-line'

// ─── Types ──────────────────────────────────────────────────────────────────

type ViewState =
  | { view: 'list' }
  | { view: 'detail'; index: number }
  | { view: 'sandbox'; index: number }

interface ReportRow {
  name: string
  status: string
  statusTag: TagVariant
  totalFiles: string
  threats: string | null
  dlp: string | null
  sanitized: string | null
  jobType: string
  workflow: string
  tagged: string
  kept: string
  copied: string
  moved: string
  deleted: string
  otherRem: string
  partition: string
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────

const RefreshIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
    <path d="M12.95 4.05A5.48 5.48 0 0 0 8 2.5 5.5 5.5 0 1 0 13.43 9h1.07A6.5 6.5 0 1 1 8 1.5c1.58 0 3.02.56 4.14 1.5L14 1v4h-4l2.95-0.95Z" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[var(--text-subtle)] shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 2C9.76142 2 12 4.23858 12 7C12 8.11285 11.6353 9.13998 11.0205 9.9707L14.0713 13.0068L14.1221 13.0645C14.3629 13.3585 14.3471 13.7932 14.0732 14.0684C13.781 14.3615 13.3061 14.3622 13.0127 14.0703L9.95801 11.0303C9.12955 11.6393 8.1071 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2ZM7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5Z" />
  </svg>
)

const FilterIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
    <path d="M4.75 7.15V2H3.25V7.15C2.52 7.45 2 8.16 2 9C2 9.84 2.52 10.55 3.25 10.85V14H4.75V10.85C5.48 10.55 6 9.84 6 9C6 8.16 5.48 7.45 4.75 7.15Z" />
    <path d="M10 5C10 4.16 9.48 3.45 8.75 3.15V2H7.25V3.15C6.52 3.45 6 4.16 6 5C6 5.84 6.52 6.55 7.25 6.85V14H8.75V6.85C9.48 6.55 10 5.84 10 5Z" />
    <path d="M14 11C14 10.16 13.48 9.45 12.75 9.15V2H11.25V9.15C10.52 9.45 10 10.16 10 11C10 11.84 10.52 12.55 11.25 12.85V14H12.75V12.85C13.48 12.55 14 11.84 14 11Z" />
  </svg>
)

const DotsIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
    <circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="13" r="1.5" />
  </svg>
)

const CopyIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M4.00029 4.08499V2.5C4.00029 1.67157 4.67186 1 5.50029 1H12.5003C13.3287 1 14.0003 1.67157 14.0003 2.5V10.5C14.0003 11.3284 13.3287 12 12.5003 12H11.0003V13.5C11.0003 14.3284 10.3287 15 9.50029 15H3.50029C2.67186 15 2.00029 14.3284 2.00029 13.5V5.5C2.00029 4.67157 2.67186 4 3.50029 4H4.00029V4.08499ZM5.50029 4.08499V12H11.0003V10.5V5.5V4.08499H5.50029Z" />
  </svg>
)

const AwsIcon = () => (
  <span className="inv-provider-icon aws"><span style={{ fontSize: 8, letterSpacing: '-0.5px' }}>aws</span></span>
)

const InfoCircle = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[var(--text-link)] cursor-pointer">
    <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm-.5 4v5h1V5h-1zm0 6v1h1v-1h-1z" />
  </svg>
)

const WarnTriangle = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 text-[var(--color-red-700)]">
    <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
    <path d="M6.75 11.75c-.26 0-.51-.1-.71-.29l-2.75-2.75a1.003 1.003 0 011.41-1.41l2.04 2.04 5.05-5.05a1.003 1.003 0 011.41 1.41l-5.75 5.75c-.2.2-.45.29-.71.29z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
    <path d="M12.5303 4.53033C12.8232 4.23744 12.8232 3.76256 12.5303 3.46967C12.2374 3.17678 11.7626 3.17678 11.4697 3.46967L8 6.93934L4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L6.93934 8L3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303C3.76256 12.8232 4.23744 12.8232 4.53033 12.5303L8 9.06066L11.4697 12.5303C11.7626 12.8232 12.2374 12.8232 12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697L9.06066 8L12.5303 4.53033Z" />
  </svg>
)

// ─── Chart Components ────────────────────────────────────────────────────────

function MiniDonut({ value, total, color }: { value: number; total: number; color: string }) {
  const r = 20, C = 2 * Math.PI * r
  const pct = total > 0 ? value / total : 0
  return (
    <svg className="rpt-proc-donut" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={r} fill="none" stroke="var(--color-neutral-100)" strokeWidth="6" />
      <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${pct * C} ${C}`} strokeLinecap="round"
        transform="rotate(-90 26 26)" />
    </svg>
  )
}

function ProgressRing({ pct, color }: { pct: number; color?: string }) {
  const r = 20, C = 2 * Math.PI * r
  const stroke = color || 'var(--primary)'
  return (
    <div className="dash-rem-ring-wrap">
      <svg className="dash-rem-ring-svg" viewBox="0 0 52 52">
        <circle className="dash-rem-ring-track" cx="26" cy="26" r={r} />
        <circle className="dash-rem-ring-fill" cx="26" cy="26" r={r}
          stroke={stroke} strokeDasharray={`${(pct / 100) * C} ${C}`} />
      </svg>
      <span className="dash-rem-ring-pct">{pct}%</span>
    </div>
  )
}

const ChevronDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WarnTriangleSmall = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[var(--color-yellow-700)]">
    <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
)

// ─── Data ───────────────────────────────────────────────────────────────────

const REPORTS: ReportRow[] = [
  { name: 'Delta Real-Time Scan',      status: 'Stopped',  statusTag: 'warn',    totalFiles: '133,659', threats: '178',   dlp: '178',   sanitized: '45',    jobType: 'Real-Time Scan',  workflow: 'Default Workflow', tagged: '133,659', kept: '133,659', copied: '133,659', moved: '133,659', deleted: '133,659', otherRem: '133,659', partition: 'Full Scan' },
  { name: 'Orion Full Scan',           status: 'Stopped',  statusTag: 'warn',    totalFiles: '133,659', threats: '123',   dlp: '123',   sanitized: '12',    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '133,659', kept: '133,659', copied: '133,659', moved: '133,659', deleted: '153,659', otherRem: '133,659', partition: 'Full Scan' },
  { name: 'Scheduled File Scan',       status: 'Complete', statusTag: 'success', totalFiles: '131,649', threats: null,    dlp: null,    sanitized: null,    jobType: 'Scheduled Scan',  workflow: 'Discovery Only',   tagged: '131,649', kept: '131,649', copied: '131,649', moved: '131,649', deleted: '131,649', otherRem: '131,649', partition: 'Full Scan' },
  { name: 'Realtime Malware Scan',     status: 'Complete', statusTag: 'success', totalFiles: '130,159', threats: null,    dlp: null,    sanitized: null,    jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '130,159', kept: '130,159', copied: '130,159', moved: '130,159', deleted: '130,159', otherRem: '130,159', partition: 'Full Scan' },
  { name: 'Scheduled DLP Scan',        status: 'Complete', statusTag: 'success', totalFiles: '129,159', threats: null,    dlp: null,    sanitized: null,    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '129,159', kept: '129,159', copied: '129,159', moved: '129,159', deleted: '129,159', otherRem: '129,159', partition: 'Full Scan' },
  { name: 'On-Demand Malware Scan',    status: 'Complete', statusTag: 'success', totalFiles: '110,159', threats: '1,957', dlp: '1,957', sanitized: '1,957', jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '110,159', kept: '110,159', copied: '110,159', moved: '110,159', deleted: '110,159', otherRem: '110,159', partition: 'Ingest Folder' },
  { name: 'Scheduled GDPR Scan',       status: 'Complete', statusTag: 'success', totalFiles: '110,003', threats: null,    dlp: null,    sanitized: null,    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '110,003', kept: '110,003', copied: '110,003', moved: '110,003', deleted: '110,003', otherRem: '110,003', partition: 'Ingest Folder' },
  { name: 'Delta Vulnerability Scan',  status: 'Complete', statusTag: 'success', totalFiles: '110,003', threats: '356',   dlp: '356',   sanitized: '356',   jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '110,003', kept: '110,003', copied: '110,003', moved: '110,003', deleted: '110,003', otherRem: '110,003', partition: 'Full Scan' },
  { name: 'Full Storage Scan',         status: 'Failed',   statusTag: 'alert',   totalFiles: '110,017', threats: null,    dlp: null,    sanitized: null,    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '110,017', kept: '110,017', copied: '110,017', moved: '110,017', deleted: '110,017', otherRem: '110,017', partition: 'Full Scan' },
  { name: 'Manual File Upload',        status: 'Complete', statusTag: 'success', totalFiles: '97,123',  threats: null,    dlp: null,    sanitized: null,    jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '97,123',  kept: '97,123',  copied: '97,123',  moved: '97,123',  deleted: '97,123',  otherRem: '97,123',  partition: 'Full Scan' },
  { name: 'Cloud Backup Scan',         status: 'Complete', statusTag: 'success', totalFiles: '89,421',  threats: '89',    dlp: '89',    sanitized: '34',    jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '89,421',  kept: '89,421',  copied: '89,421',  moved: '89,421',  deleted: '89,421',  otherRem: '89,421',  partition: 'Full Scan' },
  { name: 'Compliance Audit Scan',     status: 'Complete', statusTag: 'success', totalFiles: '76,302',  threats: null,    dlp: null,    sanitized: null,    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '76,302',  kept: '76,302',  copied: '76,302',  moved: '76,302',  deleted: '76,302',  otherRem: '76,302',  partition: 'Full Scan' },
  { name: 'Weekly Incremental Scan',   status: 'Complete', statusTag: 'success', totalFiles: '68,944',  threats: '412',   dlp: '412',   sanitized: '201',   jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '68,944',  kept: '68,944',  copied: '68,944',  moved: '68,944',  deleted: '68,944',  otherRem: '68,944',  partition: 'Full Scan' },
  { name: 'Archive Deep Scan',         status: 'Stopped',  statusTag: 'warn',    totalFiles: '54,210',  threats: '67',    dlp: null,    sanitized: null,    jobType: 'Real-Time Scan',  workflow: 'Default Workflow', tagged: '54,210',  kept: '54,210',  copied: '54,210',  moved: '54,210',  deleted: '54,210',  otherRem: '54,210',  partition: 'Full Scan' },
  { name: 'Email Attachment Scan',     status: 'Complete', statusTag: 'success', totalFiles: '45,887',  threats: null,    dlp: null,    sanitized: null,    jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '45,887',  kept: '45,887',  copied: '45,887',  moved: '45,887',  deleted: '45,887',  otherRem: '45,887',  partition: 'Full Scan' },
  { name: 'PII Detection Scan',        status: 'Failed',   statusTag: 'alert',   totalFiles: '38,500',  threats: null,    dlp: '2,104', sanitized: null,    jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '38,500',  kept: '38,500',  copied: '38,500',  moved: '38,500',  deleted: '38,500',  otherRem: '38,500',  partition: 'Full Scan' },
  { name: 'Nightly CDR Process',       status: 'Complete', statusTag: 'success', totalFiles: '31,204',  threats: null,    dlp: null,    sanitized: '1,847', jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '31,204',  kept: '31,204',  copied: '31,204',  moved: '31,204',  deleted: '31,204',  otherRem: '31,204',  partition: 'Full Scan' },
  { name: 'Document Library Scan',     status: 'Complete', statusTag: 'success', totalFiles: '24,650',  threats: '15',    dlp: '15',    sanitized: '8',     jobType: 'Scan Now',        workflow: 'Default Workflow', tagged: '24,650',  kept: '24,650',  copied: '24,650',  moved: '24,650',  deleted: '24,650',  otherRem: '24,650',  partition: 'Full Scan' },
  { name: 'Shared Drive Monitor',      status: 'Complete', statusTag: 'success', totalFiles: '19,832',  threats: null,    dlp: null,    sanitized: null,    jobType: 'Real-Time Scan',  workflow: 'Default Workflow', tagged: '19,832',  kept: '19,832',  copied: '19,832',  moved: '19,832',  deleted: '19,832',  otherRem: '19,832',  partition: 'Full Scan' },
  { name: 'Quarantine Review',         status: 'Complete', statusTag: 'success', totalFiles: '12,100',  threats: '743',   dlp: '743',   sanitized: '512',   jobType: 'Scheduled Scan',  workflow: 'Default Workflow', tagged: '12,100',  kept: '12,100',  copied: '12,100',  moved: '12,100',  deleted: '12,100',  otherRem: '12,100',  partition: 'Full Scan' },
]

const FILE_VERSIONS = [
  { file: 'error_log_critical_2023.txt', version: 'v10 (Current)', status: 'Blocked',      statusTag: 'alert' as TagVariant,   fileType: 'Plain Text File', malware: '5/16',  malwareD: true,  advThreats: 'Malicious',  advD: true,  vuln: 'None',    vulnD: false, dataLoss: '16',   dlD: true,  sanit: '11 Sanitized', sanitC: true,  dateTime: '2023-12-15 14:23' },
  { file: 'error_log_critical_2023.txt', version: 'v9',            status: 'Quarantined',  statusTag: 'caution' as TagVariant, fileType: 'Plain Text File', malware: '3/16',  malwareD: true,  advThreats: 'Suspicious', advD: true,  vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: '8 Sanitized',  sanitC: true,  dateTime: '2023-11-02 09:15' },
  { file: 'error_log_critical_2023.txt', version: 'v8',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'Clean',      advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: '5 Sanitized',  sanitC: true,  dateTime: '2023-09-18 11:47' },
  { file: 'error_log_critical_2023.txt', version: 'v7',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'Clean',      advD: false, vuln: '2 CVEs',  vulnD: true,  dataLoss: 'None', dlD: false, sanit: '3 Sanitized',  sanitC: true,  dateTime: '2023-07-05 16:30' },
  { file: 'error_log_critical_2023.txt', version: 'v6',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'N/A',        advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: 'N/A',          sanitC: false, dateTime: '2023-04-22 08:00' },
  { file: 'error_log_critical_2023.txt', version: 'v5',            status: 'Blocked',      statusTag: 'alert' as TagVariant,   fileType: 'Plain Text File', malware: '2/16',  malwareD: true,  advThreats: 'Malicious',  advD: true,  vuln: '5 CVEs',  vulnD: true,  dataLoss: '8',    dlD: true,  sanit: '7 Sanitized',  sanitC: true,  dateTime: '2023-02-10 10:45' },
  { file: 'error_log_critical_2023.txt', version: 'v4',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'Clean',      advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: '2 Sanitized',  sanitC: true,  dateTime: '2022-11-20 09:30' },
  { file: 'error_log_critical_2023.txt', version: 'v3',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'Clean',      advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: 'N/A',          sanitC: false, dateTime: '2022-08-15 14:00' },
  { file: 'error_log_critical_2023.txt', version: 'v2',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'N/A',        advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: 'N/A',          sanitC: false, dateTime: '2022-05-01 11:20' },
  { file: 'error_log_critical_2023.txt', version: 'v1',            status: 'Allowed',      statusTag: 'success' as TagVariant, fileType: 'Plain Text File', malware: '0/16',  malwareD: false, advThreats: 'N/A',        advD: false, vuln: 'None',    vulnD: false, dataLoss: 'None', dlD: false, sanit: 'N/A',          sanitC: false, dateTime: '2022-01-15 08:00' },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function VerdictCell({ value }: { value: string | null }) {
  if (!value) return <span className="rpt-verdict none"><span className="rpt-dot" /> None</span>
  return <span className="rpt-verdict detected"><span className="rpt-dot" /> {value}</span>
}

function VerdictCellClean({ value, detected, clean }: { value: string; detected: boolean; clean: boolean }) {
  if (clean) return <span className="rpt-verdict clean"><span className="rpt-dot" /> {value}</span>
  if (detected) return <span className="rpt-verdict detected"><span className="rpt-dot" /> {value}</span>
  return <span className="rpt-verdict none"><span className="rpt-dot" /> {value}</span>
}

const TIME_COLS = new Set(['dateTime', 'scanDate', 'started', 'completed'])

const COL_FILTERS: Record<string, ColFilterConfig> = {
  status: { label: 'Status Filtering', options: ['All', 'Pending', 'Allowed', 'Blocked', 'Failed'] },
  jobType: { label: 'Job Type', options: ['All', 'Scheduled Scan', 'Real-Time Scan', 'On-Demand Scan'] },
  workflow: { label: 'Workflow', options: ['All', 'Default Workflow', 'Security Scan', 'DLP Scan', 'Compliance Check', 'Malware Deep Scan', 'Quick Scan', 'Full Analysis'] },
  storage: { label: 'Storage Unit', options: ['All', 'AWS Drive', 'Azure Blob', 'Google Cloud', 'S3 Bucket A', 'S3 Bucket B', 'On-Premise NAS', 'Dropbox Enterprise'] },
}

const RPT_COL_ORDER = ['name','status','storage','totalFiles','threats','dlp','sanitized','jobType','workflow','tagged','kept','copied','moved','deleted','otherRem','partition']
const RPT_FIXED_PIN = 'name'
const RPT_CB_WIDTH = 48
const MAX_USER_PINS = 2

function KvRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rpt-kv-row">
      <div className="rpt-kv-label">{label}</div>
      <div className="rpt-kv-value">{children}</div>
    </div>
  )
}

function copyText(text: string) {
  navigator.clipboard.writeText(text)
}

// ─── Report Detail Tabs ─────────────────────────────────────────────────────

const DETAIL_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'files', label: 'Files' },
]

const SANDBOX_TABS = [
  { id: 'file-details', label: 'File Details' },
  { id: 'yara', label: 'YARA Rules' },
  { id: 'ext-files', label: 'Extracted Files' },
  { id: 'ext-strings', label: 'Extracted Strings' },
  { id: 'osint', label: 'OSINT Lookups' },
]

const YARA_CODE = `rule MALWARE_Trojan_Agent {
    meta:
        description = "Detects Trojan.Agent variants via PE header anomalies"
        author = "OPSWAT Threat Research"
        severity = "Critical"
        date = "2023-11-20"

    strings:
        $mz = { 4D 5A }
        $str1 = "cmd.exe /c" ascii
        $str2 = "powershell -enc" ascii nocase
        $api1 = "VirtualAlloc" ascii
        $api2 = "WriteProcessMemory" ascii
        $api3 = "CreateRemoteThread" ascii

    condition:
        $mz at 0 and
        filesize < 5MB and
        2 of ($str*) and
        2 of ($api*)
}`

// ─── Main Component ─────────────────────────────────────────────────────────

export function ReportsPage() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'list' })

  // Reset to list view when sidebar nav is re-clicked
  useEffect(() => {
    function onReset(e: Event) {
      if ((e as CustomEvent).detail === 'reports') setViewState({ view: 'list' })
    }
    window.addEventListener('nav-reset', onReset)
    return () => window.removeEventListener('nav-reset', onReset)
  }, [])
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [detailTab, setDetailTab] = useState('overview')
  const [sandboxTab, setSandboxTab] = useState('file-details')
  const [ruleModalOpen, setRuleModalOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState('')
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [pinnedCols, setPinnedCols] = useState<string[]>([RPT_FIXED_PIN])
  const tableRef = useRef<HTMLTableElement>(null)

  const pageSize = 20
  const totalPages = Math.ceil(1256 / pageSize)

  const handleSort = useCallback((col: string, dir: 'asc' | 'desc') => {
    setSortCol(prev => prev === col && sortDir === dir ? null : col)
    setSortDir(dir)
  }, [sortDir])

  const handleTogglePin = useCallback((col: string) => {
    setPinnedCols(prev => {
      if (col === RPT_FIXED_PIN) return prev
      if (prev.includes(col)) return prev.filter(c => c !== col)
      const userPins = prev.filter(c => c !== RPT_FIXED_PIN)
      if (userPins.length >= MAX_USER_PINS) return prev
      return [...prev, col]
    })
  }, [])

  // Apply pinning positions
  useEffect(() => {
    const table = tableRef.current
    if (!table) return
    const sorted = [...pinnedCols].sort((a, b) => RPT_COL_ORDER.indexOf(a) - RPT_COL_ORDER.indexOf(b))

    // Clear existing pin classes and inline left
    table.querySelectorAll('.rpt-pinned').forEach(cell => {
      ;(cell as HTMLElement).classList.remove('rpt-pinned', 'rpt-pin-edge')
      ;(cell as HTMLElement).style.left = ''
    })

    let leftAccum = RPT_CB_WIDTH
    sorted.forEach((colName, i) => {
      const th = table.querySelector(`thead th[data-col="${colName}"]`) as HTMLElement | null
      if (!th) return
      const colWidth = th.getBoundingClientRect().width
      const cells = table.querySelectorAll(`[data-col="${colName}"]`)
      cells.forEach(cell => {
        ;(cell as HTMLElement).classList.add('rpt-pinned')
        ;(cell as HTMLElement).style.left = leftAccum + 'px'
        if (i === sorted.length - 1) {
          ;(cell as HTMLElement).classList.add('rpt-pin-edge')
        }
      })
      leftAccum += colWidth
    })

    // Update scrollbar margin CSS var
    const scrollEl = table.closest('.audit-table-scroll') as HTMLElement | null
    if (scrollEl) scrollEl.style.setProperty('--rpt-pin-margin', leftAccum + 'px')
  }, [pinnedCols])

  const allSelected = REPORTS.length > 0 && REPORTS.every((_, i) => selectedRows.has(i))
  const someSelected = REPORTS.some((_, i) => selectedRows.has(i)) && !allSelected

  function toggleAll() {
    if (allSelected) setSelectedRows(new Set())
    else setSelectedRows(new Set(REPORTS.map((_, i) => i)))
  }

  function toggleRow(i: number) {
    setSelectedRows(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  // ─── LIST VIEW ──────────────────────────────────────────────────────────

  if (viewState.view === 'list') {
    return (
      <div className="table-page">
        <div className="page-title-row">
          <h1 className="page-title">Reports</h1>
          <button className="btn-icon" title="Refresh"><RefreshIcon /></button>
        </div>

        <div className="audit-card table-page-card">
          <div className="audit-card-header">
            <div className="audit-card-title">
              <h3>Recent Jobs</h3>
              <span className="count">1,256</span>
            </div>
            <div className="audit-card-actions">
              <div className="audit-search">
                <SearchIcon />
                <input type="text" placeholder="Search for Files or Hash" />
              </div>
              <button className="audit-filter-btn" title="Advanced Filters"><FilterIcon /></button>
            </div>
          </div>

          <div className="audit-table-scroll table-scroll">
            <table ref={tableRef} className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 2400 }}>
              <thead>
                <tr>
                  <th className="col-cb">
                    <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  </th>
                  {([
                    ['name', '15%', 'Job Name'],
                    ['status', '8%', 'Status'],
                    ['storage', '14%', 'Storage Unit'],
                    ['totalFiles', '10%', 'Total Files'],
                    ['threats', '12%', 'Threats Detected'],
                    ['dlp', '12%', 'Data Loss Prevented'],
                    ['sanitized', '10%', 'Sanitized'],
                    ['jobType', '10%', 'Job Type'],
                    ['workflow', '10%', 'Workflow'],
                    ['tagged', '8%', 'Tagged Files'],
                    ['kept', '8%', 'Kept Files'],
                    ['copied', '8%', 'Copied Files'],
                    ['moved', '8%', 'Moved Files'],
                    ['deleted', '8%', 'Deleted Files'],
                    ['otherRem', '10%', 'Other Remediations'],
                    ['partition', '8%', 'Partition'],
                  ] as const).map(([col, w, label]) => (
                    <th key={col} data-col={col} style={{ width: w }}>
                      <ColHeader col={col} sortCol={sortCol} sortDir={sortDir} pinnedCols={pinnedCols} fixedPin={RPT_FIXED_PIN} maxPins={MAX_USER_PINS} onSort={handleSort} onTogglePin={handleTogglePin} filter={COL_FILTERS[col]} hasDateFilter={TIME_COLS.has(col)}>{label}</ColHeader>
                    </th>
                  ))}
                  <th className="col-action" />
                </tr>
              </thead>
              <tbody>
                {REPORTS.map((row, i) => (
                  <tr key={i} className="cursor-pointer" onClick={() => { setDetailTab('overview'); setViewState({ view: 'detail', index: i }) }}>
                    <td className="col-cb" onClick={e => e.stopPropagation()}>
                      <Checkbox checked={selectedRows.has(i)} onChange={() => toggleRow(i)} />
                    </td>
                    <td data-col="name">{row.name}</td>
                    <td data-col="status"><Tag variant={row.statusTag}>{row.status}</Tag></td>
                    <td data-col="storage"><div className="inv-provider"><AwsIcon /> Storage Unit Name</div></td>
                    <td data-col="totalFiles">{row.totalFiles}</td>
                    <td data-col="threats"><VerdictCell value={row.threats} /></td>
                    <td data-col="dlp"><VerdictCell value={row.dlp} /></td>
                    <td data-col="sanitized"><VerdictCell value={row.sanitized} /></td>
                    <td data-col="jobType">{row.jobType}</td>
                    <td data-col="workflow">{row.workflow}</td>
                    <td data-col="tagged">{row.tagged}</td>
                    <td data-col="kept">{row.kept}</td>
                    <td data-col="copied">{row.copied}</td>
                    <td data-col="moved">{row.moved}</td>
                    <td data-col="deleted">{row.deleted}</td>
                    <td data-col="otherRem">{row.otherRem}</td>
                    <td data-col="partition">{row.partition}</td>
                    <td className="col-action" onClick={e => e.stopPropagation()}>
                      <button className="cell-action"><DotsIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={[10, 20, 50, 100]}
            onPageChange={setPage}
          />
        </div>
      </div>
    )
  }

  // ─── DETAIL VIEW ────────────────────────────────────────────────────────

  if (viewState.view === 'detail') {
    const row = REPORTS[viewState.index]
    const breadcrumb: BreadcrumbItem[] = [
      { label: 'Reports', onClick: () => setViewState({ view: 'list' }) },
      { label: 'Jobs' },
    ]

    return (
      <div>
        <PageHeader
          title={row.name}
          breadcrumb={<Breadcrumb items={breadcrumb} />}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline">Delete Report</Button>
              <Button variant="outline"><span className="flex items-center gap-1.5">Export <ChevronDownIcon /></span></Button>
              <Button variant="outline">Re-Scan Now</Button>
            </div>
          }
        />

        {/* Job Info Bar */}
        <Card className="mt-5 mb-5">
          <CardHeader>
            <CardTitle title="Job" actions={<Button variant="text">Job Details</Button>} />
          </CardHeader>
          <KeyValueBar items={[
            { label: 'Storage Unit', value: 'AWS Drive' },
            { label: 'Scan Type', value: row.jobType === 'Scheduled Scan' ? 'Scheduled' : row.jobType === 'Real-Time Scan' ? 'Real-Time' : 'On-Demand' },
            { label: 'Status', value: row.status },
            { label: 'Workflow', value: row.workflow },
            { label: 'Partition', value: row.partition },
            { label: 'Started', value: '27/05/25 11:45' },
            { label: 'Priority', value: 'Low' },
          ]} />
        </Card>

        <Tabs tabs={DETAIL_TABS} activeTab={detailTab} onTabChange={setDetailTab}>
          {/* ──── Overview ──── */}
          <TabPanel id="overview" activeTab={detailTab}>
            <div className="rpt-overview-layout">
              {/* Left column */}
              <div>
                {/* Processing Summary */}
                <div className="audit-card" style={{ marginBottom: 12 }}>
                  <div className="audit-card-header"><div className="audit-card-title"><h3>Processing Summary</h3></div></div>
                  <div className="rpt-proc-row">
                    <div className="rpt-proc-item">
                      <MiniDonut value={5} total={134785} color="var(--color-red-600)" />
                      <div className="rpt-proc-stats">
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--color-neutral-200)' }} /><span className="rpt-proc-label">Total</span><span className="rpt-proc-val">134,785</span></div>
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--color-red-600)' }} /><span className="rpt-proc-label">Failed</span><span className="rpt-proc-val">5</span></div>
                      </div>
                    </div>
                    <div className="rpt-proc-item">
                      <MiniDonut value={45234} total={131649} color="var(--color-neutral-800)" />
                      <div className="rpt-proc-stats">
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--color-neutral-200)' }} /><span className="rpt-proc-label">Cache</span><span className="rpt-proc-val">86,415</span></div>
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--color-neutral-800)' }} /><span className="rpt-proc-label">New Scan</span><span className="rpt-proc-val">45,234</span></div>
                      </div>
                    </div>
                    <div className="rpt-proc-item">
                      <MiniDonut value={2345} total={133780} color="var(--primary)" />
                      <div className="rpt-proc-stats">
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--color-neutral-200)' }} /><span className="rpt-proc-label">Allowed</span><span className="rpt-proc-val">131,435</span></div>
                        <div className="rpt-proc-stat"><span className="rpt-proc-marker" style={{ background: 'var(--primary)' }} /><span className="rpt-proc-label">Blocked</span><span className="rpt-proc-val">2,345</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Summary */}
                <div className="audit-card" style={{ marginBottom: 12 }}>
                  <div className="audit-card-header"><div className="audit-card-title"><h3>Security Summary</h3></div></div>
                  <div className="rpt-security-row">
                    <div className="rpt-security-item"><div className="rpt-security-label">Threats</div><div className="rpt-security-value">2,001</div></div>
                    <div className="rpt-security-item"><div className="rpt-security-label">Data Loss</div><div className="rpt-security-value">344</div></div>
                    <div className="rpt-security-item"><div className="rpt-security-label">Sanitization</div><div className="rpt-security-value">1,578</div></div>
                  </div>
                </div>

                {/* Remediations Actions */}
                <div className="audit-card">
                  <div className="audit-card-header"><div className="audit-card-title"><h3>Remediations Actions</h3></div></div>
                  <div className="rpt-rem-actions-grid">
                    <div className="rpt-rem-action-item"><ProgressRing pct={92} /><div><div className="rpt-rem-action-label">File Tagging</div><div className="rpt-rem-action-count">3,520,454 files</div></div></div>
                    <div className="rpt-rem-action-item"><ProgressRing pct={45} /><div><div className="rpt-rem-action-label">Keep</div><div className="rpt-rem-action-count">1,584,204 files</div></div></div>
                    <div className="rpt-rem-action-item"><ProgressRing pct={20} /><div><div className="rpt-rem-action-label">Copy</div><div className="rpt-rem-action-count">704,091 files</div></div></div>
                    <div className="rpt-rem-action-item"><ProgressRing pct={18} /><div><div className="rpt-rem-action-label">Move</div><div className="rpt-rem-action-count">633,682 files</div></div></div>
                    <div className="rpt-rem-action-item"><ProgressRing pct={12} /><div><div className="rpt-rem-action-label">Delete</div><div className="rpt-rem-action-count">422,454 files</div></div></div>
                    <div className="rpt-rem-action-item"><ProgressRing pct={5} /><div><div className="rpt-rem-action-label">Other Remediations</div><div className="rpt-rem-action-count">176,023 actions</div></div></div>
                  </div>
                </div>
              </div>

              {/* Right column — Remediation Summary */}
              <div className="audit-card" style={{ alignSelf: 'start' }}>
                <div className="audit-card-header"><div className="audit-card-title"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 6H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V2C3 1.44772 3.44772 1 4 1H8V6ZM13 5H9V1L13 5Z" fill="#FF495E"/></svg><h3>Remediation Summary</h3></div></div>
                <div className="rpt-rem-summary-item">
                  <div className="rpt-rem-summary-row">
                    <span className="rpt-rem-summary-label">File Tagging</span>
                    <span className="rpt-rem-summary-badge">Enabled</span>
                  </div>
                  <div className="rpt-rem-summary-tags">
                    <span className="rpt-rem-summary-tag">MetaDefenderResult</span>
                    <span className="rpt-rem-summary-tag">MetaDefenderField</span>
                    <span className="rpt-rem-summary-tag">MetaDefenderAnalysi...</span>
                  </div>
                </div>
                <div className="rpt-rem-summary-item">
                  <div className="rpt-rem-summary-row">
                    <span className="rpt-rem-summary-label">Allowed Original File</span>
                    <Tag variant="accent">Copy</Tag>
                  </div>
                  <div className="rpt-rem-summary-tags">
                    <span className="rpt-rem-summary-tag">AlexMano OneDrive</span>
                    <span className="rpt-rem-summary-tag">AWS Testing Bucket</span>
                    <span className="rpt-rem-summary-tag">AzureFiles Storage Di...</span>
                    <span className="rpt-rem-summary-tag">Box AD</span>
                    <span className="rpt-rem-summary-tag">Box Storage</span>
                  </div>
                </div>
                <div className="rpt-rem-summary-item">
                  <div className="rpt-rem-summary-row">
                    <span className="rpt-rem-summary-label">Allowed Sanitized File</span>
                    <span className="rpt-rem-summary-badge">Keep</span>
                  </div>
                </div>
                <div className="rpt-rem-summary-item">
                  <div className="rpt-rem-summary-row">
                    <span className="rpt-rem-summary-label">File Versioning <WarnTriangleSmall /></span>
                    <span className="rpt-rem-summary-badge">Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* File Type Distribution — full width */}
            <div className="audit-card dash-card" style={{ marginTop: 12, marginBottom: 20 }}>
              <div className="audit-card-header"><div className="audit-card-title"><h3>File Type Distribution</h3></div></div>
              <div className="dash-filetype-body">
                <div className="dash-treemap">
                  <div className="dash-treemap-row" style={{ flex: 2 }}>
                    <div className="dash-treemap-cell dash-tm-archive" style={{ flex: 2 }}><span className="dash-tm-name">Archive</span><span className="dash-tm-count">436</span></div>
                    <div className="dash-treemap-cell dash-tm-application" style={{ flex: 3 }}><span className="dash-tm-name">Application</span><span className="dash-tm-count">322</span></div>
                  </div>
                  <div className="dash-treemap-row" style={{ flex: 1.2 }}>
                    <div className="dash-treemap-cell dash-tm-executable" style={{ flex: 2 }}><span className="dash-tm-name">Executables</span><span className="dash-tm-count">289</span></div>
                    <div className="dash-treemap-cell dash-tm-graphical" style={{ flex: 1.2 }}><span className="dash-tm-name">Graphical</span><span className="dash-tm-count">177</span></div>
                    <div className="dash-treemap-cell dash-tm-diskimage" style={{ flex: 1 }}><span className="dash-tm-name">Disk Image</span><span className="dash-tm-count">120</span></div>
                  </div>
                  <div className="dash-treemap-row" style={{ flex: 0.5 }}>
                    <div className="dash-treemap-cell dash-tm-openssl" style={{ flex: 1 }}><span className="dash-tm-name">OpenSSL Encrypted Files</span><span className="dash-tm-count">89</span></div>
                    <div className="dash-treemap-cell dash-tm-pdf" style={{ flex: 0.6 }}><span className="dash-tm-name">PDF</span><span className="dash-tm-count">63</span></div>
                    <div className="dash-treemap-cell dash-tm-text" style={{ flex: 0.5 }}><span className="dash-tm-name">Text</span><span className="dash-tm-count">54</span></div>
                    <div className="dash-treemap-cell dash-tm-other" style={{ flex: 1 }}><span className="dash-tm-name">Other</span><span className="dash-tm-count">99</span></div>
                  </div>
                </div>
                <div className="dash-filetype-legend">
                  <div className="dash-filetype-legend-header">
                    <span className="dash-filetype-legend-title">Detections</span>
                    <span className="dash-filetype-legend-total">562</span>
                  </div>
                  <div className="dash-filetype-legend-rows">
                    <div className="dash-filetype-legend-row"><div className="dash-ftl-icon dash-ftl-app"><svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1" /></svg></div><div className="dash-ftl-info"><span className="dash-ftl-name"><strong>Application Files</strong></span></div><span className="dash-ftl-val" /></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">XLS</span></div><span className="dash-ftl-val">301</span></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">Doc</span></div><span className="dash-ftl-val">21</span></div>
                    <div className="dash-filetype-legend-row"><div className="dash-ftl-icon dash-ftl-img"><svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1" /></svg></div><div className="dash-ftl-info"><span className="dash-ftl-name"><strong>Graphical Files</strong></span></div><span className="dash-ftl-val" /></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">JPG</span></div><span className="dash-ftl-val">50</span></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">PNG</span></div><span className="dash-ftl-val">12</span></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">WebP</span></div><span className="dash-ftl-val">115</span></div>
                    <div className="dash-filetype-legend-row"><div className="dash-ftl-icon dash-ftl-pdf"><svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1" /></svg></div><div className="dash-ftl-info"><span className="dash-ftl-name"><strong>PDF files</strong></span></div><span className="dash-ftl-val" /></div>
                    <div className="dash-filetype-legend-row" style={{ paddingLeft: 16 }}><div className="dash-ftl-info"><span className="dash-ftl-name">PDF</span></div><span className="dash-ftl-val">63</span></div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* ──── Files ──── */}
          <TabPanel id="files" activeTab={detailTab}>
            <div className="audit-card">
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>Scanned Files</h3><span className="count">10</span></div>
                <div className="audit-card-actions">
                  <div className="audit-search"><SearchIcon /><input type="text" placeholder="Search files" /></div>
                  <button className="audit-filter-btn" title="Advanced Filters"><FilterIcon /></button>
                </div>
              </div>
              <div className="audit-table-scroll table-scroll">
                <table className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 1800 }}>
                  <thead>
                    <tr>
                      <th className="col-cb"><Checkbox /></th>
                      <th data-col="file" className="col-pinned" style={{ width: '15%' }}>File</th>
                      <th data-col="fileVersion" style={{ width: '10%' }}>File Version</th>
                      <th data-col="status" style={{ width: '8%' }}>Status</th>
                      <th data-col="fileType" style={{ width: '10%' }}>File Type</th>
                      <th data-col="malware" style={{ width: '10%' }}>Malware</th>
                      <th data-col="advancedThreats" style={{ width: '12%' }}>Advanced Threats</th>
                      <th data-col="vulnerabilities" style={{ width: '11%' }}>Vulnerabilities</th>
                      <th data-col="dataLoss" style={{ width: '10%' }}>Data Loss</th>
                      <th data-col="sanitization" style={{ width: '10%' }}>Sanitization</th>
                      <th data-col="dateTime" style={{ width: '12%' }}>Date &amp; Time</th>
                      <th className="col-action" />
                    </tr>
                  </thead>
                  <tbody>
                    {FILE_VERSIONS.map((v, i) => (
                      <tr key={i}>
                        <td className="col-cb"><Checkbox /></td>
                        <td data-col="file" className="col-pinned">{v.file}</td>
                        <td data-col="fileVersion">{v.version}</td>
                        <td data-col="status"><Tag variant={v.statusTag}>{v.status}</Tag></td>
                        <td data-col="fileType">{v.fileType}</td>
                        <td data-col="malware"><VerdictCellClean value={v.malware} detected={v.malwareD} clean={false} /></td>
                        <td data-col="advancedThreats"><VerdictCellClean value={v.advThreats} detected={v.advD} clean={false} /></td>
                        <td data-col="vulnerabilities"><VerdictCellClean value={v.vuln} detected={v.vulnD} clean={false} /></td>
                        <td data-col="dataLoss"><VerdictCellClean value={v.dataLoss} detected={v.dlD} clean={false} /></td>
                        <td data-col="sanitization"><VerdictCellClean value={v.sanit} detected={false} clean={v.sanitC} /></td>
                        <td data-col="dateTime">{v.dateTime}</td>
                        <td className="col-action"><button className="cell-action"><DotsIcon /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={1} totalPages={1} pageSize={10} pageSizeOptions={[10, 25, 50]} onPageChange={() => {}} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  // ─── SANDBOX VIEW ───────────────────────────────────────────────────────

  const sbxBreadcrumb: BreadcrumbItem[] = [
    { label: 'Reports', onClick: () => setViewState({ view: 'list' }) },
    { label: 'error_log_critical_2023.txt', onClick: () => { setDetailTab('threats'); setViewState({ view: 'detail', index: viewState.index }) } },
  ]

  return (
    <div>
      <PageHeader
        title="Sandbox Extended Details"
        breadcrumb={<Breadcrumb items={sbxBreadcrumb} />}
        actions={
          <Button variant="outline" onClick={() => { setDetailTab('threats'); setViewState({ view: 'detail', index: viewState.index }) }}>Back to Analysis</Button>
        }
      />

      <Tabs tabs={SANDBOX_TABS} activeTab={sandboxTab} onTabChange={setSandboxTab}>
        {/* File Details */}
        <TabPanel id="file-details" activeTab={sandboxTab}>
          <div className="rpt-sbx-file-layout">
            <div>
              <div className="audit-card" style={{ marginBottom: 12 }}>
                <div className="audit-card-header"><div className="audit-card-title"><h3>File Information</h3></div></div>
                <div className="rpt-kv">
                  <KvRow label="File Name">error_log_critical_2023.txt</KvRow>
                  <KvRow label="File Type">PE32 Executable</KvRow>
                  <KvRow label="File Size">1.3 GB</KvRow>
                  <KvRow label="SHA-256"><span className="font-mono text-[12px]">475a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f</span></KvRow>
                  <KvRow label="MD5"><span className="font-mono text-[12px]">d41d8cd98f00b204e9800998ecf8427e</span></KvRow>
                  <KvRow label="Verdict"><Tag variant="alert">Malicious</Tag></KvRow>
                  <KvRow label="Confidence">98%</KvRow>
                  <KvRow label="Analysis Time">4m 23s</KvRow>
                </div>
              </div>
              <div className="audit-card">
                <div className="audit-card-header"><div className="audit-card-title"><h3>Sandbox Environment</h3></div></div>
                <div className="rpt-kv">
                  <KvRow label="OS">Windows 10 Pro (21H2)</KvRow>
                  <KvRow label="Architecture">x64</KvRow>
                  <KvRow label="Runtime">120 seconds</KvRow>
                  <KvRow label="Network">Simulated internet access</KvRow>
                </div>
              </div>
            </div>
            <div className="rpt-sbx-preview">Screenshot Preview</div>
          </div>
        </TabPanel>

        {/* YARA Rules */}
        <TabPanel id="yara" activeTab={sandboxTab}>
          <div className="audit-card">
            <div className="audit-card-header"><div className="audit-card-title"><h3>Matched YARA Rules</h3><span className="count">5</span></div></div>
            <div className="table-scroll" style={{ maxHeight: 400 }}>
              <table className="data-table">
                <thead><tr><th>Rule Name</th><th>Category</th><th>Description</th><th>Severity</th><th>Action</th></tr></thead>
                <tbody>
                  <tr><td>MALWARE_Trojan_Agent</td><td>Malware</td><td>Detects Trojan.Agent variants via PE header anomalies</td><td><Tag variant="alert">Critical</Tag></td><td><a className="btn-text text-[12px] cursor-pointer" onClick={() => { setSelectedRule('MALWARE_Trojan_Agent'); setRuleModalOpen(true) }}>View Rule</a></td></tr>
                  <tr><td>SUSP_Obfuscated_Strings</td><td>Suspicious</td><td>Identifies base64/XOR obfuscated command strings</td><td><Tag variant="caution">High</Tag></td><td><a className="btn-text text-[12px] cursor-pointer" onClick={() => { setSelectedRule('SUSP_Obfuscated_Strings'); setRuleModalOpen(true) }}>View Rule</a></td></tr>
                  <tr><td>HKTL_Mimikatz_Strings</td><td>Hack Tool</td><td>References to Mimikatz credential harvesting tool</td><td><Tag variant="alert">Critical</Tag></td><td><a className="btn-text text-[12px] cursor-pointer" onClick={() => { setSelectedRule('HKTL_Mimikatz_Strings'); setRuleModalOpen(true) }}>View Rule</a></td></tr>
                  <tr><td>SUSP_PE_Packer_UPX</td><td>Packer</td><td>File packed with UPX — common evasion technique</td><td><Tag variant="accent">Medium</Tag></td><td><a className="btn-text text-[12px] cursor-pointer" onClick={() => { setSelectedRule('SUSP_PE_Packer_UPX'); setRuleModalOpen(true) }}>View Rule</a></td></tr>
                  <tr><td>NET_C2_Beacon_Pattern</td><td>Network</td><td>Network callback pattern consistent with C2 beacon</td><td><Tag variant="caution">High</Tag></td><td><a className="btn-text text-[12px] cursor-pointer" onClick={() => { setSelectedRule('NET_C2_Beacon_Pattern'); setRuleModalOpen(true) }}>View Rule</a></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        {/* Extracted Files */}
        <TabPanel id="ext-files" activeTab={sandboxTab}>
          <div className="audit-card">
            <div className="audit-card-header"><div className="audit-card-title"><h3>Extracted Files</h3><span className="count">4</span></div></div>
            <div className="table-scroll" style={{ maxHeight: 400 }}>
              <table className="data-table">
                <thead><tr><th>File Name</th><th>Type</th><th>Size</th><th>SHA-256</th><th>Verdict</th></tr></thead>
                <tbody>
                  <tr><td>dropped_payload.exe</td><td>PE32</td><td>245 KB</td><td className="font-mono text-[11px]">8a7b6c5d4e3f2a1b...</td><td><Tag variant="alert">Malicious</Tag></td></tr>
                  <tr><td>config.dat</td><td>Data</td><td>12 KB</td><td className="font-mono text-[11px]">f1e2d3c4b5a69788...</td><td><Tag variant="caution">Suspicious</Tag></td></tr>
                  <tr><td>update.vbs</td><td>VBScript</td><td>3 KB</td><td className="font-mono text-[11px]">1a2b3c4d5e6f7890...</td><td><Tag variant="alert">Malicious</Tag></td></tr>
                  <tr><td>readme.txt</td><td>Text</td><td>1 KB</td><td className="font-mono text-[11px]">0f1e2d3c4b5a6978...</td><td><Tag variant="success">Clean</Tag></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        {/* Extracted Strings */}
        <TabPanel id="ext-strings" activeTab={sandboxTab}>
          <div className="audit-card">
            <div className="audit-card-header">
              <div className="audit-card-title"><h3>Extracted Strings</h3><span className="count">156</span></div>
              <div className="audit-card-actions">
                <div className="audit-search"><SearchIcon /><input type="text" placeholder="Filter strings..." /></div>
              </div>
            </div>
            <div className="rpt-code-block" style={{ maxHeight: 400, overflow: 'auto', padding: '16px 20px' }}>
{`cmd.exe /c whoami
powershell -enc aQBlAHgAIAAoAE4AZQB3AC0A...
http://malware-c2.example.net/beacon
http://malware-c2.example.net/exfil?id=
HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
%TEMP%\\dropped_payload.exe
%TEMP%\\config.dat
kernel32.dll
ntdll.dll
VirtualAlloc
WriteProcessMemory
CreateRemoteThread
NtCreateThreadEx
GetProcAddress
LoadLibraryA
InternetOpenA
InternetConnectA
HttpSendRequestA
RegSetValueExA
Global\\MTX_8a7b6c
Mozilla/5.0 (compatible; MSIE 10.0)
POST /beacon HTTP/1.1
Content-Type: application/octet-stream`}
            </div>
          </div>
        </TabPanel>

        {/* OSINT Lookups */}
        <TabPanel id="osint" activeTab={sandboxTab}>
          <div className="audit-card">
            <div className="audit-card-header"><div className="audit-card-title"><h3>OSINT Lookups</h3></div></div>
            <div style={{ padding: '16px 20px' }}>
              <div className="rpt-scan-chips">
                <div className="rpt-scan-chip active">VirusTotal</div>
                <div className="rpt-scan-chip">AlienVault OTX</div>
                <div className="rpt-scan-chip">Shodan</div>
                <div className="rpt-scan-chip">AbuseIPDB</div>
                <div className="rpt-scan-chip">ThreatCrowd</div>
              </div>
            </div>
            <div className="table-scroll" style={{ maxHeight: 400 }}>
              <table className="data-table">
                <thead><tr><th>Source</th><th>Indicator</th><th>Type</th><th>Result</th><th>Last Seen</th></tr></thead>
                <tbody>
                  <tr><td>VirusTotal</td><td>475a021bbfb...</td><td>File Hash</td><td><Tag variant="alert">48/72 Detections</Tag></td><td>2023-12-15</td></tr>
                  <tr><td>VirusTotal</td><td>185.234.72.14</td><td>IP Address</td><td><Tag variant="alert">Malicious</Tag></td><td>2023-12-14</td></tr>
                  <tr><td>AlienVault OTX</td><td>malware-c2.example.net</td><td>Domain</td><td><Tag variant="caution">Known C2</Tag></td><td>2023-12-10</td></tr>
                  <tr><td>AbuseIPDB</td><td>185.234.72.14</td><td>IP Address</td><td><Tag variant="alert">95% Abuse Score</Tag></td><td>2023-12-15</td></tr>
                  <tr><td>Shodan</td><td>185.234.72.14</td><td>IP Address</td><td>Open ports: 80, 443, 8080</td><td>2023-12-12</td></tr>
                  <tr><td>ThreatCrowd</td><td>malware-c2.example.net</td><td>Domain</td><td><Tag variant="caution">Associated w/ malware</Tag></td><td>2023-11-28</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {/* YARA Rule Modal */}
      <Modal
        open={ruleModalOpen}
        onClose={() => setRuleModalOpen(false)}
        title={selectedRule}
        width={640}
      >
        <div className="rpt-code-block">{YARA_CODE}</div>
      </Modal>
    </div>
  )
}
