import { useState } from 'react'
import { DataTable, Tag, ColDropdown, type DataTableColumn, type ColFilterConfig } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, Guideline, InlineCode } from '../components/ComponentBlock'

interface DemoRow extends Record<string, unknown> {
  name: string
  status: string
  provider: string
}

const columns: DataTableColumn<DemoRow>[] = [
  { key: 'name', header: 'Name', render: (row) => row.name },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Tag variant={row.status === 'Operational' ? 'success' : 'alert'}>
        {row.status}
      </Tag>
    ),
  },
  { key: 'provider', header: 'Provider', render: (row) => row.provider },
]

const data: DemoRow[] = [
  { name: 'AWS Account', status: 'Operational', provider: 'Amazon S3' },
  { name: 'Azure Storage', status: 'Operational', provider: 'Azure Blob' },
  { name: 'GCP Bucket', status: 'Error', provider: 'Google Cloud' },
  { name: 'DigitalOcean Spaces', status: 'Operational', provider: 'DigitalOcean' },
  { name: 'MinIO Cluster', status: 'Operational', provider: 'MinIO' },
]

const clickColumns: DataTableColumn<DemoRow>[] = [
  { key: 'name', header: 'Name', render: (row) => row.name },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Tag variant={row.status === 'Operational' ? 'success' : 'alert'}>
        {row.status}
      </Tag>
    ),
  },
  { key: 'provider', header: 'Provider', render: (row) => row.provider },
]

const clickData: DemoRow[] = [
  { name: 'Production S3', status: 'Operational', provider: 'Amazon S3' },
  { name: 'Staging Blob', status: 'Operational', provider: 'Azure Blob' },
  { name: 'Dev Bucket', status: 'Error', provider: 'Google Cloud' },
]

const STATUS_FILTER: ColFilterConfig = {
  label: 'Status Filtering',
  options: ['All', 'Pending', 'Allowed', 'Blocked', 'Failed'],
}

const WORKFLOW_FILTER: ColFilterConfig = {
  label: 'Workflow',
  options: ['All', 'Default Workflow', 'Security Scan', 'DLP Scan', 'Compliance Check', 'Malware Deep Scan', 'Quick Scan', 'Full Analysis'],
}

