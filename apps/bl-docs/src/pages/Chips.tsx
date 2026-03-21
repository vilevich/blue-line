import { useState } from 'react'
import { Chip } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ChipsPage() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind'])

  return (
    <Section
      id="chips"
      title="Chips"
      description="Interactive filter tokens that can be selected or dismissed. Use for multi-select filters and applied filter display."
    >
      <Subsection title="Colors">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              <Chip color="default">Default</Chip>
              <Chip color="accent">Accent</Chip>
              <Chip color="success">Success</Chip>
              <Chip color="alert">Alert</Chip>
              <Chip color="warn">Warning</Chip>
              <Chip color="caution">Caution</Chip>
              <Chip color="secure">Secure</Chip>
              <Chip color="guide">Guide</Chip>
              <Chip color="inactive">Inactive</Chip>
              <Chip color="disabled">Disabled</Chip>
            </div>
          }
          code={`<Chip color="default">Default</Chip>
<Chip color="accent">Accent</Chip>
<Chip color="success">Success</Chip>
<Chip color="alert">Alert</Chip>
<Chip color="warn">Warning</Chip>
<Chip color="caution">Caution</Chip>
<Chip color="secure">Secure</Chip>
<Chip color="guide">Guide</Chip>
<Chip color="inactive">Inactive</Chip>
<Chip color="disabled" disabled>Disabled</Chip>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Selected State">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              <Chip color="accent" removable>Removable</Chip>
              <Chip color="accent">Default</Chip>
            </div>
          }
          code={`<Chip color="accent" removable>Removable</Chip>
<Chip color="accent">Default</Chip>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Interactive Remove">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              {chips.map((chip) => (
                <Chip
                  key={chip}
                  color="accent"
                  removable
                  onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
                >
                  {chip}
                </Chip>
              ))}
              {chips.length === 0 && (
                <span className="text-[14px] text-[var(--text-muted)]">All chips removed</span>
              )}
            </div>
          }
          code={`const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind'])

{chips.map((chip) => (
  <Chip
    key={chip}
    color="accent"
    removable
    onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
  >
    {chip}
  </Chip>
))}`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>color</InlineCode>, <InlineCode>ChipColor</InlineCode>, <InlineCode>"default"</InlineCode>, 'Chip color variant'],
            [<InlineCode>removable</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Shows remove button'],
            [<InlineCode>onRemove</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, '—', 'Remove callback'],
            [<InlineCode>icon</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Leading icon element'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disables the chip'],
            [<InlineCode>skeleton</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Renders as a loading skeleton'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
