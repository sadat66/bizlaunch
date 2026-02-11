'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Loader2, User, Mail, Save, LogOut } from 'lucide-react'
import Link from 'next/link'

/**
 * Protected Profile Page (Client Component Example)
 * Uses useAuth() hook to protect the route
 */
export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || user.email?.split('@')[0] || '')
      setEmail(user.email || '')
      setLoading(false)
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name },
      })

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-glass-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            B
          </div>
          <span className="text-2xl font-bold tracking-tight">BizLaunch</span>
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-full glass-card border border-glass-border hover:border-primary transition-colors text-sm font-medium"
        >
          Dashboard
        </Link>
      </nav>

      {/* Profile Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Profile Settings</h1>

          {/* Profile Form */}
          <div className="glass-card p-8 rounded-3xl">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
                  Profile updated successfully!
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email Field (read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border border-glass-border opacity-60 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-secondary mt-2">Email cannot be changed</p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-4 rounded-xl gradient-bg text-white font-bold text-lg shadow-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-glass-border"></div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full px-6 py-4 rounded-xl glass-card border border-red-500/20 text-red-600 dark:text-red-400 font-bold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
