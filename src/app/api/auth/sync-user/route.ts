import { NextRequest, NextResponse } from 'next/server'
import { createClientSupabase } from '@/lib/supabase-server'
import { getOrCreatePrismaUser } from '@/lib/sync-user'

/**
 * API route to manually sync the current user to Prisma
 * Called after login/signup to ensure user exists in database
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClientSupabase()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { role } = body

    // Sync user to Prisma
    const prismaUser = await getOrCreatePrismaUser(user, {
      name: user.user_metadata?.name || null,
      role: role || 'CLIENT', // Default to CLIENT if not provided
    })

    return NextResponse.json({
      success: true,
      user: {
        id: prismaUser.id,
        email: prismaUser.email,
        name: prismaUser.name,
        role: prismaUser.role,
      },
    })
  } catch (error: any) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync user' },
      { status: 500 }
    )
  }
}
