import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Header from './Header'
import Footer from './Footer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

function AuthModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp, signInWithGoogle } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      if (tab === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password, name)
      }
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
            {tab === 'signin' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-[#64748B] text-sm mt-1">
            {tab === 'signin' ? 'Sign in to your MEDIQ account' : 'Join MEDIQ to book appointments'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg bg-[#F7F9FC] p-1 mb-6">
          {(['signin', 'signup'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                tab === t
                  ? 'bg-white shadow text-[#0F172A]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Google OAuth */}
        <button
          onClick={() => signInWithGoogle()}
          className="w-full flex items-center justify-center gap-3 border border-[#E2E8F0] rounded-lg py-2.5 text-sm font-medium text-[#0F172A] hover:bg-[#F7F9FC] transition-colors mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]" />
          </div>
          <div className="relative flex justify-center text-xs text-[#94A3B8] bg-white px-2">or</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              fullWidth
            />
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            fullWidth
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
          />
          {error && <p className="text-sm text-[#DC2626]">{error}</p>}
          <Button type="submit" variant="primary" fullWidth isLoading={isLoading} size="lg">
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {tab === 'signin' && (
          <p className="text-center text-xs text-[#94A3B8] mt-3">
            <button className="text-[#1A6BCC] hover:underline">Forgot your password?</button>
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default function AuthLayout() {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(true)

  if (user) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AnimatePresence>
        {showModal && (
          <AuthModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
