import { supabase } from '@/lib/supabase'

// Define user types
export interface SupabaseUser {
  id: string
  email: string
  role?: string
}

export interface UserCredential {
  user: SupabaseUser
}

/**
 * Sign in with email and password using Supabase Authentication
 */
export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    if (!data.user) {
      throw new Error('Authentication failed')
    }

    // Get user role from user metadata
    const role = data.user.user_metadata?.role || 'admin'

    const user: SupabaseUser = {
      id: data.user.id,
      email: data.user.email || '',
      role,
    }

    return { user }
  } catch (error) {
    console.error('Login error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    )
  }
}

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<SupabaseUser | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'admin',
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Sign out error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Sign out failed'
    )
  }
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (callback: (user: SupabaseUser | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      const user: SupabaseUser = {
        id: session.user.id,
        email: session.user.email || '',
        role: session.user.user_metadata?.role || 'admin',
      }
      callback(user)
    } else {
      callback(null)
    }
  })
}
