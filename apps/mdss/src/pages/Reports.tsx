import { useState } from 'react'
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
} from '@opswat/blue-line'
import type { TagVariant } from '@opswat/blue-line'

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

function ColHeader({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-1.5">
      {children}
      <span className="filter-icon">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M3.835 8.77C3.635 8.77 3.455 8.7 3.315 8.56C3.175 8.42 3.105 8.25 3.105 8.05C3.105 7.85 3.175 7.68 3.315 7.54C3.455 7.4 3.625 7.33 3.825 7.33H12.155C12.355 7.33 12.535 7.4 12.675 7.54C12.815 7.68 12.885 7.85 12.885 8.05C12.885 8.25 12.815 8.42 12.675 8.56C12.535 8.7 12.365 8.77 12.165 8.77H3.835Z" />
          <path d="M1.715 5.44C1.515 5.44 1.345 5.37 1.205 5.23C1.065 5.09 0.994995 4.92 0.994995 4.72C0.994995 4.52 1.065 4.35 1.205 4.21C1.345 4.07 1.515 4 1.715 4H14.275C14.475 4 14.645 4.07 14.785 4.21C14.925 4.35 14.995 4.52 14.995 4.72C14.995 4.92 14.925 5.09 14.785 5.23C14.645 5.37 14.475 5.44 14.275 5.44H1.715Z" />
          <path d="M5.515 12.09C5.315 12.09 5.14499 12.02 5.00499 11.88C4.86499 11.74 4.795 11.57 4.795 11.37C4.795 11.17 4.86499 11 5.00499 10.86C5.14499 10.72 5.315 10.65 5.515 10.65H10.475C10.675 10.65 10.845 10.72 10.985 10.86C11.125 11 11.195 11.17 11.195 11.37C11.195 11.57 11.125 11.74 10.985 11.88C10.845 12.02 10.675 12.09 10.475 12.09H5.515Z" />
        </svg>
      </span>
    </span>
  )
}

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
  { id: 'threats', label: 'Threats Prevented' },
  { id: 'dlp', label: 'DLP' },
  { id: 'sanitization', label: 'Sanitization' },
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
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [detailTab, setDetailTab] = useState('overview')
  const [sandboxTab, setSandboxTab] = useState('file-details')
  const [ruleModalOpen, setRuleModalOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState('')

  const pageSize = 20
  const totalPages = Math.ceil(1256 / pageSize)

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
      <div>
        <div className="page-title-row">
          <h1 className="page-title">Reports</h1>
          <button className="btn-icon" title="Refresh"><RefreshIcon /></button>
        </div>

        <div className="audit-card" style={{ marginTop: 20 }}>
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
            <table className="data-table table-fixed" style={{ display: 'block', overflow: 'visible', minWidth: 2400 }}>
              <thead>
                <tr>
                  <th className="col-cb">
                    <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  </th>
                  <th data-col="name" style={{ width: '15%' }}><ColHeader>Job Name</ColHeader></th>
                  <th data-col="status" style={{ width: '8%' }}><ColHeader>Status</ColHeader></th>
                  <th data-col="storage" style={{ width: '14%' }}><ColHeader>Storage Unit</ColHeader></th>
                  <th data-col="totalFiles" style={{ width: '10%' }}><ColHeader>Total Files</ColHeader></th>
                  <th data-col="threats" style={{ width: '12%' }}><ColHeader>Threats Detected</ColHeader></th>
                  <th data-col="dlp" style={{ width: '12%' }}><ColHeader>Data Loss Prevented</ColHeader></th>
                  <th data-col="sanitized" style={{ width: '10%' }}><ColHeader>Sanitized</ColHeader></th>
                  <th data-col="jobType" style={{ width: '10%' }}><ColHeader>Job Type</ColHeader></th>
                  <th data-col="workflow" style={{ width: '10%' }}><ColHeader>Workflow</ColHeader></th>
                  <th data-col="tagged" style={{ width: '8%' }}><ColHeader>Tagged Files</ColHeader></th>
                  <th data-col="kept" style={{ width: '8%' }}><ColHeader>Kept Files</ColHeader></th>
                  <th data-col="copied" style={{ width: '8%' }}><ColHeader>Copied Files</ColHeader></th>
                  <th data-col="moved" style={{ width: '8%' }}><ColHeader>Moved Files</ColHeader></th>
                  <th data-col="deleted" style={{ width: '8%' }}><ColHeader>Deleted Files</ColHeader></th>
                  <th data-col="otherRem" style={{ width: '10%' }}><ColHeader>Other Remediations</ColHeader></th>
                  <th data-col="partition" style={{ width: '8%' }}><ColHeader>Partition</ColHeader></th>
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
    const breadcrumb: BreadcrumbItem[] = [
      { label: 'Reports', onClick: () => setViewState({ view: 'list' }) },
    ]

    return (
      <div>
        <PageHeader
          title="error_log_critical_2023.txt"
          breadcrumb={<Breadcrumb items={breadcrumb} />}
          actions={
            <Button variant="outline" onClick={() => setViewState({ view: 'list' })}>Back to Reports</Button>
          }
        />

        <div className="text-[13px] text-[var(--text-muted)] -mt-2 mb-4">Analysis Details</div>

        <Tabs tabs={DETAIL_TABS} activeTab={detailTab} onTabChange={setDetailTab}>
          {/* ──── Overview ──── */}
          <TabPanel id="overview" activeTab={detailTab}>
            {/* Results Grid */}
            <div className="rpt-results">
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Metascan™ <InfoCircle /></div>
                <div className="rpt-results-value danger">5 / 16</div>
                <div className="rpt-results-desc">Detected Threats</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Adaptive Sandbox <InfoCircle /></div>
                <div className="rpt-results-value danger">Malicious</div>
                <div className="rpt-results-desc">Verdict</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Deep CDR™ <InfoCircle /></div>
                <div className="rpt-results-value success">11</div>
                <div className="rpt-results-desc">Objects Sanitized</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Proactive DLP™ <InfoCircle /></div>
                <div className="rpt-results-value warn">16</div>
                <div className="rpt-results-desc">Objects Detected</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Total Files</div>
                <div className="rpt-results-value">45,887</div>
                <div className="rpt-results-desc">Scanned Files</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Scan Duration</div>
                <div className="rpt-results-value">2h 34m</div>
                <div className="rpt-results-desc">Processing Time</div>
              </div>
              <div className="rpt-results-cell">
                <div className="rpt-results-title">Workflow</div>
                <div className="rpt-results-value" style={{ fontSize: 16 }}>Default Workflow</div>
                <div className="rpt-results-desc">Applied Rule</div>
              </div>
            </div>

            {/* File Details + Remediations */}
            <div className="rpt-detail-split">
              <div className="audit-card">
                <div className="audit-card-header"><div className="audit-card-title"><h3>File Details</h3></div></div>
                <div className="rpt-kv">
                  <KvRow label="File Name">error_log_critical_2023.txt</KvRow>
                  <KvRow label="File Type">Plain Text File (.txt)</KvRow>
                  <KvRow label="File Size">1.3 GB</KvRow>
                  <KvRow label="Storage Unit"><div className="inv-provider"><AwsIcon /> Amazon Storage</div></KvRow>
                  <KvRow label="File Path">/data/logs/2023/error_log_critical_2023.txt</KvRow>
                  <KvRow label="Status"><Tag variant="alert">Blocked</Tag></KvRow>
                  <KvRow label="SHA-256">
                    475a021bbfb6489e54d4...
                    <span className="copy-icon" onClick={() => copyText('475a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f')}><CopyIcon /></span>
                  </KvRow>
                  <KvRow label="MD5">
                    d41d8cd98f00b204e98...
                    <span className="copy-icon" onClick={() => copyText('d41d8cd98f00b204e9800998ecf8427e')}><CopyIcon /></span>
                  </KvRow>
                </div>
              </div>

              <div className="audit-card">
                <div className="audit-card-header"><div className="audit-card-title"><h3>Remediations</h3></div></div>
                <div className="rpt-rem-list">
                  <div className="rpt-rem-item">
                    <div className="rpt-rem-header"><span className="rpt-rem-icon success"><CheckIcon /></span> Tagged</div>
                    <div className="rpt-rem-desc">File tagged with scan metadata and threat classification</div>
                    <div className="rpt-rem-tags">
                      <span className="rpt-rem-tag">threat:malware</span>
                      <span className="rpt-rem-tag">scan:complete</span>
                      <span className="rpt-rem-tag">severity:high</span>
                    </div>
                  </div>
                  <div className="rpt-rem-item">
                    <div className="rpt-rem-header"><span className="rpt-rem-icon success"><CheckIcon /></span> Kept Original</div>
                    <div className="rpt-rem-desc">Original file retained for archival purposes</div>
                  </div>
                  <div className="rpt-rem-item">
                    <div className="rpt-rem-header"><span className="rpt-rem-icon success"><CheckIcon /></span> Copied</div>
                    <div className="rpt-rem-desc">Sanitized copy created in quarantine storage</div>
                    <div className="rpt-rem-dest-list">Destination: <span className="rpt-rem-tag">/quarantine/2023/</span></div>
                  </div>
                  <div className="rpt-rem-item">
                    <div className="rpt-rem-header"><span className="rpt-rem-icon fail"><XIcon /></span> Move Failed</div>
                    <div className="rpt-rem-fail-msg">File could not be moved — <a onClick={e => e.preventDefault()}>view full rule</a></div>
                  </div>
                  <div className="rpt-rem-item">
                    <div className="rpt-rem-header"><span className="rpt-rem-icon fail"><XIcon /></span> Delete Skipped</div>
                    <div className="rpt-rem-desc">Deletion not performed — file retained per policy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* File Versioning Table */}
            <div className="audit-card">
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>File Versioning</h3><span className="count">10</span></div>
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
                      <th data-col="file" className="col-pinned" style={{ width: '15%' }}><ColHeader>File</ColHeader></th>
                      <th data-col="fileVersion" style={{ width: '10%' }}><ColHeader>File Version</ColHeader></th>
                      <th data-col="status" style={{ width: '8%' }}><ColHeader>Status</ColHeader></th>
                      <th data-col="fileType" style={{ width: '10%' }}><ColHeader>File Type</ColHeader></th>
                      <th data-col="malware" style={{ width: '10%' }}><ColHeader>Malware</ColHeader></th>
                      <th data-col="advancedThreats" style={{ width: '12%' }}><ColHeader>Advanced Threats</ColHeader></th>
                      <th data-col="vulnerabilities" style={{ width: '11%' }}><ColHeader>Vulnerabilities</ColHeader></th>
                      <th data-col="dataLoss" style={{ width: '10%' }}><ColHeader>Data Loss</ColHeader></th>
                      <th data-col="sanitization" style={{ width: '10%' }}><ColHeader>Sanitization</ColHeader></th>
                      <th data-col="dateTime" style={{ width: '12%' }}><ColHeader>Date &amp; Time</ColHeader></th>
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
              <div className="audit-pagination">
                <div className="audit-pagination-left">
                  <select defaultValue="10"><option>10</option><option>25</option><option>50</option></select>
                  <span>items per page</span>
                  <span style={{ marginLeft: 8, color: 'var(--text-muted)' }}>|</span>
                  <span style={{ marginLeft: 8 }}>1-10 of 10 items</span>
                </div>
                <div className="audit-pagination-right">
                  <button className="audit-page-btn" disabled>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M9.99994 12.9995C9.80994 12.9995 9.61994 12.9295 9.46994 12.7795L5.21994 8.52945C4.92994 8.23945 4.92994 7.75945 5.21994 7.46945L9.46994 3.21945C9.75994 2.92945 10.2399 2.92945 10.5299 3.21945C10.8199 3.50945 10.8199 3.98945 10.5299 4.27945L6.80994 7.99945L10.5299 11.7195C10.8199 12.0095 10.8199 12.4895 10.5299 12.7795C10.3799 12.9295 10.1899 12.9995 9.99994 12.9995Z" /></svg>
                  </button>
                  <select className="audit-page-select" defaultValue="1"><option value="1">Page 1</option></select>
                  <button className="audit-page-btn" disabled>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M5.99994 12.9995C6.18994 12.9995 6.37994 12.9295 6.52994 12.7795L10.7799 8.52945C11.0699 8.23945 11.0699 7.75945 10.7799 7.46945L6.52994 3.21945C6.23994 2.92945 5.75994 2.92945 5.46994 3.21945C5.17994 3.50945 5.17994 3.98945 5.46994 4.27945L9.18994 7.99945L5.46994 11.7195C5.17994 12.0095 5.17994 12.4895 5.46994 12.7795C5.61994 12.9295 5.80994 12.9995 5.99994 12.9995Z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* ──── Threats Prevented ──── */}
          <TabPanel id="threats" activeTab={detailTab}>
            {/* MetaScan */}
            <div className="audit-card" style={{ marginBottom: 12 }}>
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>MetaScan™ Results</h3></div>
                <div className="rpt-scan-header-stats">
                  <span className="rpt-scan-header-value danger">5</span>
                  <span className="text-[13px] text-[var(--text-muted)]">/ 16 engines detected threats</span>
                </div>
              </div>
              <div className="table-scroll" style={{ maxHeight: 300 }}>
                <table className="data-table">
                  <thead><tr><th>Engine</th><th>Threat Name</th><th>Severity</th><th>Definition Date</th></tr></thead>
                  <tbody>
                    <tr><td>ClamAV</td><td>Win.Trojan.Agent-123456</td><td><Tag variant="alert">Critical</Tag></td><td>2023-12-14</td></tr>
                    <tr><td>ESET</td><td>Trojan.GenericKD.46789</td><td><Tag variant="alert">Critical</Tag></td><td>2023-12-15</td></tr>
                    <tr><td>Kaspersky</td><td>HEUR:Trojan.Win32.Generic</td><td><Tag variant="caution">High</Tag></td><td>2023-12-14</td></tr>
                    <tr><td>Bitdefender</td><td>Gen:Variant.Zusy.44221</td><td><Tag variant="caution">High</Tag></td><td>2023-12-15</td></tr>
                    <tr><td>Sophos</td><td>Mal/Generic-S</td><td><Tag variant="caution">High</Tag></td><td>2023-12-13</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Adaptive Sandbox */}
            <div className="audit-card" style={{ marginBottom: 12 }}>
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>Adaptive Sandbox</h3></div>
                <div className="flex items-center gap-2">
                  <button className="btn-text" onClick={() => { setSandboxTab('file-details'); setViewState({ view: 'sandbox', index: viewState.index }) }}>View Extended Details</button>
                </div>
              </div>
              <div className="rpt-sandbox-verdict">
                <WarnTriangle />
                <span className="verdict-text">Malicious</span>
                <span className="text-[13px] text-[var(--text-muted)] ml-auto">Confidence: 98%</span>
              </div>
              <div className="p-4 px-5">
                <div className="rpt-section-title" style={{ marginBottom: 12, padding: 0 }}>Threat Indicators</div>
                <div className="rpt-kv">
                  <KvRow label="Behavior">Process injection, registry modification, network callback</KvRow>
                  <KvRow label="Network">C2 communication detected — 185.234.72.x:443</KvRow>
                  <KvRow label="File System">Created 3 files in %TEMP%, modified registry run keys</KvRow>
                  <KvRow label="MITRE ATT&CK">T1055 (Process Injection), T1547.001 (Registry Run Keys)</KvRow>
                </div>
              </div>
            </div>

            {/* IoC Table */}
            <div className="audit-card">
              <div className="audit-card-header"><div className="audit-card-title"><h3>Indicators of Compromise</h3><span className="count">6</span></div></div>
              <div className="table-scroll" style={{ maxHeight: 300 }}>
                <table className="data-table">
                  <thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Severity</th></tr></thead>
                  <tbody>
                    <tr><td>IP Address</td><td>185.234.72.14</td><td>C2 Server</td><td><Tag variant="alert">Critical</Tag></td></tr>
                    <tr><td>Domain</td><td>malware-c2.example.net</td><td>Command and Control</td><td><Tag variant="alert">Critical</Tag></td></tr>
                    <tr><td>File Hash</td><td>a1b2c3d4e5f6...</td><td>Dropped payload</td><td><Tag variant="caution">High</Tag></td></tr>
                    <tr><td>Registry</td><td>HKCU\Software\Microsoft\Windows\Run</td><td>Persistence mechanism</td><td><Tag variant="caution">High</Tag></td></tr>
                    <tr><td>URL</td><td>https://malware-c2.example.net/beacon</td><td>Beacon endpoint</td><td><Tag variant="alert">Critical</Tag></td></tr>
                    <tr><td>Mutex</td><td>Global\MTX_8a7b6c</td><td>Infection marker</td><td><Tag variant="accent">Medium</Tag></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          {/* ──── DLP ──── */}
          <TabPanel id="dlp" activeTab={detailTab}>
            <div className="audit-card" style={{ marginBottom: 12 }}>
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>Proactive DLP™</h3></div>
                <div className="rpt-scan-header-stats">
                  <span className="rpt-scan-header-value warn">16</span>
                  <span className="text-[13px] text-[var(--text-muted)]">sensitive data objects detected</span>
                </div>
              </div>
              <div className="rpt-cat-grid">
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-red-700)' }}>●</span><div><div className="text-[13px] font-medium">Credit Card Numbers</div><div className="text-[12px] text-[var(--text-muted)]">5 instances found</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-yellow-700)' }}>●</span><div><div className="text-[13px] font-medium">Social Security Numbers</div><div className="text-[12px] text-[var(--text-muted)]">4 instances found</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-yellow-700)' }}>●</span><div><div className="text-[13px] font-medium">Email Addresses</div><div className="text-[12px] text-[var(--text-muted)]">3 instances found</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-blue-700)' }}>●</span><div><div className="text-[13px] font-medium">Phone Numbers</div><div className="text-[12px] text-[var(--text-muted)]">2 instances found</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-blue-700)' }}>●</span><div><div className="text-[13px] font-medium">API Keys</div><div className="text-[12px] text-[var(--text-muted)]">1 instance found</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--text-muted)' }}>●</span><div><div className="text-[13px] font-medium">IP Addresses</div><div className="text-[12px] text-[var(--text-muted)]">1 instance found</div></div></div>
              </div>
            </div>

            <div className="audit-card">
              <div className="audit-card-header"><div className="audit-card-title"><h3>Detection Details</h3></div></div>
              <div className="table-scroll" style={{ maxHeight: 300 }}>
                <table className="data-table">
                  <thead><tr><th>Category</th><th>Pattern</th><th>Location</th><th>Confidence</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr><td>Credit Card</td><td>VISA ****-****-****-4532</td><td>Line 234</td><td>99%</td><td><Tag variant="success">Redacted</Tag></td></tr>
                    <tr><td>Credit Card</td><td>MC ****-****-****-8901</td><td>Line 567</td><td>99%</td><td><Tag variant="success">Redacted</Tag></td></tr>
                    <tr><td>SSN</td><td>***-**-7890</td><td>Line 891</td><td>95%</td><td><Tag variant="success">Redacted</Tag></td></tr>
                    <tr><td>Email</td><td>j***@example.com</td><td>Line 1205</td><td>98%</td><td><Tag variant="accent">Flagged</Tag></td></tr>
                    <tr><td>API Key</td><td>sk-****...XyZ9</td><td>Line 2340</td><td>97%</td><td><Tag variant="success">Redacted</Tag></td></tr>
                    <tr><td>Phone</td><td>(555) ***-**89</td><td>Line 3100</td><td>90%</td><td><Tag variant="accent">Flagged</Tag></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          {/* ──── Sanitization ──── */}
          <TabPanel id="sanitization" activeTab={detailTab}>
            <div className="audit-card" style={{ marginBottom: 12 }}>
              <div className="audit-card-header">
                <div className="audit-card-title"><h3>Deep CDR™ Sanitization</h3></div>
                <div className="rpt-scan-header-stats">
                  <span className="rpt-scan-header-value success">11</span>
                  <span className="text-[13px] text-[var(--text-muted)]">objects sanitized</span>
                </div>
              </div>
              <div className="rpt-cat-grid">
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-green-800)' }}>●</span><div><div className="text-[13px] font-medium">Macros</div><div className="text-[12px] text-[var(--text-muted)]">4 removed</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-green-800)' }}>●</span><div><div className="text-[13px] font-medium">Embedded Objects</div><div className="text-[12px] text-[var(--text-muted)]">3 sanitized</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-green-800)' }}>●</span><div><div className="text-[13px] font-medium">Active Content</div><div className="text-[12px] text-[var(--text-muted)]">2 disabled</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-blue-700)' }}>●</span><div><div className="text-[13px] font-medium">Hyperlinks</div><div className="text-[12px] text-[var(--text-muted)]">1 neutralized</div></div></div>
                <div className="rpt-cat-cell"><span className="rpt-cat-icon" style={{ color: 'var(--color-blue-700)' }}>●</span><div><div className="text-[13px] font-medium">JavaScript</div><div className="text-[12px] text-[var(--text-muted)]">1 removed</div></div></div>
              </div>
            </div>

            <div className="audit-card">
              <div className="audit-card-header"><div className="audit-card-title"><h3>Sanitization Details</h3></div></div>
              <div className="table-scroll" style={{ maxHeight: 300 }}>
                <table className="data-table">
                  <thead><tr><th>Object Type</th><th>Description</th><th>Location</th><th>Action Taken</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>VBA Macro</td><td>Auto_Open macro with shell execution</td><td>Module1</td><td>Removed</td><td><Tag variant="success">Clean</Tag></td></tr>
                    <tr><td>VBA Macro</td><td>Document_Open with download routine</td><td>ThisDocument</td><td>Removed</td><td><Tag variant="success">Clean</Tag></td></tr>
                    <tr><td>OLE Object</td><td>Embedded executable (.exe)</td><td>Sheet1</td><td>Removed</td><td><Tag variant="success">Clean</Tag></td></tr>
                    <tr><td>OLE Object</td><td>Embedded script (.vbs)</td><td>Sheet2</td><td>Removed</td><td><Tag variant="success">Clean</Tag></td></tr>
                    <tr><td>ActiveX</td><td>Shell.Application control</td><td>UserForm1</td><td>Disabled</td><td><Tag variant="success">Clean</Tag></td></tr>
                    <tr><td>Hyperlink</td><td>External link to malware-c2.example.net</td><td>Cell A15</td><td>Neutralized</td><td><Tag variant="success">Clean</Tag></td></tr>
                  </tbody>
                </table>
              </div>
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
