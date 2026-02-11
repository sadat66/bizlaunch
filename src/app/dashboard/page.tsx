import { requireAuth } from '@/lib/auth'
import { getOrCreatePrismaUser } from '@/lib/sync-user'
import { createClientSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, User, Briefcase, FileText, Settings } from 'lucide-react'

/**
 * Protected Dashboard Page (Server Component Example)
 * Uses requireAuth() to protect the route
 */
export default async function DashboardPage() {
  // This will redirect to /login if user is not authenticated
  const supabaseUser = await requireAuth()
  
  // Ensure user exists in Prisma database
  const prismaUser = await getOrCreatePrismaUser(supabaseUser, {
    name: supabaseUser.user_metadata?.name || null,
  })

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
        <div className="flex gap-4 items-center">
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 rounded-full glass-card border border-glass-border hover:border-primary transition-colors text-sm font-medium"
          >
            Profile
          </Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {prismaUser.name || prismaUser.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-secondary text-lg">
              Manage your business services and requests from one place.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">0</h3>
              <p className="text-secondary text-sm">Active Requests</p>
            </div>

            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">0</h3>
              <p className="text-secondary text-sm">Completed Services</p>
            </div>

            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{prismaUser.role}</h3>
              <p className="text-secondary text-sm">Account Type</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-8 rounded-3xl mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/services"
                className="p-6 rounded-2xl border border-glass-border hover:border-primary transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Browse Services</h3>
                    <p className="text-secondary text-sm">Find professionals for your business needs</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/dashboard/profile"
                className="p-6 rounded-2xl border border-glass-border hover:border-primary transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Update Profile</h3>
                    <p className="text-secondary text-sm">Manage your account settings</p>
                  </div>
                  <Settings className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* User Info (for debugging - remove in production) */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Account Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Email:</span>
                <span className="font-medium">{prismaUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Role:</span>
                <span className="font-medium">{prismaUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Member since:</span>
                <span className="font-medium">
                  {new Date(prismaUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
