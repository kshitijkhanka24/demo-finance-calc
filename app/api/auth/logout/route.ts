import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Auth/Logout] Unexpected error:', err)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
