import { useState, useRef, useCallback } from 'react'
import {
  cn,
  PageHeader,
  Tabs,
  TabPanel,
  Button,
  InputField,
  SelectField,
  ToggleRow,
  FormRow,
  Banner,
  Modal,
  SlidePanel,
  Icon,
  Toaster,
  type ToasterHandle,
} from '@opswat/blue-line'
import { useDirtyTracking } from '../hooks/useDirtyTracking'

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

const TABS = [
  { id: 'profile',       label: 'Profile' },
  { id: 'scan-pools',    label: 'Scan Pools' },
  { id: 'security',      label: 'Security' },
  { id: 'smtp',          label: 'SMTP' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'licensing',     label: 'Licensing' },
  { id: 'sso',           label: 'SSO' },
  { id: 'data',          label: 'Data' },
]

// ---------------------------------------------------------------------------
// Reusable SettingsCard with dirty tracking header
// ---------------------------------------------------------------------------

function SettingsCard({
  title,
  isDirty,
  onSave,
  onDiscard,
  showActions = true,
  children,
}: {
  title: string
  isDirty?: boolean
  onSave?: () => void
  onDiscard?: () => void
  showActions?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={cn('settings-card', isDirty && 'dirty')}>
      <div className="card-header">
        <h2>{title}</h2>
        {showActions && (
          <div className="card-header-actions">
            <button
              className="btn-discard"
              onClick={onDiscard}
              style={{ display: isDirty ? 'inline-flex' : 'none' }}
            >
              Discard
            </button>
            <button
              className="btn-save"
              aria-disabled={!isDirty}
              onClick={() => isDirty && onSave?.()}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Profile tab
// ---------------------------------------------------------------------------

function ProfileTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const personal = useDirtyTracking({ name: 'Elvis Vilevich', email: 'email@email.com' })
  const password = useDirtyTracking({ newPassword: 'password1234', repeatPassword: 'password12345' })
  const [showNewPw, setShowNewPw] = useState(false)
  const [showRepeatPw, setShowRepeatPw] = useState(false)
  const [apiKeyStatus, setApiKeyStatus] = useState('Not generated')

  function generateApiKey() {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0')).join('')
    setApiKeyStatus(`sk_${hex}`)
    toast.current?.show('success', 'API Key generated')
  }

  return (
    <>
      {/* Personal Information */}
      <SettingsCard
        title="Personal Information"
        isDirty={personal.isDirty}
        onSave={() => { personal.save(); toast.current?.show('success', 'Settings saved') }}
        onDiscard={personal.discard}
      >
        <Banner variant="warning" title="Warning" description="Changing email or password requires re-login." />
        <FormRow label="Full Name">
          <InputField
            value={personal.fields.name}
            onChange={e => personal.setField('name', e.target.value)}
            clearable
            onClear={() => personal.setField('name', '')}
            style={{ maxWidth: 340 }}
          />
        </FormRow>
        <FormRow label="Email">
          <InputField
            type="email"
            value={personal.fields.email}
            onChange={e => personal.setField('email', e.target.value)}
            clearable
            onClear={() => personal.setField('email', '')}
            style={{ maxWidth: 340 }}
          />
        </FormRow>
      </SettingsCard>

      {/* Password */}
      <SettingsCard
        title="Password"
        isDirty={password.isDirty}
        onSave={() => { password.save(); toast.current?.show('success', 'Password updated') }}
        onDiscard={password.discard}
      >
        <Banner variant="warning" title="Warning" description="Changing password requires re-login." />
        <FormRow label="New Password">
          <div className="flex items-center gap-1" style={{ maxWidth: 340 }}>
            <InputField
              type={showNewPw ? 'text' : 'password'}
              value={password.fields.newPassword}
              onChange={e => password.setField('newPassword', e.target.value)}
              clearable
              onClear={() => password.setField('newPassword', '')}
              className="flex-1"
            />
            <button
              className="btn-icon"
              onClick={() => setShowNewPw(!showNewPw)}
              aria-label={showNewPw ? 'Hide password' : 'Show password'}
            >
              <Icon name={showNewPw ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>
        </FormRow>
        <FormRow label="Repeat Password">
          <div className="flex items-center gap-1" style={{ maxWidth: 340 }}>
            <InputField
              type={showRepeatPw ? 'text' : 'password'}
              value={password.fields.repeatPassword}
              onChange={e => password.setField('repeatPassword', e.target.value)}
              clearable
              onClear={() => password.setField('repeatPassword', '')}
              className="flex-1"
            />
            <button
              className="btn-icon"
              onClick={() => setShowRepeatPw(!showRepeatPw)}
              aria-label={showRepeatPw ? 'Hide password' : 'Show password'}
            >
              <Icon name={showRepeatPw ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>
        </FormRow>
      </SettingsCard>

      {/* Configure API Key */}
      <SettingsCard title="Configure API Key" showActions={false}>
        <div className="form-row form-row--top">
          <div className="form-label">API Key</div>
          <div className="form-value">
            <span className="api-key-status">{apiKeyStatus}</span>
            <button className="btn-generate" onClick={generateApiKey}>Generate API Key</button>
          </div>
        </div>
      </SettingsCard>
    </>
  )
}

// ---------------------------------------------------------------------------
// Scan Pools tab
// ---------------------------------------------------------------------------

interface PoolInstance {
  url: string
  avPackage: string
  apiKey: string
  timeout: string
}

interface ScanPool {
  id: number
  name: string
  instances: PoolInstance[]
}

const INITIAL_POOLS: ScanPool[] = [
  {
    id: 1,
    name: 'Default MetaDefender Cloud Scan Pool',
    instances: [
      { url: 'https://api.metadefender.com/v4/', avPackage: 'Metascan 8 Engines', apiKey: '••••••••••', timeout: '01:00:00' },
    ],
  },
  {
    id: 2,
    name: 'Default MetaDefender Core Scan Pool',
    instances: [
      { url: 'https://mdcore.opswat-mdss.net/', avPackage: 'Metascan 8 Engines', apiKey: '••••••••••', timeout: '01:00:00' },
    ],
  },
  {
    id: 3,
    name: 'My Custom Scan Pool',
    instances: [
      { url: 'https://mdcore.opswat-mdss.net/', avPackage: 'Metascan 8 Engines', apiKey: '••••••••••', timeout: '01:00:00' },
      { url: 'https://mdcore-backup.opswat-mdss.net/', avPackage: 'Metascan 8 Engines', apiKey: '••••••••••', timeout: '01:00:00' },
    ],
  },
]

function ScanPoolsTab({
  toast,
  onOpenAddPanel,
}: {
  toast: React.RefObject<ToasterHandle | null>
  onOpenAddPanel: () => void
}) {
  const [pools, setPools] = useState(INITIAL_POOLS)
  const dragItem = useRef<number | null>(null)
  const dragOver = useRef<number | null>(null)

  function handleDragStart(idx: number) { dragItem.current = idx }
  function handleDragEnter(idx: number) { dragOver.current = idx }
  function handleDragEnd() {
    if (dragItem.current === null || dragOver.current === null) return
    const items = [...pools]
    const [reordered] = items.splice(dragItem.current, 1)
    items.splice(dragOver.current, 0, reordered)
    setPools(items)
    dragItem.current = null
    dragOver.current = null
  }

  return (
    <>
      <div className="promo-banner">
        <div className="promo-banner-text">
          <strong>Add a New Scan Pool</strong>&nbsp; Boost overall scan performance by integrating another scan pool
        </div>
        <Button variant="primary" onClick={onOpenAddPanel}>Add Pool</Button>
      </div>

      {pools.map((pool, pi) => (
        <div
          key={pool.id}
          className={cn('settings-card pool-card')}
          draggable
          onDragStart={() => handleDragStart(pi)}
          onDragEnter={() => handleDragEnter(pi)}
          onDragEnd={handleDragEnd}
          onDragOver={e => e.preventDefault()}
        >
          <div className="pool-card-header">
            <div className="pool-card-header-left">
              <span className="pool-drag-handle">
                <Icon name="drag-v" size="sm" />
              </span>
              <h2>{pool.name}</h2>
              <span className="pool-instance-count">
                {pool.instances.length} instance{pool.instances.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="pool-card-header-right">
              <Button variant="outline" onClick={() => toast.current?.show('info', 'Add Instance dialog would open')}>
                Add Instance
              </Button>
            </div>
          </div>
          <table className="data-table pool-table">
            <thead>
              <tr>
                <th className="col-url">Scan Instance URL <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-av">AV Package <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-api">API Key <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-timeout">Timeout <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {pool.instances.map((inst, ii) => (
                <tr key={ii}>
                  <td>{inst.url}</td>
                  <td><span className="av-badge">{inst.avPackage}</span></td>
                  <td><span className="api-dots">{inst.apiKey}</span></td>
                  <td>{inst.timeout}</td>
                  <td className="col-action">
                    <div className="row-action-btn" onClick={e => {
                      const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                      if (menu) menu.classList.toggle('open')
                    }}>
                      <Icon name="action" size="sm" />
                      <div className="row-action-menu">
                        <button className="row-action-menu-item" onClick={() => toast.current?.show('info', 'Edit instance')}>
                          <Icon name="edit" size="sm" />Edit
                        </button>
                        <button className="row-action-menu-item danger" onClick={() => toast.current?.show('info', 'Delete instance')}>
                          <Icon name="close" size="sm" />Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Security tab
// ---------------------------------------------------------------------------

function SecurityTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const ssl = useDirtyTracking({ sslEnabled: true, certFile: '', keyFile: '' })
  const session = useDirtyTracking({ sessionEnabled: true })

  return (
    <>
      {/* Encryption Key — no save/discard */}
      <SettingsCard title="Encryption Key" showActions={false}>
        <Banner variant="warning" title="Warning" description="Generating a new key is not reversible and will result in logging out of the application from all the profiles." />
        <div className="form-row form-row--top">
          <div className="form-label">Encryption Key Status</div>
          <div className="form-value">
            <span className="encryption-status">Last encryption key generated is older than 90 days (4 months ago)</span>
            <Button variant="outline" onClick={() => toast.current?.show('success', 'Encryption key generated', 'A new encryption key has been generated. All users will be logged out.')}>
              Generate New
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* SSL */}
      <SettingsCard
        title="SSL"
        isDirty={ssl.isDirty}
        onSave={() => { ssl.save(); toast.current?.show('success', 'SSL settings saved') }}
        onDiscard={ssl.discard}
      >
        <FormRow label="Service Status">
          <ToggleRow
            label={ssl.fields.sslEnabled ? 'Enabled' : 'Disabled'}
            checked={ssl.fields.sslEnabled}
            onChange={v => ssl.setField('sslEnabled', v)}
          />
        </FormRow>
        <FormRow label="SSL Certificate">
          <div className="file-upload-field" onClick={e => (e.currentTarget.querySelector('input') as HTMLInputElement)?.click()}>
            <input type="file" style={{ display: 'none' }} onChange={e => {
              const name = e.target.files?.[0]?.name || ''
              ssl.setField('certFile', name)
              if (name) toast.current?.show('info', `Certificate uploaded: ${name}`)
            }} />
            <span className="file-upload-text">{ssl.fields.certFile || 'Add file'}</span>
            <span className="file-upload-icon"><Icon name="upload" size="sm" /></span>
          </div>
        </FormRow>
        <FormRow label="SSL Key">
          <div className="file-upload-field" onClick={e => (e.currentTarget.querySelector('input') as HTMLInputElement)?.click()}>
            <input type="file" style={{ display: 'none' }} onChange={e => {
              const name = e.target.files?.[0]?.name || ''
              ssl.setField('keyFile', name)
              if (name) toast.current?.show('info', `Key uploaded: ${name}`)
            }} />
            <span className="file-upload-text">{ssl.fields.keyFile || 'Add file'}</span>
            <span className="file-upload-icon"><Icon name="upload" size="sm" /></span>
          </div>
        </FormRow>
      </SettingsCard>

      {/* Single User Session */}
      <SettingsCard
        title="Single User Session"
        isDirty={session.isDirty}
        onSave={() => { session.save(); toast.current?.show('success', 'Session settings saved') }}
        onDiscard={session.discard}
      >
        <FormRow label="Service Status">
          <ToggleRow
            label={session.fields.sessionEnabled ? 'Enabled' : 'Disabled'}
            checked={session.fields.sessionEnabled}
            onChange={v => session.setField('sessionEnabled', v)}
          />
        </FormRow>
      </SettingsCard>
    </>
  )
}

// ---------------------------------------------------------------------------
// SMTP tab
// ---------------------------------------------------------------------------

function SmtpTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const config = useDirtyTracking({
    smtpEnabled: true,
    host: 'smtp.sendgrid.net',
    port: '587',
    baseUrl: 'https://demo.opswat-mdss.net/',
    senderName: 'John Doe',
    senderEmail: 'example@mail.com',
  })
  const auth = useDirtyTracking({
    domain: 'company.com',
    username: 'apikey',
    password: 'SG.xxxxxxxx',
  })
  const advanced = useDirtyTracking({ ignoreTls: false })

  return (
    <>
      <SettingsCard
        title="Configuration"
        isDirty={config.isDirty}
        onSave={() => { config.save(); toast.current?.show('success', 'SMTP configuration saved') }}
        onDiscard={config.discard}
      >
        <FormRow label="Service Status">
          <ToggleRow
            label={config.fields.smtpEnabled ? 'Active' : 'Inactive'}
            checked={config.fields.smtpEnabled}
            onChange={v => config.setField('smtpEnabled', v)}
          />
        </FormRow>
        <FormRow label="Host">
          <InputField value={config.fields.host} onChange={e => config.setField('host', e.target.value)} clearable onClear={() => config.setField('host', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Port">
          <InputField value={config.fields.port} onChange={e => config.setField('port', e.target.value)} clearable onClear={() => config.setField('port', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Base URL (optional)">
          <InputField value={config.fields.baseUrl} onChange={e => config.setField('baseUrl', e.target.value)} clearable onClear={() => config.setField('baseUrl', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Sender name (optional)">
          <InputField value={config.fields.senderName} onChange={e => config.setField('senderName', e.target.value)} clearable onClear={() => config.setField('senderName', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Sender email address (optional)">
          <InputField type="email" value={config.fields.senderEmail} onChange={e => config.setField('senderEmail', e.target.value)} clearable onClear={() => config.setField('senderEmail', '')} style={{ maxWidth: 340 }} />
        </FormRow>
      </SettingsCard>

      <SettingsCard
        title="Authentication"
        isDirty={auth.isDirty}
        onSave={() => { auth.save(); toast.current?.show('success', 'Authentication saved') }}
        onDiscard={auth.discard}
      >
        <FormRow label="Domain (optional)">
          <InputField value={auth.fields.domain} onChange={e => auth.setField('domain', e.target.value)} clearable onClear={() => auth.setField('domain', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Username">
          <InputField value={auth.fields.username} onChange={e => auth.setField('username', e.target.value)} clearable onClear={() => auth.setField('username', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Password">
          <InputField type="password" value={auth.fields.password} onChange={e => auth.setField('password', e.target.value)} clearable onClear={() => auth.setField('password', '')} style={{ maxWidth: 340 }} />
        </FormRow>
      </SettingsCard>

      <SettingsCard
        title="Advanced Settings"
        isDirty={advanced.isDirty}
        onSave={() => { advanced.save(); toast.current?.show('success', 'Advanced settings saved') }}
        onDiscard={advanced.discard}
      >
        <FormRow label="Ignore TLS Errors">
          <ToggleRow
            label={advanced.fields.ignoreTls ? 'Enabled' : 'Disabled'}
            checked={advanced.fields.ignoreTls}
            onChange={v => advanced.setField('ignoreTls', v)}
          />
        </FormRow>
        <div style={{ gridColumn: '1 / -1' }}>
          <Button variant="outline" onClick={() => toast.current?.show('info', 'Test email sent successfully')}>
            Test SMTP
          </Button>
        </div>
      </SettingsCard>
    </>
  )
}

// ---------------------------------------------------------------------------
// Notifications tab
// ---------------------------------------------------------------------------

function NotificationsTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const email = useDirtyTracking({
    generatedReport: 'always',
    userRegistration: true,
    blockedFiles: 'always',
  })
  const webhook = useDirtyTracking({
    webhookEnabled: false,
    destinationAddress: '',
    requestType: 'JSON',
  })
  const rabbit = useDirtyTracking({
    rabbitEnabled: false,
    rabbitUrl: '',
  })
  const [webhookHeaders, setWebhookHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Authorization', value: 'Bearer ••••••••' },
  ])
  const [rabbitHeaders, setRabbitHeaders] = useState<{ key: string; value: string }[]>([])

  return (
    <>
      {/* Email Notifications */}
      <SettingsCard
        title="Email Notifications"
        isDirty={email.isDirty}
        onSave={() => { email.save(); toast.current?.show('success', 'Email notification settings saved') }}
        onDiscard={email.discard}
      >
        <Banner variant="warning" title="Attention" description="This feature requires the SMTP Server to be configured" />
        <FormRow label="Generated Report" alignTop>
          <div className="flex flex-col gap-2">
            {['always', 'detected', 'never'].map(opt => (
              <label key={opt} className="radio-option">
                <input
                  type="radio"
                  name="genReport"
                  checked={email.fields.generatedReport === opt}
                  onChange={() => email.setField('generatedReport', opt)}
                />
                <span>{opt === 'always' ? 'Send Always' : opt === 'detected' ? 'Send When Threats Detected' : 'Never Send'}</span>
              </label>
            ))}
          </div>
        </FormRow>
        <FormRow label="User Registration">
          <ToggleRow
            label={email.fields.userRegistration ? 'Enabled' : 'Disabled'}
            checked={email.fields.userRegistration}
            onChange={v => email.setField('userRegistration', v)}
          />
        </FormRow>
        <FormRow label="Blocked Files" alignTop>
          <div className="flex flex-col gap-2">
            {['always', 'never'].map(opt => (
              <label key={opt} className="radio-option">
                <input
                  type="radio"
                  name="blockedFiles"
                  checked={email.fields.blockedFiles === opt}
                  onChange={() => email.setField('blockedFiles', opt)}
                />
                <span>{opt === 'always' ? 'Send Always' : 'Never Send'}</span>
              </label>
            ))}
          </div>
        </FormRow>
      </SettingsCard>

      {/* Webhook Notifications */}
      <SettingsCard
        title="Webhook Notifications"
        isDirty={webhook.isDirty}
        onSave={() => { webhook.save(); toast.current?.show('success', 'Webhook settings saved') }}
        onDiscard={webhook.discard}
      >
        <FormRow label="Service Status">
          <ToggleRow
            label={webhook.fields.webhookEnabled ? 'Active' : 'Inactive'}
            checked={webhook.fields.webhookEnabled}
            onChange={v => webhook.setField('webhookEnabled', v)}
          />
        </FormRow>
        <FormRow label="Destination Address">
          <InputField value={webhook.fields.destinationAddress} onChange={e => webhook.setField('destinationAddress', e.target.value)} placeholder="https://webhook.site/..." clearable onClear={() => webhook.setField('destinationAddress', '')} style={{ maxWidth: 340 }} />
        </FormRow>
        <FormRow label="Request Type">
          <SelectField value={webhook.fields.requestType} onChange={e => webhook.setField('requestType', e.target.value)}>
            <option value="JSON">JSON</option>
            <option value="Form">Form</option>
          </SelectField>
        </FormRow>

        {/* Headers table */}
        <div style={{ gridColumn: '1 / -1' }}>
          <div className="headers-table">
            <div className="headers-table-head">
              <span className="col-key">Key</span>
              <span className="col-value">Value</span>
              <span className="col-actions"></span>
            </div>
            {webhookHeaders.map((h, i) => (
              <div key={i} className="headers-table-row">
                <span className="col-key">{h.key}</span>
                <span className="col-value">{h.value}</span>
                <span className="col-actions">
                  <span className="edit-icon" onClick={() => toast.current?.show('info', 'Edit header')}>
                    <Icon name="edit" size="sm" />
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="headers-input-row" style={{ marginTop: 8 }}>
            <InputField placeholder="Key" style={{ flex: 1 }} />
            <InputField placeholder="Value" style={{ flex: 1 }} />
            <button className="btn-add-header" onClick={() => toast.current?.show('info', 'Header added')}>Add</button>
          </div>
        </div>
      </SettingsCard>

      {/* RabbitMQ Notifications */}
      <SettingsCard
        title="RabbitMQ Notifications"
        isDirty={rabbit.isDirty}
        onSave={() => { rabbit.save(); toast.current?.show('success', 'RabbitMQ settings saved') }}
        onDiscard={rabbit.discard}
      >
        <FormRow label="Service Status">
          <ToggleRow
            label={rabbit.fields.rabbitEnabled ? 'Active' : 'Inactive'}
            checked={rabbit.fields.rabbitEnabled}
            onChange={v => rabbit.setField('rabbitEnabled', v)}
          />
        </FormRow>
        <FormRow label="RabbitMQ URL">
          <InputField value={rabbit.fields.rabbitUrl} onChange={e => rabbit.setField('rabbitUrl', e.target.value)} placeholder="amqp://localhost:5672" clearable onClear={() => rabbit.setField('rabbitUrl', '')} style={{ maxWidth: 340 }} />
        </FormRow>
      </SettingsCard>
    </>
  )
}

// ---------------------------------------------------------------------------
// Licensing tab
// ---------------------------------------------------------------------------

function LicensingTab({ toast, onOpenLicenseModal }: { toast: React.RefObject<ToasterHandle | null>; onOpenLicenseModal: () => void }) {
  const [hasLicense, setHasLicense] = useState(false)

  if (!hasLicense) {
    return (
      <div className="settings-card">
        <div className="card-header"><h2>Active License</h2></div>
        <div className="license-empty-state">
          <svg className="license-empty-illustration" viewBox="0 0 120 120" fill="none">
            <rect x="20" y="30" width="80" height="60" rx="4" fill="#E8ECF0" stroke="#C4CDD5" strokeWidth="1.5"/>
            <rect x="30" y="45" width="40" height="4" rx="2" fill="#C4CDD5"/>
            <rect x="30" y="55" width="60" height="4" rx="2" fill="#C4CDD5"/>
            <rect x="30" y="65" width="50" height="4" rx="2" fill="#C4CDD5"/>
            <rect x="30" y="75" width="30" height="4" rx="2" fill="#C4CDD5"/>
            <circle cx="90" cy="80" r="18" fill="#E8F0FF" stroke="#4A6FA5" strokeWidth="1.5"/>
            <path d="M84 80L88 84L96 76" stroke="#4A6FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div className="license-empty-title">You do not have a valid license.</div>
          <div className="license-empty-desc">
            Certain features are currently disabled.<br/>
            Please contact <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>OPSWAT Sales</a> to get your license.
          </div>
          <Button variant="primary" onClick={() => { onOpenLicenseModal(); setHasLicense(true) }}>Add License</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="settings-card">
      <div className="card-header"><h2>Active License</h2></div>
      <div className="card-content">
        <FormRow label="Deployment ID">
          <span style={{ fontSize: 14, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>MDSSChuLmMLF4oneXGZP4jz4qx9xH2YDfib14</span>
        </FormRow>
        <FormRow label="Product ID">
          <span style={{ fontSize: 14, color: 'var(--text-subtle)' }}>MD-SUPPLY-CHAIN-SA-EVAL</span>
        </FormRow>
        <FormRow label="Expiration Date">
          <span className="license-badge green">Dec 31, 2026</span>
        </FormRow>
        <FormRow label="Name">
          <span style={{ fontSize: 14, color: 'var(--text-subtle)' }}>MetaDefender Software Supply Chain - Standalone - Evaluation</span>
        </FormRow>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline" onClick={() => { setHasLicense(false); toast.current?.show('info', 'License deactivated') }}>Deactivate</Button>
          <Button variant="outline" onClick={onOpenLicenseModal}>Activate New License</Button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SSO tab
// ---------------------------------------------------------------------------

function SsoTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const sso = useDirtyTracking({
    ssoEnabled: true,
    ssoType: 'Open ID Connect',
    ssoProvider: 'Okta',
    clientId: 'a7f3b9c2e1d4',
    clientSecret: '',
    authorityUrl: '',
    readonlyRole: '',
  })

  return (
    <SettingsCard
      title="SSO Configuration"
      isDirty={sso.isDirty}
      onSave={() => { sso.save(); toast.current?.show('success', 'SSO configuration saved') }}
      onDiscard={sso.discard}
    >
      <FormRow label="Service Status">
        <ToggleRow
          label={sso.fields.ssoEnabled ? 'Active' : 'Inactive'}
          checked={sso.fields.ssoEnabled}
          onChange={v => sso.setField('ssoEnabled', v)}
        />
      </FormRow>
      <FormRow label="SSO Type">
        <SelectField value={sso.fields.ssoType} onChange={e => sso.setField('ssoType', e.target.value)}>
          <option>Open ID Connect</option>
          <option>SAML 2.0</option>
        </SelectField>
      </FormRow>
      <FormRow label="SSO Provider">
        <SelectField value={sso.fields.ssoProvider} onChange={e => sso.setField('ssoProvider', e.target.value)}>
          <option>Okta</option>
          <option>Azure AD</option>
          <option>OneLogin</option>
          <option>PingOne</option>
          <option>Other</option>
        </SelectField>
      </FormRow>
      <FormRow label="Client ID">
        <InputField value={sso.fields.clientId} onChange={e => sso.setField('clientId', e.target.value)} clearable onClear={() => sso.setField('clientId', '')} style={{ maxWidth: 340 }} />
      </FormRow>
      <FormRow label="Client Secret">
        <InputField type="password" value={sso.fields.clientSecret} onChange={e => sso.setField('clientSecret', e.target.value)} placeholder="Enter client secret" style={{ maxWidth: 340 }} />
      </FormRow>
      <FormRow label="Authority URL">
        <InputField value={sso.fields.authorityUrl} onChange={e => sso.setField('authorityUrl', e.target.value)} placeholder="https://your-provider.com/oauth2" clearable onClear={() => sso.setField('authorityUrl', '')} style={{ maxWidth: 340 }} />
      </FormRow>
      <FormRow label="ReadOnly Role Name">
        <InputField value={sso.fields.readonlyRole} onChange={e => sso.setField('readonlyRole', e.target.value)} placeholder="readonly" clearable onClear={() => sso.setField('readonlyRole', '')} style={{ maxWidth: 340 }} />
      </FormRow>
    </SettingsCard>
  )
}

// ---------------------------------------------------------------------------
// Data tab
// ---------------------------------------------------------------------------

const COLLECTORS = [
  { type: 'Telemetry', endpoint: 'https://telemetry.opswat.com/v1/', apiKey: '••••••••••', protocol: 'HTTPS' },
  { type: 'Analytics', endpoint: 'https://analytics.opswat.com/v2/', apiKey: '••••••••••', protocol: 'HTTPS' },
]

function DataTab({ toast }: { toast: React.RefObject<ToasterHandle | null> }) {
  const telemetry = useDirtyTracking({ dataCollection: true, sendToOpswat: true })
  const retention = useDirtyTracking({ telemetryRetention: true, auditDays: '365', reportsRetention: true })

  return (
    <>
      {/* Telemetry */}
      <SettingsCard
        title="Telemetry"
        isDirty={telemetry.isDirty}
        onSave={() => { telemetry.save(); toast.current?.show('success', 'Telemetry settings saved') }}
        onDiscard={telemetry.discard}
      >
        <FormRow label="Data Collection">
          <ToggleRow
            label={telemetry.fields.dataCollection ? 'Enabled' : 'Disabled'}
            checked={telemetry.fields.dataCollection}
            onChange={v => telemetry.setField('dataCollection', v)}
          />
        </FormRow>
        <FormRow label="Send to OPSWAT">
          <ToggleRow
            label={telemetry.fields.sendToOpswat ? 'Enabled' : 'Disabled'}
            checked={telemetry.fields.sendToOpswat}
            onChange={v => telemetry.setField('sendToOpswat', v)}
          />
        </FormRow>

        {/* Collectors table */}
        <div style={{ gridColumn: '1 / -1' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Endpoint URL</th>
                <th>API Key</th>
                <th>Protocol</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {COLLECTORS.map((c, i) => (
                <tr key={i}>
                  <td>{c.type}</td>
                  <td>{c.endpoint}</td>
                  <td><span className="api-dots">{c.apiKey}</span></td>
                  <td>{c.protocol}</td>
                  <td className="col-action">
                    <div className="row-action-btn" onClick={e => {
                      const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                      if (menu) menu.classList.toggle('open')
                    }}>
                      <Icon name="action" size="sm" />
                      <div className="row-action-menu">
                        <button className="row-action-menu-item" onClick={() => toast.current?.show('info', 'Edit collector')}>
                          <Icon name="edit" size="sm" />Edit
                        </button>
                        <button className="row-action-menu-item danger" onClick={() => toast.current?.show('info', 'Delete collector')}>
                          <Icon name="close" size="sm" />Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      {/* Data Retention */}
      <SettingsCard
        title="Data Retention"
        isDirty={retention.isDirty}
        onSave={() => { retention.save(); toast.current?.show('success', 'Retention settings saved') }}
        onDiscard={retention.discard}
      >
        <FormRow label="Telemetry">
          <ToggleRow
            label={retention.fields.telemetryRetention ? 'Enabled' : 'Disabled'}
            checked={retention.fields.telemetryRetention}
            onChange={v => retention.setField('telemetryRetention', v)}
          />
        </FormRow>
        <FormRow label="Clean up audit records older than (days)">
          <InputField value={retention.fields.auditDays} onChange={e => retention.setField('auditDays', e.target.value)} style={{ maxWidth: 120 }} />
        </FormRow>
        <FormRow label="Reports Retention">
          <ToggleRow
            label={retention.fields.reportsRetention ? 'Enabled' : 'Disabled'}
            checked={retention.fields.reportsRetention}
            onChange={v => retention.setField('reportsRetention', v)}
          />
        </FormRow>
      </SettingsCard>
    </>
  )
}

// ---------------------------------------------------------------------------
// Settings page (root export)
// ---------------------------------------------------------------------------

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [addPoolOpen, setAddPoolOpen] = useState(false)
  const [licenseModalOpen, setLicenseModalOpen] = useState(false)
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false)
  const pendingTab = useRef<string | null>(null)
  const toasterRef = useRef<ToasterHandle | null>(null)

  // Dirty check on tab switch
  const handleTabChange = useCallback((tab: string) => {
    // For simplicity, always allow switching.
    // The original had per-card dirty checks; in React each tab's cards
    // manage their own dirty state via hooks, so we let them warn inline.
    setActiveTab(tab)
  }, [])

  return (
    <div className={cn('flex flex-col gap-0 font-sans')} id="settingsPage">
      <div className="page-title-row" style={{ padding: '0 20px 0 20px', marginBottom: 20 }}>
        <h1 className="page-title">Settings</h1>
        <button className="btn-export" title="Includes Accounts, Groups, Storage Units, RTP Scans, Workflow Snapshots, Scan Instances, Scan Pools, Workflows, Scan Schedules, SSO Config">
          Export
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <Tabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        >
          <TabPanel id="profile"       activeTab={activeTab}><ProfileTab toast={toasterRef} /></TabPanel>
          <TabPanel id="scan-pools"    activeTab={activeTab}><ScanPoolsTab toast={toasterRef} onOpenAddPanel={() => setAddPoolOpen(true)} /></TabPanel>
          <TabPanel id="security"      activeTab={activeTab}><SecurityTab toast={toasterRef} /></TabPanel>
          <TabPanel id="smtp"          activeTab={activeTab}><SmtpTab toast={toasterRef} /></TabPanel>
          <TabPanel id="notifications" activeTab={activeTab}><NotificationsTab toast={toasterRef} /></TabPanel>
          <TabPanel id="licensing"     activeTab={activeTab}><LicensingTab toast={toasterRef} onOpenLicenseModal={() => setLicenseModalOpen(true)} /></TabPanel>
          <TabPanel id="sso"           activeTab={activeTab}><SsoTab toast={toasterRef} /></TabPanel>
          <TabPanel id="data"          activeTab={activeTab}><DataTab toast={toasterRef} /></TabPanel>
        </Tabs>
      </div>

      {/* Add Scan Pool Panel */}
      <SlidePanel
        open={addPoolOpen}
        onClose={() => setAddPoolOpen(false)}
        title="Add Scan Pool"
      >
        <div className="flex flex-col gap-4 p-5">
          <FormRow label="Pool Name">
            <InputField placeholder="Enter pool name" />
          </FormRow>
          <FormRow label="Description">
            <InputField placeholder="Optional description" />
          </FormRow>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setAddPoolOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setAddPoolOpen(false); toasterRef.current?.show('success', 'Scan pool created') }}>Create</Button>
          </div>
        </div>
      </SlidePanel>

      {/* License Modal */}
      <Modal
        open={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        title="Add License"
      >
        <div className="flex flex-col gap-4 p-5">
          <FormRow label="License Key">
            <InputField placeholder="Paste your license key" />
          </FormRow>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setLicenseModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setLicenseModalOpen(false); toasterRef.current?.show('success', 'License activated') }}>Activate</Button>
          </div>
        </div>
      </Modal>

      {/* Unsaved Changes Modal */}
      <Modal
        open={unsavedModalOpen}
        onClose={() => setUnsavedModalOpen(false)}
        title="Unsaved Changes"
      >
        <div className="flex flex-col gap-4 p-5">
          <p style={{ fontSize: 14, color: 'var(--text-subtle)' }}>
            You have unsaved changes. Do you want to leave without saving?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setUnsavedModalOpen(false)}>Stay</Button>
            <Button variant="primary" onClick={() => {
              setUnsavedModalOpen(false)
              if (pendingTab.current) {
                setActiveTab(pendingTab.current)
                pendingTab.current = null
              }
            }}>Leave Anyway</Button>
          </div>
        </div>
      </Modal>

      <Toaster ref={toasterRef} />
    </div>
  )
}
