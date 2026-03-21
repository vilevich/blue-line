import { Icon } from '@opswat/blue-line'
import type { IconName } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

const icons: IconName[] = [
  'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
  'filter', 'search', 'action', 'add', 'check', 'minus',
  'edit', 'control-h', 'control-v', 'close', 'drag-v',
]

export function IconsPage() {
  return (
    <Section
      id="icons"
      title="Icons"
      description="Monochrome SVG icons that inherit color from their parent element via CSS mask-image."
    >
      <Subsection title="Icon Library">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-6">
          {icons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 py-5 px-2 border border-[var(--border-card)] rounded-lg text-center hover:border-[var(--border-200)] hover:bg-[var(--hover-subtle)] transition-colors cursor-default"
            >
              <Icon name={name} size="lg" className="text-[var(--text-subtle)]" />
              <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Sizes">
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-end">
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <Icon name="search" size={size} className="text-[var(--text-subtle)]" />
                  <span className="text-[11px] text-[var(--text-muted)]">{size}</span>
                </div>
              ))}
            </div>
          }
          code={`<Icon name="search" size="sm" />  {/* 12px */}
<Icon name="search" size="md" />  {/* 16px */}
<Icon name="search" size="lg" />  {/* 20px */}
<Icon name="search" size="xl" />  {/* 24px */}`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Color Inheritance">
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-center">
              <Icon name="check" size="lg" className="text-[var(--color-green-800)]" />
              <Icon name="close" size="lg" className="text-[var(--color-red-700)]" />
              <Icon name="edit" size="lg" className="text-[var(--primary)]" />
              <Icon name="filter" size="lg" className="text-[var(--color-orange-700)]" />
              <Icon name="search" size="lg" className="text-[var(--text-muted)]" />
            </div>
          }
          code={`{/* Icons inherit color from className or parent */}
<Icon name="check" size="lg" className="text-[var(--color-green-800)]" />
<Icon name="close" size="lg" className="text-[var(--color-red-700)]" />
<Icon name="edit" size="lg" className="text-[var(--primary)]" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>name</InlineCode>, <InlineCode>IconName</InlineCode>, '—', 'Icon identifier'],
            [<InlineCode>size</InlineCode>, <InlineCode>IconSize</InlineCode>, <InlineCode>"md"</InlineCode>, 'sm (12px), md (16px), lg (20px), xl (24px)'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes (use for color)'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
