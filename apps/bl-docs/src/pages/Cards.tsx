import { Card, CardHeader, CardTitle, Button, StatCard, StatCardRow, KeyValueBar } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function CardsPage() {
  return (
    <Section
      id="cards"
      title="Cards"
      description="Container components for grouping related content with optional header, title, and actions. Stat cards display key metrics with trends and legends."
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

      <Subsection title="Card with Count">
        <ComponentBlock
          preview={
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle title="Active Users" count="24" countAccent="3 new" />
              </CardHeader>
              <div className="p-5 text-[14px] text-[var(--text-subtle)]">
                User list content would go here.
              </div>
            </Card>
          }
          code={`<Card>
  <CardHeader>
    <CardTitle title="Active Users" count="24" countAccent="3 new" />
  </CardHeader>
  <div className="p-5">User list content would go here.</div>
</Card>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Key-Value Bar">
        <ComponentBlock
          preview={
            <Card>
              <CardHeader>
                <CardTitle title="Job" actions={<Button variant="text">Job Details</Button>} />
              </CardHeader>
              <KeyValueBar items={[
                { label: 'Storage Unit', value: 'AWS Drive' },
                { label: 'Scan Type', value: 'Scheduled' },
                { label: 'Status', value: 'Complete' },
                { label: 'Workflow', value: 'Default Workflow' },
                { label: 'Started', value: '27/05/25 11:45' },
                { label: 'Priority', value: 'Low' },
              ]} />
            </Card>
          }
          code={`<Card>
  <CardHeader>
    <CardTitle title="Job" actions={<Button variant="text">Job Details</Button>} />
  </CardHeader>
  <KeyValueBar items={[
    { label: 'Storage Unit', value: 'AWS Drive' },
    { label: 'Scan Type', value: 'Scheduled' },
    { label: 'Status', value: 'Complete' },
    { label: 'Workflow', value: 'Default Workflow' },
    { label: 'Started', value: '27/05/25 11:45' },
    { label: 'Priority', value: 'Low' },
  ]} />
</Card>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Stat Cards">
        <ComponentBlock
          preview={
            <StatCardRow columns={3}>
              <StatCard
                label="Threats Detected"
                value="1,247"
                trend="up"
                trendText="+12%"
                legend={[
                  { color: 'var(--color-red-700)', label: 'Critical', value: 45 },
                  { color: 'var(--color-orange-700)', label: 'High', value: 302 },
                  { color: 'var(--color-yellow-700)', label: 'Medium', value: 900 },
                ]}
              />
              <StatCard label="Files Sanitized" value="8,432" trend="up" trendText="+5%" />
              <StatCard label="DLP Incidents" value="156" trend="down" trendText="-8%" />
            </StatCardRow>
          }
          code={`<StatCardRow columns={3}>
  <StatCard
    label="Threats Detected"
    value="1,247"
    trend="up"
    trendText="+12%"
    legend={[
      { color: 'var(--color-red-700)', label: 'Critical', value: 45 },
      { color: 'var(--color-orange-700)', label: 'High', value: 302 },
      { color: 'var(--color-yellow-700)', label: 'Medium', value: 900 },
    ]}
  />
  <StatCard label="Files Sanitized" value="8,432" trend="up" trendText="+5%" />
  <StatCard label="DLP Incidents" value="156" trend="down" trendText="-8%" />
</StatCardRow>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Component', 'Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>Card</InlineCode>, <InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, 'Additional classes on the card wrapper'],
            [<InlineCode>Card</InlineCode>, <InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Card content'],
            [<InlineCode>CardHeader</InlineCode>, <InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Header content (title + actions)'],
            [<InlineCode>CardTitle</InlineCode>, <InlineCode>title</InlineCode>, <InlineCode>string</InlineCode>, 'Title text'],
            [<InlineCode>CardTitle</InlineCode>, <InlineCode>count</InlineCode>, <InlineCode>string</InlineCode>, 'Count badge displayed next to the title'],
            [<InlineCode>CardTitle</InlineCode>, <InlineCode>countAccent</InlineCode>, <InlineCode>string</InlineCode>, 'Accent text inside the count badge'],
            [<InlineCode>CardTitle</InlineCode>, <InlineCode>actions</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Action elements rendered in the title row'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>label</InlineCode>, <InlineCode>string</InlineCode>, 'Metric label text'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>value</InlineCode>, <InlineCode>string</InlineCode>, 'Metric value'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>trend</InlineCode>, <InlineCode>{"'up' | 'down'"}</InlineCode>, 'Trend direction arrow'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>trendText</InlineCode>, <InlineCode>string</InlineCode>, 'Trend percentage or description'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>legend</InlineCode>, <InlineCode>{'{ color: string; label: string; value: number }[]'}</InlineCode>, 'Legend items with color, label, and value'],
            [<InlineCode>StatCard</InlineCode>, <InlineCode>headerAction</InlineCode>, <InlineCode>ReactNode</InlineCode>, 'Action element in the stat card header'],
            [<InlineCode>StatCardRow</InlineCode>, <InlineCode>columns</InlineCode>, <InlineCode>number</InlineCode>, 'Number of columns in the stat card grid'],
            [<InlineCode>KeyValueBar</InlineCode>, <InlineCode>items</InlineCode>, <InlineCode>{'{ label: string; value: string }[]'}</InlineCode>, 'Array of label/value pairs to display horizontally'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