function ColDropdownDemo() {
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [pinnedCols, setPinnedCols] = useState<string[]>([])
  const [openVariant, setOpenVariant] = useState<'basic' | 'simple' | 'complex' | 'date' | null>(null)

  function handleSort(col: string, dir: 'asc' | 'desc') {
    setSortCol(col)
    setSortDir(dir)
  }

  function handleTogglePin(col: string) {
    setPinnedCols(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    )
  }

  const shared = { sortCol, sortDir, pinnedCols, fixedPin: 'name', maxPins: 2, onSort: handleSort, onTogglePin: handleTogglePin }

  return (
    <div className="flex flex-wrap gap-6">
      {/* Basic */}
      <ComponentBlock
        preview={
          <div className="relative inline-block">
            <button
              className="h-8 px-3 text-paragraph border border-[var(--border-card)] rounded bg-[var(--surface-card)] cursor-pointer hover:bg-[var(--surface-hover)]"
              onClick={() => setOpenVariant(openVariant === 'basic' ? null : 'basic')}
            >
              Basic (sort + pin)
            </button>
            {openVariant === 'basic' && (
              <ColDropdown col="provider" {...shared} onClose={() => setOpenVariant(null)} />
            )}
          </div>
        }
        code={`<ColDropdown
  col="provider"
  sortCol={sortCol}
  sortDir={sortDir}
  pinnedCols={pinnedCols}
  fixedPin="name"
  onSort={handleSort}
  onTogglePin={handleTogglePin}
  onClose={() => setOpen(false)}
/>`}
        language="tsx"
      />

      {/* Simple filter */}
      <ComponentBlock
        preview={
          <div className="relative inline-block">
            <button
              className="h-8 px-3 text-paragraph border border-[var(--border-card)] rounded bg-[var(--surface-card)] cursor-pointer hover:bg-[var(--surface-hover)]"
              onClick={() => setOpenVariant(openVariant === 'simple' ? null : 'simple')}
            >
              Simple filter (≤6)
            </button>
            {openVariant === 'simple' && (
              <ColDropdown col="status" {...shared} filter={STATUS_FILTER} onClose={() => setOpenVariant(null)} />
            )}
          </div>
        }
        code={`<ColDropdown
  col="status"
  {...sortPinProps}
  filter={{ label: 'Status Filtering', options: ['All', 'Pending', 'Allowed', 'Blocked', 'Failed'] }}
  onClose={() => setOpen(false)}
/>`}
        language="tsx"
      />

      {/* Complex filter */}
      <ComponentBlock
        preview={
          <div className="relative inline-block">
            <button
              className="h-8 px-3 text-paragraph border border-[var(--border-card)] rounded bg-[var(--surface-card)] cursor-pointer hover:bg-[var(--surface-hover)]"
              onClick={() => setOpenVariant(openVariant === 'complex' ? null : 'complex')}
            >
              Complex filter (&gt;6)
            </button>
            {openVariant === 'complex' && (
              <ColDropdown col="workflow" {...shared} filter={WORKFLOW_FILTER} onClose={() => setOpenVariant(null)} />
            )}
          </div>
        }
        code={`<ColDropdown
  col="workflow"
  {...sortPinProps}
  filter={{ label: 'Workflow', options: ['All', 'Default Workflow', 'Security Scan', 'DLP Scan', 'Compliance Check', 'Malware Deep Scan', 'Quick Scan', 'Full Analysis'] }}
  onClose={() => setOpen(false)}
/>`}
        language="tsx"
      />

      {/* Date filter */}
      <ComponentBlock
        preview={
          <div className="relative inline-block">
            <button
              className="h-8 px-3 text-paragraph border border-[var(--border-card)] rounded bg-[var(--surface-card)] cursor-pointer hover:bg-[var(--surface-hover)]"
              onClick={() => setOpenVariant(openVariant === 'date' ? null : 'date')}
            >
              Date column
            </button>
            {openVariant === 'date' && (
              <ColDropdown col="dateTime" {...shared} hasDateFilter onClose={() => setOpenVariant(null)} />
            )}
          </div>
        }
        code={`<ColDropdown
  col="dateTime"
  {...sortPinProps}
  hasDateFilter
  onClose={() => setOpen(false)}
/>`}
        language="tsx"
      />
    </div>
  )
}

