import { Section, Subsection } from '../components/ComponentBlock'

/* ===== COLOR SWATCH ===== */
function Swatch({ hex, label, light }: { hex: string; label: string; light?: boolean }) {
  return (
    <div
      className="w-12 h-12 rounded-lg flex items-end justify-center pb-1 border border-black/5 transition-transform hover:scale-110 cursor-default"
      style={{ background: hex, color: light ? '#333' : '#fff', fontSize: '9px', textShadow: light ? 'none' : '0 0 3px rgba(0,0,0,0.5)' }}
      title={`${label}: ${hex}`}
    >
      {label}
    </div>
  )
}

function SwatchRow({ label, swatches }: { label: string; swatches: { hex: string; label: string; light?: boolean }[] }) {
  return (
    <div className="mb-3">
      <p className="text-[12px] text-[var(--text-muted)] mb-1.5">{label}</p>
      <div className="flex gap-1">{swatches.map((s) => <Swatch key={s.label} {...s} />)}</div>
    </div>
  )
}

/* ===== TYPOGRAPHY ROW ===== */
function TypeRow({ name, size, sample, style }: { name: string; size: string; sample: string; style: React.CSSProperties }) {
  return (
    <div className="flex items-baseline gap-4 py-2.5 border-b border-[var(--border-card)]">
      <span className="w-[120px] shrink-0 text-[13px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>{name}</span>
      <span className="w-[60px] shrink-0 text-[13px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>{size}</span>
      <span style={style}>{sample}</span>
    </div>
  )
}

/* ===== SPACING ROW ===== */
function SpaceRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-[180px] shrink-0 text-[13px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--ds-mono)' }}>{name}</span>
      <div className="h-5 rounded-sm bg-[var(--color-blue-200)] dark:bg-[rgba(29,107,252,0.3)]" style={{ width: value }} />
      <span className="text-[13px] text-[var(--text-subtle)]" style={{ fontFamily: 'var(--ds-mono)' }}>{value}</span>
    </div>
  )
}

