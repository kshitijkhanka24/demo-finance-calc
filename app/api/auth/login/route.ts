import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// Input validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(128, 'Password too long'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate and sanitize inputs
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message)
      return NextResponse.json(
        { error: errors[0] },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('[Auth/Login] Supabase error:', error.message)

      // Generic error to prevent user enumeration attacks
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Fetch user profile for role info
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile?.role ?? 'user',
      },
    })
  } catch (err) {
    console.error('[Auth/Login] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
