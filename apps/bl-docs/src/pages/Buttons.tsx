import { Button } from '@opswat/blue-line'
import { Section, Subsection, Guideline, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ButtonsPage() {
  return (
    <Section
      id="buttons"
      title="Buttons"
      description="Action triggers in multiple styles: primary, outline, text, brand gradient, icon-only, menu, and danger variants. All buttons are 32px height."
    >
      <Guideline>
        Use <InlineCode>primary</InlineCode> for the main CTA — limit to one per section. Use{' '}
        <InlineCode>outline</InlineCode> for secondary actions. Use{' '}
        <InlineCode>danger</InlineCode> only for destructive actions (delete, remove).
      </Guideline>

      <Subsection title="All Variants">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="text">Text</Button>
              <Button variant="brand">Brand</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="menu">Menu</Button>
            </div>
          }
          code={`<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="text">Text</Button>
<Button variant="brand">Brand</Button>
<Button variant="danger">Danger</Button>
<Button variant="menu">Menu</Button>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Danger Variants">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="danger">Danger</Button>
              <Button variant="outline" danger>Outline Danger</Button>
              <Button variant="text" danger>Text Danger</Button>
            </div>
          }
          code={`<Button variant="danger">Danger</Button>
<Button variant="outline" danger>Outline Danger</Button>
<Button variant="text" danger>Text Danger</Button>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="States">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <Button variant="outline" loading>Loading</Button>
            </div>
          }
          code={`<Button variant="primary" disabled>Disabled</Button>
<Button variant="primary" loading>Loading</Button>
<Button variant="outline" disabled>Disabled</Button>
<Button variant="outline" loading>Loading</Button>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>variant</InlineCode>, <InlineCode>ButtonVariant</InlineCode>, <InlineCode>"outline"</InlineCode>, 'Visual style'],
            [<InlineCode>danger</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Red text for outline/text variants'],
            [<InlineCode>loading</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Show spinner, hide text'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, '40% opacity, no pointer events'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
