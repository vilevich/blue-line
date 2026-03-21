import { Tag, TagGroup } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function TagsPage() {
  return (
    <Section
      id="tags"
      title="Tags"
      description="Read-only status labels in semantic colors. Use for scan results, status indicators, and categorical labels."
    >
      <Subsection title="Semantic Variants">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="accent">Accent</Tag>
              <Tag variant="alert">Alert</Tag>
              <Tag variant="warn">Warning</Tag>
              <Tag variant="caution">Caution</Tag>
              <Tag variant="guide">Guide</Tag>
              <Tag variant="inactive">Inactive</Tag>
              <Tag variant="secure">Secure</Tag>
            </div>
          }
          code={`<Tag variant="neutral">Neutral</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="accent">Accent</Tag>
<Tag variant="alert">Alert</Tag>
<Tag variant="warn">Warning</Tag>
<Tag variant="caution">Caution</Tag>
<Tag variant="guide">Guide</Tag>
<Tag variant="inactive">Inactive</Tag>
<Tag variant="secure">Secure</Tag>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Tag Group">
        <ComponentBlock
          preview={
            <TagGroup>
              <Tag variant="success">Active</Tag>
              <Tag variant="accent">Running</Tag>
              <Tag variant="neutral">Pending</Tag>
            </TagGroup>
          }
          code={`<TagGroup>
  <Tag variant="success">Active</Tag>
  <Tag variant="accent">Running</Tag>
  <Tag variant="neutral">Pending</Tag>
</TagGroup>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>variant</InlineCode>, <InlineCode>TagVariant</InlineCode>, <InlineCode>"neutral"</InlineCode>, 'Semantic color variant'],
            [<InlineCode>keyword</InlineCode>, <InlineCode>TagKeywordColor</InlineCode>, '—', 'Override color for keyword tags'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
