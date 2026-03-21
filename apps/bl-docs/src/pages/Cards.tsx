import { Card, CardHeader, CardTitle, Button } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function CardsPage() {
  return (
    <Section
      id="cards"
      title="Cards"
      description="Container components for grouping related content with optional header, title, and actions."
    >
      <Subsection title="Basic Card">
        <ComponentBlock
          preview={
            <Card className="max-w-md">
              <div className="p-5 text-[14px] text-[var(--text-subtle)]">
                Card content goes here. Cards are the primary container for sections of content.
              </div>
            </Card>
          }
          code={`<Card>
  <div className="p-5">Card content goes here.</div>
</Card>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Card with Header">
        <ComponentBlock
          preview={
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle title="Section Title" />
                <Button variant="outline">Action</Button>
              </CardHeader>
              <div className="p-5 text-[14px] text-[var(--text-subtle)]">
                Content beneath the header with border separator.
              </div>
            </Card>
          }
          code={`<Card>
  <CardHeader>
    <CardTitle title="Section Title" />
    <Button variant="outline">Action</Button>
  </CardHeader>
  <div className="p-5">Content beneath the header.</div>
</Card>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Component', 'Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>Card</InlineCode>, <InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, 'Additional classes on the card wrapper'],
            [<InlineCode>CardHeader</InlineCode>, <InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Header content (title + actions)'],
            [<InlineCode>CardTitle</InlineCode>, <InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Title text'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
