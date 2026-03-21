import { PageHeader, Breadcrumb, Skeleton, Tooltip, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, Guideline, InlineCode } from '../components/ComponentBlock'

export function LayoutPage() {
  return (
    <>
      <Section
        id="page-header"
        title="Content Header"
        description="Standard page title row with optional breadcrumb navigation and action buttons. Used at the top of every page."
      >
        <Guideline>
          The content header is the primary navigation landmark for every page. It provides the page
          title (H2), optional breadcrumb trail, and up to 3 action buttons (or 4 with one icon-only).
        </Guideline>

        <Subsection title="Title Only">
          <ComponentBlock
            preview={
              <div className="w-full">
                <PageHeader title="Dashboard" />
              </div>
            }
            code={`<PageHeader title="Dashboard" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With Actions">
          <ComponentBlock
            preview={
              <div className="w-full">
                <PageHeader
                  title="Dashboard"
                  actions={
                    <>
                      <Button variant="outline">Last 30 days</Button>
                      <Button variant="outline">Organization</Button>
                      <Button variant="primary">Export</Button>
                    </>
                  }
                />
              </div>
            }
            code={`<PageHeader
  title="Dashboard"
  actions={<>
    <Button variant="outline">Last 30 days</Button>
    <Button variant="outline">Organization</Button>
    <Button variant="primary">Export</Button>
  </>}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With Breadcrumb">
          <ComponentBlock
            preview={
              <div className="w-full">
                <PageHeader
                  title="Analysis Details"
                  breadcrumb={
                    <Breadcrumb
                      items={[
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
      { label: 'Reports', onClick: () => navigate('/reports') },
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

        <Subsection title="Skeleton Loading">
          <ComponentBlock
            preview={
              <div className="w-full">
                <div className="flex items-center justify-between h-8">
                  <Skeleton variant="text" width={125} height={32} />
                  <div className="flex items-center gap-2">
                    <Skeleton variant="button" width={80} />
                    <Skeleton variant="button" width={90} />
                    <Skeleton variant="button" width={90} />
                  </div>
                </div>
              </div>
            }
            code={`{/* Skeleton page header */}
<div className="flex items-center justify-between h-8">
  <Skeleton variant="text" width={125} height={32} />
  <div className="flex items-center gap-2">
    <Skeleton variant="button" width={80} />
    <Skeleton variant="button" width={90} />
    <Skeleton variant="button" width={90} />
  </div>
</div>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Skeleton with Breadcrumb">
          <ComponentBlock
            preview={
              <div className="w-full">
                <div className="flex flex-col gap-2 items-start">
                  <Skeleton variant="text" width={180} height={16} />
                  <div className="flex items-center justify-between h-8 w-full">
                    <Skeleton variant="text" width={125} height={32} />
                    <div className="flex items-center gap-2">
                      <Skeleton variant="button" width={80} />
                      <Skeleton variant="button" width={90} />
                      <Skeleton variant="button" width={90} />
                    </div>
                  </div>
                </div>
              </div>
            }
            code={`{/* Skeleton page header with breadcrumb */}
<div className="flex flex-col gap-2 items-start">
  <Skeleton variant="text" width={180} height={16} />
  <div className="flex items-center justify-between h-8 w-full">
    <Skeleton variant="text" width={125} height={32} />
    <div className="flex items-center gap-2">
      <Skeleton variant="button" width={80} />
      <Skeleton variant="button" width={90} />
      <Skeleton variant="button" width={90} />
    </div>
  </div>
</div>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Usage Guidelines">
          <PropsTable
            headers={['Guide Topic', 'Description']}
            rows={[
              ['Maximum buttons & visibility', 'Keep actions visible by default. Max 3 buttons (or 4 with one icon). Only one primary action per page.'],
              ['Icons', 'Refresh is the only icon-only button and must be boxed. Primary buttons may include icons only when a single header action exists.'],
              ['Action grouping', 'Collapse actions only when >2, closely related, and sharing the same interaction pattern. Primary actions never collapse.'],
              ['Order & flow', 'Order right to left: Primary → Secondary → Filters → Icon. Prefer direct actions; avoid multi-step menus.'],
              ['Labels & scope', 'Use action-oriented labels (max 2 words, 3 niche). Header actions are page-global; tab actions go below tabs and must behave consistently across permissions.'],
            ]}
          />
        </Subsection>

        <Subsection title="Real-World Examples">
          <p className="text-paragraph text-[var(--text-subtle)] mb-4">Common content header patterns used across pages.</p>

          <div className="flex flex-col gap-6">
            {/* Dashboard: 4 buttons with icon-only refresh */}
            <ComponentBlock
              preview={
                <div className="w-full">
                  <p className="text-note text-[var(--text-muted)] mb-2">Dashboard — max buttons with icon-only refresh</p>
                  <PageHeader
                    title="Dashboard"
                    actions={
                      <>
                        <Button variant="icon" title="Refresh">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.65 2.35A7.958 7.958 0 0 0 8 0C3.58 0 .01 3.58.01 8S3.58 16 8 16c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35Z" fill="currentColor"/></svg>
                        </Button>
                        <Button variant="outline">Last 30 days</Button>
                        <Button variant="outline">Organization</Button>
                        <Button variant="primary">Export</Button>
                      </>
                    }
                  />
                </div>
              }
              code={`<PageHeader
  title="Dashboard"
  actions={<>
    <Button variant="icon" title="Refresh"><RefreshIcon /></Button>
    <Button variant="outline">Last 30 days</Button>
    <Button variant="outline">Organization</Button>
    <Button variant="primary">Export</Button>
  </>}
/>`}
              language="tsx"
            />

            {/* Audit: single button */}
            <ComponentBlock
              preview={
                <div className="w-full">
                  <p className="text-note text-[var(--text-muted)] mb-2">Audit — refresh only</p>
                  <PageHeader
                    title="Audit"
                    actions={<Button variant="outline">Refresh</Button>}
                  />
                </div>
              }
              code={`<PageHeader
  title="Audit"
  actions={<Button variant="outline">Refresh</Button>}
/>`}
              language="tsx"
            />

            {/* Jobs: primary with icon */}
            <ComponentBlock
              preview={
                <div className="w-full">
                  <p className="text-note text-[var(--text-muted)] mb-2">Jobs — primary with icon + refresh</p>
                  <PageHeader
                    title="Jobs"
                    actions={
                      <>
                        <Button variant="icon" title="Refresh">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.65 2.35A7.958 7.958 0 0 0 8 0C3.58 0 .01 3.58.01 8S3.58 16 8 16c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35Z" fill="currentColor"/></svg>
                        </Button>
                        <Button variant="primary">Create Job</Button>
                      </>
                    }
                  />
                </div>
              }
              code={`<PageHeader
  title="Jobs"
  actions={<>
    <Button variant="icon" title="Refresh"><RefreshIcon /></Button>
    <Button variant="primary">Create Job</Button>
  </>}
/>`}
              language="tsx"
            />
          </div>
        </Subsection>

        <Subsection title="PageHeader Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>breadcrumb</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Breadcrumb navigation above the title'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Page title text (rendered as H2)'],
              [<InlineCode>actions</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Action buttons on the right side (8px gap)'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="breadcrumb"
        title="Breadcrumb"
        description="Navigation breadcrumb trail showing the current page hierarchy. Automatically truncates deep trails with a dropdown."
      >
        <Subsection title="Depths">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3">
                <Breadcrumb items={[
                  { label: 'Reports', onClick: () => {} },
                ]} />
                <Breadcrumb items={[
                  { label: 'Reports', onClick: () => {} },
                  { label: 'Analysis Details' },
                ]} />
                <Breadcrumb items={[
                  { label: 'Home', onClick: () => {} },
                  { label: 'Reports', onClick: () => {} },
                  { label: 'Analysis Details' },
                ]} />
              </div>
            }
            code={`{/* 1 parent */}
<Breadcrumb items={[
  { label: 'Reports', onClick: () => {} },
]} />

{/* 2 parents */}
<Breadcrumb items={[
  { label: 'Reports', onClick: () => {} },
  { label: 'Analysis Details' },
]} />

{/* 3 parents */}
<Breadcrumb items={[
  { label: 'Home', onClick: () => {} },
  { label: 'Reports', onClick: () => {} },
  { label: 'Analysis Details' },
]} />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Truncation">
          <Guideline>
            When there are more items than <InlineCode>maxItems</InlineCode> (default: 4), intermediate
            items collapse into a clickable <strong>...</strong> that opens a dropdown menu.
            The first and last items always remain visible.
          </Guideline>
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3">
                <Breadcrumb items={[
                  { label: 'Home', onClick: () => {} },
                  { label: 'Settings', onClick: () => {} },
                  { label: 'Security', onClick: () => {} },
                  { label: 'Policies', onClick: () => {} },
                  { label: 'Edit Policy' },
                ]} />
                <Breadcrumb items={[
                  { label: 'Home', onClick: () => {} },
                  { label: 'Inventory', onClick: () => {} },
                  { label: 'Accounts', onClick: () => {} },
                  { label: 'AWS Production', onClick: () => {} },
                  { label: 'Units', onClick: () => {} },
                  { label: 'Bucket Details' },
                ]} />
              </div>
            }
            code={`{/* 5 items — auto-truncates to: Home > ... > Policies > Edit Policy */}
<Breadcrumb items={[
  { label: 'Home', onClick: () => {} },
  { label: 'Settings', onClick: () => {} },
  { label: 'Security', onClick: () => {} },
  { label: 'Policies', onClick: () => {} },
  { label: 'Edit Policy' },
]} />

{/* 6 items — "..." dropdown shows 3 hidden pages */}
<Breadcrumb items={[
  { label: 'Home', onClick: () => {} },
  { label: 'Inventory', onClick: () => {} },
  { label: 'Accounts', onClick: () => {} },
  { label: 'AWS Production', onClick: () => {} },
  { label: 'Units', onClick: () => {} },
  { label: 'Bucket Details' },
]} />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Breadcrumb Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>items</InlineCode>, <InlineCode>{'BreadcrumbItem[]'}</InlineCode>, '—', 'Array of breadcrumb items ({ label, onClick? })'],
              [<InlineCode>maxItems</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>4</InlineCode>, 'Max visible items before truncation (0 to disable)'],
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
