import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export interface User {
  id: string
  email: string
  full_name?: string
  avatarUrl?: string
  subscription_tier: 'free' | 'plus'
  role?: 'patient' | 'doctor' | 'admin'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: user !== null, isLoading: false }),

      setLoading: (isLoading) => set({ isLoading }),

      signIn: async (email, password) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) { set({ isLoading: false }); throw error }
        if (data.user) {
          set({
            user: {
              id: data.user.id,
              email: data.user.email ?? '',
              full_name: data.user.user_metadata?.full_name as string | undefined,
              subscription_tier: (data.user.user_metadata?.subscription_tier as 'free' | 'plus') ?? 'free',
            },
            isAuthenticated: true,
            isLoading: false,
          })
        }
      },

      signUp: async (email, password, fullName) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) { set({ isLoading: false }); throw error }
        if (data.user) {
          set({
            user: { id: data.user.id, email: data.user.email ?? '', full_name: fullName, subscription_tier: 'free' },
            isAuthenticated: true,
            isLoading: false,
          })
        }
      },

      signInWithGoogle: async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/` },
        })
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAuthenticated: false, isLoading: false })
      },
    }),
    {
      name: 'mediq-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

export type { AuthState }
