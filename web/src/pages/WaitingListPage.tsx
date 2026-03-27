import { Navigate, Link } from 'react-router-dom'
import { Clock, Bell, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useSubscription } from '@/hooks/useSubscription'
import Button from '@/components/ui/Button'

const MOCK_WAITING = [
  { id: 'w-1', doctor_name: 'Dr. Elena Stoyanova', specialty: 'Neurologist', city: 'Sofia', added: '2025-01-20', position: 3 },
  { id: 'w-2', doctor_name: 'Dr. Plamen Georgiev', specialty: 'Ophthalmologist', city: 'Varna', added: '2025-01-22', position: 7 },
]

export default function WaitingListPage() {
  const { user } = useAuthStore()
  const { isPro } = useSubscription()

  if (!user) return <Navigate to="/" replace />

  if (!isPro) return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Bell size={40} className="text-[#CBD5E1] mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Waiting list</h1>
        <p className="text-[#64748B] mb-6">Get notified when a slot opens up with your preferred doctor. Available on MEDIQ Plus.</p>
        <Link to="/plus"><Button variant="primary">Upgrade to Plus</Button></Link>
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Waiting list</h1>
        <p className="text-sm text-[#64748B] mb-8">You'll be notified via email and SMS when a slot becomes available.</p>

        {MOCK_WAITING.length === 0 ? (
          <div className="text-center py-16">
            <Clock size={40} className="text-[#CBD5E1] mx-auto mb-4" />
            <p className="text-[#64748B]">You're not on any waiting lists yet.</p>
            <Link to="/doctors" className="text-sm text-[#1A6BCC] hover:underline mt-2 block">Browse doctors</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_WAITING.map(w => (
              <div key={w.id} className="bg-white rounded-[16px] border border-[#E2E8F0] p-5 flex items-center justify-between" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div>
                  <p className="font-semibold text-[#0F172A]">{w.doctor_name}</p>
                  <p className="text-sm text-[#64748B]">{w.specialty} · {w.city}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">Position #{w.position} · Added {w.added}</p>
                </div>
                <button className="text-[#94A3B8] hover:text-red-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
