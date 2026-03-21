import { PageHeader, Breadcrumb, Skeleton, Tooltip, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock } from '../components/ComponentBlock'

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
      </Section>
    </>
  )
}
