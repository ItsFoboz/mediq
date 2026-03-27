import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function ProLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      navigate('/pro/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1A6BCC] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Doctor portal</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage your practice</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[20px] p-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-white/80 block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#1A6BCC]"
              placeholder="you@clinic.bg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white/80 block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#1A6BCC]"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button variant="primary" fullWidth isLoading={isLoading} type="submit">
            Sign in
          </Button>
        </form>

        <p className="text-center text-white/30 text-sm mt-6">
          Not a MEDIQ doctor yet?{' '}
          <a href="/for-doctors" className="text-[#1A6BCC] hover:underline">Learn more</a>
        </p>
      </div>
    </div>
  )
}
