import { NextRequest, NextResponse } from 'next/server'
import { syncUserToPrisma } from '@/lib/sync-user'
import { prisma } from '@/lib/prisma'

/**
 * Webhook endpoint for Supabase user events
 * Configure this URL in Supabase Dashboard > Database > Webhooks
 * 
 * Events to listen for:
 * - auth.users INSERT (user signup)
 * - auth.users UPDATE (user update)
 * - auth.users DELETE (user deletion)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const authHeader = request.headers.get('authorization')
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET
    
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, record, old_record } = body

    // Handle user creation (signup)
    if (type === 'INSERT' && record) {
      const supabaseUser = {
        id: record.id,
        email: record.email,
        user_metadata: record.raw_user_meta_data || {},
        created_at: record.created_at,
      }

      await syncUserToPrisma(supabaseUser as any, {
        name: record.raw_user_meta_data?.name || null,
      })

      return NextResponse.json({ success: true, message: 'User synced' })
    }

    // Handle user update
    if (type === 'UPDATE' && record) {
      const existingUser = await prisma.user.findUnique({
        where: { supabaseId: record.id },
      })

      if (existingUser) {
        await prisma.user.update({
          where: { supabaseId: record.id },
          data: {
            email: record.email || existingUser.email,
            name: record.raw_user_meta_data?.name || existingUser.name,
            updatedAt: new Date(),
          },
        })
      } else {
        // User doesn't exist in Prisma, create it
        await syncUserToPrisma(record as any, {
          name: record.raw_user_meta_data?.name || null,
        })
      }

      return NextResponse.json({ success: true, message: 'User updated' })
    }

    // Handle user deletion
    if (type === 'DELETE' && old_record) {
      await prisma.user.deleteMany({
        where: { supabaseId: old_record.id },
      })

      return NextResponse.json({ success: true, message: 'User deleted' })
    }

    return NextResponse.json({ success: true, message: 'Event processed' })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ 
    message: 'Supabase webhook endpoint',
    status: 'active'
  })
}
