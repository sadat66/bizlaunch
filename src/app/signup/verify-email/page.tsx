'use client'

import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              B
            </div>
            <span className="text-3xl font-bold tracking-tight">BizLaunch</span>
          </Link>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
          <p className="text-secondary mb-6">
            We&apos;ve sent a verification link to your email address. Please click the link to verify your account.
          </p>
          <p className="text-sm text-secondary mb-8">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <Link href="/signup" className="text-primary hover:underline font-bold">
              try again
            </Link>
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-glass-border hover:border-primary transition-colors"
          >
            Back to Login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
