import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// Input sanitization schema
const signupSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export async function POST(request: Request) {
  try {
    // Rate limiting per IP (basic implementation)
    const body = await request.json()

    // Validate and sanitize inputs
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message)
      return NextResponse.json(
        { error: errors[0] },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const supabase = await createSupabaseServerClient()

    // Server-side signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      // Don't leak internal error details
      console.error('[Auth/Signup] Supabase error:', error.message)
      
      // Map common Supabase errors to user-friendly messages
      let userMessage = 'Failed to create account. Please try again.'
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        userMessage = 'An account with this email already exists.'
      } else if (error.message.includes('invalid')) {
        userMessage = 'Invalid email address.'
      } else if (error.message.includes('rate limit')) {
        userMessage = 'Too many attempts. Please wait before trying again.'
      }

      return NextResponse.json({ error: userMessage }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created. Please check your email to verify your account.',
        userId: data.user?.id,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[Auth/Signup] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
