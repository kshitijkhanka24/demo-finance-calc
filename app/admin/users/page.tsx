'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { supabase } from '@/lib/supabase'
import { Shield, Trash2, UserPlus, ArrowLeft, Users, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import type { Profile } from '@/components/AuthProvider'

export default function UsersPage() {
  const router = useRouter()
  const { user, isSuperAdmin, loading: authLoading } = useAuth()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState<'user' | 'admin'>('admin')
  const [showPwd, setShowPwd] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchProfiles = useCallback(async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setProfiles(data as Profile[])
    if (error) console.error('Error fetching profiles:', error)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user || !isSuperAdmin) {
      router.push('/login')
      return
    }
    fetchProfiles()
  }, [user, isSuperAdmin, authLoading, router, fetchProfiles])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setCreateError('')

    try {
      // Create user via Supabase Auth admin (client-side with service role would be needed for full admin,
      // but for simplicity we use signUp which triggers the auto-profile creation)
      const { data, error } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
      })

      if (error) {
        setCreateError(error.message)
        setCreating(false)
        return
      }

      // Update the profile role if not 'user'
      if (data.user && newRole !== 'user') {
        // Wait a bit for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000))

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: newRole })
          .eq('id', data.user.id)

        if (updateError) {
          setCreateError('User created but role update failed. Update manually.')
        }
      }

      setNewEmail('')
      setNewPassword('')
      setNewRole('admin')
      setShowCreate(false)
      setCreating(false)
      fetchProfiles()
    } catch (err) {
      setCreateError('An unexpected error occurred')
      setCreating(false)
    }
  }

  const handleDeleteUser = async (profileId: string) => {
    if (profileId === user?.id) return // Can't delete self

    try {
      // Delete from profiles (cascade will handle it via RLS)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId)

      if (error) {
        console.error('Error deleting user:', error)
      } else {
        setProfiles(prev => prev.filter(p => p.id !== profileId))
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
    setDeleteConfirm(null)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 rounded-lg transition-colors" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)' }}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: 'var(--accent2)' }} />
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>User Management</h1>
            </div>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Super Admin — Manage users and admins</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
        >
          <UserPlus className="w-4 h-4" /> Create User
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--fg)' }}>Create New User</h3>
          {createError && (
            <div className="p-3 mb-4 rounded-lg text-sm" style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)', color: '#ef4444' }}>
              {createError}
            </div>
          )}
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input type="email" required className="w-full rounded-lg pl-10 pr-3 py-2.5 text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }} placeholder="email@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input type={showPwd ? 'text' : 'password'} required minLength={6} className="w-full rounded-lg pl-10 pr-10 py-2.5 text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }} placeholder="Min 6 chars" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg-subtle)' }}>
                  {showPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Role</label>
              <select className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }} value={newRole} onChange={(e) => setNewRole(e.target.value as 'user' | 'admin')}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={creating} className="py-2.5 px-4 rounded-lg text-sm font-semibold transition-all disabled:opacity-50" style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>
              {creating ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>
      )}

      {/* User List */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--card-border)' }}>
          <Users className="w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
          <h3 className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>
            All Users ({profiles.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                <th className="px-5 py-3 text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Email</th>
                <th className="px-5 py-3 text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Role</th>
                <th className="px-5 py-3 text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Created</th>
                <th className="px-5 py-3 text-xs font-medium text-right" style={{ color: 'var(--fg-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-b transition-colors" style={{ borderColor: 'var(--card-border)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--glass-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-3" style={{ color: 'var(--fg)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' }}>
                        {p.email[0].toUpperCase()}
                      </div>
                      {p.email}
                      {p.id === user?.id && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}>You</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{
                      background: p.role === 'superadmin' ? 'color-mix(in srgb, var(--accent2) 15%, transparent)' : p.role === 'admin' ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--input-bg)',
                      color: p.role === 'superadmin' ? 'var(--accent2)' : p.role === 'admin' ? 'var(--accent)' : 'var(--fg-muted)'
                    }}>
                      {p.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                    {new Date(p.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {p.id !== user?.id && p.role !== 'superadmin' ? (
                      deleteConfirm === p.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>Delete?</span>
                          <button onClick={() => handleDeleteUser(p.id)} className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'color-mix(in srgb, #ef4444 15%, transparent)', color: '#ef4444' }}>
                            Yes
                          </button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)' }}>
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--fg-subtle)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, #ef4444 12%, transparent)'; e.currentTarget.style.color = '#ef4444' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-subtle)' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    ) : (
                      <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sm" style={{ color: 'var(--fg-subtle)' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
