import { useState } from 'react'
import {
  cn,
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  StatCard,
  StatCardRow,
  Banner,
  Tag,
  Button,
  Pagination,
} from '@opswat/blue-line'

// ─── Donut Lockup ───────────────────────────────────────────────────────────

interface DonutSegment {
  color: string
  label: string
  value: string
  delta?: string
}

interface DonutLockupProps {
  primary: DonutSegment
  secondary: DonutSegment
  /** arc pct of circle that belongs to the secondary (highlight) segment, 0-100 */
  arcPct: number
  highlightColor: string
}

function DonutLockup({ primary, secondary, arcPct, highlightColor }: DonutLockupProps) {
  // SVG donut: r=20, cx=cy=22, circumference ≈ 125.66
  // We draw a full circle for the track, then an arc for the highlight slice
  const r = 20
  const cx = 22
  const cy = 22
  const angle = (arcPct / 100) * 360
  const rad = (angle * Math.PI) / 180
  const x = cx + r * Math.sin(rad)
  const y = cy - r * Math.cos(rad)
  const largeArc = angle > 180 ? 1 : 0
  const arcPath =
    arcPct === 0
      ? ''
      : arcPct >= 100
      ? `M${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.001},${cy - r} Z`
      : `M${cx},${cy - r} A${r},${r} 0 ${largeArc},1 ${x.toFixed(3)},${y.toFixed(3)} L${cx},${cy} Z`

  return (
    <div className="flex items-center gap-4">
      {/* Donut SVG */}
      <svg
        viewBox="0 0 44 44"
        className="shrink-0"
        style={{ width: 64, height: 64 }}
        aria-hidden="true"
      >
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="var(--color-neutral-200)" />
        {/* Highlight arc */}
        {arcPath && <path d={arcPath} fill={highlightColor} />}
        {/* Inner cutout to make it a donut */}
        <circle cx={cx} cy={cy} r={12} fill="var(--surface-card)" />
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {/* Primary row */}
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ background: 'var(--color-neutral-200)' }}
          />
          <span className="text-[12px] font-regular text-[var(--text-subtle)] leading-4 flex-1 min-w-0">
            {primary.label}
          </span>
          <span className="text-[12px] font-regular text-[var(--text-strong)] leading-4 tabular-nums ml-3">
            {primary.value}
            {primary.delta && (
              <span className="text-[var(--text-muted)] ml-1">{primary.delta}</span>
            )}
          </span>
        </div>
        {/* Secondary row */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: highlightColor }} />
          <span className="text-[12px] font-regular text-[var(--text-subtle)] leading-4 flex-1 min-w-0">
            {secondary.label}
          </span>
          <span className="text-[12px] font-regular text-[var(--text-strong)] leading-4 tabular-nums ml-3">
            {secondary.value}
            {secondary.delta && (
              <span className="text-[var(--text-muted)] ml-1">{secondary.delta}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Remediation Ring Item ───────────────────────────────────────────────────

interface RemItemProps {
  pct: number
  label: string
  description: string
  color: string
}

function RemItem({ pct, label, description, color }: RemItemProps) {
  const r = 22
  const cx = 26
  const cy = 26
  const circumference = 2 * Math.PI * r // ≈ 138.23
  const filled = (pct / 100) * circumference
  const gap = circumference - filled

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative w-[52px] h-[52px] shrink-0">
        <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90" aria-hidden="true">
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-neutral-200)"
            strokeWidth={4}
          />
          {/* Fill */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeDasharray={`${filled.toFixed(2)} ${gap.toFixed(2)}`}
            strokeLinecap="round"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-[var(--text-strong)] leading-[1]"
        >
          {pct}%
        </span>
      </div>
      <div className="text-[12px] font-medium text-[var(--text-strong)] leading-4">{label}</div>
      <div className="text-[12px] font-regular text-[var(--text-muted)] leading-4 max-w-[100px]">
        {description}
      </div>
    </div>
  )
}

// ─── Security Trend Chart ────────────────────────────────────────────────────

interface TrendCol {
  label: string
  threats: number  // 0-100 pct
  dataloss: number
  sanitized: number
}

const TREND_DATA: TrendCol[] = [
  { label: 'Jan 15', threats: 42, dataloss: 10, sanitized: 18 },
  { label: 'Jan 18', threats: 56, dataloss: 14, sanitized: 22 },
  { label: 'Jan 21', threats: 34, dataloss: 8,  sanitized: 16 },
  { label: 'Jan 24', threats: 68, dataloss: 16, sanitized: 28 },
  { label: 'Jan 27', threats: 80, dataloss: 20, sanitized: 34 },
  { label: 'Jan 30', threats: 52, dataloss: 12, sanitized: 24 },
  { label: 'Feb 2',  threats: 44, dataloss: 10, sanitized: 20 },
  { label: 'Feb 5',  threats: 60, dataloss: 14, sanitized: 30 },
  { label: 'Feb 8',  threats: 76, dataloss: 18, sanitized: 36 },
  { label: 'Feb 11', threats: 88, dataloss: 22, sanitized: 42 },
]

// ─── Info Bar ────────────────────────────────────────────────────────────────

function InfoBar() {
  const [copied, setCopied] = useState(false)
  const clientId = 'a3f9b2c1-4d8e-4f2a-9c1b-7e3d5f8a2b4c'

  function handleCopy() {
    navigator.clipboard.writeText(clientId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="flex items-center bg-[var(--surface-card)] border border-[var(--border-card)] rounded shadow-card"
      style={{ padding: '16px 20px', gap: 20, marginBottom: 12 }}
    >
      {/* Storage Unit */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Provider icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-800)]"
        >
          <span className="text-[20px] font-medium text-[var(--text-subtle)] leading-[1] select-none">
            A
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-[12px] font-regular text-[var(--text-subtle)] leading-4">
            Storage Unit
          </div>
          <div className="text-[14px] font-medium text-[var(--text-strong)] leading-4 mt-0.5">
            AWS Unit Name
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="self-stretch w-px bg-[var(--border-card)]" />

      {/* Status */}
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-regular text-[var(--text-subtle)] leading-4">Status</div>
        <div className="mt-1">
          <Tag variant="success">Operational</Tag>
        </div>
      </div>

      {/* Divider */}
      <div className="self-stretch w-px bg-[var(--border-card)]" />

      {/* Client ID */}
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-regular text-[var(--text-subtle)] leading-4">
          Client ID
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[14px] font-regular text-[var(--text-strong)] leading-4 truncate min-w-0">
            {clientId}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy Client ID'}
            className={cn(
              'shrink-0 w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors duration-150',
              'bg-transparent border border-[var(--border-default)] text-[var(--text-subtle)]',
              'hover:bg-[var(--hover-subtle)] hover:text-[var(--text-strong)]',
            )}
          >
            {/* Copy icon */}
            <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14} aria-hidden="true">
              <path d="M13 2H6C5.44772 2 5 2.44772 5 3V10C5 10.5523 5.44772 11 6 11H13C13.5523 11 14 10.5523 14 10V3C14 2.44772 13.5523 2 13 2Z" />
              <path d="M11 12.5V14H3C2.45 14 2 13.55 2 13V5H3.5V12.5H11Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function DashboardPage() {
  const [trendPeriod, setTrendPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Page Header */}
      <PageHeader
        title="Dashboard"
        actions={
          <>
            <Button variant="menu" icon="filter">
              All Storage Units
            </Button>
            <Button variant="menu" icon="filter">
              Last 30 days
            </Button>
            <Button variant="outline">Export</Button>
          </>
        }
      />

      {/* 2. Info Bar */}
      <InfoBar />

      {/* 3. Job Monitor Banner */}
      <Banner
        variant="info"
        title="Job Monitor"
        description="2 jobs currently running"
        actions={[
          { label: 'View Running Jobs', onClick: () => {} },
          { label: 'Create Job', onClick: () => {} },
        ]}
      />

      {/* 4. Job Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle
            title="Job Summary"
            count="3 Past"
            countAccent="(+2 Running)"
            actions={
              <Button variant="text">View Reports</Button>
            }
          />
        </CardHeader>
        <div
          className="grid gap-6 p-5"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          <DonutLockup
            arcPct={1}
            highlightColor="var(--color-red-500)"
            primary={{ color: 'var(--color-neutral-200)', label: 'Total', value: '134,785', delta: '(+657)' }}
            secondary={{ color: 'var(--color-red-500)', label: 'Skipped/Failed', value: '135', delta: '(+2)' }}
          />
          <DonutLockup
            arcPct={3}
            highlightColor="var(--color-neutral-800)"
            primary={{ color: 'var(--color-neutral-200)', label: 'Cached', value: '131,000' }}
            secondary={{ color: 'var(--color-neutral-800)', label: 'Scanned', value: '3,785', delta: '(+1,045)' }}
          />
          <DonutLockup
            arcPct={5}
            highlightColor="var(--color-blue-700)"
            primary={{ color: 'var(--color-neutral-200)', label: 'Allowed', value: '2,467', delta: '(+988)' }}
            secondary={{ color: 'var(--color-blue-700)', label: 'Blocked', value: '126', delta: '(+4)' }}
          />
        </div>
      </Card>

      {/* 5. Three Stat Cards Row */}
      <StatCardRow columns={3}>
        <StatCard
          label="Threats Detected"
          value="2,001"
          trend="up"
          trendText="+100 (+1%)"
          headerAction={<Button variant="text">View Reports</Button>}
          legend={[
            { color: 'var(--color-blue-900)', label: 'Known Malware', value: '1,834' },
            { color: 'var(--color-blue-800)', label: 'Malicious Behavior', value: '47' },
            { color: 'var(--color-blue-700)', label: 'Vulnerable Executable', value: '263' },
            { color: 'var(--color-blue-500)', label: 'Reputation Match', value: '436' },
            { color: 'var(--color-blue-300)', label: 'Blocked Origin by Policy', value: '65' },
          ]}
        />

        <StatCard
          label="Data Loss Prevented"
          value="344"
          trend="up"
          trendText="+18 (+5%)"
          headerAction={<Button variant="text">View Reports</Button>}
          legend={[
            { color: 'var(--color-green-900)', label: 'Personal Information', value: '146' },
            { color: 'var(--color-green-800)', label: 'Secrets in Text Files', value: '90' },
            { color: 'var(--color-green-700)', label: 'Credit Card', value: '85' },
            { color: 'var(--color-green-500)', label: 'SSN', value: '47' },
            { color: 'var(--color-green-300)', label: 'Other', value: '65' },
          ]}
        />

        <StatCard
          label="Sanitized"
          value="1,578"
          trend="up"
          trendText="+203 (+15%)"
          headerAction={<Button variant="text">View Reports</Button>}
          legend={[
            { color: 'var(--color-blue-800)', label: 'Image', value: '1,347' },
            { color: 'var(--color-blue-600)', label: 'Hyperlinks', value: '1,013' },
            { color: 'var(--color-blue-500)', label: 'Javascript', value: '436' },
            { color: 'var(--color-blue-400)', label: 'Scripts', value: '263' },
            { color: 'var(--color-blue-300)', label: 'Other', value: '165' },
          ]}
        />
      </StatCardRow>

      {/* 6. Security Trend Card */}
      <Card>
        <CardHeader>
          <CardTitle title="Security Trend" />
          <div className="flex items-center gap-4 ml-auto">
            {/* Legend */}
            <div className="flex items-center gap-4">
              {[
                { color: 'var(--color-red-600)', label: 'Threats Detected' },
                { color: 'var(--color-teal-600)', label: 'Data Loss' },
                { color: 'var(--color-blue-600)', label: 'Sanitized' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-[12px] font-regular text-[var(--text-subtle)] leading-4 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Period tabs */}
            <div className="flex items-center rounded border border-[var(--border-default)] overflow-hidden">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTrendPeriod(p)}
                  className={cn(
                    'h-8 px-3 text-[12px] font-regular cursor-pointer transition-colors duration-150 border-none',
                    p !== '7d' && 'border-l border-[var(--border-default)]',
                    trendPeriod === p
                      ? 'bg-[var(--primary)] text-[var(--text-on-fill)]'
                      : 'bg-transparent text-[var(--text-subtle)] hover:bg-[var(--hover-subtle)] hover:text-[var(--text-strong)]',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* Chart body */}
        <div className="px-5 pb-5 pt-4">
          {/* Y-axis + bars */}
          <div className="flex gap-3">
            {/* Y-axis */}
            <div
              className="flex flex-col justify-between shrink-0 text-right"
              style={{ width: 32, paddingBottom: 20 }}
            >
              {['500', '400', '300', '200', '100', '0'].map((l) => (
                <span
                  key={l}
                  className="text-[10px] font-regular text-[var(--text-muted)] leading-[1]"
                >
                  {l}
                </span>
              ))}
            </div>

            {/* Columns */}
            <div className="flex flex-1 gap-1.5 items-end" style={{ height: 180 }}>
              {TREND_DATA.map((col, i) => (
                <div
                  key={i}
                  className="flex flex-col flex-1 items-center justify-end gap-0"
                  style={{ height: '100%' }}
                >
                  {/* Bar stack */}
                  <div
                    className="w-full flex flex-col justify-end"
                    style={{ height: 'calc(100% - 20px)', gap: 1 }}
                  >
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${col.threats}%`,
                        background: 'var(--color-red-600)',
                        minHeight: col.threats > 0 ? 2 : 0,
                      }}
                    />
                    <div
                      className="w-full"
                      style={{
                        height: `${col.dataloss}%`,
                        background: 'var(--color-teal-600)',
                        minHeight: col.dataloss > 0 ? 2 : 0,
                      }}
                    />
                    <div
                      className="w-full rounded-b-sm"
                      style={{
                        height: `${col.sanitized}%`,
                        background: 'var(--color-blue-600)',
                        minHeight: col.sanitized > 0 ? 2 : 0,
                      }}
                    />
                  </div>
                  {/* X label */}
                  <span className="text-[10px] font-regular text-[var(--text-muted)] leading-[1] mt-1 whitespace-nowrap">
                    {col.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 7. Remediation Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle title="Remediation Actions" />
        </CardHeader>
        <div
          className="p-5 grid gap-6"
          style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
        >
          <RemItem
            pct={92}
            label="File Tagging"
            description="Tag files with metadata on detection"
            color="var(--color-blue-600)"
          />
          <RemItem
            pct={45}
            label="Keep"
            description="Retain files in place after scan"
            color="var(--color-neutral-600)"
          />
          <RemItem
            pct={20}
            label="Copy"
            description="Copy files to quarantine location"
            color="var(--color-blue-500)"
          />
          <RemItem
            pct={18}
            label="Move"
            description="Move files to a secure container"
            color="var(--color-blue-400)"
          />
          <RemItem
            pct={12}
            label="Delete"
            description="Permanently remove threat files"
            color="var(--color-red-600)"
          />
          <RemItem
            pct={5}
            label="Other Remediations"
            description="Custom and policy-based actions"
            color="var(--color-neutral-400)"
          />
        </div>
      </Card>

      {/* 8. File Type Distribution Card */}
      <Card>
        <CardHeader>
          <CardTitle
            title="File Type Distribution"
            actions={<Button variant="text">View Full Report</Button>}
          />
        </CardHeader>
        <div className="dash-filetype-body">
          {/* Treemap */}
          <div className="dash-treemap">
            <div className="dash-treemap-row" style={{ flex: 2.2 }}>
              <div className="dash-treemap-cell dash-tm-archive" style={{ flex: 2.7 }}>
                <span className="dash-tm-name">Archive</span>
                <span className="dash-tm-count">436</span>
              </div>
              <div className="dash-treemap-cell dash-tm-application" style={{ flex: 2 }}>
                <span className="dash-tm-name">Application</span>
                <span className="dash-tm-count">322</span>
              </div>
            </div>
            <div className="dash-treemap-row" style={{ flex: 1.8 }}>
              <div className="dash-treemap-cell dash-tm-executable" style={{ flex: 1.8 }}>
                <span className="dash-tm-name">Executables</span>
                <span className="dash-tm-count">289</span>
              </div>
              <div className="dash-treemap-cell dash-tm-graphical" style={{ flex: 1.1 }}>
                <span className="dash-tm-name">Graphical</span>
                <span className="dash-tm-count">177</span>
              </div>
              <div className="dash-treemap-cell dash-tm-diskimage" style={{ flex: 0.75 }}>
                <span className="dash-tm-name">Disk Image</span>
                <span className="dash-tm-count">120</span>
              </div>
            </div>
            <div className="dash-treemap-row" style={{ flex: 1.4 }}>
              <div className="dash-treemap-cell dash-tm-openssl" style={{ flex: 0.56 }}>
                <span className="dash-tm-name">OpenSSL</span>
                <span className="dash-tm-count">89</span>
              </div>
              <div className="dash-treemap-cell dash-tm-pdf" style={{ flex: 0.4 }}>
                <span className="dash-tm-name">PDF</span>
                <span className="dash-tm-count">63</span>
              </div>
              <div className="dash-treemap-cell dash-tm-text" style={{ flex: 0.34 }}>
                <span className="dash-tm-name">Text</span>
                <span className="dash-tm-count">54</span>
              </div>
              <div className="dash-treemap-cell dash-tm-other" style={{ flex: 0.62 }}>
                <span className="dash-tm-name">Other</span>
                <span className="dash-tm-count">99</span>
              </div>
            </div>
          </div>

          {/* Detection legend */}
          <div className="dash-filetype-legend">
            <div className="dash-filetype-legend-header">
              <span className="dash-filetype-legend-title">Detections</span>
              <span className="dash-filetype-legend-total">562</span>
            </div>
            <div className="dash-filetype-legend-rows">
              {[
                { cls: 'dash-ftl-archive', icon: <path d="M13 4H3C2.45 4 2 4.45 2 5v7c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-5 7H6v-1h2v1zm0-2H6V8h2v1zm0-2H6V6h2v1z"/>, icon2: <path d="M13 2H3L2 4h12L13 2z"/>, name: 'Archive', val: '436', barW: '77.6%', barBg: 'var(--color-neutral-500)' },
                { cls: 'dash-ftl-app', icon: <path d="M11 2H5C4.45 2 4 2.45 4 3v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zM8 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3H5V4h6v6z"/>, name: 'Application', val: '322', barW: '57.3%', barBg: 'var(--color-red-500)' },
                { cls: 'dash-ftl-exe', icon: <path d="M12 2H4C3.45 2 3 2.45 3 3v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zM5 12V4l6 4-6 4z"/>, name: 'Executables', val: '289', barW: '51.4%', barBg: 'var(--color-neutral-400)' },
                { cls: 'dash-ftl-img', icon: <path d="M13 2H3C2.45 2 2 2.45 2 3v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 10H4l3-4 2 2.5 2-3L12 12zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>, name: 'Graphical', val: '177', barW: '31.5%', barBg: 'var(--color-red-300)' },
                { cls: 'dash-ftl-pdf', icon: <path d="M12 1H4C3.45 1 3 1.45 3 2v12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM5 5h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/>, name: 'PDF', val: '63', barW: '11.2%', barBg: 'var(--color-red-400)' },
                { cls: 'dash-ftl-other', icon: <path d="M13 2H3C2.45 2 2 2.45 2 3v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-2 8H5v-1h6v1zm0-2H5V7h6v1zm0-2H5V5h6v1z"/>, name: 'Other', val: '99', barW: '17.6%', barBg: 'var(--color-neutral-300)' },
              ].map((row) => (
                <div key={row.name} className="dash-filetype-legend-row">
                  <div className={`dash-ftl-icon ${row.cls}`}>
                    <svg viewBox="0 0 16 16" fill="currentColor">{row.icon}{row.icon2}</svg>
                  </div>
                  <div className="dash-ftl-info">
                    <span className="dash-ftl-name">{row.name}</span>
                    <div className="dash-ftl-bar-wrap">
                      <div className="dash-ftl-bar" style={{ width: row.barW, background: row.barBg }} />
                    </div>
                  </div>
                  <span className="dash-ftl-val">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 9. Jobs in Range Table */}
      <Card>
        <CardHeader>
          <CardTitle
            title="Jobs in Range"
            count="5"
            actions={<Button variant="text">View All Jobs</Button>}
          />
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Files Processed</th>
                <th>Detections</th>
                <th>Start Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'AWS Production Full Scan', status: 'Running', statusVariant: 'accent' as const, type: 'Scan Now', typeCls: 'dash-jt-scan-now', files: '45,231', pct: 67, detections: '312', time: 'Feb 26, 2026 08:14 AM' },
                { name: 'SharePoint Weekly Scheduled', status: 'Running', statusVariant: 'accent' as const, type: 'Scheduled Scan', typeCls: 'dash-jt-scheduled', files: '12,874', pct: 38, detections: '47', time: 'Feb 26, 2026 09:00 AM' },
                { name: 'Alibaba Real-Time Monitor', status: 'Complete', statusVariant: 'success' as const, type: 'Real-Time Scan', typeCls: 'dash-jt-realtime', files: '78,602', pct: 100, detections: '1,204', time: 'Feb 25, 2026 11:30 PM' },
                { name: 'Azure Blob Incremental Scan', status: 'Failed', statusVariant: 'alert' as const, type: 'Scheduled Scan', typeCls: 'dash-jt-scheduled', files: '5,119', pct: 22, detections: '', time: 'Feb 25, 2026 06:00 AM', failed: true },
                { name: 'Google Cloud Storage Audit', status: 'Cancelled', statusVariant: 'inactive' as const, type: 'Scan Now', typeCls: 'dash-jt-scan-now', files: '0', pct: 0, detections: '', time: 'Feb 24, 2026 03:45 PM' },
              ].map((job) => (
                <tr key={job.name}>
                  <td>{job.name}</td>
                  <td><Tag variant={job.statusVariant}>{job.status}</Tag></td>
                  <td><span className={`dash-job-type-tag ${job.typeCls}`}>{job.type}</span></td>
                  <td>
                    <div className="jobs-files-progress">
                      <span>{job.files}</span>
                      <div className="jobs-files-bar">
                        <div
                          className="jobs-files-bar-fill"
                          style={{
                            width: `${job.pct}%`,
                            ...(job.failed ? { background: 'var(--danger)' } : {}),
                          }}
                        />
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{job.pct}%</span>
                    </div>
                  </td>
                  <td className={job.detections ? 'jobs-detections' : 'jobs-detections none'}>
                    {job.detections || '—'}
                  </td>
                  <td>{job.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 10. Upcoming Scheduled Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle
            title="Upcoming Scheduled Jobs"
            count="3"
            actions={
              <div className="flex items-center gap-2">
                <div className="audit-search">
                  <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 2C9.76142 2 12 4.23858 12 7C12 8.11285 11.6353 9.13998 11.0205 9.9707L14.0713 13.0068L14.1221 13.0645C14.3629 13.3585 14.3471 13.7932 14.0732 14.0684C13.781 14.3615 13.3061 14.3622 13.0127 14.0703L9.95801 11.0303C9.12955 11.6393 8.1071 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2ZM7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5Z" />
                  </svg>
                  <input type="text" placeholder="Search jobs..." />
                </div>
                <button className="audit-filter-btn" title="Filter">
                  <svg viewBox="0 0 16 16" fill="currentColor" width={16} height={16}>
                    <path d="M4.75 7.15V2H3.25V7.15C2.52 7.45 2 8.16 2 9C2 9.84 2.52 10.55 3.25 10.85V14H4.75V10.85C5.48 10.55 6 9.84 6 9C6 8.16 5.48 7.45 4.75 7.15Z" />
                    <path d="M10 5C10 4.16 9.48 3.45 8.75 3.15V2H7.25V3.15C6.52 3.45 6 4.16 6 5C6 5.84 6.52 6.55 7.25 6.85V14H8.75V6.85C9.48 6.55 10 5.84 10 5Z" />
                    <path d="M14 11C14 10.16 13.48 9.45 12.75 9.15V2H11.25V9.15C10.52 9.45 10 10.16 10 11C10 11.84 10.52 12.55 11.25 12.85V14H12.75V12.85C13.48 12.55 14 11.84 14 11Z" />
                  </svg>
                </button>
              </div>
            }
          />
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Scheduled Scan</th>
                <th>Workflow</th>
                <th>Partition</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'AWS S3 Daily Incremental', date: 'Feb 27, 2026 02:00 AM', workflow: 'Default Workflow', partition: 'aws-prod-bucket-1' },
                { name: 'SharePoint Compliance Scan', date: 'Feb 28, 2026 06:00 AM', workflow: 'Compliance Workflow', partition: 'sharepoint-corp' },
                { name: 'Monthly Full Archive Sweep', date: 'Mar 1, 2026 12:00 AM', workflow: 'Deep Scan Workflow', partition: 'alibaba-archive-zone' },
              ].map((job) => (
                <tr key={job.name}>
                  <td>{job.name}</td>
                  <td>
                    <div className="dash-schedule-cell">
                      <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14, color: 'var(--text-muted)', flexShrink: 0 }}>
                        <path d="M13 2h-1V1h-1.5v1h-5V1H4v1H3C2.45 2 2 2.45 2 3v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 11H3V5h10v8zM5 7H4v1h1V7zm2 0H6v1h1V7zm2 0H8v1h1V7zm2 0h-1v1h1V7zM5 9H4v1h1V9zm2 0H6v1h1V9zm2 0H8v1h1V9zm2 0h-1v1h1V9zM5 11H4v1h1v-1zm2 0H6v1h1v-1z" />
                      </svg>
                      <span>{job.date}</span>
                    </div>
                  </td>
                  <td>{job.workflow}</td>
                  <td>{job.partition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={1}
          totalPages={2}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          onPageChange={() => {}}
        />
      </Card>
    </div>
  )
}
