import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy | KYFS Finance',
  description: 'Learn how KYFS Finance uses cookies and similar technologies.',
}

export default function CookiesPolicyPage() {
  const lastUpdated = 'April 6, 2026'
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Cookie Policy</h1>
            <p className="text-sm" style={{ color: 'var(--fg-subtle)' }}>Last updated: {lastUpdated}</p>
          </div>

          <div className="h-px" style={{ background: 'var(--card-border)' }} />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>1. What Are Cookies?</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They allow websites to recognize your device, remember your preferences, and provide a personalized experience. Cookies are essential for many modern website features.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>2. How We Use Cookies</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              KYFS Finance uses cookies and similar technologies for the following purposes:
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>3. Types of Cookies We Use</h2>

            {/* Essential Cookies */}
            <div className="rounded-xl p-5 space-y-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'color-mix(in srgb, #22c55e 15%, transparent)', color: '#22c55e' }}>Essential</span>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Authentication Cookies</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                These are strictly necessary for the website to function securely. They manage your login session, ensuring you stay authenticated while navigating between pages. These cookies cannot be disabled without impacting core functionality.
              </p>
              <div className="text-xs font-mono p-2 rounded" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)' }}>
                <p><strong>Cookie Names:</strong> sb-access-token, sb-refresh-token, supabase-auth-token</p>
                <p><strong>Duration:</strong> Session / Up to 7 days</p>
                <p><strong>Purpose:</strong> Secure user authentication via Supabase</p>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="rounded-xl p-5 space-y-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'color-mix(in srgb, #3b82f6 15%, transparent)', color: '#3b82f6' }}>Preference</span>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Preference Cookies</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                These cookies remember your preferences and settings, such as your chosen theme (light/dark mode) and display preferences. They improve your experience by not requiring you to reconfigure settings on each visit.
              </p>
              <div className="text-xs font-mono p-2 rounded" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)' }}>
                <p><strong>Cookie Names:</strong> theme</p>
                <p><strong>Duration:</strong> Up to 1 year</p>
                <p><strong>Purpose:</strong> Remember theme preference (light/dark)</p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="rounded-xl p-5 space-y-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'color-mix(in srgb, #f97316 15%, transparent)', color: '#f97316' }}>Analytics</span>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Analytics Cookies</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                We use Vercel Analytics to understand how visitors interact with our website. This data is anonymous and does not identify individual users. It helps us improve the user experience and understand which calculators are most popular.
              </p>
              <div className="text-xs font-mono p-2 rounded" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)' }}>
                <p><strong>Provider:</strong> Vercel Analytics</p>
                <p><strong>Duration:</strong> Session</p>
                <p><strong>Data Collected:</strong> Page views, referrer, device type (anonymized)</p>
                <p><strong>Personal Data:</strong> No personally identifiable information is collected</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>4. Local Storage</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              In addition to cookies, we may use your browser&apos;s local storage to save your calculator inputs between sessions for your convenience. This data is stored entirely on your device, is not transmitted to our servers, and can be cleared at any time by clearing your browser&apos;s local storage or site data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>5. Third-Party Cookies</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              We use the following third-party services that may set their own cookies:
            </p>
            <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li><strong style={{ color: 'var(--fg)' }}>Supabase:</strong> Our backend authentication provider. Subject to <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Supabase's Privacy Policy</a>.</li>
              <li><strong style={{ color: 'var(--fg)' }}>Vercel:</strong> Our hosting provider for anonymized analytics. Subject to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Vercel's Privacy Policy</a>.</li>
            </ul>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              We do not use advertising cookies, tracking pixels, or any third-party marketing services. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>6. Managing Cookies</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              You can control and manage cookies in several ways:
            </p>
            <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li><strong style={{ color: 'var(--fg)' }}>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete specific cookies through your browser settings. Note that disabling essential cookies will prevent you from logging in.</li>
              <li><strong style={{ color: 'var(--fg)' }}>Clearing Site Data:</strong> You can clear all cookies and local storage for our site in your browser&apos;s developer tools under the &quot;Application&quot; or &quot;Storage&quot; tab.</li>
              <li><strong style={{ color: 'var(--fg)' }}>Logging Out:</strong> Logging out of your account will clear your authentication cookies.</li>
            </ul>
            <div className="p-4 rounded-xl text-sm" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--fg-muted)' }}>
              <strong style={{ color: 'var(--fg)' }}>Note:</strong> Disabling essential/authentication cookies will prevent you from creating an account or logging in. However, all our calculators are fully functional without an account.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>7. Security of Authentication Cookies</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Our authentication cookies are secured with industry-standard protections:
            </p>
            <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>Transmitted only over HTTPS (encrypted connections)</li>
              <li>Set with the <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--input-bg)' }}>Secure</code> flag to prevent transmission over insecure channels</li>
              <li>JWTs (JSON Web Tokens) are time-limited and automatically expire</li>
              <li>Session tokens are invalidated upon logout</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>8. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will indicate the date of last update at the top of this page. Your continued use of our Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>9. Contact Us</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              If you have any questions about our use of cookies or this policy, please contact us:
            </p>
            <div className="p-4 rounded-xl text-sm space-y-1" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)', border: '1px solid var(--card-border)' }}>
              <p><strong style={{ color: 'var(--fg)' }}>K Y Financial Services</strong></p>
              <p>Email: <a href="mailto:support@kyfs.com" className="underline" style={{ color: 'var(--accent)' }}>support@kyfs.com</a></p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>

          <div className="h-px" style={{ background: 'var(--card-border)' }} />

          <p className="text-xs text-center" style={{ color: 'var(--fg-subtle)' }}>
            <Link href="/" style={{ color: 'var(--accent)' }}>← Back to Home</Link>
            {' · '}
            <Link href="/terms-of-service" style={{ color: 'var(--accent)' }}>Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