export function TokensPage() {
  return (
    <Section
      id="tokens"
      title="Design Tokens"
      description="Core visual foundations: color palettes, typography scale, spacing, shadows, and border radius tokens."
    >
      <Subsection title="Color Palettes">
        <SwatchRow label="Neutral" swatches={[
          { hex: '#f8f9f9', label: '100', light: true }, { hex: '#ebecee', label: '200', light: true },
          { hex: '#dee0e4', label: '300', light: true }, { hex: '#c7ccd5', label: '400', light: true },
          { hex: '#a9b2c4', label: '500' }, { hex: '#607497', label: '600' },
          { hex: '#475b81', label: '700' }, { hex: '#344565', label: '800' },
          { hex: '#24324b', label: '900' }, { hex: '#172234', label: '1000' },
          { hex: '#141b27', label: '1100' }, { hex: '#0c121d', label: '1200' },
        ]} />
        <SwatchRow label="Blue (Primary)" swatches={[
          { hex: '#e8f0ff', label: '100', light: true }, { hex: '#c6dafe', label: '200', light: true },
          { hex: '#a5c4fe', label: '300', light: true }, { hex: '#77a6fd', label: '400' },
          { hex: '#5690fd', label: '500' }, { hex: '#357bfc', label: '600' },
          { hex: '#1d6bfc', label: '700' }, { hex: '#1854c3', label: '800' },
          { hex: '#123d8b', label: '900' }, { hex: '#0d2654', label: '1000' },
          { hex: '#091b3b', label: '1100' },
        ]} />
        <SwatchRow label="Red (Alert)" swatches={[
          { hex: '#ffdfdb', label: '100', light: true }, { hex: '#ffbab7', label: '200', light: true },
          { hex: '#ff9392', label: '300' }, { hex: '#ff6e75', label: '400' },
          { hex: '#ff495e', label: '500' }, { hex: '#ff254a', label: '600' },
          { hex: '#ff003d', label: '700' }, { hex: '#d40031', label: '800' },
          { hex: '#a90027', label: '900' }, { hex: '#7e001d', label: '1000' },
        ]} />
        <SwatchRow label="Green" swatches={[
          { hex: '#dffff5', label: '100', light: true }, { hex: '#b3ffe8', label: '200', light: true },
          { hex: '#86ffdb', label: '300', light: true }, { hex: '#59ffcd', label: '400', light: true },
          { hex: '#2dffc0', label: '500' }, { hex: '#00ffb2', label: '600' },
          { hex: '#00da99', label: '700' }, { hex: '#00b67f', label: '800' },
          { hex: '#009165', label: '900' }, { hex: '#006c4c', label: '1000' },
          { hex: '#004832', label: '1100' }, { hex: '#002318', label: '1200' },
        ]} />
        <SwatchRow label="Orange" swatches={[
          { hex: '#ffebde', label: '100', light: true }, { hex: '#ffd6b9', label: '200', light: true },
          { hex: '#ffc094', label: '300', light: true }, { hex: '#ffab6f', label: '400' },
          { hex: '#ff954a', label: '500' }, { hex: '#ff8025', label: '600' },
          { hex: '#ff6b00', label: '700' }, { hex: '#d55300', label: '800' },
          { hex: '#aa3e00', label: '900' }, { hex: '#802b00', label: '1000' },
          { hex: '#551a00', label: '1100' },
        ]} />
        <SwatchRow label="Yellow" swatches={[
          { hex: '#fff8d5', label: '100', light: true }, { hex: '#fff1aa', label: '200', light: true },
          { hex: '#ffea80', label: '300', light: true }, { hex: '#ffe355', label: '400', light: true },
          { hex: '#ffdc2b', label: '500', light: true }, { hex: '#ffd600', label: '600', light: true },
          { hex: '#dbb600', label: '700' }, { hex: '#b69700', label: '800' },
          { hex: '#927800', label: '900' }, { hex: '#6d5a00', label: '1000' },
          { hex: '#493c00', label: '1100' }, { hex: '#251e00', label: '1200' },
        ]} />
        <SwatchRow label="Teal" swatches={[
          { hex: '#e8feff', label: '100', light: true }, { hex: '#b8fbfe', label: '200', light: true },
          { hex: '#88f8fe', label: '300', light: true }, { hex: '#58f5fd', label: '400', light: true },
          { hex: '#28f2fd', label: '500', light: true }, { hex: '#03e7f5', label: '600' },
          { hex: '#02c5cf', label: '700' }, { hex: '#02a3ac', label: '800' },
          { hex: '#018288', label: '900' }, { hex: '#016065', label: '1000' },
          { hex: '#013e42', label: '1100' }, { hex: '#001d1e', label: '1200' },
        ]} />
        <SwatchRow label="Purple" swatches={[
          { hex: '#f7e5f8', label: '100', light: true }, { hex: '#ecc2ef', label: '200', light: true },
          { hex: '#e09fe6', label: '300' }, { hex: '#d57cdd', label: '400' },
          { hex: '#ca59d4', label: '500' }, { hex: '#bf36cb', label: '600' },
          { hex: '#9f2caa', label: '700' }, { hex: '#7f2387', label: '800' },
          { hex: '#5e1a64', label: '900' }, { hex: '#3e1142', label: '1000' },
        ]} />
      </Subsection>

      <Subsection title="Typography Scale">
        <TypeRow name="H1" size="28px" sample="Heading One" style={{ fontSize: '28px', fontWeight: 500, lineHeight: '32px' }} />
        <TypeRow name="H2" size="24px" sample="Heading Two" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '27px' }} />
        <TypeRow name="H3" size="20px" sample="Heading Three" style={{ fontSize: '20px', fontWeight: 500, lineHeight: '23px' }} />
        <TypeRow name="H4" size="16px" sample="Heading Four" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '18px' }} />
        <TypeRow name="Label" size="14px" sample="Label Text" style={{ fontSize: '14px', fontWeight: 500, lineHeight: '16px' }} />
        <TypeRow name="Paragraph" size="14px" sample="Paragraph body text for content." style={{ fontSize: '14px', fontWeight: 400, lineHeight: '19px' }} />
        <TypeRow name="Note" size="12px" sample="Note text for secondary info." style={{ fontSize: '12px', fontWeight: 400, lineHeight: '14px' }} />
        <TypeRow name="Inset" size="10px" sample="Inset text for smallest details." style={{ fontSize: '10px', fontWeight: 400, lineHeight: '11px' }} />
      </Subsection>

      <Subsection title="Spacing Scale">
        <SpaceRow name="--space-none" value="0px" />
        <SpaceRow name="--space-tiny" value="2px" />
        <SpaceRow name="--space-tight" value="4px" />
        <SpaceRow name="--space-xs" value="8px" />
        <SpaceRow name="--space-sm" value="12px" />
        <SpaceRow name="--space-std" value="20px" />
        <SpaceRow name="--space-md" value="24px" />
        <SpaceRow name="--space-lg" value="32px" />
        <SpaceRow name="--space-xl" value="40px" />
        <SpaceRow name="--space-2xl" value="48px" />
      </Subsection>

      <Subsection title="Shadows">
        <div className="flex gap-6 flex-wrap">
          {['shadow-1', 'shadow-2', 'shadow-3', 'shadow-4'].map((s) => (
            <div
              key={s}
              className="w-[120px] h-[80px] rounded-lg bg-[var(--surface-card)] border border-[var(--border-card)] flex items-center justify-center text-[12px] text-[var(--text-muted)]"
              style={{ boxShadow: `var(--${s})`, fontFamily: 'var(--ds-mono)' }}
            >
              {s}
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Border Radius">
        <div className="flex gap-4 items-center">
          {[
            { token: 'none', value: '0px' },
            { token: '4px', value: '4px' },
            { token: '8px', value: '8px' },
            { token: '12px', value: '12px' },
            { token: 'pill', value: '9999px' },
          ].map((r) => (
            <div
              key={r.token}
              className="w-16 h-12 bg-[var(--color-blue-100)] dark:bg-[rgba(29,107,252,0.1)] border-2 border-[var(--color-blue-400)] flex items-center justify-center text-[10px] text-[var(--color-blue-800)]"
              style={{ borderRadius: r.value, fontFamily: 'var(--ds-mono)' }}
            >
              {r.token}
            </div>
          ))}
        </div>
      </Subsection>
    </Section>
  )
}
