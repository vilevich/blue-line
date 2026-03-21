import { useState, useRef, useCallback, useEffect, type MouseEvent as ReactMouseEvent } from 'react'
import {
  cn,
  PageHeader,
  Breadcrumb,
  type BreadcrumbItem,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Tag,
  Icon,
  SlidePanel,
  InputField,
  SelectField,
  Toggle,
  Pagination,
} from '@opswat/blue-line'

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewState = { view: 'list' } | { view: 'detail'; index: number }

type RemTag = 'none' | 'keep' | 'copy' | 'move' | 'delete' | 'failed'

interface WorkflowRow {
  name: string
  isDefault?: boolean
  fileDiscovery: string
  scanPool: string
  security: string
  fileTagging: string
  deepCdr: string
  remediations: { label: string; tag: RemTag }[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WORKFLOWS: WorkflowRow[] = [
  { name: 'Default Workflow', isDefault: true, fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'None', tag: 'none' }] },
  { name: 'Email 2025', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Keep', tag: 'none' }] },
  { name: 'Finance', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Copy', tag: 'copy' }] },
  { name: 'Weekly Scan', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Copy', tag: 'copy' }] },
  { name: 'Doc Library', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Copy', tag: 'copy' }] },
  { name: 'User Data', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Delete', tag: 'delete' }] },
  { name: 'Email 2024', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Move', tag: 'move' }] },
  { name: 'Test WF', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Keep', tag: 'none' }, { label: 'Copy', tag: 'copy' }, { label: 'Delete', tag: 'delete' }] },
  { name: 'Full Disk', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Failed', tag: 'failed' }] },
  { name: 'Quick Scan', fileDiscovery: 'Enabled', scanPool: 'Scan Pool Name', security: '3/4 Enabled', fileTagging: 'Enabled', deepCdr: 'Enabled', remediations: [{ label: 'Copy', tag: 'copy' }] },
]

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg className="wf-default-icon" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.52 6.39006L11.23 9.07006L12.32 13.1701C12.44 13.6101 11.95 13.9701 11.56 13.7201L8.00002 11.4101L4.44002 13.7201C4.05002 13.9701 3.56002 13.6101 3.68002 13.1701L4.77002 9.07006L1.48002 6.39006C1.12002 6.10006 1.31002 5.53006 1.77002 5.50006L6.01002 5.28006L7.53002 1.32006C7.70002 0.890059 8.30002 0.890059 8.47002 1.32006L9.99002 5.28006L14.23 5.50006C14.69 5.53006 14.88 6.10006 14.52 6.39006Z" />
    </svg>
  )
}

function ThreeDotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="13" r="1.5" />
    </svg>
  )
}

// Flow diagram step icons (large 48px)
function FileDiscoveryIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M26.9435 25.967C27.334 25.5768 27.9673 25.5768 28.3577 25.967L32.6922 30.3015L33.6507 30.1132C34.0184 30.041 34.398 30.1566 34.663 30.4216L44.472 40.2307C44.9114 40.67 44.9114 41.3823 44.472 41.8216L41.8204 44.4733C41.381 44.9126 40.6687 44.9126 40.2294 44.4733L30.4204 34.6643C30.1554 34.3993 30.0398 34.0196 30.1121 33.6518L30.3009 32.6914L25.9671 28.3576C25.5768 27.9671 25.5767 27.3339 25.9671 26.9434L26.9435 25.967Z" fill="url(#fd_g0)" />
      <path d="M26.9436 25.9675C27.3341 25.5773 27.9675 25.5772 28.3579 25.9675L32.6924 30.3019L33.6504 30.1137C34.0182 30.0415 34.3983 30.1571 34.6633 30.4221L44.4719 40.2307C44.9112 40.67 44.9111 41.3821 44.4719 41.8215L41.8206 44.4736L41.7349 44.5505C41.3224 44.887 40.7271 44.887 40.3147 44.5505L40.2297 44.4736L30.4204 34.6643C30.1887 34.4324 30.0711 34.113 30.0938 33.7905L30.1121 33.652L30.301 32.6918L25.9673 28.3581C25.6013 27.9919 25.578 27.412 25.8984 27.0192L25.9673 26.9438L26.9436 25.9675ZM28.199 26.1264C27.8964 25.824 27.4052 25.824 27.1025 26.1264L26.1262 27.1027C25.8238 27.4052 25.8239 27.8957 26.1262 28.1984L30.5449 32.6171L30.5215 32.7351L30.3325 33.6953C30.2747 33.9894 30.3674 34.2933 30.5794 34.5053L40.3887 44.3146C40.7402 44.6659 41.3102 44.666 41.6616 44.3146L44.313 41.6625C44.6643 41.3111 44.6644 40.741 44.313 40.3896L34.5037 30.581C34.2917 30.3691 33.9884 30.2765 33.6943 30.3342L32.7356 30.5224L32.6177 30.5458L32.5335 30.4609L28.199 26.1264Z" fill="url(#fd_g1)" />
      <path d="M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z" fill="url(#fd_g2)" />
      <path d="M32.7751 18C32.7751 9.83999 26.16 3.22485 18 3.22485C9.83999 3.22485 3.22485 9.83999 3.22485 18C3.22485 26.16 9.83999 32.7751 18 32.7751V33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18C33 26.2843 26.2843 33 18 33V32.7751C26.16 32.7751 32.7751 26.16 32.7751 18Z" fill="url(#fd_g3)" />
      <path d="M18 6C24.6274 6 30 11.3726 30 18C30 24.6274 24.6274 30 18 30C11.3726 30 6 24.6274 6 18C6 11.3726 11.3726 6 18 6Z" fill="#607497" />
      <defs>
        <linearGradient id="fd_g0" x1="35.2379" y1="25.6743" x2="35.2379" y2="44.8028" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="fd_g1" x1="35.2378" y1="25.6748" x2="35.2378" y2="44.8029" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
        <linearGradient id="fd_g2" x1="18" y1="3" x2="18" y2="33" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="fd_g3" x1="18" y1="3" x2="18" y2="33" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
      </defs>
    </svg>
  )
}

function ScanPoolIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 4L24 9V15L16 20L8 15V9L16 4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 20V28" stroke="currentColor" strokeWidth="2" />
      <path d="M8 15L16 20L24 15" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M22.8907 45.8707L3.80296 35.0543C2.78898 34.4797 2.78899 33.0188 3.80296 32.4442L22.8907 21.6279C23.5788 21.238 24.4211 21.238 25.1092 21.6279L44.197 32.4442C45.2109 33.0188 45.2109 34.4797 44.197 35.0543L25.1092 45.8707C24.4211 46.2607 23.5788 46.2607 22.8907 45.8707Z" fill="url(#sec_g0)" />
      <path d="M22.8905 21.6278C23.5785 21.2379 24.421 21.2381 25.109 21.6278L44.1974 32.4442C45.2111 33.0188 45.2111 34.4799 44.1974 35.0546L25.109 45.871L24.9786 45.9391C24.3607 46.2377 23.6396 46.2377 23.0216 45.9391L22.8905 45.871L3.80285 35.0546C2.78902 34.4799 2.78903 33.0188 3.80285 32.4442L22.8905 21.6278ZM24.9984 21.8241C24.3791 21.4731 23.6211 21.4731 23.0018 21.8241L3.91418 32.6398C3.0523 33.1282 3.0523 34.3706 3.91418 34.859L23.0018 45.6754C23.621 46.0262 24.3792 46.0262 24.9984 45.6754L44.0861 34.859C44.9479 34.3706 44.9479 33.1282 44.0861 32.6398L24.9984 21.8241Z" fill="url(#sec_g1)" />
      <path d="M22.8901 21.6279C23.5783 21.238 24.4213 21.238 25.1094 21.6279L41.0703 30.6726L25.2061 39.8506C24.5113 40.2525 23.6551 40.2539 22.959 39.8542L6.94971 30.6609L22.8901 21.6279Z" fill="#607497" />
      <path d="M22.959 36.1032L3.73398 25.0633C2.73687 24.4907 2.72828 23.0553 3.71847 22.4708L22.8561 11.1742C23.5617 10.7577 24.438 10.7577 25.1436 11.1742L44.2895 22.4756C45.2778 23.059 45.2716 24.491 44.2781 25.0657L25.2062 36.0996C24.5114 36.5016 23.6551 36.503 22.959 36.1032Z" fill="url(#sec_g2)" />
      <path d="M22.8561 11.1747C23.5617 10.7582 24.4379 10.7582 25.1435 11.1747L44.2897 22.476C45.2779 23.0594 45.2714 24.4911 44.278 25.0658L25.2065 36.0998L25.0746 36.1708C24.45 36.4788 23.7168 36.4798 23.0912 36.1738L22.9594 36.1035L3.734 25.0636C2.76805 24.5089 2.72976 23.1441 3.62853 22.528L3.71862 22.4708L22.8561 11.1747ZM25.0292 11.368C24.3942 10.9933 23.6054 10.9932 22.9704 11.368L3.83288 22.6649C2.99145 23.1618 2.99874 24.3813 3.84606 24.8681L23.0714 35.9086C23.6979 36.2682 24.4685 36.2667 25.0937 35.905L44.166 24.871C45.0101 24.3824 45.0154 23.1652 44.1755 22.6693L25.0292 11.368Z" fill="url(#sec_g3)" />
      <path d="M22.856 11.1742C23.5616 10.7577 24.4384 10.7577 25.144 11.1742L41.5034 20.8304L25.1096 30.1212C24.4215 30.5112 23.5785 30.5112 22.8904 30.1212L6.49658 20.8304L22.856 11.1742Z" fill="#607497" />
      <path d="M22.8907 26.3707L3.80296 15.5543C2.78898 14.9797 2.78899 13.5188 3.80296 12.9442L22.8907 2.1279C23.5788 1.73797 24.4211 1.73797 25.1092 2.1279L44.197 12.9442C45.2109 13.5188 45.2109 14.9797 44.197 15.5543L25.1092 26.3707C24.4211 26.7607 23.5788 26.7607 22.8907 26.3707Z" fill="url(#sec_g4)" />
      <path d="M22.8905 2.1278C23.5785 1.73793 24.421 1.73807 25.109 2.1278L44.1974 12.9442C45.2111 13.5188 45.2111 14.9799 44.1974 15.5546L25.109 26.371L24.9786 26.4391C24.3607 26.7377 23.6396 26.7377 23.0216 26.4391L22.8905 26.371L3.80285 15.5546C2.78902 14.9799 2.78903 13.5188 3.80285 12.9442L22.8905 2.1278ZM24.9984 2.32409C24.3791 1.97315 23.6211 1.97315 23.0018 2.32409L3.91418 13.1398C3.0523 13.6282 3.0523 14.8706 3.91418 15.359L23.0018 26.1754C23.621 26.5262 24.3792 26.5262 24.9984 26.1754L44.0861 15.359C44.9479 14.8706 44.9479 13.6282 44.0861 13.1398L24.9984 2.32409Z" fill="url(#sec_g5)" />
      <defs>
        <linearGradient id="sec_g0" x1="24" y1="21.3354" x2="24" y2="46.1632" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="sec_g1" x1="24.0001" y1="21.3354" x2="24.0001" y2="46.163" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
        <linearGradient id="sec_g2" x1="24.004" y1="10.8618" x2="24.004" y2="36.4021" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="sec_g3" x1="24.004" y1="10.8623" x2="24.004" y2="36.4026" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
        <linearGradient id="sec_g4" x1="24" y1="1.83545" x2="24" y2="26.6632" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="sec_g5" x1="24.0001" y1="1.83545" x2="24.0001" y2="26.663" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
      </defs>
    </svg>
  )
}

function FileTaggingIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M6 8H18L26 16L18 24H6V8Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
    </svg>
  )
}

function DeepCdrIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <g clipPath="url(#cdr_clip)">
        <path d="M20.25 8.2504L24 8.25V6H40.5488L48 14.1631V40C48 41.1046 47.1046 42 46 42H24V39.75H20.25V42H2.25C1.00736 42 0 40.9926 0 39.75V8.25004C0 7.00739 1.00739 6.00002 2.25004 6.00004L20.25 6.0004V8.2504Z" fill="url(#cdr_g0)" />
        <path d="M0 39.75V8.25C2.31929e-05 7.00738 1.00738 6 2.25 6L20.25 6.00073V8.25073L24 8.25V6H40.5491L48 14.1628V39.9998C48 41.1043 47.1043 42 45.9998 42V41.7751C46.9801 41.7751 47.7751 40.9801 47.7751 39.9998V14.25L40.4495 6.22485H24.2249V8.47485L20.0251 8.47559V6.22485H2.25C1.13164 6.22485 0.224877 7.13164 0.224854 8.25V39.75C0.224854 40.8684 1.13162 41.7751 2.25 41.7751V42L2.13428 41.9971C0.945416 41.9368 0 40.9538 0 39.75ZM24 39.75H20.25V42H2.25V41.7751H20.0251V39.5251H24.2249V41.7751H45.9998V42H24V39.75Z" fill="url(#cdr_g1)" />
        <path d="M27.75 39.75H24V36H27.75V39.75Z" fill="#607497" />
        <path d="M32.25 33.75H28.5V30H32.25V33.75Z" fill="#607497" />
        <path d="M42 30H32.25V27.75H42V30Z" fill="#607497" />
        <path d="M28.5 27.75H24V23.25H28.5V27.75Z" fill="#607497" />
        <path d="M42 23.25H32.25V21H42V23.25Z" fill="#607497" />
        <path d="M32.25 21H29.25V18H32.25V21Z" fill="#607497" />
        <path d="M27.75 18H24V14.25H27.75V18Z" fill="#607497" />
        <path d="M42 16.5H32.25V14.25H42V16.5Z" fill="#607497" />
        <path fillRule="evenodd" clipRule="evenodd" d="M20.2502 10.5H23.9995V14.25H20.2502V18H23.9995V23.25H19.5002V27.75H23.9995V36H20.2502V39.75H2.24951V8.25H20.2502V10.5ZM5.25024 30H14.2502V27.75H5.25024V30ZM5.25024 23.25H14.2502V21H5.25024V23.25ZM16.5002 20.25V23.25H19.5002V20.25H16.5002ZM5.25024 16.5H14.2502V14.25H5.25024V16.5Z" fill="#607497" />
      </g>
      <defs>
        <linearGradient id="cdr_g0" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#DEE0E4" /><stop offset="1" stopColor="#A9B2C4" /></linearGradient>
        <linearGradient id="cdr_g1" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#A9B2C4" /><stop offset="1" stopColor="#607497" /></linearGradient>
        <clipPath id="cdr_clip"><rect width="48" height="48" fill="white" /></clipPath>
      </defs>
    </svg>
  )
}

