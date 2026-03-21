import { useState } from 'react'
import { Modal, SlidePanel, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ModalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelFooterOpen, setPanelFooterOpen] = useState(false)

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
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>open</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Whether modal is visible'],
              [<InlineCode>onClose</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, '—', 'Close callback'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Modal header title'],
              [<InlineCode>footer</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Footer content (buttons)'],
              [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Modal body content'],
              [<InlineCode>width</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Modal width in pixels'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
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

        <Subsection title="With Footer">
          <ComponentBlock
            preview={
              <div>
                <Button variant="outline" onClick={() => setPanelFooterOpen(true)}>
                  Open Panel with Footer
                </Button>
                <SlidePanel
                  open={panelFooterOpen}
                  onClose={() => setPanelFooterOpen(false)}
                  title="Edit Details"
                  footer={
                    <>
                      <Button variant="outline" onClick={() => setPanelFooterOpen(false)}>Cancel</Button>
                      <Button variant="primary" onClick={() => setPanelFooterOpen(false)}>Save</Button>
                    </>
                  }
                >
                  <p className="text-[14px] text-[var(--text-subtle)]">
                    Panel content here.
                  </p>
                </SlidePanel>
              </div>
            }
            code={`<SlidePanel
  open={panelOpen}
  onClose={() => setPanelOpen(false)}
  title="Edit Details"
  footer={
    <>
      <Button variant="outline" onClick={() => setPanelOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setPanelOpen(false)}>Save</Button>
    </>
  }
>
  <p>Panel content here.</p>
</SlidePanel>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>open</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Whether the panel is visible'],
              [<InlineCode>onClose</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, '—', 'Close callback'],
              [<InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Panel header title'],
              [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Panel body content'],
              [<InlineCode>footer</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Footer content (buttons)'],
              [<InlineCode>width</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>400</InlineCode>, 'Panel width in pixels'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>
    </>
  )
}
