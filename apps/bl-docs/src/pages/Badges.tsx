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
              <BadgeDot color="neutral" />
              <BadgeDot color="inactive" />
              <BadgeDot color="secure" />
              <BadgeDot color="success" />
              <BadgeDot color="accent" />
              <BadgeDot color="guide" />
              <BadgeDot color="alert" />
              <BadgeDot color="warn" />
              <BadgeDot color="caution" />
            </div>
          }
          code={`<BadgeDot color="neutral" />
<BadgeDot color="inactive" />
<BadgeDot color="secure" />
<BadgeDot color="success" />
<BadgeDot color="accent" />
<BadgeDot color="guide" />
<BadgeDot color="alert" />
<BadgeDot color="warn" />
<BadgeDot color="caution" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Badge Number">
        <ComponentBlock
          preview={
            <div className="flex gap-4 items-center">
              <BadgeNumber value={1} color="neutral" />
              <BadgeNumber value={2} color="inactive" />
              <BadgeNumber value={3} color="secure" />
              <BadgeNumber value={5} color="success" />
              <BadgeNumber value={8} color="accent" />
              <BadgeNumber value={13} color="guide" />
              <BadgeNumber value={21} color="alert" />
              <BadgeNumber value={34} color="warn" />
              <BadgeNumber value={99} color="caution" />
            </div>
          }
          code={`<BadgeNumber value={1} color="neutral" />
<BadgeNumber value={2} color="inactive" />
<BadgeNumber value={3} color="secure" />
<BadgeNumber value={5} color="success" />
<BadgeNumber value={8} color="accent" />
<BadgeNumber value={13} color="guide" />
<BadgeNumber value={21} color="alert" />
<BadgeNumber value={34} color="warn" />
<BadgeNumber value={99} color="caution" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Skeleton">
        <ComponentBlock
          preview={
            <div className="flex gap-4 items-center">
              <BadgeDot skeleton />
              <BadgeNumber skeleton value={0} />
            </div>
          }
          code={`<BadgeDot skeleton />
<BadgeNumber skeleton value={0} />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>color</InlineCode>, <InlineCode>BadgeColor</InlineCode>, <InlineCode>"neutral"</InlineCode>, 'Badge color variant'],
            [<InlineCode>value</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Number to display (BadgeNumber only)'],
            [<InlineCode>skeleton</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Renders as a loading skeleton'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
