import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { User, Mail, Phone, Shield } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [saved, setSaved] = useState(false)

  if (!user) return <Navigate to="/" replace />

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-8">My profile</h1>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-8 mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-[#1A6BCC]/10 rounded-full flex items-center justify-center">
              <User size={28} className="text-[#1A6BCC]" />
            </div>
            <div>
              <p className="font-semibold text-[#0F172A]">{user.full_name || 'Your name'}</p>
              <p className="text-sm text-[#94A3B8]">{user.email}</p>
              <span className="text-xs font-medium text-[#1A6BCC] bg-[#1A6BCC]/10 px-2 py-0.5 rounded-full capitalize">
                {user.subscription_tier} plan
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[#0F172A] flex items-center gap-1.5 mb-1.5">
                <User size={14} className="text-[#94A3B8]" /> Full name
              </label>
              <input
                defaultValue={user.full_name || ''}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] flex items-center gap-1.5 mb-1.5">
                <Mail size={14} className="text-[#94A3B8]" /> Email
              </label>
              <input
                defaultValue={user.email}
                type="email"
                disabled
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm bg-[#F7F9FC] text-[#94A3B8] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] flex items-center gap-1.5 mb-1.5">
                <Phone size={14} className="text-[#94A3B8]" /> Phone (for reminders)
              </label>
              <input
                defaultValue={user.phone || ''}
                type="tel"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]"
                placeholder="+359..."
              />
            </div>
            <Button variant="primary" type="submit">
              {saved ? 'Saved!' : 'Save changes'}
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-[#1A6BCC]" />
            <h2 className="font-semibold text-[#0F172A]">Security</h2>
          </div>
          <button className="text-sm text-[#1A6BCC] hover:underline">Change password</button>
          <div className="border-t border-[#E2E8F0] mt-4 pt-4">
            <button className="text-sm text-red-500 hover:underline">Delete account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
