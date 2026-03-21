import { ScanStatus, Verdict, Severity } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function ScanStatusPage() {
  return (
    <>
      <Section
        id="scan-status"
        title="Scan Status"
        description="Scan processing status indicators showing current state of file analysis."
      >
        <Subsection title="All Variants">
          <ComponentBlock
            preview={
              <div className="flex flex-col gap-3 items-start">
                <ScanStatus variant="allowed">Allowed</ScanStatus>
                <ScanStatus variant="blocked">Blocked</ScanStatus>
                <ScanStatus variant="complete">Complete</ScanStatus>
                <ScanStatus variant="failed">Failed</ScanStatus>
                <ScanStatus variant="skipped">Skipped</ScanStatus>
                <ScanStatus variant="pending">Pending</ScanStatus>
              </div>
            }
            code={`<ScanStatus variant="allowed">Allowed</ScanStatus>
<ScanStatus variant="blocked">Blocked</ScanStatus>
<ScanStatus variant="complete">Complete</ScanStatus>
<ScanStatus variant="failed">Failed</ScanStatus>
<ScanStatus variant="skipped">Skipped</ScanStatus>
<ScanStatus variant="pending">Pending</ScanStatus>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>variant</InlineCode>, <InlineCode>{'\'allowed\' | \'blocked\' | \'complete\' | \'failed\' | \'skipped\' | \'pending\''}</InlineCode>, '—', 'Status variant'],
              [<InlineCode>children</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Status label text'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="verdicts"
        title="Verdicts"
        description="Scan result verdicts indicating threat detection outcomes."
      >
        <Subsection title="All Variants">
          <ComponentBlock
            preview={
              <div className="flex flex-wrap gap-3 items-center">
                <Verdict variant="success">Success</Verdict>
                <Verdict variant="alert">Alert</Verdict>
                <Verdict variant="warn">Warning</Verdict>
                <Verdict variant="caution">Caution</Verdict>
                <Verdict variant="secure">Secure</Verdict>
                <Verdict variant="neutral">Neutral</Verdict>
                <Verdict variant="not-active">Not Active</Verdict>
                <Verdict variant="accent">Accent</Verdict>
                <Verdict variant="guide">Guide</Verdict>
              </div>
            }
            code={`<Verdict variant="success">Success</Verdict>
<Verdict variant="alert">Alert</Verdict>
<Verdict variant="warn">Warning</Verdict>
<Verdict variant="caution">Caution</Verdict>
<Verdict variant="secure">Secure</Verdict>
<Verdict variant="neutral">Neutral</Verdict>
<Verdict variant="not-active">Not Active</Verdict>
<Verdict variant="accent">Accent</Verdict>
<Verdict variant="guide">Guide</Verdict>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>variant</InlineCode>, <InlineCode>{'\'neutral\' | \'not-active\' | \'secure\' | \'success\' | \'accent\' | \'guide\' | \'alert\' | \'warn\' | \'caution\''}</InlineCode>, '—', 'Verdict color variant'],
              [<InlineCode>children</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Verdict label text'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>

      <Section
        id="severities"
        title="Severities"
        description="Severity level indicators for threat classification."
      >
        <Subsection title="All Levels">
          <ComponentBlock
            preview={
              <div className="flex flex-wrap gap-3 items-center">
                <Severity level="critical" />
                <Severity level="high" />
                <Severity level="medium" />
                <Severity level="low" />
                <Severity level="none" />
              </div>
            }
            code={`<Severity level="critical" />
<Severity level="high" />
<Severity level="medium" />
<Severity level="low" />
<Severity level="none" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Custom Labels">
          <ComponentBlock
            preview={
              <div className="flex flex-wrap gap-3 items-center">
                <Severity level="critical" label="Malicious" />
                <Severity level="high" label="Likely Malicious" />
                <Severity level="medium" label="Suspicious" />
                <Severity level="low" label="Informational" />
                <Severity level="none" label="Clean" />
              </div>
            }
            code={`<Severity level="critical" label="Malicious" />
<Severity level="high" label="Likely Malicious" />
<Severity level="medium" label="Suspicious" />
<Severity level="low" label="Informational" />
<Severity level="none" label="Clean" />`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Props">
          <PropsTable
            headers={['Prop', 'Type', 'Default', 'Description']}
            rows={[
              [<InlineCode>level</InlineCode>, <InlineCode>{'\'critical\' | \'high\' | \'medium\' | \'low\' | \'none\''}</InlineCode>, '—', 'Severity level'],
              [<InlineCode>label</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Custom label (overrides default level name)'],
              [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            ]}
          />
        </Subsection>
      </Section>
    </>
  )
}
