import { useState, useRef } from 'react'
import {
  cn,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Icon,
  SlidePanel,
  InputField,
  SelectField,
  FormRow,
  Toaster,
  type ToasterHandle,
} from '@opswat/blue-line'

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

interface User {
  name: string
  initials: string
  username: string
  email: string
  permissions: string
  color: string
  status: 'Active' | 'Pending'
}

const AVATAR_COLORS = [
  '#c17a5a', '#6b8faa', '#8a7faa', '#7aaa6b', '#aa8a6b',
  '#6b7aaa', '#aa6b8a', '#5a9a8a', '#9a6b5a', '#7a8aaa',
]

const INITIAL_USERS: User[] = [
  { name: 'Giovanni Verrienti', initials: 'GV', username: 'gverrienti', email: 'giovanni.verrienti@opswat.com', permissions: 'Administrator', color: '#ebecee', status: 'Active' },
  { name: 'Arijit Chatterjee', initials: 'AC', username: 'arijit', email: 'arijit.chatterjee@opswat.com', permissions: 'Administrator', color: '#ebecee', status: 'Active' },
  { name: 'Melania Rusu', initials: 'MR', username: 'mrusu', email: 'melania.rusu@opswat.com', permissions: 'Administrator', color: '#ebecee', status: 'Active' },
  { name: 'Gabor Varadi', initials: 'GV', username: 'gabor.varadi', email: 'gabor.varadi@opswat.com', permissions: 'Administrator', color: '#ebecee', status: 'Active' },
  { name: 'Ioan Macavei', initials: 'IM', username: 'imac', email: 'ioan.macavei@opswat.com', permissions: 'Administrator', color: '#ebecee', status: 'Active' },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50]

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="users-empty-state">
      <div className="users-empty-icon">
        <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14c0-2.21 2.69-4 6-4s6 1.79 6 4v1H2v-1z" />
        </svg>
      </div>
      <p className="users-empty-title">{title}</p>
      <p className="users-empty-desc">{description}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Users table
// ---------------------------------------------------------------------------

