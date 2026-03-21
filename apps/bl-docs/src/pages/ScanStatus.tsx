import { ScanStatus, Verdict, Severity } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock } from '../components/ComponentBlock'

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
      </Section>
    </>
  )
}
