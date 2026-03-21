import { useState } from 'react'
import { Pagination } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function PaginationPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  return (
    <Section
      id="pagination"
      title="Pagination"
      description="Table pagination with page size selector, page navigation, and row count display."
    >
      <Subsection title="Default">
        <ComponentBlock
          preview={
            <Pagination
              totalPages={8}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          }
          code={`const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(20)

<Pagination
  totalPages={8}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>totalPages</InlineCode>, <InlineCode>number</InlineCode>, 'Total number of pages'],
            [<InlineCode>page</InlineCode>, <InlineCode>number</InlineCode>, 'Current page (1-based)'],
            [<InlineCode>pageSize</InlineCode>, <InlineCode>number</InlineCode>, 'Rows per page'],
            [<InlineCode>onPageChange</InlineCode>, <InlineCode>{'(page: number) => void'}</InlineCode>, 'Page change callback'],
            [<InlineCode>onPageSizeChange</InlineCode>, <InlineCode>{'(size: number) => void'}</InlineCode>, 'Page size change callback'],
            [<InlineCode>pageSizeOptions</InlineCode>, <InlineCode>{'number[]'}</InlineCode>, 'Available page size options (e.g. [10, 20, 50, 100])'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
