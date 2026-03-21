import { Chip } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ChipsPage() {
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
            </div>
          }
          code={`<Chip color="default">Default</Chip>
<Chip color="accent">Accent</Chip>
<Chip color="success">Success</Chip>
<Chip color="alert">Alert</Chip>
<Chip color="warn">Warning</Chip>
<Chip color="caution">Caution</Chip>`}
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

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>color</InlineCode>, <InlineCode>ChipColor</InlineCode>, <InlineCode>"default"</InlineCode>, 'Chip color'],
            [<InlineCode>removable</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Shows remove button'],
            [<InlineCode>onRemove</InlineCode>, <InlineCode>() =&gt; void</InlineCode>, '—', 'Remove callback'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