// Small action icons for remediation buttons
function KeepIcon({ color = '#00B67F' }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none"><path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM11.53 6.53L7.53 10.53C7.38 10.68 7.19 10.75 7 10.75C6.81 10.75 6.62 10.68 6.47 10.53L4.47 8.53C4.18 8.24 4.18 7.76 4.47 7.47C4.76 7.18 5.24 7.18 5.53 7.47L7 8.94L10.47 5.47C10.76 5.18 11.24 5.18 11.53 5.47C11.82 5.76 11.82 6.24 11.53 6.53Z" fill={color} /></svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none"><path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM11.53 6.53L7.53 10.53C7.38 10.68 7.19 10.75 7 10.75C6.81 10.75 6.62 10.68 6.47 10.53L4.47 8.53C4.18 8.24 4.18 7.76 4.47 7.47C4.76 7.18 5.24 7.18 5.53 7.47L7 8.94L10.47 5.47C10.76 5.18 11.24 5.18 11.53 5.47C11.82 5.76 11.82 6.24 11.53 6.53Z" fill="#00B67F" /></svg>
  )
}

function MoveIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none"><path d="M13.67 8.33006C13.67 8.33006 13.69 8.31006 13.69 8.29006C13.73 8.20006 13.75 8.10006 13.75 8.00006C13.75 7.90006 13.73 7.80007 13.69 7.71006C13.69 7.70006 13.67 7.69006 13.67 7.67006C13.63 7.59007 13.59 7.52006 13.52 7.46006L9.01 3.21006C8.71 2.92006 8.23 2.94006 7.95 3.24006C7.66 3.54006 7.68 4.02006 7.98 4.30006L11.11 7.26007H3C2.59 7.26007 2.25 7.60007 2.25 8.01007C2.25 8.42006 2.59 8.76007 3 8.76007H11.11L7.98 11.7201C7.68 12.0001 7.66 12.4801 7.95 12.7801C8.1 12.9401 8.3 13.0201 8.49 13.0201C8.67 13.0201 8.86 12.9501 9 12.8101L13.5 8.56006C13.56 8.50006 13.61 8.43006 13.65 8.35006L13.67 8.33006Z" fill="#607497" /></svg>
  )
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none"><path d="M14 5H2V7H14V5Z" fill="#607497" /><path d="M9.5 3.5V5.5H6.5V3.5H9.5ZM10 2H6C5.45 2 5 2.45 5 3V6C5 6.55 5.45 7 6 7H10C10.55 7 11 6.55 11 6V3C11 2.45 10.55 2 10 2Z" fill="#607497" /><path d="M12 14H4L3 6H13L12 14ZM6.5 7.25C6.08579 7.25 5.75 7.58579 5.75 8V11C5.75 11.4142 6.08579 11.75 6.5 11.75C6.91421 11.75 7.25 11.4142 7.25 11V8C7.25 7.58579 6.91421 7.25 6.5 7.25ZM9.5 7.25C9.08579 7.25 8.75 7.58579 8.75 8V11C8.75 11.4142 9.08579 11.75 9.5 11.75C9.91421 11.75 10.25 11.4142 10.25 11V8C10.25 7.58579 9.91421 7.25 9.5 7.25Z" fill="#607497" /></svg>
  )
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-6 h-6">
      <path d="M15.0002 7.99954C15.0006 8.13052 14.9749 8.26026 14.9249 8.38127C14.8748 8.50228 14.8012 8.61216 14.7083 8.70454L8.70519 14.7083C8.51782 14.8945 8.26437 14.9991 8.00019 14.9991C7.736 14.9991 7.48255 14.8945 7.29519 14.7083L1.29519 8.70454C1.10894 8.51718 1.00439 8.26373 1.00439 7.99954C1.00439 7.73536 1.10894 7.48191 1.29519 7.29454L7.29831 1.29079C7.48567 1.10454 7.73913 1 8.00331 1C8.2675 1 8.52095 1.10454 8.70831 1.29079L14.7114 7.29454C14.8037 7.38718 14.8767 7.49717 14.9263 7.61818C14.9759 7.73918 15.001 7.86879 15.0002 7.99954Z" fill="#0C121D" />
    </svg>
  )
}

