import { Section, Subsection, Guideline, PropsTable, CodeBlock, InlineCode } from '../components/ComponentBlock'

export function OverviewPage() {
  return (
    <Section
      id="overview"
      title="Blue Line Design System"
      description="OPSWAT's shared design system — tokens, components, and icons for building consistent product UIs. React + Tailwind CSS v4."
    >
      {/* Stats */}
      <div className="flex gap-6 mb-10">
        {[
          { value: '8', label: 'Color Palettes' },
          { value: '30+', label: 'Components' },
          { value: '15', label: 'Icons' },
          { value: '4', label: 'Breakpoints' },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-1 text-center py-3 px-5 border border-[var(--border-card)] rounded-lg"
          >
            <div className="text-[24px] font-medium text-[var(--primary)]">{s.value}</div>
            <div className="text-[12px] text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      <Subsection title="Installation">
        <p className="text-[14px] text-[var(--text-subtle)] mb-3">
          Add <InlineCode>@opswat/blue-line</InlineCode> as a workspace dependency:
        </p>
        <CodeBlock
          code={`pnpm add @opswat/blue-line`}
          language="bash"
        />
        <p className="text-[14px] text-[var(--text-subtle)] mb-3">
          Import the CSS in your app's stylesheet:
        </p>
        <CodeBlock
          code={`@import "tailwindcss";
@import "@opswat/blue-line/theme.css";
@import "@opswat/blue-line/base.css";
@import "@opswat/blue-line/components.css";`}
          language="css"
        />
      </Subsection>

      <Subsection title="Usage">
        <p className="text-[14px] text-[var(--text-subtle)] mb-3">
          Import React components directly:
        </p>
        <CodeBlock
          code={`import { Button, Tag, InputField, Card } from '@opswat/blue-line'

function MyPage() {
  return (
    <Card>
      <InputField placeholder="Enter value" />
      <Button variant="primary">Submit</Button>
      <Tag variant="success">Active</Tag>
    </Card>
  )
}`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Dark Mode">
        <p className="text-[14px] text-[var(--text-subtle)] mb-3">
          Set <InlineCode>data-theme="dark"</InlineCode> on the{' '}
          <InlineCode>&lt;html&gt;</InlineCode> element. All tokens and components auto-adapt.
        </p>
        <CodeBlock
          code={`// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark')`}
          language="javascript"
        />
        <Guideline>
          Uses <InlineCode>{'[data-theme="dark"]'}</InlineCode> attribute selectors — immune to
          Tailwind v4's class-based tree-shaking.
        </Guideline>
      </Subsection>

      <Subsection title="File Structure">
        <PropsTable
          headers={['File', 'Purpose']}
          rows={[
            [<InlineCode>theme.css</InlineCode>, 'Tailwind v4 @theme — color palette, spacing, typography, shadows'],
            [<InlineCode>base.css</InlineCode>, 'Semantic tokens, dark mode overrides, font-face, reset'],
            [<InlineCode>components.css</InlineCode>, 'Component-level CSS (loading spinner, select chevron, card header, etc.)'],
            [<InlineCode>index.ts</InlineCode>, 'React component barrel exports'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
