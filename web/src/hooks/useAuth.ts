import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const { user, isLoading, signIn, signUp, signOut, signInWithGoogle, setUser } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: session.user.user_metadata?.full_name as string | undefined,
          subscription_tier: (session.user.user_metadata?.subscription_tier as 'free' | 'plus') ?? 'free',
        })
      } else {
        setUser(null)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: session.user.user_metadata?.full_name as string | undefined,
          subscription_tier: (session.user.user_metadata?.subscription_tier as 'free' | 'plus') ?? 'free',
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isPlusUser: user?.subscription_tier === 'plus',
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }
}
