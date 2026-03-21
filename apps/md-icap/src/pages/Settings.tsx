import { useState } from 'react'
import { cn, Tabs } from '@opswat/blue-line'

const settingsTabs = [
  { id: 'network', label: 'Network' },
  { id: 'global', label: 'Global' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'export-import', label: 'Export/Import' },
  { id: 'security', label: 'Security' },
  { id: 'health-check', label: 'Health Check' },
  { id: 'nginx', label: 'NGINX Configuration' },
  { id: 'filemod', label: 'Filemod Configuration' },
  { id: 'about', label: 'About' },
  { id: 'central-mgmt', label: 'Central Management' },
  { id: 'license', label: 'License' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('network')
  const [proxyEnabled, setProxyEnabled] = useState(true)
  const [proxyMode, setProxyMode] = useState<'env' | 'custom'>('custom')

  return (
    <>
      {/* Page title */}
      <div className="flex items-center h-8 mb-5">
        <h2 className="text-[24px] font-medium leading-[27px] text-[var(--text-strong)]">Settings</h2>
      </div>

      {/* BL Tabs */}
      <Tabs tabs={settingsTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      {activeTab === 'network' && (
        <div className="bg-[var(--surface-card)] border border-[var(--border-card)] rounded p-6">
          {/* Email Server */}
          <div className="settings-section">
            <div className="settings-label">Email Server</div>
            <div className="settings-content">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--text-subtle)]">SMTP server for sending emails</span>
                <button type="button" className="h-8 px-4 rounded border border-[var(--border-card)] bg-transparent text-[14px] font-medium text-[var(--text-strong)] cursor-pointer font-sans hover:bg-[var(--hover-subtle)]">
                  Configure
                </button>
              </div>
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-[var(--border-card)]">
                    <th className="text-left font-medium text-[var(--text-strong)] py-2 pr-8">Server</th>
                    <th className="text-left font-medium text-[var(--text-strong)] py-2 pr-8">Port</th>
                    <th className="text-left font-medium text-[var(--text-strong)] py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 pr-8 text-[var(--text-subtle)]">mail.icap.com</td>
                    <td className="py-2 pr-8 text-[var(--text-subtle)]">465</td>
                    <td className="py-2 text-[var(--text-subtle)]">tran@icap.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Proxy */}
          <div className="settings-section">
            <div className="settings-label">Proxy</div>
            <div className="settings-content">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setProxyEnabled(!proxyEnabled)}
                  className={cn(
                    'relative w-10 h-5 rounded-full border-none cursor-pointer transition-colors duration-150',
                    proxyEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--color-neutral-300)]',
                  )}
                >
                  <span className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-[left] duration-150',
                    proxyEnabled ? 'left-[22px]' : 'left-0.5',
                  )} />
                </button>
                <span className="text-[14px] font-medium text-[var(--text-strong)]">Use proxy connection</span>
              </label>

              {proxyEnabled && (
                <div className="flex flex-col gap-3 pl-[52px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="proxy-mode"
                      checked={proxyMode === 'env'}
                      onChange={() => setProxyMode('env')}
                      className="w-4 h-4 accent-[var(--primary)]"
                    />
                    <span className="text-[14px] text-[var(--text-subtle)]">Configuration from environment variable</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="proxy-mode"
                      checked={proxyMode === 'custom'}
                      onChange={() => setProxyMode('custom')}
                      className="w-4 h-4 accent-[var(--primary)]"
                    />
                    <span className="text-[14px] text-[var(--text-subtle)]">Custom configuration</span>
                  </label>

                  {proxyMode === 'custom' && (
                    <button type="button" className="self-start h-8 px-4 rounded border border-[var(--border-card)] bg-transparent text-[14px] font-medium text-[var(--text-strong)] cursor-pointer font-sans hover:bg-[var(--hover-subtle)]">
                      Configure
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'network' && (
        <div className="bg-[var(--surface-card)] border border-[var(--border-card)] rounded p-6 flex items-center justify-center min-h-[200px] text-[var(--text-muted)] text-[14px]">
          {settingsTabs.find(t => t.id === activeTab)?.label} — coming soon
        </div>
      )}
    </>
  )
}
