import { useState, useEffect, useRef, type ReactNode } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

/* ===== PREVIEW / CODE COMPONENT BLOCK ===== */
export function ComponentBlock({
  preview,
  code,
  language = 'html',
}: {
  preview: ReactNode
  code: string
  language?: string
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (tab === 'code' && codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [tab, code])

  function copyCode() {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="mb-6 border border-[var(--border-200)] rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-[var(--border-200)] bg-[var(--surface-card)] px-1">
        <button
          onClick={() => setTab('preview')}
          className={`px-4 py-2.5 text-[12px] font-medium border-b-2 -mb-px cursor-pointer transition-colors bg-transparent border-none ${
            tab === 'preview'
              ? 'text-[var(--text-strong)] border-b-[var(--text-strong)]'
              : 'text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-strong)]'
          }`}
          style={{
            fontFamily: 'var(--ds-font)',
            borderBottom:
              tab === 'preview' ? '2px solid var(--text-strong)' : '2px solid transparent',
          }}
        >
          Preview
        </button>
        <button
          onClick={() => setTab('code')}
          className={`px-4 py-2.5 text-[12px] font-medium border-b-2 -mb-px cursor-pointer transition-colors bg-transparent border-none ${
            tab === 'code'
              ? 'text-[var(--text-strong)] border-b-[var(--text-strong)]'
              : 'text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-strong)]'
          }`}
          style={{
            fontFamily: 'var(--ds-font)',
            borderBottom:
              tab === 'code' ? '2px solid var(--text-strong)' : '2px solid transparent',
          }}
        >
          Code
        </button>
      </div>

      {/* Preview */}
      {tab === 'preview' && (
        <div className="docs-preview p-8 bg-[var(--surface-card)]">{preview}</div>
      )}

      {/* Code */}
      {tab === 'code' && (
        <div className="relative" style={{ background: 'var(--ds-code-bg)' }}>
          <button
            onClick={copyCode}
            className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[12px] font-medium rounded-md cursor-pointer border transition-all"
            style={{
              fontFamily: 'var(--ds-font)',
              background: 'rgba(255,255,255,0.06)',
              color: '#71717a',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre style={{ margin: 0, padding: '16px 20px', overflow: 'auto' }}>
            <code ref={codeRef} className={`language-${language}`}>
              {code.trim()}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

/* ===== STANDALONE CODE BLOCK (no preview) ===== */
export function CodeBlock({
  code,
  language = 'html',
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current)
  }, [code])

  function copyCode() {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className="relative mb-6 rounded-lg overflow-hidden border border-[var(--border-200)]"
      style={{ background: 'var(--ds-code-bg)' }}
    >
      <button
        onClick={copyCode}
        className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[12px] font-medium rounded-md cursor-pointer border transition-all"
        style={{
          fontFamily: 'var(--ds-font)',
          background: 'rgba(255,255,255,0.06)',
          color: '#71717a',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre style={{ margin: 0, padding: '16px 20px', overflow: 'auto' }}>
        <code ref={codeRef} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  )
}

/* ===== SECTION WRAPPER ===== */
export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section data-section={id} className="mb-16 scroll-mt-20">
      <h2 className="text-[28px] font-semibold tracking-tight text-[var(--text-strong)] mb-1 leading-tight">
        {title}
      </h2>
      <div className="h-px bg-[var(--border-200)] mt-3 mb-4" />
      {description && (
        <p className="text-[14px] text-[var(--text-subtle)] mb-8 leading-relaxed max-w-[680px]">
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

/* ===== SUBSECTION WRAPPER ===== */
export function Subsection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mb-8">
      <h3 className="text-[16px] font-semibold text-[var(--text-strong)] mb-3 tracking-tight">
        {title}
      </h3>
      {children}
    </div>
  )
}

/* ===== GUIDELINE CALLOUT ===== */
export function Guideline({
  children,
  variant = 'info',
}: {
  children: ReactNode
  variant?: 'info' | 'do' | 'dont'
}) {
  const variantClasses = {
    info: 'border-[var(--border-200)] bg-[var(--surface-card)]',
    do: 'border-[var(--color-green-700)] bg-[var(--color-green-100)] dark:bg-[rgba(0,218,153,0.06)]',
    dont: 'border-[var(--color-red-600)] bg-[var(--color-red-100)] dark:bg-[rgba(255,0,61,0.06)]',
  }

  return (
    <div
      className={`p-3.5 rounded-lg border text-[14px] leading-relaxed text-[var(--text-subtle)] mb-5 ${variantClasses[variant]}`}
    >
      {children}
    </div>
  )
}

/* ===== PROPS / CLASS REFERENCE TABLE ===== */
export function PropsTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | ReactNode)[][]
}) {
  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 text-[12px] font-medium text-[var(--text-muted)] border-b border-[var(--border-200)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2.5 text-[14px] text-[var(--text-subtle)] border-b border-[var(--border-card)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ===== INLINE CODE ===== */
export function InlineCode({ children }: { children: string }) {
  return (
    <code
      className="text-[12px] px-1.5 py-0.5 rounded bg-[var(--color-neutral-100)] text-[var(--text-strong)] dark:bg-[rgba(255,255,255,0.06)] dark:text-[#e4e4e7]"
      style={{ fontFamily: 'var(--ds-mono)' }}
    >
      {children}
    </code>
  )
}
