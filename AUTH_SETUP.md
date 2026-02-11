# Authentication & Route Protection Setup

This document explains how authentication and route protection work in BizLaunch.

## Overview

- **Supabase Auth**: Handles user authentication (signup, login, password reset)
- **Prisma Database**: Stores user data and business logic
- **Automatic Sync**: Users are automatically synced from Supabase to Prisma

## Route Protection

### Server Components (Recommended)

Use `requireAuth()` to protect server components. This will automatically redirect unauthenticated users to `/login`.

```tsx
import { requireAuth } from '@/lib/auth'
import { getOrCreatePrismaUser } from '@/lib/sync-user'

export default async function ProtectedPage() {
  // This redirects to /login if not authenticated
  const supabaseUser = await requireAuth()
  
  // Get or create Prisma user
  const prismaUser = await getOrCreatePrismaUser(supabaseUser)
  
  return <div>Protected content for {prismaUser.email}</div>
}
```

**Example**: See `src/app/dashboard/page.tsx`

### Client Components

Use the `useAuth()` hook to protect client components.

```tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedClientPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return <div>Protected content</div>
}
```

**Example**: See `src/app/dashboard/profile/page.tsx`

## User Synchronization

### Automatic Sync

Users are automatically synced to Prisma when they:
1. Sign up (`/signup`)
2. Log in (`/login`)
3. Complete email verification (`/auth/callback`)

### Manual Sync

You can manually sync a user using:

```tsx
import { getOrCreatePrismaUser } from '@/lib/sync-user'
import { createClientSupabase } from '@/lib/supabase'

const supabase = await createClientSupabase()
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  const prismaUser = await getOrCreatePrismaUser(user, {
    name: user.user_metadata?.name || null,
    role: 'CLIENT', // optional
  })
}
```

### Webhook Sync (Recommended for Production)

For production, set up a Supabase webhook to automatically sync users:

1. Go to Supabase Dashboard > Database > Webhooks
2. Create a new webhook:
   - **Table**: `auth.users`
   - **Events**: INSERT, UPDATE, DELETE
   - **URL**: `https://yourdomain.com/api/webhooks/supabase`
   - **HTTP Method**: POST
   - **HTTP Headers**: `Authorization: Bearer YOUR_WEBHOOK_SECRET`

3. Add to your `.env`:
```env
SUPABASE_WEBHOOK_SECRET=your-secret-key-here
```

## API Routes

### `/api/auth/sync-user` (POST)

Manually syncs the current authenticated user to Prisma.

**Usage**:
```typescript
const response = await fetch('/api/auth/sync-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
})
const data = await response.json()
```

### `/api/webhooks/supabase` (POST)

Webhook endpoint for Supabase user events. Automatically syncs users when they sign up, update, or delete their account.

## Middleware Protection

The middleware (`src/middleware.ts`) automatically:
- Protects routes starting with `/dashboard`
- Redirects authenticated users away from `/login` and `/signup`
- Refreshes user sessions

## Protected Routes

Currently protected routes:
- `/dashboard` - Main dashboard (server component example)
- `/dashboard/profile` - User profile (client component example)

To protect additional routes, add them to the middleware:

```typescript
// In src/middleware.ts
if (!user && request.nextUrl.pathname.startsWith('/your-protected-route')) {
  return NextResponse.redirect(new URL('/login', request.url))
}
```

## User Data Structure

### Supabase User
- `id` - Supabase user ID
- `email` - User email
- `user_metadata` - Custom metadata (name, etc.)

### Prisma User
- `id` - UUID (Prisma ID)
- `supabaseId` - Links to Supabase user
- `email` - User email
- `name` - User's full name
- `role` - CLIENT, PROFESSIONAL, or ADMIN
- `createdAt` - Account creation date
- `updatedAt` - Last update date

## Examples

### Getting Current User (Server Component)

```tsx
import { getUser } from '@/lib/auth'
import { getOrCreatePrismaUser } from '@/lib/sync-user'

export default async function MyPage() {
  const supabaseUser = await getUser()
  
  if (!supabaseUser) {
    return <div>Not logged in</div>
  }
  
  const prismaUser = await getOrCreatePrismaUser(supabaseUser)
  return <div>Hello {prismaUser.name}</div>
}
```

### Getting Current User (Client Component)

```tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function MyPage() {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not logged in</div>
  
  return <div>Hello {user.email}</div>
}
```

### Signing Out

```tsx
// Server Component
import { signOut } from '@/lib/auth'

await signOut() // Redirects to /login

// Client Component
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const router = useRouter()
await supabase.auth.signOut()
router.push('/')
```

## Troubleshooting

### User not syncing to Prisma

1. Check that the sync function is being called
2. Verify database connection in `.env`
3. Check Prisma schema matches Supabase user structure
4. Review server logs for errors

### Protected route not redirecting

1. Ensure middleware is in `src/middleware.ts` (not `middleware.ts`)
2. Check middleware matcher includes your route
3. Verify `requireAuth()` or `useAuth()` is being used correctly

### Webhook not working

1. Verify webhook URL is accessible
2. Check webhook secret matches `.env`
3. Review Supabase webhook logs
4. Check API route logs for errors
