import { Icon } from '@opswat/blue-line'
import type { IconName, MultiColorIconName } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

const icons: IconName[] = [
  'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
  'filter', 'search', 'action', 'add', 'check', 'minus',
  'edit', 'control-h', 'control-v', 'close', 'drag-v',
  'eye', 'eye-off', 'upload', 'help',
]

const multiColorIcons: MultiColorIconName[] = [
  'signal-0', 'signal-1', 'signal-2', 'signal-3', 'signal-4',
  'fb-info', 'fb-success', 'fb-error',
]

export function IconsPage() {
  return (
    <Section
      id="icons"
      title="Icons"
      description="Monochrome SVG icons that inherit color from their parent element via CSS mask-image. All icons are 16px (md) by default."
    >
      <Subsection title="Icon Library">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-6">
          {icons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 py-5 px-2 border border-[var(--border-card)] rounded-lg text-center hover:border-[var(--border-200)] hover:bg-[var(--hover-subtle)] transition-colors cursor-default"
            >
              <Icon name={name} className="text-[var(--text-subtle)]" />
              <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Multi-Color Icons">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-6">
          {multiColorIcons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 py-5 px-2 border border-[var(--border-card)] rounded-lg text-center hover:border-[var(--border-200)] hover:bg-[var(--hover-subtle)] transition-colors cursor-default"
            >
              <Icon multiColor={name} />
              <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-center">
              <Icon multiColor="signal-0" />
              <Icon multiColor="signal-4" />
              <Icon multiColor="fb-info" />
              <Icon multiColor="fb-success" />
              <Icon multiColor="fb-error" />
            </div>
          }
          code={`{/* Multi-color icons use the multiColor prop instead of name */}
<Icon multiColor="signal-0" />
<Icon multiColor="signal-4" />
<Icon multiColor="fb-info" />
<Icon multiColor="fb-success" />
<Icon multiColor="fb-error" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Color Inheritance">
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-center">
              <Icon name="check" className="text-[var(--color-green-800)]" />
              <Icon name="close" className="text-[var(--color-red-700)]" />
              <Icon name="edit" className="text-[var(--primary)]" />
              <Icon name="filter" className="text-[var(--color-orange-700)]" />
              <Icon name="search" className="text-[var(--text-muted)]" />
            </div>
          }
          code={`{/* Icons inherit color from className or parent */}
<Icon name="check" className="text-[var(--color-green-800)]" />
<Icon name="close" className="text-[var(--color-red-700)]" />
<Icon name="edit" className="text-[var(--primary)]" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>name</InlineCode>, <InlineCode>IconName</InlineCode>, '—', 'Monochrome icon identifier'],
            [<InlineCode>multiColor</InlineCode>, <InlineCode>MultiColorIconName</InlineCode>, '—', 'Multi-color icon identifier (use instead of name)'],
            [<InlineCode>size</InlineCode>, <InlineCode>{"'sm' | 'md' | 'lg' | 'xl'"}</InlineCode>, <InlineCode>"md"</InlineCode>, 'Icon size'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes (use for color)'],
            [<InlineCode>aria-label</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Accessible label for screen readers'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
