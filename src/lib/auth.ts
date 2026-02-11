import { createClientSupabase } from './supabase-server'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = await createClientSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createClientSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

export async function signOut() {
  const supabase = await createClientSupabase()
  await supabase.auth.signOut()
  redirect('/login')
}
