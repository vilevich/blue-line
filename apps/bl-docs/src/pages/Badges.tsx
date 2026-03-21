import { BadgeDot, BadgeNumber } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function BadgesPage() {
  return (
    <Section
      id="badges"
      title="Badges"
      description="Status dots and number counters for indicating states and quantities."
    >
      <Subsection title="Badge Dot">
        <ComponentBlock
          preview={
            <div className="flex gap-4 items-center">
              <BadgeDot color="success" />
              <BadgeDot color="alert" />
              <BadgeDot color="accent" />
              <BadgeDot color="warn" />
              <BadgeDot color="neutral" />
            </div>
          }
          code={`<BadgeDot color="success" />
<BadgeDot color="alert" />
<BadgeDot color="accent" />
<BadgeDot color="warn" />
<BadgeDot color="neutral" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Badge Number">
        <ComponentBlock
          preview={
            <div className="flex gap-4 items-center">
              <BadgeNumber value={5} color="accent" />
              <BadgeNumber value={12} color="alert" />
              <BadgeNumber value={99} color="success" />
              <BadgeNumber value={0} color="neutral" />
            </div>
          }
          code={`<BadgeNumber value={5} color="accent" />
<BadgeNumber value={12} color="alert" />
<BadgeNumber value={99} color="success" />
<BadgeNumber value={0} color="neutral" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>color</InlineCode>, <InlineCode>BadgeColor</InlineCode>, <InlineCode>"neutral"</InlineCode>, 'Badge color'],
            [<InlineCode>value</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Number to display (BadgeNumber only)'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
