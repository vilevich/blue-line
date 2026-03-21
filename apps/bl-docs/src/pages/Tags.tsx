import { Tag, TagGroup } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function TagsPage() {
  return (
    <Section
      id="tags"
      title="Tags"
      description="Read-only status labels in semantic colors. Available in two modes: Status (filled background) and Keyword (bordered with colored text)."
    >
      <Subsection title="Status Variants">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="inactive">Inactive</Tag>
              <Tag variant="secure">Secure</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="accent">Accent</Tag>
              <Tag variant="guide">Guide</Tag>
              <Tag variant="alert">Alert</Tag>
              <Tag variant="warn">Warn</Tag>
              <Tag variant="caution">Caution</Tag>
            </div>
          }
          code={`<Tag variant="neutral">Neutral</Tag>
<Tag variant="inactive">Inactive</Tag>
<Tag variant="secure">Secure</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="accent">Accent</Tag>
<Tag variant="guide">Guide</Tag>
<Tag variant="alert">Alert</Tag>
<Tag variant="warn">Warn</Tag>
<Tag variant="caution">Caution</Tag>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Keyword Variants">
        <ComponentBlock
          preview={
            <div className="flex flex-wrap gap-2 items-center">
              <Tag keyword>Neutral</Tag>
              <Tag keyword keywordColor="inactive">Inactive</Tag>
              <Tag keyword keywordColor="secure">Secure</Tag>
              <Tag keyword keywordColor="success">Success</Tag>
              <Tag keyword keywordColor="accent">Accent</Tag>
              <Tag keyword keywordColor="guide">Guide</Tag>
              <Tag keyword keywordColor="alert">Alert</Tag>
              <Tag keyword keywordColor="warn">Warn</Tag>
              <Tag keyword keywordColor="caution">Caution</Tag>
            </div>
          }
          code={`<Tag keyword>Neutral</Tag>
<Tag keyword keywordColor="inactive">Inactive</Tag>
<Tag keyword keywordColor="secure">Secure</Tag>
<Tag keyword keywordColor="success">Success</Tag>
<Tag keyword keywordColor="accent">Accent</Tag>
<Tag keyword keywordColor="guide">Guide</Tag>
<Tag keyword keywordColor="alert">Alert</Tag>
<Tag keyword keywordColor="warn">Warn</Tag>
<Tag keyword keywordColor="caution">Caution</Tag>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Tag Group">
        <ComponentBlock
          preview={
            <TagGroup>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
            </TagGroup>
          }
          code={`<TagGroup>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
</TagGroup>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Truncate">
        <ComponentBlock
          preview={
            <TagGroup maxVisible={3}>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="neutral">Neutral</Tag>
            </TagGroup>
          }
          code={`<TagGroup maxVisible={3}>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
  <Tag variant="neutral">Neutral</Tag>
</TagGroup>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Tag Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>variant</InlineCode>, <InlineCode>TagVariant</InlineCode>, <InlineCode>"neutral"</InlineCode>, 'Semantic color variant (status mode)'],
            [<InlineCode>keyword</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Use keyword mode (bordered style)'],
            [<InlineCode>keywordColor</InlineCode>, <InlineCode>TagKeywordColor</InlineCode>, '—', 'Colored text for keyword tags'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="TagGroup Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>maxVisible</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Max visible tags before showing +N overflow'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
