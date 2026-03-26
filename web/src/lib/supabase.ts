import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Typed query helpers for each table
export const db = {
  doctors: () => supabase.from('doctors'),
  specialties: () => supabase.from('specialties'),
  clinics: () => supabase.from('clinics'),
  appointments: () => supabase.from('appointments'),
  reviews: () => supabase.from('reviews'),
  users: () => supabase.from('users'),
  waitingList: () => supabase.from('waiting_list'),
}
