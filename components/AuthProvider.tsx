'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export type UserRole = 'user' | 'paid-user' | 'admin' | 'superadmin'

export interface Profile {
  id: string
  email: string
  role: UserRole
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  isAdmin: boolean
  isSuperAdmin: boolean
  isPaidUser: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  isAdmin: false,
  isSuperAdmin: false,
  isPaidUser: false,
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }
      return data as Profile
    } catch (err) {
      console.error('Error in fetchProfile:', err)
      return null
    }
  }, [])

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession()
      setSession(initialSession)
      setUser(initialSession?.user ?? null)
      
      if (initialSession?.user) {
        const p = await fetchProfile(initialSession.user.id)
        setProfile(p)
      }
      setLoading(false)
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)

        if (newSession?.user) {
          const p = await fetchProfile(newSession.user.id)
          setProfile(p)
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // signIn calls the secure backend API route
  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.error ?? 'Login failed' }

      // After server auth, re-sync the client session from Supabase's stored cookie
      await supabase.auth.refreshSession()
      return { error: null }
    } catch {
      return { error: 'Network error. Please check your connection.' }
    }
  }

  // signUp calls the secure backend API route with server-side validation
  const signUp = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword: password }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.error ?? 'Signup failed' }
      return { error: null }
    } catch {
      return { error: 'Network error. Please check your connection.' }
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // Ignore fetch errors, still clear client state
    }
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setSession(null)
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin'
  const isSuperAdmin = profile?.role === 'superadmin'
  const isPaidUser = profile?.role === 'paid-user' || isAdmin

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signIn, signUp, signOut, isAdmin, isSuperAdmin, isPaidUser }}>
      {children}
    </AuthContext.Provider>
  )
}
