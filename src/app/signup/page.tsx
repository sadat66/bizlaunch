'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Briefcase } from 'lucide-react'
import { Spinner } from '@/components/ui/Spinner'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<'CLIENT' | 'PROFESSIONAL'>('CLIENT')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Sync user to Prisma database
        try {
          const response = await fetch('/api/auth/sync-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role }),
          })
          if (!response.ok) {
            console.warn('Failed to sync user to Prisma')
          }
        } catch (err) {
          console.warn('Error syncing user:', err)
        }

        // Check if email confirmation is required
        if (data.session) {
          // User is automatically signed in
          router.push('/dashboard')
          router.refresh()
        } else {
          // Email confirmation required
          router.push('/signup/verify-email')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              B
            </div>
            <span className="text-3xl font-bold tracking-tight">BizLaunch</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Account</h1>
          <p className="text-secondary">Start your business journey in Bangladesh</p>
        </div>

        {/* Signup Form */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('CLIENT')}
                className={`p-4 rounded-xl border transition-all ${role === 'CLIENT'
                  ? 'gradient-bg-light border-primary ring-2 ring-primary bg-primary/10'
                  : 'glass-card border-glass-border hover:border-primary/50 text-secondary'
                  }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className={`w-8 h-8 ${role === 'CLIENT' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-medium ${role === 'CLIENT' ? 'text-primary' : ''}`}>Client</span>
                  <span className="text-xs text-center opacity-70">I want to hire professionals</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('PROFESSIONAL')}
                className={`p-4 rounded-xl border transition-all ${role === 'PROFESSIONAL'
                  ? 'gradient-bg-light border-primary ring-2 ring-primary bg-primary/10'
                  : 'glass-card border-glass-border hover:border-primary/50 text-secondary'
                  }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Briefcase className={`w-8 h-8 ${role === 'PROFESSIONAL' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-medium ${role === 'PROFESSIONAL' ? 'text-primary' : ''}`}>Service Provider</span>
                  <span className="text-xs text-center opacity-70">I want to offer services</span>
                </div>
              </button>
            </div>

            {/* Name Field */}`
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
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 rounded-xl glass-card border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 rounded-xl glass-card border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-xl gradient-bg text-white font-bold text-lg shadow-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="text-white" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-glass-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 glass-card text-secondary">or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