export function TablesPage() {
  return (
    <Section
      id="tables"
      title="Tables"
      description="Data tables with typed columns, row rendering, hover states, and optional features like selection and expansion."
    >
      <Guideline>
        Use <InlineCode>DataTable</InlineCode> with typed column definitions for type-safe rendering.
        Columns define header text and a render function for each cell.
      </Guideline>

      <Subsection title="Basic Table">
        <ComponentBlock
          preview={
            <DataTable columns={columns} data={data} />
          }
          code={`const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', render: (row) => row.name },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Tag variant="success">{row.status}</Tag>,
  },
  { key: 'provider', header: 'Provider', render: (row) => row.provider },
]

<DataTable columns={columns} data={data} />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Empty State">
        <ComponentBlock
          preview={
            <DataTable columns={columns} data={[]} emptyMessage="No data" />
          }
          code={`<DataTable
  columns={columns}
  data={[]}
  emptyMessage="No data"
/>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Row Click">
        <ComponentBlock
          preview={
            <DataTable
              columns={clickColumns}
              data={clickData}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          }
          code={`<DataTable
  columns={columns}
  data={data}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Column Dropdown">
        <Guideline>
          Use <InlineCode>ColDropdown</InlineCode> for column-level sort, filter, and pin controls in big tables.
          Three variants: <strong>basic</strong> (sort + pin only), <strong>simple filter</strong> (checkboxes for ≤6 options),
          and <strong>complex filter</strong> (search + scrollable checkboxes for &gt;6 options).
          Date columns get an additional time range picker.
          All changes require <strong>Apply</strong> to take effect.
        </Guideline>

        <ColDropdownDemo />
      </Subsection>

      <Subsection title="ColDropdown Props">
        <PropsTable
          headers={['Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>col</InlineCode>, <InlineCode>string</InlineCode>, 'Column identifier'],
            [<InlineCode>sortCol</InlineCode>, <InlineCode>{'string | null'}</InlineCode>, 'Currently sorted column'],
            [<InlineCode>sortDir</InlineCode>, <InlineCode>{"'asc' | 'desc'"}</InlineCode>, 'Current sort direction'],
            [<InlineCode>pinnedCols</InlineCode>, <InlineCode>{'string[]'}</InlineCode>, 'Currently pinned column IDs'],
            [<InlineCode>fixedPin</InlineCode>, <InlineCode>string</InlineCode>, 'Column that is always pinned (first content column)'],
            [<InlineCode>maxPins</InlineCode>, <InlineCode>number</InlineCode>, 'Max user-controllable pins (default: 2)'],
            [<InlineCode>onSort</InlineCode>, <InlineCode>{'(col, dir) => void'}</InlineCode>, 'Sort callback — called on Apply'],
            [<InlineCode>onTogglePin</InlineCode>, <InlineCode>{'(col) => void'}</InlineCode>, 'Pin toggle callback'],
            [<InlineCode>onClose</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, 'Close callback'],
            [<InlineCode>filter</InlineCode>, <InlineCode>{'{ label, options }'}</InlineCode>, 'Checkbox filter config — simple if ≤6 options, complex if >6'],
            [<InlineCode>onFilter</InlineCode>, <InlineCode>{'(col, selected) => void'}</InlineCode>, 'Filter callback — called on Apply with selected options'],
            [<InlineCode>hasDateFilter</InlineCode>, <InlineCode>boolean</InlineCode>, 'Shows date range picker (for time columns)'],
            [<InlineCode>onDateRange</InlineCode>, <InlineCode>{'(col, range) => void'}</InlineCode>, 'Date range callback — called on Apply with selected range'],
            [<InlineCode>searchPlaceholder</InlineCode>, <InlineCode>string</InlineCode>, 'Placeholder for complex filter search input'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="DataTable Props">
        <PropsTable
          headers={['Component', 'Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>key</InlineCode>, <InlineCode>string</InlineCode>, 'Unique key identifying the column'],
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>header</InlineCode>, <InlineCode>string</InlineCode>, 'Column header text'],
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>width</InlineCode>, <InlineCode>string</InlineCode>, 'Column width (e.g. "200px", "30%")'],
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>render</InlineCode>, <InlineCode>{'(row: T) => ReactNode'}</InlineCode>, 'Cell render function'],
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>align</InlineCode>, <InlineCode>{"'left' | 'center' | 'right'"}</InlineCode>, 'Cell text alignment'],
            [<InlineCode>DataTableColumn</InlineCode>, <InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, 'Additional classes on the column cells'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>columns</InlineCode>, <InlineCode>{'DataTableColumn<T>[]'}</InlineCode>, 'Column definitions array'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>data</InlineCode>, <InlineCode>{'T[]'}</InlineCode>, 'Row data array'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>onRowClick</InlineCode>, <InlineCode>{'(row: T) => void'}</InlineCode>, 'Callback when a row is clicked'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>rowKey</InlineCode>, <InlineCode>{'string | ((row: T) => string)'}</InlineCode>, 'Unique key for each row (field name or function)'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>emptyMessage</InlineCode>, <InlineCode>string</InlineCode>, 'Message shown when data array is empty'],
            [<InlineCode>DataTable</InlineCode>, <InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, 'Additional classes on the table wrapper'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
