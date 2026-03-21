import { PageHeader, Breadcrumb, Skeleton, Tooltip, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function LayoutPage() {
  return (
    <>
      <Section
        id="page-header"
        title="Page Header"
        description="Standard page title row with optional breadcrumb navigation and action buttons."
      >
        <Subsection title="With Breadcrumb">
          <ComponentBlock
            preview={
              <div>
                <PageHeader
                  title="Analysis Details"
                  breadcrumb={
                    <Breadcrumb
                      items={[
                        { label: 'Home', onClick: () => {} },
                        { label: 'Reports', onClick: () => {} },
                        { label: 'Analysis Details' },
                      ]}
                    />
                  }
                  actions={
                    <>
                      <Button variant="outline">Export</Button>
                      <Button variant="primary">Rescan</Button>
                    </>
                  }
                />
              </div>
            }
            code={`<PageHeader
  title="Analysis Details"
  breadcrumb={
    <Breadcrumb items={[
      { label: 'Home', onClick: () => {} },
      { label: 'Reports', onClick: () => {} },
      { label: 'Analysis Details' },
    ]} />
  }
  actions={<>
    <Button variant="outline">Export</Button>
    <Button variant="primary">Rescan</Button>
  </>}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Title Only">
          <ComponentBlock
            preview={
              <div>
                <PageHeader title="Dashboard" />
              </div>
            }
            code={`<PageHeader title="Dashboard" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>breadcrumb</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Breadcrumb navigation above the title'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Page title text'],
              [<InlineCode>actions</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Action buttons on the right side'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="breadcrumb"
        title="Breadcrumb"
        description="Navigation breadcrumb trail showing the current page hierarchy."
      >
        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>items</InlineCode>, <InlineCode>{'BreadcrumbItem[]'}</InlineCode>, '—', 'Array of breadcrumb items ({ label, onClick? })'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="skeleton"
        title="Skeleton"
        description="Loading placeholder shapes for content that hasn't loaded yet."
      >
        <Subsection title="Variants">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3 max-w-sm">
                <Skeleton variant="text" />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="block" width={300} height={80} />
                <Skeleton variant="button" />
              </div>
            }
            code={`<Skeleton variant="text" />
<Skeleton variant="text" width={200} />
<Skeleton variant="block" width={300} height={80} />
<Skeleton variant="button" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Loading Card">
          <ComponentBlock
            preview={
              <div className="p-4 border border-[var(--border-200)] rounded-lg max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton variant="block" width={40} height={40} />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                </div>
                <div className="flex gap-2">
                  <Skeleton variant="button" />
                  <Skeleton variant="button" />
                </div>
              </div>
            }
            code={`<div className="p-4 border rounded-lg max-w-sm">
  <div className="flex items-center gap-3 mb-4">
    <Skeleton variant="block" width={40} height={40} />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
  <div className="flex flex-col gap-2 mb-4">
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" width="80%" />
  </div>
  <div className="flex gap-2">
    <Skeleton variant="button" />
    <Skeleton variant="button" />
  </div>
</div>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>variant</InlineCode>, <InlineCode>{'\'text\' | \'block\' | \'button\''}</InlineCode>, '—', 'Skeleton shape variant'],
              [<InlineCode>width</InlineCode>, <InlineCode>{'number | string'}</InlineCode>, '—', 'Width of the skeleton element'],
              [<InlineCode>height</InlineCode>, <InlineCode>{'number | string'}</InlineCode>, '—', 'Height of the skeleton element'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="tooltip"
        title="Tooltip"
        description="Contextual help text shown on hover."
      >
        <Subsection title="Positions">
          <ComponentBlock
            preview={
              <div className="flex gap-6 items-center py-4">
                <Tooltip content="Top tooltip" position="top">
                  <Button variant="outline">Top</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" position="bottom">
                  <Button variant="outline">Bottom</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" position="left">
                  <Button variant="outline">Left</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" position="right">
                  <Button variant="outline">Right</Button>
                </Tooltip>
              </div>
            }
            code={`<Tooltip content="Top tooltip" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>content</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Tooltip text content'],
              [<InlineCode>position</InlineCode>, <InlineCode>{'\'top\' | \'bottom\' | \'left\' | \'right\''}</InlineCode>, <InlineCode>{'\'top\''}</InlineCode>, 'Tooltip placement relative to trigger'],
              [<InlineCode>maxWidth</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Maximum width of the tooltip in pixels'],
              [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Trigger element'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>
    </>
  )
}
