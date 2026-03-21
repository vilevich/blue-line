import { useState } from 'react'
import { Modal, SlidePanel, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ModalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <>
      <Section
        id="modals"
        title="Modals"
        description="Centered dialog overlays for confirmations, forms, and focused interactions."
      >
        <Subsection title="Default Modal">
          <ComponentBlock
            preview={
              <div>
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Confirm Action"
                  footer={
                    <>
                      <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
                    </>
                  }
                >
                  <p className="text-[14px] text-[var(--text-subtle)]">
                    Are you sure you want to proceed? This action cannot be undone.
                  </p>
                </Modal>
              </div>
            }
            code={`<Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Description']}
            rows={[
              [<InlineCode>open</InlineCode>, <InlineCode>boolean</InlineCode>, 'Whether modal is visible'],
              [<InlineCode>onClose</InlineCode>, <InlineCode>() =&gt; void</InlineCode>, 'Close callback'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, 'Modal header title'],
              [<InlineCode>footer</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Footer content (buttons)'],
              [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Modal body content'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="slide-panels"
        title="Slide Panels"
        description="Right-side panels for editing forms, detail views, and complex configurations."
      >
        <Subsection title="Default Panel">
          <ComponentBlock
            preview={
              <div>
                <Button variant="outline" onClick={() => setPanelOpen(true)}>
                  Open Panel
                </Button>
                <SlidePanel
                  open={panelOpen}
                  onClose={() => setPanelOpen(false)}
                  title="Edit Details"
                >
                  <p className="text-[14px] text-[var(--text-subtle)]">
                    Panel content for editing or viewing details.
                  </p>
                </SlidePanel>
              </div>
            }
            code={`<SlidePanel
  open={panelOpen}
  onClose={() => setPanelOpen(false)}
  title="Edit Details"
>
  <p>Panel content here.</p>
</SlidePanel>`}
            language="tsx"
          />
        </Subsection>
      </Section>
    </>
  )
}
