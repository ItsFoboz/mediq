import { Navigate, Link } from 'react-router-dom'
import { Bell, Globe, CreditCard, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useSubscription } from '@/hooks/useSubscription'

export default function SettingsPage() {
  const { user, signOut } = useAuthStore()
  const { isPro } = useSubscription()

  if (!user) return <Navigate to="/" replace />

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-8">Settings</h1>

        <div className="space-y-4">
          {/* Notifications */}
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-2 mb-5">
              <Bell size={18} className="text-[#1A6BCC]" />
              <h2 className="font-semibold text-[#0F172A]">Notifications</h2>
            </div>
            {[
              { label: 'Email appointment reminders', sub: '48 hours before appointment' },
              { label: 'SMS reminders', sub: 'Requires phone number in profile' },
              { label: 'Waiting list alerts', sub: 'When a slot opens up' },
              { label: 'MEDIQ news & tips', sub: 'Monthly newsletter' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#F1F5F9] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
                  <p className="text-xs text-[#94A3B8]">{item.sub}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-10 h-5 bg-[#E2E8F0] peer-focus:ring-2 peer-focus:ring-[#1A6BCC]/30 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-[#1A6BCC] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>

          {/* Language */}
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={18} className="text-[#1A6BCC]" />
              <h2 className="font-semibold text-[#0F172A]">Language & region</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#64748B]">Display language</span>
              <select className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 outline-none focus:border-[#1A6BCC]">
                <option>English</option>
                <option>Български</option>
              </select>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} className="text-[#1A6BCC]" />
              <h2 className="font-semibold text-[#0F172A]">Subscription</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{isPro ? 'MEDIQ Plus' : 'Free plan'}</p>
                {isPro && <p className="text-xs text-[#94A3B8]">Renews monthly via Stripe</p>}
              </div>
              {isPro ? (
                <button className="text-sm text-red-500 hover:underline">Cancel subscription</button>
              ) : (
                <Link to="/plus" className="text-sm text-[#1A6BCC] font-semibold hover:underline">Upgrade to Plus</Link>
              )}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
