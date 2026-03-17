import { useState } from 'react'

export function App() {
  const [dark, setDark] = useState(false)

  function toggleTheme() {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] text-[var(--text-strong)] p-std">
      <header className="flex items-center justify-between mb-xl">
        <h1 className="text-h2 font-medium">Blue Line Token Verification</h1>
        <button
          onClick={toggleTheme}
          className="h-8 px-3 rounded bg-[var(--primary)] text-[var(--text-on-fill)] font-medium text-label cursor-pointer"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Color Palette — uses inline styles because Tailwind cannot detect dynamic class names */}
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
