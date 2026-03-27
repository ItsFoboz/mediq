import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const { user, session, isLoading, signIn, signUp, signOut, signInWithGoogle, setUser } =
    useAuthStore()

  useEffect(() => {
    // Initialize session from Supabase on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.full_name ?? session.user.email ?? '',
          phone_verified: false,
          language_preference: 'en',
          nhif_registered: false,
          subscription_tier: 'free',
          favorite_doctors: [],
          created_at: session.user.created_at,
        })
      } else {
        setUser(null)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.full_name ?? session.user.email ?? '',
          phone_verified: false,
          language_preference: 'en',
          nhif_registered: false,
          subscription_tier: (session.user.user_metadata?.subscription_tier as 'free' | 'plus') ?? 'free',
          favorite_doctors: [],
          created_at: session.user.created_at,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  const isAuthenticated = !!user
  const isPlusUser = user?.subscription_tier === 'plus'

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    isPlusUser,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }
}
