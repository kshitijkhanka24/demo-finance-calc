import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Routes that require authentication
const PROTECTED_ROUTES = ['/admin']

// Admin-only routes (admin + superadmin)
const ADMIN_ROUTES = ['/admin/dashboard', '/admin/users']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Only run middleware on protected paths ──────────────────
  const isProtected = PROTECTED_ROUTES.some((p) => pathname.startsWith(p))
  const isAdminRoute = ADMIN_ROUTES.some((p) => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  // ── 2. Build a response that can set cookies ──────────────────
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  // ── 3. Create a server-side supabase client ───────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // ── 4. Validate session ───────────────────────────────────────
  // getUser() validates the JWT against the Supabase auth server (not just decode)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 5. For admin routes, check role ───────────────────────────
  if (isAdminRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'superadmin'].includes(profile.role)) {
      // Redirect non-admins to home with an error param
      const homeUrl = new URL('/', request.url)
      homeUrl.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(homeUrl)
    }
  }

  return response
}

export const config = {
  // Run on admin routes only — exclude static files and API routes
  matcher: ['/admin/:path*'],
}
