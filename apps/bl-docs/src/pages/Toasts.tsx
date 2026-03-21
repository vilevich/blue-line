import { Toaster, Banner } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ToastsPage() {
  return (
    <>
      <Section
        id="toasts"
        title="Toasts"
        description="Temporary notification messages that appear at the bottom-right of the screen."
      >
        <Subsection title="Variants">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3 relative" style={{ minHeight: 200 }}>
                <Toaster variant="info" visible title="Information message" className="!static !w-full !translate-x-0 !opacity-100" />
                <Toaster variant="success" visible title="Operation completed successfully" className="!static !w-full !translate-x-0 !opacity-100" />
                <Toaster variant="error" visible title="An error occurred" className="!static !w-full !translate-x-0 !opacity-100" />
              </div>
            }
            code={`<Toaster variant="info" visible title="Information message" />
<Toaster variant="success" visible title="Operation completed" />
<Toaster variant="error" visible title="An error occurred" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With Description">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3 relative" style={{ minHeight: 120 }}>
                <Toaster variant="info" visible title="File uploaded" description="report_2024.pdf was successfully uploaded." className="!static !w-full !translate-x-0 !opacity-100" />
              </div>
            }
            code={`<Toaster
  variant="info"
  visible
  title="File uploaded"
  description="report_2024.pdf was successfully uploaded."
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>variant</InlineCode>, <InlineCode>{'\'info\' | \'success\' | \'error\''}</InlineCode>, '—', 'Toast color variant'],
              [<InlineCode>visible</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Whether the toast is visible'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Toast title text'],
              [<InlineCode>description</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Optional description below the title'],
              [<InlineCode>onClose</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, '—', 'Close button callback'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="banners"
        title="Banners"
        description="Persistent notification banners for page-level messages with optional actions."
      >
        <Subsection title="Variants">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3">
                <Banner variant="info" title="Information" description="This is an informational banner." />
                <Banner variant="alert" title="Error" description="Something went wrong." />
                <Banner variant="warn" title="Warning" description="Please review your settings." />
                <Banner variant="neutral" title="Note" description="A neutral informational message." />
              </div>
            }
            code={`<Banner variant="info" title="Information" description="This is an informational banner." />
<Banner variant="alert" title="Error" description="Something went wrong." />
<Banner variant="warn" title="Warning" description="Please review your settings." />
<Banner variant="neutral" title="Note" description="A neutral message." />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With Actions">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3">
                <Banner
                  variant="warn"
                  title="License expiring"
                  description="Your license expires in 3 days."
                  actions={[
                    { label: 'Renew', onClick: () => {} },
                    { label: 'Dismiss', onClick: () => {} },
                  ]}
                />
              </div>
            }
            code={`<Banner
  variant="warn"
  title="License expiring"
  description="Your license expires in 3 days."
  actions={[
    { label: 'Renew', onClick: () => {} },
    { label: 'Dismiss', onClick: () => {} },
  ]}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>variant</InlineCode>, <InlineCode>{'\'info\' | \'alert\' | \'neutral\' | \'warn\''}</InlineCode>, '—', 'Banner color variant'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Banner title'],
              [<InlineCode>description</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Banner description text'],
              [<InlineCode>icon</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Custom icon element'],
              [<InlineCode>actions</InlineCode>, <InlineCode>{'BannerAction[]'}</InlineCode>, '—', 'Action buttons array ({ label, onClick })'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>
    </>
  )
}
