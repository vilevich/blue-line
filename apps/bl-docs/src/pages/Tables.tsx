import { DataTable, Tag, type DataTableColumn } from '@opswat/blue-line'
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

      <Subsection title="Props">
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
