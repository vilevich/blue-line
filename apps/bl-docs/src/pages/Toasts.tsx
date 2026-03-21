import { Toaster, Banner } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock } from '../components/ComponentBlock'

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
      </Section>
    </>
  )
}
