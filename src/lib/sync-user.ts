import { prisma } from './prisma'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { UserRole } from '@prisma/client'

/**
 * Syncs a Supabase user with the Prisma User model
 * Creates a new user if they don't exist, updates if they do
 */
export async function syncUserToPrisma(
  supabaseUser: SupabaseUser,
  options?: {
    name?: string
    role?: UserRole
  }
) {
  try {
    const email = supabaseUser.email
    if (!email) {
      throw new Error('User email is required')
    }

    // Get user metadata (name might be in user_metadata or metadata)
    const name = options?.name || 
                 supabaseUser.user_metadata?.name || 
                 supabaseUser.user_metadata?.full_name ||
                 supabaseUser.email?.split('@')[0] ||
                 null

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { supabaseId: supabaseUser.id },
        data: {
          email: email,
          name: name || existingUser.name,
          updatedAt: new Date(),
        },
      })
      return updatedUser
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          supabaseId: supabaseUser.id,
          email: email,
          name: name,
          role: options?.role || 'CLIENT',
        },
      })
      return newUser
    }
  } catch (error) {
    console.error('Error syncing user to Prisma:', error)
    throw error
  }
}

/**
 * Gets or creates a Prisma user from Supabase user
 * Useful for ensuring user exists before creating related records
 */
export async function getOrCreatePrismaUser(
  supabaseUser: SupabaseUser,
  options?: {
    name?: string
    role?: UserRole
  }
) {
  try {
    // Try to find existing user
    let prismaUser = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    // If not found, sync/create it
    if (!prismaUser) {
      prismaUser = await syncUserToPrisma(supabaseUser, options)
    }

    return prismaUser
  } catch (error) {
    console.error('Error getting or creating Prisma user:', error)
    throw error
  }
}