function UsersTable({
  users,
  onEdit,
  onDelete,
  onApprove,
  onDeny,
  search,
  pending,
}: {
  users: User[]
  onEdit?: (i: number) => void
  onDelete?: (i: number) => void
  onApprove?: (i: number) => void
  onDeny?: (i: number) => void
  search: string
  pending?: boolean
}) {
  const filtered = users.filter(u => {
    if (!search) return true
    const q = search.toLowerCase()
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.permissions.toLowerCase().includes(q)
  })

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
          <th>Username <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
          <th>Email <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
          <th>Permissions <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
          <th className="col-status">Status <span className="filter-icon"><Icon name="filter" size="sm" /></span></th>
          <th className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((u, i) => (
          <tr key={u.username + i}>
            <td>
              <div className="user-name-cell">
                <div className="user-avatar">{u.initials}</div>
                <span>{u.name}</span>
              </div>
            </td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.permissions}</td>
            <td className="col-status">
              <span className="status-pill">{u.status}</span>
            </td>
            <td className="col-action">
              <div className="row-action-btn" onClick={e => {
                const menu = e.currentTarget.querySelector('.row-action-menu') as HTMLElement
                if (menu) menu.classList.toggle('open')
              }}>
                <Icon name="action" size="sm" />
                <div className="row-action-menu">
                  {pending ? (
                    <>
                      <button className="row-action-menu-item" onClick={ev => { ev.stopPropagation(); onApprove?.(i) }}>
                        <Icon name="check" size="sm" />Approve
                      </button>
                      <button className="row-action-menu-item danger" onClick={ev => { ev.stopPropagation(); onDeny?.(i) }}>
                        <Icon name="close" size="sm" />Deny
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="row-action-menu-item" onClick={ev => { ev.stopPropagation(); onEdit?.(i) }}>
                        <Icon name="edit" size="sm" />Edit
                      </button>
                      <button className="row-action-menu-item danger" onClick={ev => { ev.stopPropagation(); onDelete?.(i) }}>
                        <Icon name="close" size="sm" />Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function UsersPage() {
  const [activeUsers, setActiveUsers] = useState<User[]>(INITIAL_USERS)
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [activeSearch, setActiveSearch] = useState('')
  const [pendingSearch, setPendingSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Add user panel
  const [addOpen, setAddOpen] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', permissions: 'Read-Only' })

  // Edit user panel
  const [editOpen, setEditOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', permissions: 'Read-Only' })

  const toasterRef = useRef<ToasterHandle | null>(null)

  const totalPages = Math.ceil(activeUsers.length / pageSize)
  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, activeUsers.length)
  const pagedUsers = activeUsers.slice((page - 1) * pageSize, page * pageSize)

  // --- CRUD ---

  function handleAddUser() {
    if (!addForm.name.trim()) {
      toasterRef.current?.show('error', 'Full Name is required')
      return
    }
    const uname = addForm.username || addForm.name.toLowerCase().replace(/\s+/g, '.')
    const email = addForm.email || `${uname}@opswat.com`
    const newUser: User = {
      name: addForm.name,
      initials: addForm.name.charAt(0).toUpperCase(),
      username: uname,
      email,
      permissions: addForm.permissions,
      color: AVATAR_COLORS[(activeUsers.length + pendingUsers.length) % AVATAR_COLORS.length],
      status: 'Pending',
    }
    setPendingUsers(prev => [...prev, newUser])
    setAddOpen(false)
    setAddForm({ name: '', username: '', email: '', password: '', confirmPassword: '', permissions: 'Read-Only' })
    toasterRef.current?.show('success', `User "${addForm.name}" added to pending`)
  }

  function handleEditUser(i: number) {
    const u = activeUsers[i]
    setEditIndex(i)
    setEditForm({ name: u.name, username: u.username, email: u.email, permissions: u.permissions })
    setEditOpen(true)
  }

  function handleSaveUser() {
    setActiveUsers(prev => prev.map((u, i) => i === editIndex ? {
      ...u,
      name: editForm.name,
      initials: editForm.name.charAt(0).toUpperCase(),
      username: editForm.username,
      email: editForm.email,
      permissions: editForm.permissions,
    } : u))
    setEditOpen(false)
    toasterRef.current?.show('success', 'User updated')
  }

  function handleDeleteUser(i: number) {
    const name = activeUsers[i].name
    setActiveUsers(prev => prev.filter((_, idx) => idx !== i))
    toasterRef.current?.show('success', `User "${name}" deleted`)
  }

  function handleApprove(i: number) {
    const u = pendingUsers[i]
    setPendingUsers(prev => prev.filter((_, idx) => idx !== i))
    setActiveUsers(prev => [...prev, { ...u, status: 'Active' }])
    toasterRef.current?.show('success', `User "${u.name}" approved`)
  }

  function handleDeny(i: number) {
    const name = pendingUsers[i].name
    setPendingUsers(prev => prev.filter((_, idx) => idx !== i))
    toasterRef.current?.show('info', `User "${name}" denied`)
  }

  return (
    <div className="page-view">
      <div className="page-title-row" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Users</h1>
        <Button variant="primary" onClick={() => setAddOpen(true)}>Add User</Button>
      </div>

      {/* Pending Users Card */}
      <Card className="mb-3">
        <CardHeader>
          <CardTitle
            title="Pending Users"
            count={String(pendingUsers.length)}
            actions={
              <div className="audit-search">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input placeholder="Search" value={pendingSearch} onChange={e => setPendingSearch(e.target.value)} />
              </div>
            }
          />
        </CardHeader>

        {pendingUsers.length === 0 ? (
          <EmptyState title="No Pending Users" description="New requests will appear here when submitted." />
        ) : (
          <UsersTable
            users={pendingUsers}
            search={pendingSearch}
            pending
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        )}
      </Card>

      {/* Active Users Card */}
      <Card>
        <CardHeader>
          <CardTitle
            title="Active Users"
            count={String(activeUsers.length)}
            actions={
              <div className="audit-search">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input placeholder="Search" value={activeSearch} onChange={e => { setActiveSearch(e.target.value); setPage(1) }} />
              </div>
            }
          />
        </CardHeader>

        <UsersTable
          users={activeSearch ? activeUsers.filter(u => {
            const q = activeSearch.toLowerCase()
            return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.permissions.toLowerCase().includes(q)
          }) : pagedUsers}
          search=""
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/* Pagination */}
        {activeUsers.length > 10 && (
          <div className="audit-pagination">
            <div className="audit-pagination-left">
              <select className="select-field" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
                {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span>per page</span>
            </div>
            <div className="audit-pagination-right">
              <span>{rangeStart}–{rangeEnd} of {activeUsers.length}</span>
              <div className="flex items-center">
                <button className="audit-page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)} aria-label="Previous">
                  <Icon name="chevron-left" size="sm" />
                </button>
                <select className="audit-page-select" value={page} onChange={e => setPage(Number(e.target.value))}>
                  {Array.from({ length: totalPages }, (_, i) => <option key={i + 1} value={i + 1}>Page {i + 1}</option>)}
                </select>
                <button className="audit-page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} aria-label="Next">
                  <Icon name="chevron-right" size="sm" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Add User Panel */}
      <SlidePanel open={addOpen} onClose={() => setAddOpen(false)} title="Add User">
        <div className="flex flex-col gap-4">
          <FormRow label="Full Name *">
            <InputField value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter full name" />
          </FormRow>
          <FormRow label="Username">
            <InputField value={addForm.username} onChange={e => setAddForm(f => ({ ...f, username: e.target.value }))} placeholder="Auto-generated from name" />
          </FormRow>
          <FormRow label="Email">
            <InputField type="email" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} placeholder="username@opswat.com" />
          </FormRow>
          <FormRow label="Password">
            <InputField type="password" value={addForm.password} onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))} placeholder="Enter password" />
          </FormRow>
          <FormRow label="Confirm Password">
            <InputField type="password" value={addForm.confirmPassword} onChange={e => setAddForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="Confirm password" />
          </FormRow>
          <FormRow label="Permissions">
            <SelectField value={addForm.permissions} onChange={e => setAddForm(f => ({ ...f, permissions: e.target.value as string }))}>
              <option value="Read-Only">Read-Only</option>
              <option value="Read-Write">Read-Write</option>
              <option value="Admin">Admin</option>
            </SelectField>
          </FormRow>
        </div>
        <div className="flex justify-end gap-2 mt-auto pt-5">
          <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Add</Button>
        </div>
      </SlidePanel>

      {/* Edit User Panel */}
      <SlidePanel open={editOpen} onClose={() => setEditOpen(false)} title="Edit User">
        <div className="flex flex-col gap-4">
          <FormRow label="Full Name">
            <InputField value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
          </FormRow>
          <FormRow label="Username">
            <InputField value={editForm.username} onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))} />
          </FormRow>
          <FormRow label="Email">
            <InputField type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
          </FormRow>
          <FormRow label="Permissions">
            <SelectField value={editForm.permissions} onChange={e => setEditForm(f => ({ ...f, permissions: e.target.value as string }))}>
              <option value="Read-Only">Read-Only</option>
              <option value="Read-Write">Read-Write</option>
              <option value="Admin">Admin</option>
            </SelectField>
          </FormRow>
        </div>
        <div className="flex justify-end gap-2 mt-auto pt-5">
          <Button variant="outline" onClick={() => setEditOpen(false)}>Discard</Button>
          <Button variant="primary" onClick={handleSaveUser}>Save</Button>
        </div>
      </SlidePanel>

      <Toaster ref={toasterRef} />
    </div>
  )
}
