import { useState } from 'react'
import {
  Icon,
  Button,
  Checkbox,
  Toggle,
  ToggleRow,
  RadioGroup,
  RadioOption,
  Tag,
  TagGroup,
  BadgeDot,
  BadgeNumber,
  Chip,
  Skeleton,
  Tooltip,
  InputField,
  SelectField,
  TextArea,
  FileUpload,
  InputWithSuffix,
  FormRow,
  ValidationMessage,
  Toast,
  Toaster,
  Banner,
  Verdict,
  ScanStatus,
  Severity,
  Tabs,
  TabPanel,
  Breadcrumb,
  PageHeader,
  SectionTitle,
  Modal,
  SlidePanel,
  Card,
  CardHeader,
  CardTitle,
  Pagination,
  DataTable,
} from '@opswat/blue-line'
import type { IconName, MultiColorIconName } from '@opswat/blue-line'

const singleColorIcons: IconName[] = [
  'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
  'filter', 'search', 'action', 'add', 'check', 'minus',
  'edit', 'control-h', 'control-v', 'close', 'drag-v',
  'eye', 'eye-off', 'upload', 'help',
]

const multiColorIcons: MultiColorIconName[] = [
  'signal-0', 'signal-1', 'signal-2', 'signal-3', 'signal-4',
  'fb-info', 'fb-success', 'fb-error',
]

const semanticVariants = ['neutral', 'inactive', 'secure', 'success', 'accent', 'guide', 'alert', 'warn', 'caution'] as const
const keywordColors = ['inactive', 'secure', 'success', 'accent', 'guide', 'alert', 'warn', 'caution'] as const

