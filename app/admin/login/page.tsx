// Redirect old admin login to the unified login page
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/login') }, [router])
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Redirecting to login...</p>
    </div>
  )
}
