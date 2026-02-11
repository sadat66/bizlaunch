import { createClientSupabase } from '@/lib/supabase-server'
import { getOrCreatePrismaUser } from '@/lib/sync-user'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClientSupabase()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin))
    }

    // Sync user to Prisma database after successful authentication
    if (data.user) {
      try {
        await getOrCreatePrismaUser(data.user, {
          name: data.user.user_metadata?.name || null,
        })
      } catch (syncError) {
        console.error('Error syncing user to Prisma:', syncError)
        // Don't fail the auth flow if sync fails, just log it
      }
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