export function App() {
  const [dark, setDark] = useState(false)

  // Checkbox state
  const [cb1, setCb1] = useState(false)
  const [cb2, setCb2] = useState(true)
  const [cb3, setCb3] = useState(false)

  // Toggle state
  const [tog1, setTog1] = useState(false)
  const [tog2, setTog2] = useState(true)
  const [togRow, setTogRow] = useState(false)

  // Radio state
  const [radio1, setRadio1] = useState('a')
  const [radio2, setRadio2] = useState('x')

  // Chip removable
  const [chipVisible, setChipVisible] = useState(true)

  // Form inputs state
  const [clearableValue, setClearableValue] = useState('clearable text')
  const [uploadFileName, setUploadFileName] = useState<string | undefined>(undefined)

  // Feedback state
  const [toastVisible, setToastVisible] = useState(false)
  const [toasterVisible, setToasterVisible] = useState(false)
  const [toasterVariant, setToasterVariant] = useState<'info' | 'success' | 'error'>('info')

  // Navigation state
  const [navTab, setNavTab] = useState('overview')

  // Overlay state
  const [modalOpen, setModalOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  function toggleTheme() {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] text-[var(--text-strong)] p-std">
      <header className="flex items-center justify-between mb-xl">
        <h1 className="text-h2 font-medium">Blue Line Component Verification</h1>
        <Button variant="primary" onClick={toggleTheme}>
          {dark ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </header>

      {/* ──────────── COMPONENT SECTIONS ──────────── */}

      {/* Icons */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Icons</h2>

        <p className="text-note text-[var(--text-muted)] mb-xs">Single-color (md)</p>
        <div className="flex flex-wrap gap-sm mb-sm">
          {singleColorIcons.map(name => (
            <div key={name} className="flex flex-col items-center gap-tiny">
              <Icon name={name} size="md" />
              <span className="text-inset text-[var(--text-muted)]">{name}</span>
            </div>
          ))}
        </div>

        <p className="text-note text-[var(--text-muted)] mb-xs">Multi-color</p>
        <div className="flex flex-wrap gap-sm mb-sm">
          {multiColorIcons.map(name => (
            <div key={name} className="flex flex-col items-center gap-tiny">
              <Icon multiColor={name} size="md" />
              <span className="text-inset text-[var(--text-muted)]">{name}</span>
            </div>
          ))}
        </div>

        <p className="text-note text-[var(--text-muted)] mb-xs">Size scale (chevron-down)</p>
        <div className="flex items-end gap-sm">
          {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div key={size} className="flex flex-col items-center gap-tiny">
              <Icon name="chevron-down" size={size} />
              <span className="text-inset text-[var(--text-muted)]">{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Buttons</h2>

        <p className="text-note text-[var(--text-muted)] mb-xs">All variants</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Text</Button>
          <Button variant="menu">Menu</Button>
          <Button variant="icon" icon="edit" />
          <Button variant="brand">Brand</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <p className="text-note text-[var(--text-muted)] mb-xs">Danger modifier</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <Button variant="outline" danger>Outline Danger</Button>
          <Button variant="text" danger>Text Danger</Button>
        </div>

        <p className="text-note text-[var(--text-muted)] mb-xs">Disabled</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="text" disabled>Text</Button>
          <Button variant="menu" disabled>Menu</Button>
          <Button variant="danger" disabled>Danger</Button>
        </div>

        <p className="text-note text-[var(--text-muted)] mb-xs">Loading</p>
        <div className="flex flex-wrap items-center gap-xs">
          <Button variant="primary" loading>Primary</Button>
          <Button variant="outline" loading>Outline</Button>
          <Button variant="text" loading>Text</Button>
          <Button variant="danger" loading>Danger</Button>
        </div>
      </section>

      {/* Checkbox */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Checkbox</h2>
        <div className="flex items-center gap-sm">
          <Checkbox checked={cb1} onChange={() => setCb1(!cb1)} label="Unchecked" />
          <Checkbox checked={cb2} onChange={() => setCb2(!cb2)} label="Checked" />
          <Checkbox checked={cb3} indeterminate onChange={() => setCb3(!cb3)} label="Indeterminate" />
          <Checkbox checked disabled label="Disabled" />
        </div>
      </section>

      {/* Toggle */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Toggle</h2>
        <div className="flex items-center gap-sm mb-sm">
          <div className="flex items-center gap-xs">
            <Toggle checked={tog1} onChange={setTog1} />
            <span className="text-label">{tog1 ? 'On' : 'Off'}</span>
          </div>
          <div className="flex items-center gap-xs">
            <Toggle checked={tog2} onChange={setTog2} />
            <span className="text-label">{tog2 ? 'On' : 'Off'}</span>
          </div>
          <div className="flex items-center gap-xs">
            <Toggle disabled />
            <span className="text-label text-[var(--text-muted)]">Disabled</span>
          </div>
        </div>
        <ToggleRow label="Enable notifications" checked={togRow} onChange={setTogRow} />
      </section>

      {/* Radio */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Radio</h2>
        <div className="flex gap-xl">
          <div>
            <p className="text-note text-[var(--text-muted)] mb-xs">Vertical</p>
            <RadioGroup value={radio1} onChange={setRadio1}>
              <RadioOption value="a" label="Option A" />
              <RadioOption value="b" label="Option B" />
              <RadioOption value="c" label="Option C" />
            </RadioGroup>
          </div>
          <div>
            <p className="text-note text-[var(--text-muted)] mb-xs">Inline</p>
            <RadioGroup value={radio2} onChange={setRadio2} inline>
              <RadioOption value="x" label="Alpha" />
              <RadioOption value="y" label="Beta" />
              <RadioOption value="z" label="Gamma" />
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Tags</h2>
        <p className="text-note text-[var(--text-muted)] mb-xs">Semantic variants</p>
        <TagGroup className="mb-sm">
          {semanticVariants.map(v => (
            <Tag key={v} variant={v}>{v}</Tag>
          ))}
        </TagGroup>
        <p className="text-note text-[var(--text-muted)] mb-xs">Keyword tags with color</p>
        <TagGroup>
          {keywordColors.map(c => (
            <Tag key={c} keyword keywordColor={c}>{c}</Tag>
          ))}
        </TagGroup>
      </section>

      {/* Badges */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Badges</h2>
        <p className="text-note text-[var(--text-muted)] mb-xs">BadgeDot</p>
        <div className="flex items-center gap-sm mb-sm">
          {semanticVariants.map(c => (
            <div key={c} className="flex flex-col items-center gap-tiny">
              <BadgeDot color={c} />
              <span className="text-inset text-[var(--text-muted)]">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-note text-[var(--text-muted)] mb-xs">BadgeNumber</p>
        <div className="flex items-center gap-sm">
          {semanticVariants.map((c, i) => (
            <div key={c} className="flex flex-col items-center gap-tiny">
              <BadgeNumber value={i + 1} color={c} />
              <span className="text-inset text-[var(--text-muted)]">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Chips */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Chips</h2>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <Chip color="default">Default</Chip>
          <Chip color="accent">Accent</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="alert">Alert</Chip>
          <Chip color="warn">Warn</Chip>
          {chipVisible && (
            <Chip color="secure" removable onRemove={() => setChipVisible(false)}>Removable</Chip>
          )}
          <Chip skeleton>Loading</Chip>
        </div>
      </section>

      {/* Skeleton */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Skeleton</h2>
        <div className="flex items-center gap-sm">
          <div className="flex flex-col items-center gap-tiny">
            <Skeleton variant="text" />
            <span className="text-inset text-[var(--text-muted)]">text</span>
          </div>
          <div className="flex flex-col items-center gap-tiny">
            <Skeleton variant="block" />
            <span className="text-inset text-[var(--text-muted)]">block</span>
          </div>
          <div className="flex flex-col items-center gap-tiny">
            <Skeleton variant="button" />
            <span className="text-inset text-[var(--text-muted)]">button</span>
          </div>
        </div>
      </section>

      {/* Tooltip */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Tooltip</h2>
        <div className="flex items-center gap-sm">
          <Tooltip content="Top tooltip" position="top">
            <Button variant="outline">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <Button variant="outline">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <Button variant="outline">Right</Button>
          </Tooltip>
        </div>
      </section>

      {/* Form Inputs */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Form Inputs</h2>

        {/* InputField */}
        <p className="text-note text-[var(--text-muted)] mb-xs">InputField — variants</p>
        <div className="flex flex-wrap items-start gap-xs mb-sm">
          <InputField placeholder="Default placeholder" style={{ width: 200 }} />
          <InputField
            value={clearableValue}
            clearable
            onChange={e => setClearableValue(e.target.value)}
            onClear={() => setClearableValue('')}
            style={{ width: 200 }}
          />
          <InputField type="password" placeholder="Password" style={{ width: 200 }} />
          <InputField status="error" placeholder="Error state" style={{ width: 200 }} />
          <InputField status="success" placeholder="Success state" style={{ width: 200 }} />
          <InputField disabled placeholder="Disabled" style={{ width: 200 }} />
        </div>

        {/* SelectField */}
        <p className="text-note text-[var(--text-muted)] mb-xs">SelectField — variants</p>
        <div className="flex flex-wrap items-start gap-xs mb-sm">
          <SelectField style={{ width: 200 }}>
            <option value="">Choose option</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </SelectField>
          <SelectField status="error" style={{ width: 200 }}>
            <option value="">Error state</option>
          </SelectField>
          <SelectField disabled style={{ width: 200 }}>
            <option value="">Disabled</option>
          </SelectField>
        </div>

        {/* TextArea */}
        <p className="text-note text-[var(--text-muted)] mb-xs">TextArea — variants</p>
        <div className="flex flex-wrap items-start gap-xs mb-sm">
          <TextArea placeholder="Default placeholder" style={{ width: 240 }} />
          <TextArea status="error" placeholder="Error state" style={{ width: 240 }} />
          <TextArea disabled placeholder="Disabled" style={{ width: 240 }} />
        </div>

        {/* FileUpload */}
        <p className="text-note text-[var(--text-muted)] mb-xs">FileUpload — variants</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <div style={{ width: 240 }}>
            <FileUpload
              onChange={e => setUploadFileName(e.target.files?.[0]?.name)}
              fileName={uploadFileName}
              className="w-full"
            />
          </div>
          <div style={{ width: 240 }}>
            <FileUpload fileName="certificate.pem" className="w-full" />
          </div>
          <div style={{ width: 240 }}>
            <FileUpload disabled className="w-full" />
          </div>
        </div>

        {/* InputWithSuffix */}
        <p className="text-note text-[var(--text-muted)] mb-xs">InputWithSuffix</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          <InputWithSuffix suffix="days" placeholder="30" maxWidth={160} />
          <InputWithSuffix suffix="MB" placeholder="512" maxWidth={160} />
        </div>

        {/* FormRow */}
        <p className="text-note text-[var(--text-muted)] mb-xs">FormRow</p>
        <div className="flex flex-col gap-xs mb-sm max-w-xl">
          <FormRow label="Session timeout">
            <InputField placeholder="Enter value" />
          </FormRow>
          <FormRow label="Default region" help="Select the AWS region for your storage accounts">
            <SelectField>
              <option value="">Choose region</option>
              <option value="us-east-1">us-east-1</option>
              <option value="eu-west-1">eu-west-1</option>
            </SelectField>
          </FormRow>
        </div>

        {/* ValidationMessage */}
        <p className="text-note text-[var(--text-muted)] mb-xs">ValidationMessage</p>
        <div className="flex flex-col gap-xs">
          <ValidationMessage type="error">This field is required.</ValidationMessage>
          <ValidationMessage type="success">Settings saved successfully.</ValidationMessage>
        </div>
      </section>

      {/* Feedback & Status */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Feedback & Status</h2>

        {/* Toast */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Toast</p>
        <div className="flex items-center gap-xs mb-sm">
          <Button variant="outline" onClick={() => setToastVisible(!toastVisible)}>
            {toastVisible ? 'Hide Toast' : 'Show Toast'}
          </Button>
        </div>
        <Toast visible={toastVisible}>Operation completed successfully.</Toast>

        {/* Toaster */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Toaster</p>
        <div className="flex items-center gap-xs mb-sm">
          {(['info', 'success', 'error'] as const).map(v => (
            <Button key={v} variant="outline" onClick={() => { setToasterVariant(v); setToasterVisible(true) }}>
              {v}
            </Button>
          ))}
        </div>
        <Toaster
          variant={toasterVariant}
          visible={toasterVisible}
          title={`${toasterVariant.charAt(0).toUpperCase() + toasterVariant.slice(1)} Notification`}
          description="This is a sample notification with a description."
          icon={<Icon multiColor={toasterVariant === 'info' ? 'fb-info' : toasterVariant === 'success' ? 'fb-success' : 'fb-error'} size="xl" />}
          onClose={() => setToasterVisible(false)}
        />

        {/* Banner */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Banner</p>
        <div className="flex flex-col gap-xs mb-sm">
          <Banner variant="info" icon={<Icon multiColor="fb-info" size="md" />} title="Info:" description="Storage account connected successfully." actions={[{ label: 'View Details', onClick: () => {} }]} />
          <Banner variant="alert" icon={<Icon multiColor="fb-error" size="md" />} title="Alert:" description="3 threats detected during the latest scan." />
          <Banner variant="neutral" title="Neutral:" description="No action required at this time." />
          <Banner variant="warn" title="Warning:" description="License expires in 7 days." actions={[{ label: 'Renew', onClick: () => {} }]} />
        </div>

        {/* Verdict */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Verdict</p>
        <div className="flex flex-wrap items-center gap-sm mb-sm">
          {(['neutral', 'not-active', 'secure', 'success', 'accent', 'guide', 'alert', 'warn', 'caution'] as const).map(v => (
            <Verdict key={v} variant={v}>{v}</Verdict>
          ))}
        </div>

        {/* ScanStatus */}
        <p className="text-note text-[var(--text-muted)] mb-xs">ScanStatus</p>
        <div className="flex flex-wrap items-center gap-xs mb-sm">
          {(['allowed', 'blocked', 'complete', 'failed', 'skipped', 'pending'] as const).map(v => (
            <ScanStatus key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</ScanStatus>
          ))}
        </div>

        {/* Severity */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Severity</p>
        <div className="flex flex-wrap items-center gap-sm">
          {(['none', 'low', 'medium', 'high', 'critical'] as const).map(level => (
            <Severity key={level} level={level} />
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Navigation</h2>

        {/* Tabs */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Tabs</p>
        <div className="mb-sm">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'settings', label: 'Settings' },
            ]}
            activeTab={navTab}
            onTabChange={setNavTab}
          >
            <TabPanel id="overview" activeTab={navTab}>
              <div className="text-label text-[var(--text-subtle)] p-3 bg-[var(--surface-card)] rounded">Overview content</div>
            </TabPanel>
            <TabPanel id="details" activeTab={navTab}>
              <div className="text-label text-[var(--text-subtle)] p-3 bg-[var(--surface-card)] rounded">Details content</div>
            </TabPanel>
            <TabPanel id="settings" activeTab={navTab}>
              <div className="text-label text-[var(--text-subtle)] p-3 bg-[var(--surface-card)] rounded">Settings content</div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Breadcrumb */}
        <p className="text-note text-[var(--text-muted)] mb-xs">Breadcrumb</p>
        <div className="mb-sm">
          <Breadcrumb items={[
            { label: 'Inventory', onClick: () => {} },
            { label: 'Accounts', onClick: () => {} },
            { label: 'Amazon S3' },
          ]} />
        </div>

        {/* PageHeader */}
        <p className="text-note text-[var(--text-muted)] mb-xs">PageHeader</p>
        <div className="mb-sm bg-[var(--surface-card)] p-4 rounded">
          <PageHeader
            breadcrumb={
              <Breadcrumb items={[
                { label: 'Inventory', onClick: () => {} },
                { label: 'Accounts', onClick: () => {} },
              ]} />
            }
            title="Amazon S3 — Production"
            actions={
              <>
                <Button variant="icon" icon="edit" />
                <Button variant="outline">Export</Button>
                <Button variant="primary">Add Account</Button>
              </>
            }
          />
        </div>

        {/* SectionTitle */}
        <p className="text-note text-[var(--text-muted)] mb-xs">SectionTitle</p>
        <div className="mb-sm">
          <SectionTitle title="Recommended integrations" description="Enhance your storage capabilities and security with recommended integrations." />
          <SectionTitle title="Simple heading (no description)" />
        </div>
      </section>

      {/* Overlays */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Overlays</h2>
        <div className="flex items-center gap-xs">
          <Button variant="outline" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" onClick={() => setPanelOpen(true)}>Open Slide Panel</Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Activate License" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setModalOpen(false)}>Activate</Button></>}>
          <FormRow label="License Key">
            <InputField type="password" placeholder="Enter your license key" />
          </FormRow>
        </Modal>
        <SlidePanel open={panelOpen} onClose={() => setPanelOpen(false)} title="Create Workflow" footer={<><Button variant="outline" onClick={() => setPanelOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setPanelOpen(false)}>Save</Button></>}>
          <FormRow label="Workflow Name">
            <InputField placeholder="e.g. Weekly Scan" />
          </FormRow>
          <FormRow label="Scan Pool">
            <SelectField>
              <option>Default Pool</option>
              <option>High Priority</option>
            </SelectField>
          </FormRow>
        </SlidePanel>
      </section>

      {/* Cards & Layout */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Cards & Layout</h2>

        <p className="text-note text-[var(--text-muted)] mb-xs">Card with header, title, and pagination</p>
        <Card className="mb-sm">
          <CardHeader>
            <CardTitle title="Job Summary" count="3 Past" countAccent="(+2 Running)" actions={<Button variant="text">View Reports</Button>} />
          </CardHeader>
          <div className="p-5 text-label text-[var(--text-subtle)]">Card body content goes here.</div>
          <Pagination page={page} totalPages={5} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
        </Card>

        <p className="text-note text-[var(--text-muted)] mb-xs">Simple card</p>
        <Card>
          <div className="p-5 text-label text-[var(--text-subtle)]">A simple card with no header or pagination.</div>
        </Card>
      </section>

      {/* Data Table */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Data Table</h2>
        <Card>
          <CardHeader>
            <CardTitle title="Jobs" count="5 items" />
          </CardHeader>
          <DataTable
            columns={[
              { key: 'name', header: 'Job Name' },
              { key: 'status', header: 'Status', render: (row) => <Tag variant={row.status === 'Running' ? 'success' : row.status === 'Failed' ? 'alert' : 'neutral'}>{row.status as string}</Tag> },
              { key: 'type', header: 'Type' },
              { key: 'files', header: 'Files', align: 'right' },
              { key: 'date', header: 'Start Time' },
            ]}
            data={[
              { name: 'AWS Full Scan', status: 'Running', type: 'Scan Now', files: '45,231', date: 'Feb 26, 2026 08:14 AM' },
              { name: 'Azure Weekly', status: 'Complete', type: 'Scheduled', files: '12,004', date: 'Feb 25, 2026 02:00 AM' },
              { name: 'GCP Storage', status: 'Failed', type: 'Scan Now', files: '0', date: 'Feb 24, 2026 11:30 AM' },
              { name: 'S3 Bucket Scan', status: 'Pending', type: 'Scheduled', files: '-', date: 'Feb 27, 2026 06:00 AM' },
              { name: 'OneDrive Audit', status: 'Complete', type: 'On Demand', files: '8,912', date: 'Feb 23, 2026 09:45 AM' },
            ]}
          />
        </Card>
      </section>

      <hr className="border-[var(--border-default)] my-xl" />

      {/* ──────────── TOKEN VERIFICATION SECTIONS ──────────── */}

      {/* Color Palette */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Color Palette</h2>
        <div className="flex flex-wrap gap-xs">
          {['blue', 'red', 'green', 'orange', 'yellow', 'teal', 'purple'].map(color => (
            <div key={color} className="flex flex-col gap-tiny">
              <span className="text-note text-[var(--text-muted)]">{color}</span>
              <div className="flex gap-tiny">
                {[100, 300, 500, 700, 900].map(step => (
                  <div
                    key={step}
                    className="w-8 h-8 rounded"
                    style={{ background: `var(--color-${color}-${step})` }}
                    title={`${color}-${step}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neutral Scale */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Neutral Scale</h2>
        <div className="flex gap-tiny">
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map(step => (
            <div key={step} className="flex flex-col items-center gap-tiny">
              <div className="w-8 h-8 rounded" style={{ background: `var(--color-neutral-${step})` }} />
              <span className="text-inset text-[var(--text-muted)]">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Tokens */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Semantic Tokens</h2>
        <div className="grid grid-cols-3 gap-sm">
          <div className="p-std rounded shadow-card bg-[var(--surface-card)]">
            <h3 className="text-label font-medium text-[var(--text-strong)]">Card (surface-card)</h3>
            <p className="text-label text-[var(--text-subtle)]">Subtle text</p>
            <p className="text-note text-[var(--text-muted)]">Muted text</p>
          </div>
          <div className="p-std rounded bg-[var(--primary)] text-[var(--text-on-fill)]">
            <h3 className="text-label font-medium">Primary fill</h3>
            <p className="text-note">text-on-fill</p>
          </div>
          <div className="p-std rounded bg-[var(--danger)] text-[var(--text-on-fill)]">
            <h3 className="text-label font-medium">Danger fill</h3>
            <p className="text-note">text-on-fill</p>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Typography</h2>
        <div className="flex flex-col gap-xs bg-[var(--surface-card)] p-std rounded shadow-card">
          <p className="text-h1 font-medium">H1 — 28px/32px</p>
          <p className="text-h2 font-medium">H2 — 24px/27px</p>
          <p className="text-h3 font-medium">H3 — 20px/23px</p>
          <p className="text-h4 font-medium">H4 — 16px/18px</p>
          <p className="text-label">Label — 14px/16px</p>
          <p className="text-note text-[var(--text-muted)]">Note — 12px/14px</p>
          <p className="text-inset text-[var(--text-light)]">Inset — 10px/11px</p>
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Spacing</h2>
        <div className="flex flex-col gap-xs">
          {[
            ['tiny (2px)', 'w-tiny'],
            ['tight (4px)', 'w-tight'],
            ['xs (8px)', 'w-xs'],
            ['sm (12px)', 'w-sm'],
            ['std (20px)', 'w-std'],
            ['xl (40px)', 'w-xl'],
          ].map(([label, cls]) => (
            <div key={label} className="flex items-center gap-sm">
              <span className="text-note text-[var(--text-muted)] w-24">{label}</span>
              <div className={`h-3 ${cls} bg-[var(--primary)] rounded-sm`} />
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">Shadows</h2>
        <div className="flex flex-wrap gap-std">
          {['shadow-1', 'shadow-2', 'shadow-3', 'shadow-4', 'shadow-card', 'shadow-dropdown', 'shadow-modal'].map(s => (
            <div key={s} className={`w-24 h-24 rounded bg-[var(--surface-card)] ${s} flex items-center justify-center`}>
              <span className="text-note text-[var(--text-muted)]">{s.replace('shadow-', '')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DS Semantic Families */}
      <section className="mb-xl">
        <h2 className="text-h3 font-medium mb-sm">DS Semantic Families</h2>
        <div className="flex flex-wrap gap-xs">
          {['neutral', 'inactive', 'secure', 'success', 'accent', 'guide', 'alert', 'warn', 'caution'].map(family => (
            <div
              key={family}
              className="px-sm py-xs rounded text-note font-medium"
              style={{
                background: `var(--ds-${family}-100)`,
                color: `var(--ds-${family}-text)`,
                border: `1px solid var(--ds-${family}-700)`,
              }}
            >
              {family}
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-h3 font-medium mb-sm">Border Radius</h2>
        <div className="flex gap-std items-end">
          <div className="w-16 h-16 bg-[var(--primary)] rounded flex items-center justify-center text-[var(--text-on-fill)] text-note">4px</div>
          <div className="w-16 h-16 bg-[var(--primary)] rounded-graphics flex items-center justify-center text-[var(--text-on-fill)] text-note">8px</div>
          <div className="w-16 h-16 bg-[var(--primary)] rounded-modal flex items-center justify-center text-[var(--text-on-fill)] text-note">12px</div>
          <div className="w-16 h-16 bg-[var(--primary)] rounded-circular flex items-center justify-center text-[var(--text-on-fill)] text-note">pill</div>
        </div>
      </section>
    </div>
  )
}