// ─── Remediation Action Buttons (flow diagram) ───────────────────────────────

function RemActionBtn({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={cn('wf-action-btn', active && 'active')}>
      {icon} {label}
    </div>
  )
}

function RemRow({ label, activeAction }: { label: string; activeAction: string }) {
  return (
    <div className="wf-rem-row">
      <span className="wf-rem-row-label">{label}</span>
      <div className="wf-action-btns">
        <RemActionBtn icon={<KeepIcon />} label="Keep" active={activeAction === 'keep'} />
        <RemActionBtn icon={<CopyIcon />} label="Copy" active={activeAction === 'copy'} />
        <RemActionBtn icon={<MoveIcon />} label="Move" active={activeAction === 'move'} />
        <RemActionBtn icon={<DeleteIcon />} label="Delete" active={activeAction === 'delete'} />
      </div>
    </div>
  )
}

// ─── Flow Diagram ─────────────────────────────────────────────────────────────

interface FlowDiagramProps {
  onOpenPanel: (panel: string) => void
}

function FlowDiagram({ onOpenPanel }: FlowDiagramProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const target = e.target as HTMLElement
    if (target.closest('.wf-step, .wf-action-btn')) return
    dragging.current = true
    canvas.classList.add('dragging')
    startPos.current = {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
      scrollLeft: canvas.scrollLeft,
      scrollTop: canvas.scrollTop,
    }
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    canvas.scrollLeft = startPos.current.scrollLeft - (e.pageX - canvas.offsetLeft - startPos.current.x)
    canvas.scrollTop = startPos.current.scrollTop - (e.pageY - canvas.offsetTop - startPos.current.y)
  }, [])

  const stopDrag = useCallback(() => {
    dragging.current = false
    canvasRef.current?.classList.remove('dragging')
  }, [])

  const steps: { panel: string; icon: React.ReactNode; label: string; sublabel?: string }[] = [
    { panel: 'discovery', icon: <FileDiscoveryIcon />, label: 'File Discovery' },
    { panel: 'scanConfig', icon: <ScanPoolIcon />, label: 'Scan Pool' },
    { panel: 'technologies', icon: <SecurityIcon />, label: 'Security' },
    { panel: 'fileTagging', icon: <FileTaggingIcon />, label: 'File Tagging', sublabel: 'Inactive' },
    { panel: 'deepCdr', icon: <DeepCdrIcon />, label: 'Deep CDR\u2122', sublabel: 'Active' },
  ]

  return (
    <div
      ref={canvasRef}
      className="wf-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="wf-flow">
        <div className="wf-start-label">Start</div>
        <div className="wf-connector" />

        {steps.map((step, i) => (
          <div key={step.panel} className="flex items-center gap-0">
            <div className="wf-step" onClick={() => onOpenPanel(step.panel)}>
              <div className="wf-node">
                <div className="wf-node-box">{step.icon}</div>
                <div className="wf-node-label">{step.label}</div>
                {step.sublabel && <div className="wf-node-sublabel">{step.sublabel}</div>}
              </div>
            </div>
            {i < steps.length - 1 && <div className="wf-connector" />}
          </div>
        ))}

        <div className="wf-connector" />
        <div className="wf-diamond"><DiamondIcon /></div>
        <div className="wf-connector" />

        {/* Remediations stack */}
        <div className="wf-rem-stack">
          <div className="wf-rem-col">
            <div className="wf-rem-col-header">Allowed</div>
            <RemRow label="Original" activeAction="keep" />
            <RemRow label="Sanitized" activeAction="keep" />
          </div>
          <div className="wf-rem-col">
            <div className="wf-rem-col-header">Blocked</div>
            <RemRow label="Original" activeAction="keep" />
            <RemRow label="Sanitized" activeAction="keep" />
          </div>
          <div className="wf-rem-col">
            <div className="wf-rem-col-header">Sanitized</div>
            <RemRow label="Original" activeAction="keep" />
            <RemRow label="Sanitized" activeAction="keep" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Status Cell ──────────────────────────────────────────────────────────────

function WfStatus({ text }: { text: string }) {
  return (
    <span className="wf-status">
      <span className="wf-status-dot" />
      {text}
    </span>
  )
}

// ─── Slide Panels ─────────────────────────────────────────────────────────────

function CreateWorkflowPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Create Workflow"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <p className="text-[13px] text-[var(--text-subtle)] mb-3">
        Create a new workflow to automate your processes. It can be used when instantiating a scan.{' '}
        <a href="#" className="text-[var(--primary)]" onClick={(e) => e.preventDefault()}>Learn more</a>
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">Workflow Name</label>
          <InputField placeholder="e.g. Weekly Scan" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[14px] font-medium text-[var(--text-strong)]">Workflow Type</span>
          <div className="flex flex-col gap-2">
            <label className="radio-option"><input type="radio" name="wfType" defaultChecked /><span>Standard (with scanning)</span></label>
            <label className="radio-option"><input type="radio" name="wfType" /><span>Discovery only</span></label>
          </div>
        </div>
        <div className="text-[14px] font-medium text-[var(--text-strong)] mt-2">Scan Configuration</div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">Scan Pool</label>
          <SelectField options={[{ label: 'Default MD Core Scan Pool', value: 'default' }]} value="default" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">Rule</label>
          <SelectField options={[{ label: 'MetaDefender Software Supply Chain', value: 'default' }]} value="default" />
        </div>
      </div>
    </SlidePanel>
  )
}

function WarningBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel-banner warning">
      <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0 }}>
        <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
      <div>{children}</div>
    </div>
  )
}

function DiscoveryPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Discovery"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <p className="text-[13px] text-[var(--text-subtle)] mb-4">
        File discovery continuously scans your storage to detect files that need processing. This is always enabled to ensure all files are identified for remediation.
      </p>
      <div className="text-[14px] font-medium text-[var(--text-strong)] mb-2">Discovery</div>
      <p className="text-[13px] text-[var(--text-subtle)] mb-3">
        Identity scanning uses file metadata to identify files that have already been processed. When enabled, MDSS reuses previous scan results for unchanged files instead of re-scanning them, significantly improving performance for backup datasets and subsequent scans.
      </p>
      <div className="flex items-center gap-2 mb-1">
        <Toggle />
        <span className="text-[14px] text-[var(--text-strong)]">Disabled</span>
      </div>
      <p className="text-[12px] text-[var(--primary)]">Identity scanning is disabled because Deep CDR is enabled.</p>
    </SlidePanel>
  )
}

function ScanConfigPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Scan Configuration"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <WarningBanner>
        Changes made to the workflow in MetaDefender Core, Cloud or Cluster will affect the functionality of MetaDefender Storage Security<br />
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--primary)]">Dismiss</a>
      </WarningBanner>
      <p className="text-[13px] text-[var(--text-subtle)] mb-4">
        MetaDefender for Secure Storage uses scan pools to group MetaDefender Core or Cloud instances.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">Scan Pool</label>
          <SelectField options={[{ label: 'MetaDefender Core Demo', value: 'core' }, { label: 'MetaDefender Cloud Demo', value: 'cloud' }]} value="core" />
        </div>
        <label className="radio-option text-[13px]"><input type="checkbox" /><span>Failover to secondary scan pool</span></label>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--primary)]">Failover Scan Pool</label>
          <SelectField options={[{ label: 'Not Available', value: 'na' }]} value="na" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">User Agent</label>
          <div className="flex items-center gap-2">
            <InputField defaultValue="mdss" className="flex-1" />
            <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[16px]">&#x2715;</button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-[var(--text-strong)]">Workflow Rule</label>
          <div className="flex items-center gap-2">
            <InputField defaultValue="MDSS Full" className="flex-1" />
            <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[16px]">&#x2715;</button>
          </div>
        </div>
      </div>
    </SlidePanel>
  )
}

function TechnologiesPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const techs = [
    { name: 'MetaScan\u2122', desc: '30+ anti-malware engine threat detection.', status: 'Active', variant: 'success' as const },
    { name: 'Adaptive Sandbox', desc: 'Dynamic file analysis and behavioral threat detection.', status: 'Disabled', variant: null },
    { name: 'Deep CDR\u2122', desc: 'Dynamic file analysis and behavioral threat detection.', status: 'Unknown', variant: 'caution' as const, note: 'Status cannot be determined due to missing or incomplete configuration.', link: 'Go to MetaDefender Core' },
    { name: 'Proactive DLP\u2122', desc: 'Proactive data loss detection and prevention.', status: 'Active', variant: 'success' as const },
  ]

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Technologies"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <WarningBanner>
        Changes made in MetaDefender Core, Cloud or Cluster will affect the functionality of MetaDefender Storage Security<br />
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--primary)]">Refresh</a>
      </WarningBanner>
      {techs.map((t) => (
        <div key={t.name} className="wf-tech-item">
          <div className="wf-tech-name">{t.name}</div>
          <div className="wf-tech-desc">{t.desc}</div>
          <div className="mt-2">
            {t.variant ? (
              <Tag variant={t.variant}>{t.status}</Tag>
            ) : (
              <span className="text-[13px] text-[var(--text-muted)]">{t.status}</span>
            )}
          </div>
          {t.note && <p className="text-[12px] text-[var(--text-subtle)] mt-1">{t.note}</p>}
          {t.link && <a href="#" className="text-[13px] text-[var(--primary)]" onClick={(e) => e.preventDefault()}>{t.link}</a>}
        </div>
      ))}
    </SlidePanel>
  )
}

function FileTaggingPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showVerdicts, setShowVerdicts] = useState(false)

  const verdicts = [
    'No Threat Detected', 'Infected', 'Suspicious', 'Allowlisted',
    'Blocklisted', 'Potentially Vulnerable File', 'Sensitive Data Found',
  ]

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="File Tagging"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <div className="flex items-center gap-2 mb-1">
        <Toggle />
        <span className="text-[14px] text-[var(--text-strong)]">Disabled</span>
      </div>
      <p className="text-[12px] text-[var(--text-subtle)] mb-4">
        Labels processed files with security status (clean, sanitized, blocked) to support compliance and audit requirements.
      </p>

      {/* MetaDefender Result Tag */}
      <div className="wf-tag-group">
        <div className="wf-tag-check">
          <input type="checkbox" id="wfTagResult" defaultChecked />
          <label htmlFor="wfTagResult">Add MetaDefender Result Tag</label>
        </div>
        <div className="wf-tag-fields">
          <div className="wf-tag-field-label">MetaDefender Result</div>
          <div className="wf-tag-field-value">OPSWAT-Core-Result</div>
          <div className="wf-show-verdicts" onClick={() => setShowVerdicts(!showVerdicts)}>
            {showVerdicts ? 'Hide Verdicts' : 'Show Verdicts'}
          </div>
          {showVerdicts && (
            <div className="wf-verdicts">
              {verdicts.map((v) => (
                <div key={v} className="wf-verdict-row">
                  <div className="wf-verdict-label">{v}</div>
                  <div className="wf-verdict-input">
                    {v} <span className="clear-x">&#x2715;</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* File ID */}
      <div className="wf-tag-group">
        <div className="wf-tag-check">
          <input type="checkbox" id="wfTagFileId" defaultChecked />
          <label htmlFor="wfTagFileId">Add File ID</label>
        </div>
        <div className="wf-tag-fields">
          <div className="wf-tag-field-label">MetaDefender File Id</div>
          <div className="wf-tag-field-value">MetaDefenderFileId</div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="wf-tag-group">
        <div className="wf-tag-check">
          <input type="checkbox" id="wfTagTimestamp" defaultChecked />
          <label htmlFor="wfTagTimestamp">Add Timestamp</label>
        </div>
        <div className="wf-tag-fields">
          <div className="wf-tag-field-label">MetaDefender Analysis Timestamp</div>
          <div className="wf-tag-field-value">MetaDefenderAnalysisTimestamp</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 cursor-pointer text-[var(--text-subtle)] text-[13px]">
        <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14 }}>
          <path d="M8 3a5 5 0 100 10A5 5 0 008 3zM2 8a6 6 0 1112 0A6 6 0 012 8zm4.5-1.5l3 1.5-3 1.5v-3z" />
        </svg>
        Reset to Default
      </div>
    </SlidePanel>
  )
}

function DeepCdrPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Deep CDR"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <p className="text-[13px] text-[var(--text-subtle)] mb-4">
        File regeneration that protects from evasive malware and zero-day exploits.
      </p>
      <div className="flex items-center gap-2 mb-2">
        <Toggle />
        <span className="text-[14px] text-[var(--text-strong)]">Disabled</span>
      </div>
      <p className="text-[12px] text-[var(--text-subtle)]">File regeneration that protects from evasive malware and zero-day exploits.</p>
    </SlidePanel>
  )
}

function FileDefPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="File Definition"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <div className="text-[14px] font-medium text-[var(--text-strong)] mb-4">Blocked files definition</div>
      <div className="flex flex-col gap-4">
        <label className="radio-option items-start">
          <input type="radio" name="wfFileDef" defaultChecked className="mt-[3px]" />
          <div>
            <span className="font-medium">Strict mode</span>
            <p className="text-[12px] text-[var(--text-subtle)] mt-1">
              When enabled, files blocked by MetaDefender Core for any reason (malware, encryption, blocklist) remain blocked in Storage Security.
            </p>
          </div>
        </label>
        <label className="radio-option items-start">
          <input type="radio" name="wfFileDef" className="mt-[3px]" />
          <div>
            <span className="font-medium">Configurable mode</span>
            <p className="text-[12px] text-[var(--text-subtle)] mt-1">
              Override Core verdicts by category. Enable or disable blocking for malicious files, sensitive data violations, and vulnerability detections independently.
            </p>
            <div className="mt-3 flex flex-col gap-2 pl-1">
              <label className="radio-option opacity-50"><input type="checkbox" disabled /><span className="text-[13px]">Files with malicious content</span></label>
              <p className="text-[11px] text-[var(--text-muted)] ml-6">
                Any file marked Infected, Suspicious or Blocklisted by MetaDefender Core / Distributed Cluster will be considered malicious in MetaDefender Storage Security
              </p>
              <label className="radio-option opacity-50"><input type="checkbox" disabled /><span className="text-[13px]">Treat files with sensitive data as blocked</span></label>
              <label className="radio-option opacity-50"><input type="checkbox" disabled /><span className="text-[13px]">Treat files with vulnerabilities as blocked</span></label>
            </div>
          </div>
        </label>
      </div>
    </SlidePanel>
  )
}

function RemediationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Allowed Original Files - Remediations"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <div className="flex flex-col gap-0">
        <div className="wf-rem-option py-3 border-b border-[var(--border-card)]">
          <label className="radio-option"><input type="radio" name="wfRem" /><span>Keep</span></label>
        </div>
        <div className="wf-rem-option py-3 border-b border-[var(--border-card)]">
          <label className="radio-option"><input type="radio" name="wfRem" defaultChecked /><span>Copy</span></label>
          <div className="mt-3 pl-6">
            <div className="text-[13px] text-[var(--text-subtle)] mb-2">Selected storage unit</div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[12px] bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] rounded text-[var(--text-strong)]">
                Storage Unit 1 <span className="cursor-pointer text-[var(--text-muted)]">&#x2715;</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[12px] bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] rounded text-[var(--text-strong)]">
                Storage Unit 2 <span className="cursor-pointer text-[var(--text-muted)]">&#x2715;</span>
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold">5</span>
            </div>
            <WarningBanner>
              <span className="text-[12px]">You can only configure a maximum of 5 storage units as destinations</span>
            </WarningBanner>
            <div className="text-[13px] font-medium text-[var(--text-strong)] mt-3 mb-2">Keep folder structure</div>
            {['Storage Unit 1', 'Storage Unit 2', 'Storage Unit 3', 'Storage Unit 4', 'Storage Unit 5'].map((u) => (
              <div key={u} className="flex items-center justify-between py-1">
                <label className="text-[13px] text-[var(--text-strong)]">{u}</label>
                <input type="checkbox" defaultChecked />
              </div>
            ))}
          </div>
        </div>
        <div className="wf-rem-option py-3 border-b border-[var(--border-card)]">
          <label className="radio-option"><input type="radio" name="wfRem" /><span>Move</span></label>
        </div>
        <div className="wf-rem-option py-3">
          <label className="radio-option"><input type="radio" name="wfRem" /><span>Delete</span></label>
        </div>
      </div>
    </SlidePanel>
  )
}

function OtherRemPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Other Remediations"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <WarningBanner>
        You cannot enable delete empty folders remediation if you don't have any move or delete remediations configured<br />
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--primary)]">Dismiss</a>
      </WarningBanner>
      <div className="mb-5">
        <div className="text-[14px] font-medium text-[var(--text-strong)] mb-1">Delete Directories</div>
        <p className="text-[12px] text-[var(--text-subtle)] mb-2">
          If it is empty after remediation (does not delete if the folder was empty to begin with) delete it.
        </p>
        <div className="flex items-center gap-2">
          <Toggle />
          <span className="text-[14px] text-[var(--text-strong)]">Disabled</span>
        </div>
        <p className="text-[11px] text-[var(--text-subtle)] mt-1">
          File versioning is only supported by the following storage types: SharePoint On-Prem
        </p>
      </div>
      <div>
        <div className="text-[14px] font-medium text-[var(--text-strong)] mb-1">Scan File Versions</div>
        <p className="text-[12px] text-[var(--text-subtle)] mb-2">
          File versioning is only supported by the following storage types: SharePoint On-Prem
        </p>
        <div className="flex items-center gap-2">
          <Toggle />
          <span className="text-[14px] text-[var(--text-strong)]">Disabled</span>
        </div>
      </div>
    </SlidePanel>
  )
}

// ─── List View ────────────────────────────────────────────────────────────────

function WorkflowsListView({ onOpen, onCreateNew }: { onOpen: (i: number) => void; onCreateNew: () => void }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = WORKFLOWS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeader
        title="Workflows"
        actions={
          <Button variant="primary" onClick={onCreateNew}>Add New Workflow</Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle title="Workflows" count={String(filtered.length)} />
          <div className="flex gap-2 items-center">
            <div className="audit-search">
              <svg viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M7 2C9.76142 2 12 4.23858 12 7C12 8.11285 11.6353 9.13998 11.0205 9.9707L14.0713 13.0068L14.1221 13.0645C14.3629 13.3585 14.3471 13.7932 14.0732 14.0684C13.781 14.3615 13.3061 14.3622 13.0127 14.0703L9.95801 11.0303C9.12955 11.6393 8.1071 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2ZM7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5Z" /></svg>
              <input
                type="text"
                placeholder="Search for Files or Hash"
                className="audit-search-input"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>
        </CardHeader>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>File Discovery</th>
                <th>Scan Pool</th>
                <th>Security</th>
                <th>File Tagging</th>
                <th>Deep CDR&#x2122;</th>
                <th>Remediations</th>
                <th className="col-action" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((wf, i) => (
                <tr key={wf.name} onClick={() => onOpen(i)} style={{ cursor: 'pointer' }}>
                  <td>
                    {wf.isDefault && <StarIcon />}
                    {' '}{wf.name}
                  </td>
                  <td><WfStatus text={wf.fileDiscovery} /></td>
                  <td>{wf.scanPool}</td>
                  <td><WfStatus text={wf.security} /></td>
                  <td><WfStatus text={wf.fileTagging} /></td>
                  <td><WfStatus text={wf.deepCdr} /></td>
                  <td>
                    {wf.remediations.length === 1 && wf.remediations[0].tag === 'none' ? (
                      <span className="wf-rem-tag none">{wf.remediations[0].label}</span>
                    ) : (
                      <span className="wf-rem-tags">
                        {wf.remediations.map((r, ri) => (
                          <span key={ri} className={`wf-rem-tag ${r.tag}`}>{r.label}</span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="cell-action"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ThreeDotsIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          pageSize={pageSize}
          total={15}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
        />
      </Card>
    </>
  )
}

// ─── Detail View ──────────────────────────────────────────────────────────────

function WorkflowDetailView({
  workflow,
  onBack,
  onOpenPanel,
}: {
  workflow: WorkflowRow
  onBack: () => void
  onOpenPanel: (panel: string) => void
}) {
  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Workflows', onClick: onBack },
  ]

  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={breadcrumb} />}
        title={workflow.name}
      />

      <Card>
        <CardHeader>
          <CardTitle title="Workflow Details" />
        </CardHeader>
        <FlowDiagram onOpenPanel={onOpenPanel} />
      </Card>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function WorkflowsPage() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'list' })

  // Slide panel state
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const closePanel = useCallback(() => setOpenPanel(null), [])

  return (
    <div className="flex flex-col gap-5 font-sans">
      {viewState.view === 'list' && (
        <WorkflowsListView
          onOpen={(i) => setViewState({ view: 'detail', index: i })}
          onCreateNew={() => setOpenPanel('createWorkflow')}
        />
      )}

      {viewState.view === 'detail' && (
        <WorkflowDetailView
          workflow={WORKFLOWS[viewState.index]}
          onBack={() => setViewState({ view: 'list' })}
          onOpenPanel={setOpenPanel}
        />
      )}

      {/* Slide Panels */}
      <CreateWorkflowPanel open={openPanel === 'createWorkflow'} onClose={closePanel} />
      <DiscoveryPanel open={openPanel === 'discovery'} onClose={closePanel} />
      <ScanConfigPanel open={openPanel === 'scanConfig'} onClose={closePanel} />
      <TechnologiesPanel open={openPanel === 'technologies'} onClose={closePanel} />
      <FileTaggingPanel open={openPanel === 'fileTagging'} onClose={closePanel} />
      <DeepCdrPanel open={openPanel === 'deepCdr'} onClose={closePanel} />
      <FileDefPanel open={openPanel === 'fileDef'} onClose={closePanel} />
      <RemediationsPanel open={openPanel === 'remediations'} onClose={closePanel} />
      <OtherRemPanel open={openPanel === 'otherRem'} onClose={closePanel} />
    </div>
  )
}
