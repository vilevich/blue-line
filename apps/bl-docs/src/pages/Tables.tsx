import { DataTable, Tag, type DataTableColumn } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, Guideline, InlineCode } from '../components/ComponentBlock'

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
]

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
    </Section>
  )
}
